import fs from "node:fs";
import path from "node:path";
import { LearnError } from "./errors";

/** Paths inside the private learning repo (LEARN_HOME). */
export interface Home {
  root: string;
  notes: string;
  critiques: string;
  cards: string;
  sessions: string;
  frontier: string;
  engagementsFile: string;
  feedsFile: string;
}

export function homeAt(root: string): Home {
  return {
    root,
    notes: path.join(root, "notes"),
    critiques: path.join(root, "critiques"),
    cards: path.join(root, "cards"),
    sessions: path.join(root, "sessions"),
    frontier: path.join(root, "frontier"),
    engagementsFile: path.join(root, "engagements.md"),
    feedsFile: path.join(root, "feeds.md"),
  };
}

/**
 * Resolve LEARN_HOME. With `initialized` (the default) the layout must
 * already exist, so every command except `init` fails fast with a fix.
 */
export function getHome({ initialized = true } = {}): Home {
  const raw = process.env.LEARN_HOME;
  if (!raw) {
    throw new LearnError(
      "LEARN_HOME is not set. Add LEARN_HOME=/absolute/path/to/hau-ge-learn to hau-ge/.env.local.",
    );
  }
  if (!path.isAbsolute(raw)) {
    throw new LearnError(`LEARN_HOME must be an absolute path (got "${raw}").`);
  }
  if (!fs.existsSync(raw) || !fs.statSync(raw).isDirectory()) {
    throw new LearnError(`LEARN_HOME points at "${raw}", which is not a directory.`);
  }
  const home = homeAt(raw);
  if (initialized && !fs.existsSync(home.notes)) {
    throw new LearnError(`${raw} isn't set up yet. Run: npm run learn -- init`);
  }
  return home;
}

export function isGitRepo(dir: string): boolean {
  return fs.existsSync(path.join(dir, ".git"));
}
