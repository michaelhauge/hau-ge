import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { createEmptyCard, fsrs, type Card, type Grade } from "ts-fsrs";
import type { Home } from "./home";
import { LearnError } from "./errors";

export type CardSource = "critic" | "tutor" | "quiz" | "manual";

/** FSRS state as stored on disk (dates as ISO strings). */
export type StoredFsrs = Omit<Card, "due" | "last_review"> & { due: string; last_review?: string };

export interface StoredCard {
  id: string;
  question: string;
  answer: string;
  source: CardSource;
  created: string;
  /** Absent until the first review. */
  fsrs?: StoredFsrs;
}

export interface NewCard {
  question: string;
  answer: string;
  source: CardSource;
}

export function cardsFile(home: Home, slug: string): string {
  return path.join(home.cards, `${slug}.json`);
}

export function loadCards(home: Home, slug: string): StoredCard[] {
  const file = cardsFile(home, slug);
  if (!fs.existsSync(file)) return [];
  try {
    const parsed = JSON.parse(fs.readFileSync(file, "utf8"));
    if (!Array.isArray(parsed)) throw new Error("not an array");
    return parsed as StoredCard[];
  } catch (e) {
    throw new LearnError(`${file} isn't valid card JSON: ${(e as Error).message}`);
  }
}

export function saveCards(home: Home, slug: string, cards: StoredCard[]): void {
  fs.mkdirSync(home.cards, { recursive: true });
  fs.writeFileSync(cardsFile(home, slug), JSON.stringify(cards, null, 2) + "\n");
}

const norm = (q: string) => q.toLowerCase().replace(/\s+/g, " ").trim();

/** Appends new cards, skipping blanks and questions already on the note. Returns how many were added. */
export function addCards(home: Home, slug: string, incoming: NewCard[], now = new Date()): number {
  const cards = loadCards(home, slug);
  const seen = new Set(cards.map((c) => norm(c.question)));
  let added = 0;
  for (const c of incoming) {
    const q = c.question.trim();
    const a = c.answer.trim();
    if (!q || !a || seen.has(norm(q))) continue;
    seen.add(norm(q));
    cards.push({ id: crypto.randomUUID().slice(0, 8), question: q, answer: a, source: c.source, created: now.toISOString() });
    added++;
  }
  if (added) saveCards(home, slug, cards);
  return added;
}

export interface CardRef {
  slug: string;
  card: StoredCard;
}

export function allCards(home: Home): CardRef[] {
  if (!fs.existsSync(home.cards)) return [];
  return fs
    .readdirSync(home.cards)
    .filter((f) => f.endsWith(".json"))
    .sort()
    .flatMap((f) => {
      const slug = f.slice(0, -5);
      return loadCards(home, slug).map((card) => ({ slug, card }));
    });
}

export function isDue(card: StoredCard, now = new Date()): boolean {
  return !card.fsrs || new Date(card.fsrs.due).getTime() <= now.getTime();
}

function toCard(s: StoredFsrs): Card {
  return { ...s, due: new Date(s.due), last_review: s.last_review ? new Date(s.last_review) : undefined } as Card;
}

function fromCard(c: Card): StoredFsrs {
  const { due, last_review, ...rest } = c;
  return { ...rest, due: due.toISOString(), ...(last_review ? { last_review: new Date(last_review).toISOString() } : {}) };
}

const scheduler = fsrs();

/** Pure: the card after one review at `now` with the given grade. */
export function gradeCard(card: StoredCard, grade: Grade, now = new Date()): StoredCard {
  const current = card.fsrs ? toCard(card.fsrs) : createEmptyCard(now);
  const next = scheduler.next(current, now, grade).card;
  return { ...card, fsrs: fromCard(next) };
}
