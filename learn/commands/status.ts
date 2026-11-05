import { allCards, isDue } from "../lib/cards";
import { ceilingUsd, spendOn } from "../lib/cost";
import { critiquesFor, currentCritique } from "../lib/critiques";
import { today } from "../lib/env";
import { getHome } from "../lib/home";
import { getIO } from "../lib/io";
import { PILLARS, asDateString, listNotes, notePillar, noteStatus } from "../lib/notes";

/** Platform-phase gate from the plan (§7). */
export const GATE_GRADUATED = 30;
export const GATE_NOTES_PER_WEEK = 2;

/** Counts and next actions. Deliberately no streaks or scores (plan, Appendix B). */
export async function run(): Promise<number> {
  const io = getIO();
  const home = getHome();
  const notes = listNotes(home);

  const rows = new Map<string, { draft: number; graduated: number }>();
  for (const p of PILLARS) rows.set(p, { draft: 0, graduated: 0 });
  for (const n of notes) {
    const p = notePillar(n);
    if (!rows.has(p)) rows.set(p, { draft: 0, graduated: 0 });
    rows.get(p)![noteStatus(n)]++;
  }

  io.print("Notes            draft  graduated");
  for (const [p, r] of rows) io.print(`  ${p.padEnd(14)} ${String(r.draft).padStart(5)}  ${String(r.graduated).padStart(9)}`);

  const neverCritiqued: string[] = [];
  const changedSince: string[] = [];
  const editedAfterGraduating: string[] = [];
  for (const n of notes) {
    if (currentCritique(home, n)) continue;
    const hasAny = critiquesFor(home, n.slug).length > 0;
    if (noteStatus(n) === "graduated") editedAfterGraduating.push(n.slug);
    else if (hasAny) changedSince.push(n.slug);
    else neverCritiqued.push(n.slug);
  }
  io.print("");
  if (neverCritiqued.length) io.print(`Awaiting a first Critic pass: ${neverCritiqued.join(", ")}`);
  if (changedSince.length) io.print(`Changed since their last Critic pass: ${changedSince.join(", ")}`);
  if (editedAfterGraduating.length) io.print(`Graduated, then edited: ${editedAfterGraduating.join(", ")}`);
  if (!neverCritiqued.length && !changedSince.length && !editedAfterGraduating.length) {
    io.print("Every note's current text has had a Critic pass.");
  }

  const now = new Date();
  const cards = allCards(home);
  const due = cards.filter((c) => isDue(c.card, now)).length;
  io.print(`Review cards: ${cards.length} total, ${due} due now`);

  io.print(`Spend today: $${spendOn(home, today(now)).toFixed(2)} of $${ceilingUsd().toFixed(2)}`);

  const graduated = notes.filter((n) => noteStatus(n) === "graduated").length;
  const sixWeeksAgo = new Date(now.getTime() - 42 * 86_400_000).toISOString().slice(0, 10);
  const recent = notes.filter((n) => (asDateString(n.data.created) ?? "") >= sixWeeksAgo).length;
  io.print(
    `Platform gate: ${graduated}/${GATE_GRADUATED} graduated · ${recent} notes in the last 6 weeks (${(recent / 6).toFixed(1)}/week; the plan wants ≥${GATE_NOTES_PER_WEEK})`,
  );
  return 0;
}
