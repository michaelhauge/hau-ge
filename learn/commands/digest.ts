import fs from "node:fs";
import path from "node:path";
import Parser from "rss-parser";
import type { Args } from "../lib/args";
import { callJSON } from "../lib/claude";
import { today } from "../lib/env";
import { LearnError } from "../lib/errors";
import { getHome, type Home } from "../lib/home";
import { getIO } from "../lib/io";
import { listNotes, noteStatus, noteTitle, pertamaSection, stripComments } from "../lib/notes";
import { prompt } from "../lib/prompts";

export interface Feed {
  pillar: string;
  label: string;
  url: string;
}

export interface FeedItem {
  pillar: string;
  feed: string;
  title: string;
  link: string;
  date: string;
  snippet: string;
}

/** feeds.md: "## pillar" headings; list items with an http(s) URL; text before the URL is a label. */
export function parseFeeds(markdown: string): Feed[] {
  const feeds: Feed[] = [];
  let pillar = "general";
  for (const line of markdown.replace(/\r\n/g, "\n").split("\n")) {
    const h = line.match(/^##\s+(.+?)\s*$/);
    if (h) {
      pillar = h[1].toLowerCase();
      continue;
    }
    const item = line.match(/^\s*[-*]\s+(.*?)(https?:\/\/\S+)\s*$/);
    if (item) {
      const label = item[1].replace(/[\s—–:-]+$/, "").trim();
      feeds.push({ pillar, label: label || item[2], url: item[2] });
    }
  }
  return feeds;
}

type RawItem = { title?: string; link?: string; isoDate?: string; pubDate?: string; contentSnippet?: string; content?: string };
export type FeedFetcher = (url: string) => Promise<RawItem[]>;

const parser = new Parser({ timeout: 15000, headers: { "User-Agent": "hau-ge-learn-digest/1.0" } });
let fetcher: FeedFetcher = async (url) => (await parser.parseURL(url)).items as RawItem[];

export function setFeedFetcher(f: FeedFetcher): void {
  fetcher = f;
}

/** URLs already linked from earlier digests, so items never repeat across days. */
export function seenUrls(home: Home): Set<string> {
  const seen = new Set<string>();
  if (!fs.existsSync(home.frontier)) return seen;
  for (const f of fs.readdirSync(home.frontier).filter((x) => x.endsWith(".md"))) {
    const text = fs.readFileSync(path.join(home.frontier, f), "utf8");
    for (const m of text.matchAll(/\]\((https?:\/\/[^)\s]+)\)/g)) seen.add(m[1]);
  }
  return seen;
}

interface DigestOutput {
  summaries: Array<{ index: number; summary: string }>;
  thesis_checks: Array<{ index: number; note_slug: string; question: string }>;
}

const SCHEMA = {
  type: "object",
  additionalProperties: false,
  required: ["summaries", "thesis_checks"],
  properties: {
    summaries: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["index", "summary"],
        properties: { index: { type: "integer" }, summary: { type: "string" } },
      },
    },
    thesis_checks: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["index", "note_slug", "question"],
        properties: { index: { type: "integer" }, note_slug: { type: "string" }, question: { type: "string" } },
      },
    },
  },
};

const MAX_ITEMS = 40;
const md = (s: string) => s.replace(/\s+/g, " ").replace(/([[\]])/g, "\\$1").trim();

