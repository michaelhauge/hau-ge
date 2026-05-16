import Image from "next/image";

export function Hero() {
  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-8">
            <p className="mb-6 text-sm font-medium uppercase tracking-widest text-muted">
              Training · Implementation · Capital
            </p>
            <h1 className="text-balance">
              AI training, implementation, and{" "}
              <span className="italic">financial backing</span> for ambitious
              companies in Southeast Asia.
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-muted sm:text-xl">
              Workshops for leadership teams. Hands-on implementation when it
              counts. Capital for the rare operators building something
              serious.
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

            <div className="mt-12 max-w-xl rounded-lg border border-border bg-subtle p-5">
              <p className="text-sm font-medium text-foreground">
                Currently accepting two engagements per quarter.
              </p>
              <p className="mt-1 text-sm text-muted">
                Please{" "}
                <a
                  href="/contact"
                  className="font-medium text-foreground underline underline-offset-4 hover:text-muted"
                >
                  email with a request for details
                </a>
                .
              </p>
            </div>
            <div className="mt-6">
              <a
                href="#work"
                className="group inline-flex items-center gap-1 text-sm font-medium transition-colors hover:text-muted"
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
                alt="Michael L. Hauge"
                fill
                priority
                sizes="(max-width: 768px) 0px, 360px"
                quality={85}
                className="object-cover object-top"
              />
            </div>
            <p className="mt-3 text-xs text-muted">
              Michael L. Hauge · Kuala Lumpur
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
