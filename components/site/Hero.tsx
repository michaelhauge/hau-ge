import Image from "next/image";

export function Hero() {
  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-8">
            <p className="mb-6 text-sm font-medium uppercase tracking-widest text-muted">
              AI Training and Advisory
            </p>
            <h1 className="text-balance">
              AI training and <span className="italic">transformation</span>{" "}
              for senior leadership teams.
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-muted sm:text-xl">
              Workshops, programs, and advisory work that helps executives and
              their teams use AI well.
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

          <div className="hidden md:col-span-4 md:block">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-lg border border-border bg-subtle">
              <Image
                src="/images/headshot.jpg"
                alt="Michael Hauge"
                fill
                priority
                sizes="(max-width: 768px) 0px, 360px"
                quality={85}
                className="object-cover object-top"
              />
            </div>
            <p className="mt-3 text-xs text-muted">
              Michael Hauge · Kuala Lumpur
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
