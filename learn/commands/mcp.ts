import path from "node:path";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import type { Args } from "../lib/args";
import { allCards, isDue } from "../lib/cards";
import { critiquesFor } from "../lib/critiques";
import { loadEngagements } from "../lib/engagements";
import { REPO_ROOT } from "../lib/env";
import { getHome, type Home } from "../lib/home";
import { getIO } from "../lib/io";
import {
  PILLARS,
  listNotes,
  noteEngagements,
  notePillar,
  noteStatus,
  noteTitle,
  pertamaSection,
  readNote,
  stripComments,
  type Note,
} from "../lib/notes";

const text = (t: string) => ({ content: [{ type: "text" as const, text: t }] });
const json = (v: unknown) => text(JSON.stringify(v, null, 2));

function summary(n: Note) {
  return { slug: n.slug, title: noteTitle(n), pillar: notePillar(n), status: noteStatus(n), engagements: noteEngagements(n) };
}

/** Plain term-frequency search over title, body and the Pertama section (title weighted up). */
export function searchNotes(notes: Note[], query: string, limit: number) {
  const terms = query.toLowerCase().split(/\W+/).filter((t) => t.length > 1);
  if (!terms.length) return [];
  return notes
    .map((n) => {
      const title = noteTitle(n).toLowerCase();
      const body = stripComments(n.body).toLowerCase();
      let score = 0;
      for (const t of terms) {
        score += 3 * (title.split(t).length - 1);
        score += body.split(t).length - 1;
      }
      const at = body.indexOf(terms.find((t) => body.includes(t)) ?? "\u0000");
      const snippet = at >= 0 ? stripComments(n.body).slice(Math.max(0, at - 120), at + 200).replace(/\s+/g, " ").trim() : "";
      return { ...summary(n), score, snippet };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

/** Read-only MCP server over LEARN_HOME, for Claude Code and Claude desktop. */
export function createServer(home: Home): McpServer {
  const server = new McpServer({ name: "learn-notes", version: "1.0.0" });
  const pillar = z.enum(PILLARS).optional().describe("Filter by pillar");
  const status = z.enum(["draft", "graduated"]).optional().describe("Filter by status");

  server.registerTool(
    "search_notes",
    {
      description: "Search Michael's AI learning notes by keywords. Returns matching notes with a snippet.",
      inputSchema: { query: z.string().describe("Keywords"), pillar, status, limit: z.number().int().min(1).max(50).optional() },
      annotations: { readOnlyHint: true },
    },
    async ({ query, pillar: p, status: s, limit }) => {
      const notes = listNotes(home).filter((n) => (!p || notePillar(n) === p) && (!s || noteStatus(n) === s));
      return json(searchNotes(notes, query, limit ?? 10));
    },
  );

  server.registerTool(
    "list_notes",
    {
      description: "List notes (slug, title, pillar, status, linked engagements).",
      inputSchema: { pillar, status },
      annotations: { readOnlyHint: true },
    },
    async ({ pillar: p, status: s }) =>
      json(listNotes(home).filter((n) => (!p || notePillar(n) === p) && (!s || noteStatus(n) === s)).map(summary)),
  );

  server.registerTool(
    "read_note",
    {
      description: "Read one note in full, with its Pertama section and the most recent Critic pass.",
      inputSchema: { slug: z.string() },
      annotations: { readOnlyHint: true },
    },
    async ({ slug }) => {
      const note = readNote(home, slug);
      const critiques = critiquesFor(home, slug);
      const last = critiques[critiques.length - 1];
      return json({
        ...summary(note),
        frontmatter: note.data,
        body: stripComments(note.body).trim(),
        pertama: pertamaSection(note.body),
        critic_passes: critiques.length,
        latest_critique: last ? { verdict: last.verdict, created: last.created, text: last.body } : null,
      });
    },
  );

  server.registerTool(
    "list_engagements",
    {
      description: "Pertama engagements, including Michael's private context on each.",
      inputSchema: {},
      annotations: { readOnlyHint: true },
    },
    async () => json(loadEngagements(home).engagements),
  );

  server.registerTool(
    "list_cards",
    {
      description: "Review cards (question/answer), optionally for one note or only those due now.",
      inputSchema: { slug: z.string().optional(), due_only: z.boolean().optional() },
      annotations: { readOnlyHint: true },
    },
    async ({ slug, due_only }) => {
      const now = new Date();
      return json(
        allCards(home)
          .filter((c) => (!slug || c.slug === slug) && (!due_only || isDue(c.card, now)))
          .map((c) => ({ note: c.slug, question: c.card.question, answer: c.card.answer, source: c.card.source, due: c.card.fsrs?.due ?? "new" })),
      );
    },
  );

  return server;
}

export async function run(args: Args): Promise<number> {
  const home = getHome();
  if (args.flags["print-config"]) {
    const config = {
      mcpServers: {
        "learn-notes": {
          command: path.join(REPO_ROOT, "node_modules", ".bin", "tsx"),
          args: [path.join(REPO_ROOT, "learn", "cli.ts"), "mcp"],
          env: { LEARN_HOME: home.root },
        },
      },
    };
    const io = getIO();
    io.print("Claude desktop: merge this into claude_desktop_config.json\n");
    io.print(JSON.stringify(config, null, 2));
    io.print("\nClaude Code:\n");
    const c = config.mcpServers["learn-notes"];
    io.print(`claude mcp add --scope user learn-notes --env LEARN_HOME=${home.root} -- ${c.command} ${c.args.join(" ")}`);
    return 0;
  }
  // stdout belongs to the MCP protocol from here on; never print to it.
  await createServer(home).connect(new StdioServerTransport());
  return new Promise<number>(() => {});
}
