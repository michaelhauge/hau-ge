import { parseArgs, type Args } from "./lib/args";
import { loadEnv } from "./lib/env";
import { LearnError } from "./lib/errors";
import { getIO } from "./lib/io";

type Command = { usage: string; summary: string; load: () => Promise<{ run: (args: Args) => Promise<number> }> };

const COMMANDS: Record<string, Command> = {
  init: { usage: "init", summary: "set up LEARN_HOME's folders and starter files", load: () => import("./commands/init") },
  new: { usage: "new <slug> --pillar <p> [--topic t] [--title t]", summary: "start a note from the template", load: () => import("./commands/new") },
  check: { usage: "check", summary: "validate notes, engagements and cards", load: () => import("./commands/check") },
  critic: { usage: "critic <slug>", summary: "the CFO pressure-tests the Pertama section", load: () => import("./commands/critic") },
  graduate: { usage: "graduate <slug>", summary: "mark a note done (needs a Critic pass on this text)", load: () => import("./commands/graduate") },
  status: { usage: "status", summary: "counts, what needs a Critic pass, spend, platform gate", load: () => import("./commands/status") },
  tutor: { usage: "tutor <slug> [--no-web]", summary: "Socratic session; your fumbles become cards", load: () => import("./commands/tutor") },
  quiz: { usage: "quiz <slug>", summary: "propose five cards; you accept, edit or reject", load: () => import("./commands/quiz") },
  review: { usage: "review [--limit n]", summary: "spaced-repetition review of due cards", load: () => import("./commands/review") },
  promote: { usage: "promote <slug>", summary: "copy a graduated note into /writing as a draft", load: () => import("./commands/promote") },
  digest: { usage: "digest [--hours n]", summary: "today's frontier digest from feeds.md", load: () => import("./commands/digest") },
  mcp: { usage: "mcp [--print-config]", summary: "serve notes to Claude Code / Claude desktop over MCP", load: () => import("./commands/mcp") },
  doctor: { usage: "doctor [--live]", summary: "check setup; --live proves each model call works", load: () => import("./commands/doctor") },
};

function help(): string {
  const width = Math.max(...Object.values(COMMANDS).map((c) => c.usage.length));
  return [
    "Usage: npm run learn -- <command>",
    "",
    ...Object.values(COMMANDS).map((c) => `  ${c.usage.padEnd(width)}  ${c.summary}`),
    "",
    "Settings come from hau-ge/.env.local: LEARN_HOME, ANTHROPIC_API_KEY, LEARN_DAILY_COST_CEILING_USD.",
  ].join("\n");
}

async function main(): Promise<number> {
  loadEnv();
  const [name, ...rest] = process.argv.slice(2);
  if (!name || name === "help" || name === "--help" || name === "-h") {
    getIO().print(help());
    return name ? 0 : 1;
  }
  const cmd = COMMANDS[name];
  if (!cmd) {
    getIO().print(`Unknown command "${name}".\n\n${help()}`);
    return 1;
  }
  const mod = await cmd.load();
  return mod.run(parseArgs(rest));
}

main()
  .then((code) => {
    getIO().close();
    process.exitCode = code;
  })
  .catch((e: unknown) => {
    getIO().close();
    if (e instanceof LearnError) {
      process.stderr.write(`${e.message}\n`);
    } else {
      process.stderr.write(`${e instanceof Error ? (e.stack ?? e.message) : String(e)}\n`);
    }
    process.exitCode = 1;
  });
