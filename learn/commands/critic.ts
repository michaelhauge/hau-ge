import fs from "node:fs";
import path from "node:path";
import type { Args } from "../lib/args";
import { addCards } from "../lib/cards";
import { callJSON } from "../lib/claude";
import { critiqueDir, type Verdict } from "../lib/critiques";
import { engagementContext } from "../lib/engagements";
import { stamp } from "../lib/env";
import { prompt } from "../lib/prompts";
import { LearnError } from "../lib/errors";
import { getHome } from "../lib/home";
import { getIO } from "../lib/io";
import {
  PERTAMA_HEADING,
  bodyHash,
  noteEngagements,
  notePillar,
  noteTitle,
  pertamaSection,
  readNote,
  stripComments,
  wordCount,
} from "../lib/notes";

interface CriticOutput {
  verdict: Verdict;
  critique: string;
  gaps: string[];
  misconceptions: Array<{ claim: string; question: string; answer: string }>;
}

const SCHEMA = {
  type: "object",
  additionalProperties: false,
  required: ["verdict", "critique", "gaps", "misconceptions"],
  properties: {
    verdict: { type: "string", enum: ["holds", "shallow", "wrong"] },
    critique: { type: "string" },
    gaps: { type: "array", items: { type: "string" } },
    misconceptions: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["claim", "question", "answer"],
        properties: { claim: { type: "string" }, question: { type: "string" }, answer: { type: "string" } },
      },
    },
  },
};

export async function run(args: Args): Promise<number> {
  const io = getIO();
  const home = getHome();
  const slug = args.positional[0];
  if (!slug) throw new LearnError("Usage: learn critic <slug>");
  const note = readNote(home, slug);

  const section = pertamaSection(note.body);
  if (section === null) throw new LearnError(`Add a "## ${PERTAMA_HEADING}" section first: that's what the Critic reads.`);
  if (wordCount(section) === 0) throw new LearnError(`The "${PERTAMA_HEADING}" section is empty. Write it, then ask the Critic.`);

  const context = engagementContext(home, noteEngagements(note));
  const user = [
    context ? `<engagement_context>\n${context}\n</engagement_context>` : "",
    `<note slug="${note.slug}" title=${JSON.stringify(noteTitle(note))} pillar="${notePillar(note)}">\n${stripComments(note.body).trim()}\n</note>`,
    `Pressure-test the "${PERTAMA_HEADING}" section.`,
  ]
    .filter(Boolean)
    .join("\n\n");

  io.print(`The Critic is reading "${noteTitle(note)}"…`);
  const { data, usd, model } = await callJSON<CriticOutput>({
    home,
    command: "critic",
    role: "critic",
    system: prompt("critic"),
    user,
    schema: SCHEMA,
  });

  const created = new Date();
  const dir = critiqueDir(home, slug);
  fs.mkdirSync(dir, { recursive: true });
  const file = path.join(dir, `${stamp(created)}.md`);
  const misconceptions = data.misconceptions ?? [];
  const gaps = data.gaps ?? [];
  fs.writeFileSync(
    file,
    [
      "---",
      `note_hash: "${bodyHash(note.body)}"`,
      `model: "${model}"`,
      `verdict: "${data.verdict}"`,
      `cost_usd: ${usd.toFixed(4)}`,
      `created: "${created.toISOString()}"`,
      "---",
      "",
      "## Critique",
      "",
      data.critique.trim(),
      "",
      "## Gaps",
      "",
      ...(gaps.length ? gaps.map((g) => `- ${g}`) : ["(none)"]),
      "",
      "## Misconceptions",
      "",
      ...(misconceptions.length
        ? misconceptions.flatMap((m) => [`- **Claim:** ${m.claim}`, `  - Q: ${m.question}`, `  - A: ${m.answer}`])
        : ["(none)"]),
      "",
    ].join("\n"),
  );

  const added = addCards(
    home,
    slug,
    misconceptions.map((m) => ({ question: m.question, answer: m.answer, source: "critic" as const })),
    created,
  );

  io.print("");
  io.print(`Verdict: ${data.verdict.toUpperCase()}`);
  io.print("");
  io.print(data.critique.trim());
  if (gaps.length) {
    io.print("");
    io.print("Gaps:");
    for (const g of gaps) io.print(`  - ${g}`);
  }
  io.print("");
  io.print(`${added} review card${added === 1 ? "" : "s"} added · $${usd.toFixed(3)} · saved ${path.relative(home.root, file)}`);
  io.print(
    data.verdict === "holds"
      ? `Next: npm run learn -- graduate ${slug}`
      : `Revise and run the Critic again, or graduate anyway if you disagree: npm run learn -- graduate ${slug}`,
  );
  return 0;
}
