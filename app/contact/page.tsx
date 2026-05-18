import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Michael L. Hauge about AI training, implementation, or financial backing for ambitious companies in Southeast Asia.",
};

const EMAIL = "michael@pertamapartners.com";

export default function ContactPage() {
  return (
    <section>
      <div className="mx-auto max-w-3xl px-6 py-20 sm:py-28">
        <p className="mb-4 text-sm font-medium uppercase tracking-widest text-muted">
          Contact
        </p>
        <h1 className="text-balance">Let&rsquo;s talk.</h1>
        <p className="mt-6 max-w-2xl text-lg text-muted">
          Currently accepting two engagements per quarter. Drop me a line with
          a few sentences of context — what you&rsquo;re trying to do and
          what&rsquo;s prompting this — and I&rsquo;ll reply within two
          working days.
        </p>

        <div className="mt-12 rounded-lg border border-border bg-subtle p-8 sm:p-10">
          <p className="text-sm font-medium uppercase tracking-widest text-muted">
            Email
          </p>
          <a
            href={`mailto:${EMAIL}`}
            className="mt-3 block break-all text-2xl font-semibold tracking-tight text-foreground underline underline-offset-4 hover:text-muted sm:text-3xl"
          >
            {EMAIL}
          </a>
          <p className="mt-6 text-sm text-muted">
            Helpful to include: your company, your role, and one or two
            sentences on what you&rsquo;re exploring (training, implementation,
            capital, or something else).
          </p>
        </div>

        <div className="mt-16 border-t border-border pt-10 text-sm text-muted">
          <p>
            On LinkedIn:{" "}
            <a
              href="https://linkedin.com/in/michaelhauge"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-foreground underline underline-offset-4 hover:text-muted"
            >
              linkedin.com/in/michaelhauge
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
