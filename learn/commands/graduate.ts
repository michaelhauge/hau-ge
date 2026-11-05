import fs from "node:fs";
import type { Args } from "../lib/args";
import { critiquesFor, currentCritique } from "../lib/critiques";
import { loadEngagements } from "../lib/engagements";
import { today } from "../lib/env";
import { LearnError } from "../lib/errors";
import { getHome } from "../lib/home";
import { getIO } from "../lib/io";
import {
  PERTAMA_HEADING,
  noteSlugs,
  noteStatus,
  pertamaSection,
  readNote,
  setFrontmatterField,
  validateNote,
  wordCount,
} from "../lib/notes";

export function minPertamaWords(): number {
  const n = Number(process.env.LEARN_MIN_PERTAMA_WORDS ?? 60);
  return Number.isFinite(n) && n >= 0 ? n : 60;
}

/**
 * The graduation gate: valid note, a real Pertama section, and a Critic pass on
 * exactly this text. The Critic's verdict informs; it never blocks.
 */
export async function run(args: Args): Promise<number> {
  const io = getIO();
  const home = getHome();
  const slug = args.positional[0];
  if (!slug) throw new LearnError("Usage: learn graduate <slug>");
  const note = readNote(home, slug);

  if (noteStatus(note) === "graduated") {
    io.print(`"${slug}" is already graduated.`);
    return 0;
  }

  const ctx = {
    engagementSlugs: new Set(loadEngagements(home).engagements.map((e) => e.slug)),
    noteSlugs: noteSlugs(home),
  };
  const { errors } = validateNote(note, ctx);
  const problems = [...errors];

  const section = pertamaSection(note.body);
  const floor = minPertamaWords();
  if (section === null) problems.push(`there's no "## ${PERTAMA_HEADING}" section`);
  else if (wordCount(section) < floor) {
    problems.push(`the Pertama section has ${wordCount(section)} words; it needs at least ${floor}`);
  }

  const critique = currentCritique(home, note);
  if (!critique) {
    problems.push(
      critiquesFor(home, slug).length
        ? `the note changed since the last Critic pass: run \`npm run learn -- critic ${slug}\` on this version`
        : `the Critic hasn't seen it yet: run \`npm run learn -- critic ${slug}\``,
    );
  }

  if (problems.length) {
    io.print(`Can't graduate "${slug}" yet:`);
    for (const p of problems) io.print(`  - ${p}`);
    return 1;
  }

  let raw = setFrontmatterField(note.raw, "status", "graduated");
  raw = setFrontmatterField(raw, "graduated", today());
  fs.writeFileSync(note.file, raw);

  io.print(`Graduated "${slug}".`);
  if (critique && critique.verdict !== "holds") {
    io.print(`(You overruled the Critic, whose verdict was "${critique.verdict}". That's your call.)`);
  }
  return 0;
}
