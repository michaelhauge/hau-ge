import fs from "node:fs";
import path from "node:path";

/** Absolute path to the hau-ge repo (this file lives at <repo>/learn/lib/env.ts). */
export const REPO_ROOT = path.resolve(__dirname, "..", "..");

let loaded = false;

/**
 * Load hau-ge's .env.local into process.env. Variables already set in the
 * environment win, so CI secrets and one-off overrides behave as expected.
 */
export function loadEnv(): void {
  if (loaded) return;
  loaded = true;
  const file = path.join(REPO_ROOT, ".env.local");
  if (fs.existsSync(file)) process.loadEnvFile(file);
}

/** Today's date as YYYY-MM-DD in the machine's local timezone. */
export function today(now: Date = new Date()): string {
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/** Local timestamp safe for filenames: YYYY-MM-DD-HHmmss. */
export function stamp(now: Date = new Date()): string {
  const hh = String(now.getHours()).padStart(2, "0");
  const mm = String(now.getMinutes()).padStart(2, "0");
  const ss = String(now.getSeconds()).padStart(2, "0");
  return `${today(now)}-${hh}${mm}${ss}`;
}
