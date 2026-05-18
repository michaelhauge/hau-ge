interface Phase {
  window: string;
  title: string;
  description: string;
  deliverable: string;
}

const phases: Phase[] = [
  {
    window: "Days 0–14",
    title: "Diagnose",
    description:
      "Pertama AI Maturity Model assessment with your senior team, plus one-on-one interviews with the people who will live with the work. The output is a written read of where you sit today and what good would look like in 90 days.",
    deliverable: "Maturity scorecard + Kirkpatrick L1–L4 success targets",
  },
  {
    window: "Days 15–45",
    title: "Train the top",
    description:
      "First executive workshop or cohort kickoff. We surface the workflows that matter, set the usage standard, and start producing the prompt patterns the team will reuse. No vendor decks; the team works with their own real material.",
    deliverable: "Executive Learning Day + first version of your prompt library",
  },
  {
    window: "Days 46–75",
    title: "Embed",
    description:
      "Weekly working sessions with the operators who will own the long-term capability. Evaluation rituals get installed, second-line trainers shadow my delivery, and the team starts running cohorts without me in the room.",
    deliverable: "Facilitator guide + evaluation rituals + second-line trainers shadowing",
  },
  {
    window: "Day 90",
    title: "Measure",
    description:
      "Joint review with the original sponsor against the Kirkpatrick L3 / L4 targets defined at kickoff. Decide together whether the program ends here, scales internally, or moves into a longer retained relationship.",
    deliverable: "90-day outcomes report + scope for the next quarter (if any)",
  },
];

export function First90Days() {
  return (
    <section id="first-90-days" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
        <div className="mb-12 max-w-2xl">
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-muted">
            First 90 days
          </p>
          <h2 className="text-balance">
            What you can tell your CFO you&rsquo;re buying.
          </h2>
          <p className="mt-4 text-base text-muted">
            Every engagement scopes to the team and the moment, but the
            common arc looks something like this. Concrete enough to put on
            a procurement form; specific enough to hold me accountable.
          </p>
        </div>

        <ol className="space-y-10">
          {phases.map((p, i) => (
            <li
              key={p.window}
              className="grid grid-cols-1 gap-6 border-t border-border pt-10 md:grid-cols-12"
            >
              <div className="md:col-span-3">
                <p className="text-xs font-medium uppercase tracking-widest text-muted">
                  {p.window}
                </p>
                <p className="mt-2 text-2xl font-semibold tracking-tight text-foreground">
                  {String(i + 1).padStart(2, "0")} · {p.title}
                </p>
              </div>
              <div className="md:col-span-9">
                <p className="text-base text-muted">{p.description}</p>
                <p className="mt-4 text-sm">
                  <span className="font-medium uppercase tracking-widest text-muted">
                    Deliverable ·{" "}
                  </span>
                  <span className="text-foreground">{p.deliverable}</span>
                </p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-16 max-w-2xl rounded-lg border border-border bg-subtle p-5">
          <p className="text-xs font-medium uppercase tracking-widest text-muted">
            Accountability
          </p>
          <p className="mt-2 text-sm text-foreground">
            Kirkpatrick L3 and L4 targets are agreed in writing at kickoff.
            If we don&rsquo;t hit them, the retainer for the next quarter is
            on the table for renegotiation. The job is to land outcomes, not
            to bill hours.
          </p>
        </div>
      </div>
    </section>
  );
}
