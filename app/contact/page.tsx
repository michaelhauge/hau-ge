import type { Metadata } from "next";
import { ContactForm } from "@/components/site/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Michael L. Hauge about AI training, implementation, or financial backing for ambitious companies in Southeast Asia.",
};

export default function ContactPage() {
  return (
    <section>
      <div className="mx-auto max-w-3xl px-6 py-20 sm:py-28">
        <p className="mb-4 text-sm font-medium uppercase tracking-widest text-muted">
          Contact
        </p>
        <h1 className="text-balance">Let&rsquo;s talk.</h1>
        <p className="mt-6 max-w-2xl text-lg text-muted">
          Currently accepting two engagements per quarter. The fastest way to
          start is the form below — it opens your email client with the
          details already filled in, so I get the context I need to reply
          properly.
        </p>

        <div className="mt-12">
          <ContactForm />
        </div>

        <div className="mt-16 border-t border-border pt-10 text-sm text-muted">
          <p>
            Prefer email directly?{" "}
            <a
              href="mailto:michael@hau.ge"
              className="font-medium text-foreground underline underline-offset-4 hover:text-muted"
            >
              michael@hau.ge
            </a>
          </p>
          <p className="mt-2">
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
