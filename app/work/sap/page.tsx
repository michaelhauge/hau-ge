import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "SAP — Learning Days across China",
  description:
    "12 Learning Days, 5 cities, 167 participants, NPS 94. A 12-month executive training program for SAP's China teams, 2019–2020.",
};

const quotes = [
  "Best training in my time at SAP.",
  "Most engaging training I’ve ever attended.",
  "Useful and practical. Hope they come back next year.",
  "It was the best training I’ve been to. Coach Mike was really professional and funny at the same time.",
  "Coach Mike was always able to answer our questions. It was so helpful.",
  "Open Q&A was the best part. Coach Mike made sure everything was clear and easy to use in our daily works.",
];

const stats = [
  { value: "94", label: "NPS, recommending Mike as trainer" },
  { value: "167", label: "Participants across 12 Learning Days" },
  { value: "5", label: "Cities in China" },
  { value: "100%", label: "Found content relevant to their work" },
  { value: "100%", label: "Said the training was worth their time" },
  { value: "98%", label: "Learned skills they could apply the next day" },
];

const sites = [
  { city: "Shanghai", days: 7, participants: 98 },
  { city: "Beijing", days: 1, participants: 12 },
  { city: "Dalian", days: 1, participants: 14 },
  { city: "Chengdu", days: 1, participants: 12 },
  { city: "Xi’An", days: 1, participants: 12 },
];

export default function SAPCaseStudyPage() {
  return (
    <article>
      <section className="border-b border-border">
        <div className="mx-auto max-w-4xl px-6 py-20 sm:py-28">
          <p className="mb-4 text-sm font-medium uppercase tracking-widest text-muted">
            Case study
          </p>
          <h1 className="text-balance">
            SAP — Learning Days{" "}
            <span className="italic">across China.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted sm:text-xl">
            Twelve Learning Days, five cities, 167 participants, an NPS of 94.
            A 13-month executive training program for SAP&rsquo;s China teams
            across 2019&ndash;2020 — the kind of long-horizon relationship I
            keep being asked back into. Clients who start with a single
            workshop almost always extend into multi-quarter programs once
            they see what iteratively-improved cohort training compounds into.
          </p>

          <div className="mt-12 grid grid-cols-2 gap-x-8 gap-y-6 border-t border-border pt-8 sm:grid-cols-3">
            {stats.map((s) => (
              <div key={s.label}>
                <dt className="text-sm text-muted">{s.label}</dt>
                <dd className="mt-1 text-3xl font-semibold tracking-tight">
                  {s.value}
                </dd>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-subtle">
        <div className="mx-auto max-w-4xl px-6 py-20 sm:py-24">
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-muted">
            The engagement
          </p>
          <h2 className="text-balance">Twelve days, five cities, one cohort design.</h2>
          <div className="mt-8 space-y-5 text-base text-muted">
            <p>
              SAP&rsquo;s China organization wanted a consistent learning
              experience for high-potential staff across five offices. The
              brief: a one-day intensive that felt both useful immediately
              (skills you can use tomorrow) and signalled that SAP was serious
              about investing in its people.
            </p>
            <p>
              I designed and ran a single curriculum that travelled — twelve
              instances of the same Learning Day, run consecutively across
              Shanghai, Beijing, Dalian, Chengdu, and Xi&rsquo;An over twelve
              months. Each cohort was 10&ndash;19 participants. Each day was
              followed by a retrospective call with site leadership and
              findings folded into the next iteration.
            </p>
            <p>
              The program focused on the durable executive skills that travel
              well across any tool stack: how senior people work with their
              teams, how they communicate across functions, and how they
              translate strategy into the work that actually gets done. The
              same things AI-era teams still need.
            </p>
          </div>

          <div className="mt-10 overflow-hidden rounded-md border border-border bg-background">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-border text-muted">
                <tr>
                  <th className="px-4 py-3 font-medium">Site</th>
                  <th className="px-4 py-3 font-medium">Learning Days</th>
                  <th className="px-4 py-3 font-medium">Participants</th>
                </tr>
              </thead>
              <tbody>
                {sites.map((site) => (
                  <tr key={site.city} className="border-b border-border last:border-0">
                    <td className="px-4 py-3 text-foreground">{site.city}</td>
                    <td className="px-4 py-3 text-muted">{site.days}</td>
                    <td className="px-4 py-3 text-muted">{site.participants}</td>
                  </tr>
                ))}
                <tr className="font-medium">
                  <td className="px-4 py-3">Total</td>
                  <td className="px-4 py-3">12</td>
                  <td className="px-4 py-3">167</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto max-w-4xl px-6 py-20 sm:py-24">
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-muted">
            What participants said
          </p>
          <h2 className="text-balance">Six quotes from the post-day survey.</h2>
          <ul className="mt-10 space-y-6">
            {quotes.map((q) => (
              <li
                key={q}
                className="border-l-2 border-foreground pl-5 text-lg text-foreground sm:text-xl"
              >
                &ldquo;{q}&rdquo;
              </li>
            ))}
          </ul>
          <p className="mt-8 text-sm text-muted">
            Survey n=52. Published with SAP&rsquo;s written permission for use
            with future clients. Individual participant names withheld.
          </p>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-4xl px-6 py-20 sm:py-24">
          <Link
            href="/#work"
            className="group inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-muted"
          >
            <span aria-hidden className="transition-transform group-hover:-translate-x-0.5">
              ←
            </span>
            Back to all work
          </Link>
        </div>
      </section>
    </article>
  );
}
