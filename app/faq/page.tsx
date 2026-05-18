import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Standard procurement and engagement questions answered up front. Invoicing entity, payment terms, IP, NDA, cancellation, data handling, sub-contractor disclosure, language coverage.",
};

interface QA {
  question: string;
  answer: string;
}

const procurement: QA[] = [
  {
    question: "What are standard payment terms?",
    answer:
      "30 days net from invoice date. 50% on engagement kickoff, 50% on the agreed midpoint or quarterly cadence for longer programs. Custom terms negotiable for first engagements.",
  },
  {
    question: "Do you provide an MSA / SOW template?",
    answer:
      "Yes. A standard MSA + SOW pair is available on request before any signed engagement. We're also happy to work under your organisation's MSA if you have a preferred form.",
  },
  {
    question: "What is your stance on PDPA / GDPR / data residency?",
    answer:
      "Cohort participant data (names, survey responses, pre/post assessments) is held under PDPA 2010 (Malaysia) and equivalent regional rules. Data is processed only for program delivery and measurement. We don't use cohort data to train AI models. EU/UK participant data is handled under GDPR; ask for our data-processing addendum.",
  },
  {
    question: "Who owns the IP we create together?",
    answer:
      "Client owns the deliverables produced in their engagement (curriculum customisations, prompt libraries, evaluation rituals, cohort materials). I retain the underlying methodology (Pertama AI Maturity Model, Kirkpatrick-aligned evaluation design, facilitator playbook structures). Standard in the industry; happy to walk through the line if useful.",
  },
];

const engagement: QA[] = [
  {
    question: "What's a typical engagement length?",
    answer:
      "From a half-day workshop through to a 13-month executive program. Most fall in the 8–16-week implementation range. See the Engagement Shapes section on the homepage for the four common patterns.",
  },
  {
    question: "Do you sub-contract the delivery?",
    answer:
      "Lead engagements are delivered personally by Michael. For multi-site or multi-language rollouts, named senior facilitators from the Pertama Partners network deliver under shared standards and methodology. Sub-contractor disclosure is provided in writing at engagement start.",
  },
  {
    question: "What languages can you deliver in?",
    answer:
      "Michael personally delivers in English or Mandarin. The Pertama Partners network covers Bahasa Malaysia, Bahasa Indonesia, Mandarin, and English for regional SEA rollouts. Other languages on a network-availability basis.",
  },
  {
    question: "What's your cancellation / rescheduling policy?",
    answer:
      "Pre-engagement: full refund minus directly-incurred costs (travel, etc.) up to 14 days before kickoff; 50% retention inside 14 days. In-engagement: pro-rated to work delivered. Force majeure handled in good faith; we've delivered through COVID-era postponements without issue.",
  },
  {
    question: "What if the program doesn't hit its outcomes?",
    answer:
      "Kirkpatrick L3 and L4 targets are agreed in writing at kickoff. If we don't hit them in the agreed window, the next quarter's retainer is on the table for renegotiation. The job is to land outcomes, not bill hours.",
  },
  {
    question: "How do training engagements relate to capital?",
    answer:
      "They don't, on the commercial side. Training engagements never trigger investment outreach unless you ask. The four Pertama Group entities are linked intellectually (training generates operator insight; capital backs the operators who put it to work) but commercial sales motions are kept separate.",
  },
];

function Block({ title, items }: { title: string; items: QA[] }) {
  return (
    <div>
      <h2 className="text-balance">{title}</h2>
      <dl className="mt-8 space-y-8 border-t border-border pt-8">
        {items.map((q) => (
          <div key={q.question}>
            <dt className="text-lg font-semibold tracking-tight text-foreground">
              {q.question}
            </dt>
            <dd className="mt-3 text-base text-muted">{q.answer}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export default function FAQPage() {
  return (
    <section>
      <div className="mx-auto max-w-3xl px-6 py-20 sm:py-28">
        <p className="mb-4 text-sm font-medium uppercase tracking-widest text-muted">
          FAQ
        </p>
        <h1 className="text-balance">
          Procurement, contracting, and engagement details.
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted">
          The questions enterprise L&amp;D and procurement teams usually send
          via email, answered up front. If something&rsquo;s missing, ask
          directly via the{" "}
          <Link
            href="/contact"
            className="font-medium text-foreground underline underline-offset-4 hover:text-muted"
          >
            contact form
          </Link>
          .
        </p>

        <div className="mt-16 space-y-20">
          <Block title="Procurement & contracting" items={procurement} />
          <Block title="Engagement & delivery" items={engagement} />
        </div>
      </div>
    </section>
  );
}
