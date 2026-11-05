import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { Home } from "./home";
import { LearnError } from "./errors";

export const PILLARS = ["theory", "hardware", "companies", "agents", "debates", "scenarios"] as const;
export type Pillar = (typeof PILLARS)[number];
export const STATUSES = ["draft", "graduated"] as const;
export type Status = (typeof STATUSES)[number];

export const PERTAMA_HEADING = "What this means for Pertama";
export const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

export interface Note {
  slug: string;
  file: string;
  raw: string;
  data: Record<string, unknown>;
  body: string;
}

export function noteFile(home: Home, slug: string): string {
  return path.join(home.notes, `${slug}.md`);
}

export function readNote(home: Home, slug: string): Note {
  const file = noteFile(home, slug);
  if (!fs.existsSync(file)) throw new LearnError(`No note "${slug}" (looked for ${file}).`);
  return parseNoteFile(file);
}

export function parseNoteFile(file: string): Note {
  const raw = fs.readFileSync(file, "utf8");
  // Pass an options object so gray-matter doesn't serve a cached parse of identical text.
  const parsed = matter(raw, {});
  return { slug: path.basename(file, ".md"), file, raw, data: parsed.data, body: parsed.content };
}

export function listNotes(home: Home): Note[] {
  if (!fs.existsSync(home.notes)) return [];
  return fs
    .readdirSync(home.notes)
    .filter((f) => f.endsWith(".md"))
    .sort()
    .map((f) => parseNoteFile(path.join(home.notes, f)));
}

export function noteSlugs(home: Home): Set<string> {
  if (!fs.existsSync(home.notes)) return new Set();
  return new Set(
    fs.readdirSync(home.notes).filter((f) => f.endsWith(".md")).map((f) => f.slice(0, -3)),
  );
}

/** Body text with line endings and trailing whitespace normalized, so editors don't change the hash. */
function normalize(body: string): string {
  return body.replace(/\r\n/g, "\n").replace(/[ \t]+$/gm, "").trim();
}

/** Hash of the note body only. Frontmatter edits (graduating, tagging) don't invalidate a critique. */
export function bodyHash(body: string): string {
  return crypto.createHash("sha256").update(normalize(body)).digest("hex");
}

