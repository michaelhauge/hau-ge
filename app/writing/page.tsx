import type { Metadata } from "next";
import Link from "next/link";
import { getAllWriting } from "@/lib/writing";

export const metadata: Metadata = {
  title: "Writing",
  description:
    "Essays and notes from Michael L. Hauge on AI implementation, family-business operations, and backing operators in Southeast Asia.",
};

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function WritingIndexPage() {
  const posts = getAllWriting();

  return (
    <section>
      <div className="mx-auto max-w-3xl px-6 py-20 sm:py-28">
        <p className="mb-4 text-sm font-medium uppercase tracking-widest text-muted">
          Writing
        </p>
        <h1 className="text-balance">Essays and notes from the work.</h1>
        <p className="mt-6 max-w-2xl text-lg text-muted">
          Longer-form thinking that doesn&rsquo;t fit on the homepage. AI that
          ships, family-business operations, the operators I want to back.
        </p>

        <div className="mt-8 max-w-2xl rounded-md border border-border bg-subtle p-5 text-sm text-muted">
          <p>
            <span className="font-semibold uppercase tracking-widest text-foreground">
              A note:
            </span>{" "}
            This site went live in 2026, but I&rsquo;m in the process of
            uploading essays and notes from across my career. They will appear
            here gradually as I work through the archive, so the list will keep
            growing over the coming weeks and months.
          </p>
        </div>

        {posts.length === 0 ? (
          <p className="mt-16 text-base text-muted">
            Nothing published yet. Check back soon.
          </p>
        ) : (
          <ul className="mt-16 divide-y divide-border border-t border-border">
            {posts.map((p) => (
              <li key={p.slug} className="py-8">
                <Link
                  href={`/writing/${p.slug}`}
                  className="group block"
                >
                  <p className="text-xs font-medium uppercase tracking-widest text-muted">
                    {formatDate(p.date)}
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold tracking-tight text-foreground transition-colors group-hover:text-muted">
                    {p.title}
                  </h2>
                  {p.excerpt && (
                    <p className="mt-3 text-base text-muted">{p.excerpt}</p>
                  )}
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-foreground">
                    Read
                    <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
                      →
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
