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
              Currently accepting two engagements per quarter.
            </h2>
            <p className="mt-6 max-w-xl text-lg text-muted">
              Email with a request for details and I will reply with the next
              available window.
            </p>
          </div>

          <div className="flex flex-col gap-6 md:col-span-4 md:col-start-9">
            <a
              href="mailto:michael@pertamapartners.com"
              className="group inline-flex items-center justify-between gap-4 rounded-lg border border-border px-6 py-5 transition-all hover:border-foreground hover:shadow-sm"
            >
              <div>
                <p className="text-sm text-muted">Email directly</p>
                <p className="text-base font-medium">michael@pertamapartners.com</p>
              </div>
              <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
                →
              </span>
            </a>
            <a
              href="https://linkedin.com/in/michaelhauge"
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
