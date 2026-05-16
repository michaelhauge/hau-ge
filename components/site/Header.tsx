export function Header() {
  return (
    <header className="border-b border-border">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <a href="/" className="text-base font-semibold tracking-tight">
          Michael L. Hauge
        </a>
        <nav className="flex items-center gap-8">
          <div className="hidden items-center gap-8 text-sm text-muted sm:flex">
            <a href="/#work" className="transition-colors hover:text-foreground">
              Work
            </a>
            <a href="/#engagements" className="transition-colors hover:text-foreground">
              Engagements
            </a>
            <a
              href="https://pertamaventures.com/portfolio"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1 transition-colors hover:text-foreground"
            >
              Portfolio
              <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
                ↗
              </span>
            </a>
            <a href="/#about" className="transition-colors hover:text-foreground">
              About
            </a>
            <a
              href="https://linkedin.com/in/michaelhauge"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1 transition-colors hover:text-foreground"
            >
              LinkedIn
              <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
                ↗
              </span>
            </a>
          </div>
          <a
            href="/contact"
            className="group inline-flex items-center gap-1 text-sm font-medium transition-colors hover:text-muted"
          >
            Contact{" "}
            <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
              →
            </span>
          </a>
        </nav>
      </div>
    </header>
  );
}
