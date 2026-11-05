import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { REPO_ROOT } from "../lib/env";
import { getHome, isGitRepo } from "../lib/home";
import { getIO } from "../lib/io";

export const TEMPLATE_DIR = path.join(REPO_ROOT, "learn", "template");

const FILES: Array<{ from: string; to: string; mode?: number }> = [
  { from: "README.md", to: "README.md" },
  { from: "engagements.md", to: "engagements.md" },
  { from: "feeds.md", to: "feeds.md" },
  { from: "gitignore", to: ".gitignore" },
  { from: "digest.yml", to: ".github/workflows/digest.yml" },
  { from: "pre-commit", to: ".githooks/pre-commit", mode: 0o755 },
];

/** Sets up LEARN_HOME's layout and starter files. Idempotent: never overwrites. */
export async function run(): Promise<number> {
  const io = getIO();
  const home = getHome({ initialized: false });

  for (const dir of [home.notes, home.critiques, home.cards, home.sessions, home.frontier]) {
    fs.mkdirSync(dir, { recursive: true });
    const keep = path.join(dir, ".gitkeep");
    if (fs.readdirSync(dir).length === 0) fs.writeFileSync(keep, "");
  }

  for (const f of FILES) {
    const dest = path.join(home.root, f.to);
    if (fs.existsSync(dest)) {
      io.print(`  kept     ${f.to}`);
      continue;
    }
    const text = fs.readFileSync(path.join(TEMPLATE_DIR, f.from), "utf8").replaceAll("{{HAU_GE_DIR}}", REPO_ROOT);
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.writeFileSync(dest, text, f.mode ? { mode: f.mode } : undefined);
    io.print(`  created  ${f.to}`);
  }

  if (isGitRepo(home.root)) {
    const r = spawnSync("git", ["config", "core.hooksPath", ".githooks"], { cwd: home.root });
    io.print(r.status === 0 ? "  hooks    pre-commit runs `learn check`" : "  hooks    couldn't set core.hooksPath (set it by hand)");
  } else {
    io.print(`\nwarning: ${home.root} isn't a git repository.`);
    io.print("git init it and push to a PRIVATE remote: that's the backup, and the digest Action needs it.");
  }

  io.print(`\nReady: ${home.root}`);
  io.print("Next: fill in private context in engagements.md, then `npm run learn -- new <slug> --pillar agents`.");
  return 0;
}
