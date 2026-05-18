interface Shape {
  number: string;
  title: string;
  cadence: string;
  description: string;
}

const shapes: Shape[] = [
  {
    number: "01",
    title: "Executive workshop",
    cadence: "Half-day to two-day intensive",
    description:
      "A focused session for a leadership team. Diagnose where AI fits, work through real workflows, leave with a usage standard. Often the start of a longer engagement.",
  },
  {
    number: "02",
    title: "Implementation program",
    cadence: "8 – 16 weeks",
    description:
      "Hands-on rollout work for a function or business unit. Workshops paired with prompt libraries, evaluation rituals, and the embed work that turns capability into habit.",
  },
  {
    number: "03",
    title: "Long-horizon advisory",
    cadence: "Multi-quarter to multi-year",
    description:
      "Retained relationship across cohorts and sites. The SAP shape — iteratively-improved cohort training, site-by-site rollouts, and the strategic AI work that compounds with the team rather than getting bolted on.",
  },
  {
    number: "04",
    title: "Capital + operator support",
    cadence: "Through Pertama Capital or Ventures",
    description:
      "When backing is a better fit than billing: first cheques into AI-native founders (Ventures), or patient capital plus operational modernization into SEA family businesses (Capital).",
  },
];

export function EngagementShapes() {
  return (
    <section id="engagement-shapes" className="border-b border-border bg-subtle">
      <div className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
        <div className="mb-16 max-w-2xl">
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-muted">
            Engagement Shapes
            <sup className="ml-1 font-normal normal-case tracking-normal text-muted/60">
              {shapes.length}
            </sup>
          </p>
          <h2 className="text-balance">
            Four shapes the work usually takes.
          </h2>
          <p className="mt-4 text-base text-muted">
            Every engagement is scoped to the team and the moment, but most
            of the work falls into one of these patterns.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          {shapes.map((s) => (
            <div key={s.number} className="flex gap-6">
              <span className="text-sm font-medium tracking-widest text-muted">
                {s.number}
              </span>
              <div>
                <h3 className="text-xl font-semibold tracking-tight">{s.title}</h3>
                <p className="mt-1 text-xs font-medium uppercase tracking-widest text-muted">
                  {s.cadence}
                </p>
                <p className="mt-3 text-base text-muted">{s.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 max-w-2xl rounded-lg border border-border bg-background p-5">
          <p className="text-xs font-medium uppercase tracking-widest text-muted">
            On rates
          </p>
          <p className="mt-2 text-sm text-foreground">
            Michael&rsquo;s day rates are in line with professional advisory
            contracts in the Southeast Asia region. Multi-day, retained, and
            multi-cohort engagements scoped on request.
          </p>
        </div>
      </div>
    </section>
  );
}
