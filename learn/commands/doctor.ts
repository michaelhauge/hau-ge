import fs from "node:fs";
import type { Args } from "../lib/args";
import { callJSON, streamTurn } from "../lib/claude";
import { ceilingUsd, spendOn } from "../lib/cost";
import { loadEngagements } from "../lib/engagements";
import { today } from "../lib/env";
import { getHome, isGitRepo } from "../lib/home";
import { getIO } from "../lib/io";
import { role, type RoleName } from "../lib/models";
import { PRICES, PRICES_VERIFIED } from "../lib/prices";
import { WEB_TOOLS } from "./tutor";

/**
 * Checks setup. With --live, makes one tiny call per model role to prove the
 * request shapes (adaptive thinking, effort, structured output, web tools) are
 * accepted by the models you've configured. Costs a fraction of a cent.
 */
export async function run(args: Args): Promise<number> {
  const io = getIO();
  let failures = 0;
  const ok = (msg: string) => io.print(`✓ ${msg}`);
  const bad = (msg: string) => {
    failures++;
    io.print(`✗ ${msg}`);
  };

  let home;
  try {
    home = getHome();
    ok(`LEARN_HOME ${home.root}`);
  } catch (e) {
    bad((e as Error).message);
    return 1;
  }
  if (isGitRepo(home.root)) ok("LEARN_HOME is a git repo");
  else bad("LEARN_HOME isn't a git repo (it's your backup: git init and push to a private remote)");

  const eng = loadEngagements(home);
  if (eng.errors.length) bad(`engagements.md: ${eng.errors.join("; ")}`);
  else ok(`${eng.engagements.length} engagements in engagements.md`);
  if (!fs.existsSync(home.feedsFile)) io.print("· no feeds.md (only needed for `learn digest`)");

  for (const name of ["critic", "tutor", "cheap"] as RoleName[]) {
    const r = role(name);
    if (PRICES[r.model]) ok(`${name.padEnd(6)} → ${r.model}`);
    else bad(`${name} → ${r.model} has no price in learn/lib/prices.ts`);
  }
  io.print(`  prices verified ${PRICES_VERIFIED}`);

  if (process.env.ANTHROPIC_API_KEY) ok("ANTHROPIC_API_KEY is set");
  else io.print("· ANTHROPIC_API_KEY isn't set (fine if you use an `ant auth login` profile)");
  io.print(`  spend today $${spendOn(home, today()).toFixed(2)} of $${ceilingUsd().toFixed(2)}`);

  if (args.flags.live) {
    io.print("\nLive checks:");
    for (const name of ["critic", "cheap"] as RoleName[]) {
      try {
        const res = await callJSON<{ ok: boolean }>({
          home,
          command: "doctor",
          role: name,
          system: "You are a connectivity check.",
          user: 'Return {"ok": true}.',
          schema: { type: "object", additionalProperties: false, required: ["ok"], properties: { ok: { type: "boolean" } } },
          maxTokens: 2000,
        });
        if (res.data.ok === true) ok(`${name}: structured output from ${res.model} ($${res.usd.toFixed(4)})`);
        else bad(`${name}: unexpected response ${JSON.stringify(res.data)}`);
      } catch (e) {
        bad(`${name}: ${(e as Error).message}`);
      }
    }
    try {
      const res = await streamTurn({
        home,
        command: "doctor",
        role: "tutor",
        system: [{ type: "text", text: "You are a connectivity check." }],
        messages: [{ role: "user", content: "Reply with the single word: ready" }],
        tools: WEB_TOOLS,
        onText: () => {},
      });
      ok(`tutor: streaming + web tools from ${role("tutor").model} replied "${res.text.trim().slice(0, 40)}" ($${res.usd.toFixed(4)})`);
    } catch (e) {
      bad(`tutor: ${(e as Error).message}`);
    }
  } else {
    io.print("\nRun with --live to make one tiny API call per model and confirm the request shapes work.");
  }

  io.print(failures ? `\n${failures} problem${failures === 1 ? "" : "s"}` : "\nAll good.");
  return failures ? 1 : 0;
}
