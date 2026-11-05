import fs from "node:fs";
import path from "node:path";
import { REPO_ROOT } from "./env";

export type PromptName = "critic" | "tutor" | "extract" | "quiz" | "digest";

/** System prompts live in learn/prompts/*.md (public: persona and behaviour, never client detail). */
export function prompt(name: PromptName): string {
  return fs.readFileSync(path.join(REPO_ROOT, "learn", "prompts", `${name}.md`), "utf8");
}
