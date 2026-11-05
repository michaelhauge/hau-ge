import { Rating, type Grade } from "ts-fsrs";
import type { Args } from "../lib/args";
import { allCards, gradeCard, isDue, loadCards, saveCards, type CardRef } from "../lib/cards";
import { getHome } from "../lib/home";
import { getIO } from "../lib/io";

const GRADES: Record<string, Grade> = { "1": Rating.Again, "2": Rating.Hard, "3": Rating.Good, "4": Rating.Easy };

/** Due cards first by how overdue they are, then new cards (oldest first). */
export function reviewQueue(cards: CardRef[], now: Date, limit: number): CardRef[] {
  const due = cards.filter((c) => isDue(c.card, now));
  const reviews = due.filter((c) => c.card.fsrs).sort((a, b) => a.card.fsrs!.due.localeCompare(b.card.fsrs!.due));
  const fresh = due.filter((c) => !c.card.fsrs).sort((a, b) => a.card.created.localeCompare(b.card.created));
  return [...reviews, ...fresh].slice(0, limit);
}

export async function run(args: Args): Promise<number> {
  const io = getIO();
  const home = getHome();
  const limit = Number(args.flags.limit ?? 50) || 50;
  const queue = reviewQueue(allCards(home), new Date(), limit);
  if (!queue.length) {
    io.print("Nothing due. Come back tomorrow.");
    return 0;
  }

  io.print(`${queue.length} card${queue.length === 1 ? "" : "s"} due. Enter shows the answer; grade 1-4; q quits.\n`);
  let reviewed = 0;
  for (const ref of queue) {
    io.print(`[${ref.slug}]  ${ref.card.question}`);
    const reveal = await io.ask("  (enter) ");
    if (reveal === null || reveal.trim().toLowerCase() === "q") break;
    io.print(`  → ${ref.card.answer}`);
    let g: string | null = "";
    while (g !== null && !(g.trim() in GRADES) && g.trim().toLowerCase() !== "q") {
      g = await io.ask("  1 again · 2 hard · 3 good · 4 easy > ");
    }
    if (g === null || g.trim().toLowerCase() === "q") break;

    const graded = gradeCard(ref.card, GRADES[g.trim()], new Date());
    const cards = loadCards(home, ref.slug).map((c) => (c.id === graded.id ? graded : c));
    saveCards(home, ref.slug, cards);
    reviewed++;
    io.print("");
  }

  const endOfTomorrow = new Date();
  endOfTomorrow.setDate(endOfTomorrow.getDate() + 1);
  endOfTomorrow.setHours(23, 59, 59, 999);
  const tomorrow = allCards(home).filter((c) => isDue(c.card, endOfTomorrow)).length;
  io.print(`Reviewed ${reviewed}. Due by end of tomorrow: ${tomorrow}.`);
  return 0;
}
