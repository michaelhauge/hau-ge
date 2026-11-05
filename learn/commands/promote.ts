import fs from "node:fs";
import path from "node:path";
import type { Args } from "../lib/args";
import { REPO_ROOT, today } from "../lib/env";
import { LearnError } from "../lib/errors";
import { getHome } from "../lib/home";
import { getIO } from "../lib/io";
import { noteStatus, noteTitle, readNote, setFrontmatterField, stripComments, withoutPertamaSection } from "../lib/notes";

export function writingDir(): string {
  return process.env.LEARN_WRITING_DIR || path.join(REPO_ROOT, "content", "writing");
}

/** The public /writing draft for a note: Pertama section, template comments and /learn frontmatter removed. */
export function writingDraft(title: string, body: string, date: string): string {
  return [
    "---",
    `title: ${JSON.stringify(title)}`,
    `date: "${date}"`,
    'excerpt: ""',
    "tags: []",
    "draft: true",
    "---",
    "",
    stripComments(withoutPertamaSection(body)).replace(/\n{3,}/g, "\n\n").trim(),
    "",
  ].join("\n");
}

/**
 * Copies a graduated note into hau-ge's /writing pipeline as a draft. Never
 * stages or commits: the draft becomes public only when you commit it.
 */
export async function run(args: Args): Promise<number> {
  const io = getIO();
  const home = getHome();
  const slug = args.positional[0];
  if (!slug) throw new LearnError("Usage: learn promote <slug>");
  const note = readNote(home, slug);
  if (noteStatus(note) !== "graduated") throw new LearnError(`Only graduated notes can be promoted. Run: npm run learn -- graduate ${slug}`);

  const target = path.join(writingDir(), `${slug}.md`);
  if (fs.existsSync(target)) throw new LearnError(`${target} already exists.`);

  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, writingDraft(noteTitle(note), note.body, today()));
  fs.writeFileSync(note.file, setFrontmatterField(note.raw, "promoted", today()));

  io.print(`Draft written: ${path.relative(process.cwd(), target) || target}`);
  io.print("The Pertama section was stripped. Read it for anything private before you commit: it's a public repo.");
  io.print(`Then: fill in excerpt and tags, remove draft: true, and run npm run publish-post -- ${slug}`);
  return 0;
}
