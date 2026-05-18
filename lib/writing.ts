import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

export interface WritingFrontmatter {
  title: string;
  date: string;
  excerpt?: string;
  tags?: string[];
}

export interface WritingMeta extends WritingFrontmatter {
  slug: string;
}

export interface Writing extends WritingMeta {
  html: string;
}

const CONTENT_DIR = path.join(process.cwd(), "content", "writing");

function readAllFiles(): { slug: string; raw: string }[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".md") || f.endsWith(".mdx"))
    .map((file) => {
      const slug = file.replace(/\.mdx?$/, "");
      const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf8");
      return { slug, raw };
    });
}

function parseFrontmatter(raw: string): {
  data: WritingFrontmatter;
  content: string;
} {
  const parsed = matter(raw);
  const data = parsed.data as Partial<WritingFrontmatter>;
  return {
    data: {
      title: data.title ?? "Untitled",
      date: data.date ?? new Date().toISOString().slice(0, 10),
      excerpt: data.excerpt,
      tags: data.tags,
    },
    content: parsed.content,
  };
}

export function getAllWriting(): WritingMeta[] {
  return readAllFiles()
    .map(({ slug, raw }) => {
      const { data } = parseFrontmatter(raw);
      return { slug, ...data };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getRecentWriting(limit = 3): WritingMeta[] {
  return getAllWriting().slice(0, limit);
}

export async function getWritingBySlug(slug: string): Promise<Writing | null> {
  const file = readAllFiles().find((f) => f.slug === slug);
  if (!file) return null;
  const { data, content } = parseFrontmatter(file.raw);
  const processed = await remark().use(html).process(content);
  return {
    slug,
    ...data,
    html: processed.toString(),
  };
}

export function getAllWritingSlugs(): string[] {
  return readAllFiles().map((f) => f.slug);
}
