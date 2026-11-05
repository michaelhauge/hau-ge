import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { Home } from "./home";
import { bodyHash, type Note } from "./notes";

export type Verdict = "holds" | "shallow" | "wrong";

export interface CritiqueRecord {
  file: string;
  noteHash: string;
  verdict: Verdict | string;
  model: string;
  created: string;
  body: string;
}

export function critiqueDir(home: Home, slug: string): string {
  return path.join(home.critiques, slug);
}

/** All Critic passes for a note, oldest first (filenames are timestamps). */
export function critiquesFor(home: Home, slug: string): CritiqueRecord[] {
  const dir = critiqueDir(home, slug);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .sort()
    .map((f) => {
      const file = path.join(dir, f);
      const { data, content } = matter(fs.readFileSync(file, "utf8"), {});
      return {
        file,
        noteHash: String(data.note_hash ?? ""),
        verdict: String(data.verdict ?? ""),
        model: String(data.model ?? ""),
        created: String(data.created ?? ""),
        body: content.trim(),
      };
    });
}

/** The most recent critique of exactly the note's current body, if any. */
export function currentCritique(home: Home, note: Note): CritiqueRecord | null {
  const hash = bodyHash(note.body);
  const matching = critiquesFor(home, note.slug).filter((c) => c.noteHash === hash);
  return matching.length ? matching[matching.length - 1] : null;
}
