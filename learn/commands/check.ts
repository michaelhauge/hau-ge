import fs from "node:fs";
import path from "node:path";
import { loadCards } from "../lib/cards";
import { loadEngagements } from "../lib/engagements";
import { getHome } from "../lib/home";
import { getIO } from "../lib/io";
import { listNotes, noteSlugs, validateNote } from "../lib/notes";

/** Validates every note, engagements.md and the card files. Non-zero exit on any error. */
export async function run(): Promise<number> {
  const io = getIO();
  const home = getHome();
  const { engagements, errors: engagementErrors } = loadEngagements(home);
  const ctx = { engagementSlugs: new Set(engagements.map((e) => e.slug)), noteSlugs: noteSlugs(home) };

  let errorCount = engagementErrors.length;
  for (const e of engagementErrors) io.print(`✗ ${e}`);

  const notes = listNotes(home);
  for (const note of notes) {
    const v = validateNote(note, ctx);
    for (const e of v.errors) io.print(`✗ ${note.slug}: ${e}`);
    for (const w of v.warnings) io.print(`· ${note.slug}: ${w}`);
    errorCount += v.errors.length;
  }

  if (fs.existsSync(home.cards)) {
    for (const f of fs.readdirSync(home.cards).filter((x) => x.endsWith(".json"))) {
      const slug = f.slice(0, -5);
      try {
        loadCards(home, slug);
        if (!ctx.noteSlugs.has(slug)) io.print(`· cards/${f}: no matching note`);
      } catch (e) {
        io.print(`✗ ${path.join("cards", f)}: ${(e as Error).message}`);
        errorCount++;
      }
    }
  }

  io.print(
    errorCount === 0
      ? `✓ ${notes.length} note${notes.length === 1 ? "" : "s"} OK`
      : `${errorCount} error${errorCount === 1 ? "" : "s"} in ${notes.length} notes`,
  );
  return errorCount === 0 ? 0 : 1;
}
