export function About() {
  return (
    <section id="about" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="mb-3 text-sm font-medium uppercase tracking-widest text-muted">
              About
            </p>
            <h2 className="text-balance">A practitioner, not a pundit.</h2>
          </div>

          <div className="space-y-6 text-base text-muted md:col-span-7 md:col-start-6">
            <p>
              I am Michael Hauge. I run{" "}
              <a
                href="https://pertamapartners.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-foreground underline-offset-4 hover:underline"
              >
                Pertama Partners
              </a>
              , an AI-native research and advisory firm based in Kuala Lumpur,
              and I help leadership teams across Southeast Asia and beyond
              actually use AI well.
            </p>
            <p>
              Most AI work I see falls into two camps: pundits who talk about
              the future, and engineers who ship features. I sit in a third
              place: practitioner-led training and transformation that meets
              senior leaders where they are. I run the workflows myself, design
              the curriculum, and stay close to delivery.
            </p>
            <p>
              I work with executives from CEOs to Heads of Learning. The
              engagements range from a single-day workshop to a 13-month
              cohort-based program across multiple sites. The constant: real
              practitioner depth, an artifact-first approach, and a refusal to
              hand-wave at the things that matter.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
