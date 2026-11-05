import fs from "node:fs";
import path from "node:path";
import type { Home } from "./home";
import { LearnError } from "./errors";
import { today } from "./env";

export interface CostEntry {
  ts: string;
  day: string;
  command: string;
  model: string;
  input_tokens: number;
  output_tokens: number;
  cache_read_input_tokens: number;
  cache_creation_input_tokens: number;
  web_search_requests: number;
  usd: number;
}

const LEDGER_RE = /^costs[\w.-]*\.jsonl$/;

/** Local runs write costs.jsonl; the digest Action sets LEARN_COST_LEDGER=costs.digest.jsonl. */
export function ledgerFile(home: Home): string {
  const name = process.env.LEARN_COST_LEDGER || "costs.jsonl";
  if (!LEDGER_RE.test(name)) throw new LearnError(`LEARN_COST_LEDGER must look like costs*.jsonl (got "${name}").`);
  return path.join(home.root, name);
}

export function readLedger(home: Home): CostEntry[] {
  const files = fs.existsSync(home.root) ? fs.readdirSync(home.root).filter((f) => LEDGER_RE.test(f)) : [];
  const entries: CostEntry[] = [];
  for (const f of files) {
    for (const line of fs.readFileSync(path.join(home.root, f), "utf8").split("\n")) {
      if (!line.trim()) continue;
      try {
        entries.push(JSON.parse(line) as CostEntry);
      } catch {
        // A half-written or conflicted line shouldn't take the tool down.
      }
    }
  }
  return entries;
}

export function spendOn(home: Home, day: string): number {
  return readLedger(home)
    .filter((e) => e.day === day)
    .reduce((sum, e) => sum + (Number(e.usd) || 0), 0);
}

export function ceilingUsd(): number {
  const raw = process.env.LEARN_DAILY_COST_CEILING_USD ?? "5";
  const n = Number(raw);
  if (!Number.isFinite(n) || n < 0) {
    throw new LearnError(`LEARN_DAILY_COST_CEILING_USD must be a number (got "${raw}").`);
  }
  return n;
}

/** Refuses at 100% of the daily ceiling; warns on stderr from 70%. */
export function assertUnderCeiling(home: Home): void {
  const spent = spendOn(home, today());
  const ceiling = ceilingUsd();
  if (spent >= ceiling) {
    throw new LearnError(
      `Daily ceiling reached: $${spent.toFixed(2)} of $${ceiling.toFixed(2)} spent today. Raise LEARN_DAILY_COST_CEILING_USD if you mean to.`,
    );
  }
  if (spent >= 0.7 * ceiling) {
    process.stderr.write(`(heads up: $${spent.toFixed(2)} of today's $${ceiling.toFixed(2)} ceiling spent)\n`);
  }
}

export function recordCost(home: Home, entry: Omit<CostEntry, "ts" | "day">): CostEntry {
  const now = new Date();
  const full: CostEntry = { ts: now.toISOString(), day: today(now), ...entry };
  fs.appendFileSync(ledgerFile(home), JSON.stringify(full) + "\n");
  return full;
}