/** The text under "## What this means for Pertama", up to the next heading of level 1-2, or null. */
export function pertamaSection(body: string): string | null {
  const lines = body.replace(/\r\n/g, "\n").split("\n");
  const start = lines.findIndex((l) => /^##\s+what this means for pertama\s*$/i.test(l.trim()));
  if (start === -1) return null;
  const rest = lines.slice(start + 1);
  const end = rest.findIndex((l) => /^#{1,2}\s/.test(l));
  return (end === -1 ? rest : rest.slice(0, end)).join("\n").trim();
}

/** Body with the Pertama section removed (used when promoting to the public /writing pipeline). */
export function withoutPertamaSection(body: string): string {
  const lines = body.replace(/\r\n/g, "\n").split("\n");
  const start = lines.findIndex((l) => /^##\s+what this means for pertama\s*$/i.test(l.trim()));
  if (start === -1) return body.trim();
  const rest = lines.slice(start + 1);
  const end = rest.findIndex((l) => /^#{1,2}\s/.test(l));
  const kept = [...lines.slice(0, start), ...(end === -1 ? [] : rest.slice(end))];
  return kept.join("\n").trim();
}

export function stripComments(text: string): string {
  return text.replace(/<!--[\s\S]*?-->/g, "");
}

/** Words of real prose: HTML comments (template prompts) don't count. */
export function wordCount(text: string): number {
  const words = stripComments(text).match(/[\p{L}\p{N}][\p{L}\p{N}'’-]*/gu);
  return words ? words.length : 0;
}

function asStringList(v: unknown): string[] | null {
  if (v === undefined || v === null) return [];
  if (!Array.isArray(v) || v.some((x) => typeof x !== "string")) return null;
  return v as string[];
}

/** YAML turns an unquoted 2026-11-05 into a Date; accept both forms. */
export function asDateString(v: unknown): string | null {
  if (v instanceof Date && !Number.isNaN(v.getTime())) return v.toISOString().slice(0, 10);
  if (typeof v === "string" && DATE_RE.test(v)) return v;
  return null;
}

export function noteTitle(note: Note): string {
  return typeof note.data.title === "string" && note.data.title.trim() ? note.data.title : note.slug;
}

export function noteStatus(note: Note): Status {
  return note.data.status === "graduated" ? "graduated" : "draft";
}

export function notePillar(note: Note): string {
  return typeof note.data.pillar === "string" ? note.data.pillar : "unknown";
}

export function noteEngagements(note: Note): string[] {
  return asStringList(note.data.engagements) ?? [];
}

export function noteLinks(note: Note): string[] {
  return asStringList(note.data.links) ?? [];
}

export interface ValidationContext {
  engagementSlugs: Set<string>;
  noteSlugs: Set<string>;
}

export interface Validation {
  errors: string[];
  warnings: string[];
}

export function validateNote(note: Note, ctx: ValidationContext): Validation {
  const errors: string[] = [];
  const warnings: string[] = [];
  const d = note.data;

  if (!SLUG_RE.test(note.slug)) errors.push(`filename "${note.slug}.md" isn't a valid slug (lowercase, digits, hyphens)`);
  if (typeof d.title !== "string" || !d.title.trim()) errors.push("title is missing");
  if (typeof d.pillar !== "string" || !(PILLARS as readonly string[]).includes(d.pillar)) {
    errors.push(`pillar must be one of: ${PILLARS.join(", ")}`);
  }
  if (d.topic !== undefined && d.topic !== null && typeof d.topic !== "string") errors.push("topic must be text");
  if (typeof d.status !== "string" || !(STATUSES as readonly string[]).includes(d.status)) {
    errors.push(`status must be one of: ${STATUSES.join(", ")}`);
  }
  if (asDateString(d.created) === null) errors.push('created must be a date like "2026-11-05"');

  const sources = asStringList(d.sources);
  if (sources === null) errors.push("sources must be a list of URLs or citations");

  const engagements = asStringList(d.engagements);
  if (engagements === null) errors.push("engagements must be a list of slugs");
  else {
    for (const e of engagements) {
      if (!ctx.engagementSlugs.has(e)) errors.push(`engagement "${e}" isn't defined in engagements.md`);
    }
  }

  const links = asStringList(d.links);
  if (links === null) errors.push("links must be a list of note slugs");
  else {
    for (const l of links) {
      if (l === note.slug) errors.push("a note can't link to itself");
      else if (!ctx.noteSlugs.has(l)) errors.push(`link "${l}" doesn't match any note in notes/`);
    }
  }

  const section = pertamaSection(note.body);
  if (d.status === "graduated") {
    if (asDateString(d.graduated) === null) errors.push("graduated notes need a graduated date");
    if (section === null) errors.push(`graduated note is missing "## ${PERTAMA_HEADING}"`);
  } else if (section === null) {
    warnings.push(`no "## ${PERTAMA_HEADING}" section yet (required to graduate)`);
  }

  return { errors, warnings };
}

/**
 * Set one top-level frontmatter field by editing its line in place, so the rest
 * of the file keeps the author's formatting (re-serializing YAML would not).
 */
export function setFrontmatterField(raw: string, key: string, value: string): string {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!m) throw new LearnError("note has no frontmatter block");
  const block = m[1];
  const line = `${key}: ${JSON.stringify(value)}`;
  const re = new RegExp(`^${key}:.*$`, "m");
  const newBlock = re.test(block) ? block.replace(re, line) : `${block}\n${line}`;
  return raw.replace(block, newBlock);
}

export function noteTemplate(opts: {
  slug: string;
  title: string;
  pillar: Pillar;
  topic: string;
  created: string;
}): string {
  return `---
title: ${JSON.stringify(opts.title)}
pillar: ${opts.pillar}
topic: ${JSON.stringify(opts.topic)}
status: draft
sources: []
engagements: []
links: []
created: "${opts.created}"
graduated: ""
---

<!-- Your synthesis, in your own words. Not a summary of the source: what you now believe, and why. -->

## ${PERTAMA_HEADING}

<!-- Required to graduate. What changes in how you advise, train or invest because of this?
Name the engagement, the client situation, the decision. Generic answers will be called out. -->
`;
}

export function titleFromSlug(slug: string): string {
  return slug
    .split("-")
    .map((w) => (w ? w[0].toUpperCase() + w.slice(1) : w))
    .join(" ");
}
