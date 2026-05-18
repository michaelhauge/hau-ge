interface Level {
  level: string;
  label: string;
  description: string;
}

const kirkpatrick: Level[] = [
  {
    level: "L1",
    label: "Reaction",
    description:
      "Did the participants find the program relevant, useful, and worth their time? Measured end-of-day via short surveys and NPS. SAP NPS of 94 was an L1 outcome.",
  },
  {
    level: "L2",
    label: "Learning",
    description:
      "Did participants actually gain the skills and frameworks the program targeted? Measured via paired pre/post assessments designed for each cohort.",
  },
  {
    level: "L3",
    label: "Behaviour",
    description:
      "Are participants applying the learning in their day-to-day work 30 to 90 days later? Measured via manager check-ins and structured self-reports on a defined cadence.",
  },
  {
    level: "L4",
    label: "Results",
    description:
      "Has the team produced measurable business outcomes attributable to the program: time saved, throughput, quality, revenue, retention? Defined per engagement with the sponsor.",
  },
];

const maturityLevels: Array<{ stage: string; description: string }> = [
  { stage: "AI Aware", description: "Understands AI potential; no production deployment yet." },
  { stage: "AI Experimenting", description: "Active pilots; no production systems in place." },
  { stage: "AI Implementing", description: "At least one AI system in production with measured KPIs." },
  { stage: "AI Scaling", description: "Multiple cross-functional AI systems; governance in place." },
  { stage: "AI-Native", description: "AI embedded in core operations as a durable competitive advantage." },
];

const maturityDimensions = [
  "Strategy",
  "Data",
  "Technology",
  "People",
  "Process",
];

export function MeasurementMethodology() {
  return (
    <section id="how-i-measure" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
        <div className="mb-16 max-w-2xl">
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-muted">
            How I measure
          </p>
          <h2 className="text-balance">
            Outcomes you can audit, on two well-known frameworks.
          </h2>
          <p className="mt-4 text-base text-muted">
            Every engagement is instrumented against the Kirkpatrick training
            evaluation model and, when relevant, the Pertama AI Maturity Model.
            Same vocabulary your CHRO, CFO, or board already uses.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-16 md:grid-cols-2">
          {/* Kirkpatrick */}
          <div>
            <p className="mb-3 text-xs font-medium uppercase tracking-widest text-muted">
              Training outcomes — Kirkpatrick L1 to L4
            </p>
            <h3 className="text-2xl font-semibold tracking-tight">
              Four levels, end-to-end.
            </h3>
            <p className="mt-3 text-base text-muted">
              Every program is scoped against all four levels at the kickoff,
              not just the easy ones.
            </p>
            <ol className="mt-8 space-y-6">
              {kirkpatrick.map((k) => (
                <li key={k.level} className="flex gap-5">
                  <span className="flex-shrink-0 text-sm font-medium tracking-widest text-muted">
                    {k.level}
                  </span>
                  <div>
                    <p className="text-base font-semibold tracking-tight">
                      {k.label}
                    </p>
                    <p className="mt-1 text-sm text-muted">{k.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* Pertama AI Maturity Model */}
          <div>
            <p className="mb-3 text-xs font-medium uppercase tracking-widest text-muted">
              Organisational AI capability — Pertama AI Maturity Model
            </p>
            <h3 className="text-2xl font-semibold tracking-tight">
              Five stages, five dimensions.
            </h3>
            <p className="mt-3 text-base text-muted">
              A 20-question, 80-point self-assessment that maps where your
              organisation sits today and what the next move actually looks
              like.
            </p>

            <div className="mt-8">
              <p className="text-xs font-medium uppercase tracking-widest text-muted">
                Five maturity stages
              </p>
              <ol className="mt-3 space-y-2.5">
                {maturityLevels.map((m, i) => (
                  <li key={m.stage} className="flex gap-4">
                    <span className="flex-shrink-0 text-sm font-medium tracking-widest text-muted">
                      0{i + 1}
                    </span>
                    <div>
                      <p className="text-sm font-semibold tracking-tight">
                        {m.stage}
                      </p>
                      <p className="text-sm text-muted">{m.description}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="mt-8">
              <p className="text-xs font-medium uppercase tracking-widest text-muted">
                Five assessment dimensions
              </p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {maturityDimensions.map((d) => (
                  <li
                    key={d}
                    className="rounded-full border border-border bg-subtle px-3 py-1 text-sm text-foreground"
                  >
                    {d}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8">
              <a
                href="https://pertamapartners.com/insights/research/ai-maturity-model-asian-businesses"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-muted"
              >
                Read the full Pertama AI Maturity Model report
                <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
                  ↗
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