export async function run(args: Args): Promise<number> {
  const io = getIO();
  const home = getHome();
  if (!fs.existsSync(home.feedsFile)) throw new LearnError(`No feeds.md in ${home.root}. Run: npm run learn -- init`);
  const feeds = parseFeeds(fs.readFileSync(home.feedsFile, "utf8"));
  if (!feeds.length) throw new LearnError("feeds.md has no feed URLs.");

  const hours = Number(args.flags.hours ?? 48) || 48;
  const since = Date.now() - hours * 3_600_000;
  const seen = seenUrls(home);
  const failures: string[] = [];
  const items: FeedItem[] = [];

  const results = await Promise.allSettled(feeds.map((f) => fetcher(f.url)));
  results.forEach((r, i) => {
    const feed = feeds[i];
    if (r.status === "rejected") {
      failures.push(`${feed.label} (${feed.url}): ${(r.reason as Error)?.message ?? r.reason}`);
      return;
    }
    for (const it of r.value) {
      const link = it.link?.trim();
      const date = it.isoDate ?? (it.pubDate ? new Date(it.pubDate).toISOString() : "");
      if (!link || !date || Number.isNaN(Date.parse(date)) || Date.parse(date) < since || seen.has(link)) continue;
      seen.add(link);
      items.push({
        pillar: feed.pillar,
        feed: feed.label,
        title: (it.title ?? link).trim(),
        link,
        date,
        snippet: (it.contentSnippet ?? stripComments(it.content ?? "")).replace(/\s+/g, " ").slice(0, 600),
      });
    }
  });
  items.sort((a, b) => b.date.localeCompare(a.date));
  items.splice(MAX_ITEMS);

  for (const f of failures) io.print(`feed failed: ${f}`);
  if (!items.length) {
    io.print(`Nothing new in the last ${hours}h across ${feeds.length - failures.length} working feeds.`);
    return 0;
  }

  const graduated = listNotes(home)
    .filter((n) => noteStatus(n) === "graduated")
    .slice(-30)
    .map((n) => ({ slug: n.slug, title: noteTitle(n), thesis: stripComments(pertamaSection(n.body) ?? "").trim().slice(0, 1200) }));
  const slugs = new Set(graduated.map((g) => g.slug));

  const user = [
    "<items>",
    ...items.map((it, i) => `<item index="${i}" pillar="${it.pillar}" feed=${JSON.stringify(it.feed)}>\n${it.title}\n${it.snippet}\n</item>`),
    "</items>",
    graduated.length
      ? `<theses>\n${graduated.map((g) => `<thesis note_slug="${g.slug}" title=${JSON.stringify(g.title)}>\n${g.thesis}\n</thesis>`).join("\n")}\n</theses>`
      : "<theses>(no graduated notes yet: return no thesis checks)</theses>",
  ].join("\n");

  const { data, usd } = await callJSON<DigestOutput>({
    home,
    command: "digest",
    role: "cheap",
    system: prompt("digest"),
    user,
    schema: SCHEMA,
  });

  const summary = new Map((data.summaries ?? []).map((s) => [s.index, s.summary.trim()]));
  const checks = (data.thesis_checks ?? []).filter((c) => items[c.index] && slugs.has(c.note_slug)).slice(0, 3);

  const lines = [`# Frontier — ${today()}`, ""];
  lines.push("## Does this change your thesis?", "");
  if (checks.length) {
    for (const c of checks) {
      const it = items[c.index];
      lines.push(`- **[${md(it.title)}](${it.link})** → \`notes/${c.note_slug}.md\`: ${c.question.trim()}`);
    }
  } else {
    lines.push(graduated.length ? "Nothing today challenges a graduated thesis." : "Graduate a few notes and this section will test them against the news.");
  }
  const pillars = [...new Set(items.map((i) => i.pillar))];
  for (const p of pillars) {
    lines.push("", `## ${p}`, "");
    items.forEach((it, i) => {
      if (it.pillar !== p) return;
      lines.push(`- [${md(it.title)}](${it.link}) · ${it.feed} · ${summary.get(i) ?? md(it.snippet.slice(0, 200))}`);
    });
  }
  if (failures.length) lines.push("", "---", "", "Feeds that failed:", "", ...failures.map((f) => `- ${f}`));
  lines.push("", `<!-- ${items.length} items · $${usd.toFixed(4)} -->`, "");

  fs.mkdirSync(home.frontier, { recursive: true });
  let file = path.join(home.frontier, `${today()}.md`);
  for (let n = 2; fs.existsSync(file); n++) file = path.join(home.frontier, `${today()}-${n}.md`);
  fs.writeFileSync(file, lines.join("\n"));

  io.print(`${items.length} items, ${checks.length} thesis check${checks.length === 1 ? "" : "s"} → ${path.relative(home.root, file)} ($${usd.toFixed(4)})`);
  return 0;
}
