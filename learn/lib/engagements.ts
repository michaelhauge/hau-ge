import fs from "node:fs";
import type { Home } from "./home";
import { SLUG_RE } from "./notes";

export interface Engagement {
  slug: string;
  text: string;
}

export interface EngagementParse {
  engagements: Engagement[];
  errors: string[];
}

/** engagements.md: one "## slug" heading per engagement; everything under it is context. */
export function parseEngagements(markdown: string): EngagementParse {
  const engagements: Engagement[] = [];
  const errors: string[] = [];
  const seen = new Set<string>();
  let current: Engagement | null = null;
  for (const line of markdown.replace(/\r\n/g, "\n").split("\n")) {
    const h = line.match(/^##\s+(.+?)\s*$/);
    if (h) {
      const slug = h[1];
      if (!SLUG_RE.test(slug)) errors.push(`engagements.md: heading "${slug}" isn't a valid slug`);
      if (seen.has(slug)) errors.push(`engagements.md: "${slug}" is defined twice`);
      seen.add(slug);
      current = { slug, text: "" };
      engagements.push(current);
    } else if (current) {
      current.text += line + "\n";
    }
  }
  for (const e of engagements) e.text = e.text.trim();
  return { engagements, errors };
}

export function loadEngagements(home: Home): EngagementParse {
  if (!fs.existsSync(home.engagementsFile)) return { engagements: [], errors: [] };
  return parseEngagements(fs.readFileSync(home.engagementsFile, "utf8"));
}

/** Context block for prompts: only the engagements a note references. */
export function engagementContext(home: Home, slugs: string[]): string {
  if (slugs.length === 0) return "";
  const all = new Map(loadEngagements(home).engagements.map((e) => [e.slug, e]));
  return slugs
    .map((s) => all.get(s))
    .filter((e): e is Engagement => Boolean(e))
    .map((e) => `<engagement slug="${e.slug}">\n${e.text}\n</engagement>`)
    .join("\n\n");
}
