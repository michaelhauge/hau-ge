import Link from "next/link";
import { getRecentWriting } from "@/lib/writing";

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function RecentThinking() {
  const posts = getRecentWriting(3);
  if (posts.length === 0) return null;

  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
        <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-3 text-sm font-medium uppercase tracking-widest text-muted">
              Recent thinking
            </p>
            <h2 className="max-w-2xl text-balance">From the writing desk.</h2>
          </div>
          <Link
            href="/writing"
            className="group inline-flex items-center gap-1 text-sm font-medium text-foreground hover:text-muted"
          >
            All writing
            <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
              →
            </span>
          </Link>
        </div>

        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <li
              key={p.slug}
              className="group flex flex-col rounded-lg border border-border bg-background p-6 transition-all hover:-translate-y-0.5 hover:border-foreground hover:shadow-md"
            >
              <Link href={`/writing/${p.slug}`} className="flex flex-1 flex-col">
                <p className="text-xs font-medium uppercase tracking-widest text-muted">
                  {formatDate(p.date)}
                </p>
                <h3 className="mt-3 text-xl font-semibold tracking-tight text-foreground">
                  {p.title}
                </h3>
                {p.excerpt && (
                  <p className="mt-3 flex-1 text-sm text-muted">{p.excerpt}</p>
                )}
                <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-foreground">
                  Read
                  <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
                    →
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
