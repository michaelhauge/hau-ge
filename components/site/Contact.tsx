export function Contact() {
  return (
    <section id="contact">
      <div className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="md:col-span-7">
            <p className="mb-3 text-sm font-medium uppercase tracking-widest text-muted">
              Contact
            </p>
            <h2 className="text-balance">
              Bringing AI to your leadership team? Let&apos;s talk.
            </h2>
            <p className="mt-6 max-w-xl text-lg text-muted">
              Most of my work begins with a 30-minute intro call. Tell me what
              you are trying to do, and I will tell you whether I can help and
              what good looks like.
            </p>
          </div>

          <div className="flex flex-col gap-6 md:col-span-4 md:col-start-9">
            <a
              href="mailto:michael@hau.ge?subject=Intro%20call"
              className="group inline-flex items-center justify-between gap-4 rounded-lg border border-border px-6 py-5 transition-all hover:border-foreground hover:shadow-sm"
            >
              <div>
                <p className="text-sm text-muted">Email</p>
                <p className="text-base font-medium">michael@hau.ge</p>
              </div>
              <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
                →
              </span>
            </a>
            <a
              href="https://www.linkedin.com/in/michaelhauge/"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-between gap-4 rounded-lg border border-border px-6 py-5 transition-all hover:border-foreground hover:shadow-sm"
            >
              <div>
                <p className="text-sm text-muted">LinkedIn</p>
                <p className="text-base font-medium">@michaelhauge</p>
              </div>
              <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
                ↗
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
