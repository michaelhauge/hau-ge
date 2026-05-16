interface Principle {
  number: string;
  title: string;
  description: string;
}

const principles: Principle[] = [
  {
    number: "01",
    title: "Diagnose first.",
    description:
      "Every engagement and every investment starts with what is actually happening, not what the deck says. The diagnosis shapes the rest of the work.",
  },
  {
    number: "02",
    title: "Practitioner depth.",
    description:
      "Whether teaching execs, shipping implementation, or deciding to back a founder, I run the workflows myself first. The work earns the right to advise on it.",
  },
  {
    number: "03",
    title: "Build with operators.",
    description:
      "I would rather be next to the people doing the work than across the table from them. That applies to training engagements, hands-on implementation, and the founders I back.",
  },
  {
    number: "04",
    title: "Leave artifacts.",
    description:
      "Every engagement produces durable deliverables: playbooks, prompt libraries, evaluation frameworks. Knowledge that outlasts my involvement and becomes the org's own capability.",
  },
];

export function HowIWork() {
  return (
    <section id="how-i-work" className="border-b border-border bg-subtle">
      <div className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
        <div className="mb-16 max-w-2xl">
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-muted">
            How I Work
            <sup className="ml-1 font-normal normal-case tracking-normal text-muted/60">
              {principles.length}
            </sup>
          </p>
          <h2 className="text-balance">
            Four principles behind every engagement.
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          {principles.map((p) => (
            <div key={p.number} className="flex gap-6">
              <span className="text-sm font-medium tracking-widest text-muted">
                {p.number}
              </span>
              <div>
                <h3 className="text-xl font-semibold tracking-tight">{p.title}</h3>
                <p className="mt-3 text-base text-muted">{p.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
