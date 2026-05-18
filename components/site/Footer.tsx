export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-32 border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-12 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>© {year} Michael L. Hauge. Built in the open.</p>
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          <a
            href="https://pertamapartners.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1 transition-colors hover:text-foreground"
          >
            Partners
            <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
              ↗
            </span>
          </a>
          <a
            href="https://pertamacapital.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1 transition-colors hover:text-foreground"
          >
            Capital
            <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
              ↗
            </span>
          </a>
          <a
            href="https://pertamaventures.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1 transition-colors hover:text-foreground"
          >
            Ventures
            <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
              ↗
            </span>
          </a>
          <a
            href="https://github.com/michaelhauge/hau-ge"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1 transition-colors hover:text-foreground"
          >
            GitHub
            <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
              ↗
            </span>
          </a>
          <a
            href="/faq"
            className="transition-colors hover:text-foreground"
          >
            FAQ
          </a>
          <a
            href="mailto:michael@pertamapartners.com"
            className="transition-colors hover:text-foreground"
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
