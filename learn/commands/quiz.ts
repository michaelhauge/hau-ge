import type { Args } from "../lib/args";
import { addCards, type NewCard } from "../lib/cards";
import { callJSON } from "../lib/claude";
import { LearnError } from "../lib/errors";
import { getHome } from "../lib/home";
import { getIO } from "../lib/io";
import { noteTitle, readNote, stripComments } from "../lib/notes";
import { prompt } from "../lib/prompts";

const SCHEMA = {
  type: "object",
  additionalProperties: false,
  required: ["cards"],
  properties: {
    cards: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["question", "answer"],
        properties: { question: { type: "string" }, answer: { type: "string" } },
      },
    },
  },
};

/** Claude proposes five cards; nothing is saved until you accept or edit each one. */
export async function run(args: Args): Promise<number> {
  const io = getIO();
  const home = getHome();
  const slug = args.positional[0];
  if (!slug) throw new LearnError("Usage: learn quiz <slug>");
  const note = readNote(home, slug);

  const { data, usd } = await callJSON<{ cards: Array<{ question: string; answer: string }> }>({
    home,
    command: "quiz",
    role: "cheap",
    system: prompt("quiz"),
    user: `<note slug="${slug}" title=${JSON.stringify(noteTitle(note))}>\n${stripComments(note.body).trim()}\n</note>`,
    schema: SCHEMA,
  });
  const proposed = (data.cards ?? []).slice(0, 5);
  if (!proposed.length) {
    io.print("No cards proposed.");
    return 0;
  }

  const accepted: NewCard[] = [];
  for (const [i, c] of proposed.entries()) {
    io.print(`\n${i + 1}/${proposed.length}  Q: ${c.question}`);
    io.print(`      A: ${c.answer}`);
    let choice: string | null = "";
    while (choice !== null && !/^[aerq]$/i.test(choice.trim())) choice = await io.ask("[a]ccept  [e]dit  [r]eject  [q]uit > ");
    if (choice === null || /^q$/i.test(choice.trim())) break;
    if (/^r$/i.test(choice.trim())) continue;
    let { question, answer } = c;
    if (/^e$/i.test(choice.trim())) {
      question = (await io.ask("Question (enter keeps it): "))?.trim() || question;
      answer = (await io.ask("Answer (enter keeps it): "))?.trim() || answer;
    }
    accepted.push({ question, answer, source: "quiz" });
  }

  const added = addCards(home, slug, accepted);
  io.print(`\n${added} card${added === 1 ? "" : "s"} added · $${usd.toFixed(4)}`);
  return 0;
}
