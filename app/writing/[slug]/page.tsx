import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getAllWritingSlugs,
  getWritingBySlug,
} from "@/lib/writing";

interface Params {
  slug: string;
}

export async function generateStaticParams(): Promise<Params[]> {
  return getAllWritingSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getWritingBySlug(slug);
  if (!post) return { title: "Not found" };
  return {
    title: post.title,
    description: post.excerpt,
  };
}

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function WritingPostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = await getWritingBySlug(slug);
  if (!post) notFound();

  return (
    <article>
      <section className="border-b border-border">
        <div className="mx-auto max-w-3xl px-6 py-20 sm:py-24">
          <Link
            href="/writing"
            className="group inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-foreground"
          >
            <span aria-hidden className="transition-transform group-hover:-translate-x-0.5">
              ←
            </span>
            All writing
          </Link>
          <p className="mt-10 text-xs font-medium uppercase tracking-widest text-muted">
            {formatDate(post.date)}
          </p>
          <h1 className="mt-3 text-balance">{post.title}</h1>
          {post.excerpt && (
            <p className="mt-6 max-w-2xl text-lg text-muted">{post.excerpt}</p>
          )}
        </div>
      </section>

      <section>
        <div
          className="prose-writing mx-auto max-w-3xl px-6 py-16"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
      </section>

      <section data-print-hide>
        <div className="mx-auto max-w-3xl px-6 py-20 sm:py-24">
          <Link
            href="/writing"
            className="group inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-muted"
          >
            <span aria-hidden className="transition-transform group-hover:-translate-x-0.5">
              ←
            </span>
            All writing
          </Link>
        </div>
      </section>
    </article>
  );
}
