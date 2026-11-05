import type Anthropic from "@anthropic-ai/sdk";
import fs from "node:fs";
import path from "node:path";
import type { Args } from "../lib/args";
import { addCards } from "../lib/cards";
import { callJSON, streamTurn } from "../lib/claude";
import { engagementContext } from "../lib/engagements";
import { stamp } from "../lib/env";
import { LearnError } from "../lib/errors";
import { getHome, type Home } from "../lib/home";
import { getIO } from "../lib/io";
import { role } from "../lib/models";
import { noteEngagements, noteLinks, noteSlugs, noteTitle, readNote, stripComments, type Note } from "../lib/notes";
import { prompt } from "../lib/prompts";

/** Server-side tools: Anthropic runs them, so there's no MCP server or search API key to maintain. */
export const WEB_TOOLS: Anthropic.ToolUnion[] = [
  { type: "web_search_20260318", name: "web_search", max_uses: 5 },
  { type: "web_fetch_20260318", name: "web_fetch", max_uses: 5 },
];

const EXTRACT_SCHEMA = {
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

function noteBlock(note: Note, tag = "note"): string {
  return `<${tag} slug="${note.slug}" title=${JSON.stringify(noteTitle(note))}>\n${stripComments(note.body).trim()}\n</${tag}>`;
}

/** The stable context for a session: the note, the notes it links to, and its engagements. */
export function sessionContext(home: Home, note: Note): string {
  const existing = noteSlugs(home);
  const linked = noteLinks(note)
    .filter((s) => existing.has(s))
    .map((s) => noteBlock(readNote(home, s), "linked_note"));
  const engagements = engagementContext(home, noteEngagements(note));
  return [
    noteBlock(note),
    ...linked,
    engagements ? `<engagement_context>\n${engagements}\n</engagement_context>` : "",
  ]
    .filter(Boolean)
    .join("\n\n");
}

export async function run(args: Args): Promise<number> {
  const io = getIO();
  const home = getHome();
  const slug = args.positional[0];
  if (!slug) throw new LearnError("Usage: learn tutor <slug> [--no-web]");
  const note = readNote(home, slug);
  const tools = args.flags.web === false ? [] : WEB_TOOLS;

  const system: Anthropic.TextBlockParam[] = [
    { type: "text", text: prompt("tutor") },
    { type: "text", text: sessionContext(home, note), cache_control: { type: "ephemeral" } },
  ];
  const messages: Anthropic.MessageParam[] = [
    { role: "user", content: "I've just written this note. Start the session with your first question." },
  ];
  const transcript: Array<{ who: "Tutor" | "Michael"; text: string }> = [];
  let usd = 0;

  io.print(`Tutor on "${noteTitle(note)}" (${role("tutor").model}). Type /done or press Ctrl-D to finish.\n`);
  for (;;) {
    io.write("tutor> ");
    const turn = await streamTurn({ home, command: "tutor", role: "tutor", system, messages, tools, onText: (t) => io.write(t) });
    io.print("\n");
    usd += turn.usd;
    messages.push(...turn.appended);
    transcript.push({ who: "Tutor", text: turn.text.trim() });

    let answer: string | null = "";
    while (answer !== null && !answer.trim()) answer = await io.ask("you> ");
    if (answer === null || /^\/(done|quit|exit)$/i.test(answer.trim())) break;
    messages.push({ role: "user", content: answer });
    transcript.push({ who: "Michael", text: answer.trim() });
    io.print("");
  }

  const spoke = transcript.some((t) => t.who === "Michael");
  let added = 0;
  if (spoke) {
    const text = transcript.map((t) => `${t.who}: ${t.text}`).join("\n\n");
    const { data, usd: extractUsd } = await callJSON<{ cards: Array<{ question: string; answer: string }> }>({
      home,
      command: "tutor-extract",
      role: "cheap",
      system: prompt("extract"),
      user: `<transcript>\n${text}\n</transcript>`,
      schema: EXTRACT_SCHEMA,
    });
    usd += extractUsd;
    added = addCards(home, slug, (data.cards ?? []).map((c) => ({ ...c, source: "tutor" as const })));
  }

  const dir = path.join(home.sessions, slug);
  fs.mkdirSync(dir, { recursive: true });
  const file = path.join(dir, `${stamp()}.md`);
  fs.writeFileSync(
    file,
    [
      "---",
      `note: "${slug}"`,
      `model: "${role("tutor").model}"`,
      `cost_usd: ${usd.toFixed(4)}`,
      `cards_added: ${added}`,
      "---",
      "",
      ...transcript.map((t) => `**${t.who}:** ${t.text}\n`),
    ].join("\n"),
  );

  io.print(
    `\nSession saved to ${path.relative(home.root, file)} · ${added} card${added === 1 ? "" : "s"} from what you fumbled · $${usd.toFixed(3)}`,
  );
  return 0;
}
