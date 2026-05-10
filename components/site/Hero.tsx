export function Hero() {
  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
        <p className="mb-6 text-sm font-medium uppercase tracking-widest text-muted">
          AI Training and Advisory
        </p>
        <h1 className="max-w-4xl text-balance">
          AI training and transformation for senior leadership teams.
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted sm:text-xl">
          Workshops, programs, and advisory work that helps executives and their teams use AI well.
        </p>

        <dl className="mt-12 grid grid-cols-3 gap-8 border-t border-border pt-8 sm:max-w-xl">
          <div>
            <dt className="text-sm text-muted">Executives trained</dt>
            <dd className="mt-1 text-3xl font-semibold tracking-tight">200+</dd>
          </div>
          <div>
            <dt className="text-sm text-muted">Longest program</dt>
            <dd className="mt-1 text-3xl font-semibold tracking-tight">13 mo</dd>
          </div>
          <div>
            <dt className="text-sm text-muted">Industries</dt>
            <dd className="mt-1 text-3xl font-semibold tracking-tight">5+</dd>
          </div>
        </dl>

        <div className="mt-12 flex flex-wrap items-center gap-4">
          <a
            href="mailto:michael@hau.ge?subject=Intro%20call"
            className="group inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-colors hover:bg-muted"
          >
            Book a 30-min intro
            <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
              →
            </span>
          </a>
          <a
            href="#work"
            className="group inline-flex items-center gap-1 px-2 py-3 text-sm font-medium transition-colors hover:text-muted"
          >
            See selected work
            <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
              →
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
