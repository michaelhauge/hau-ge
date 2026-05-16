import Image from "next/image";

const LOGO_TOKEN = "pk_HfDN9BKuQFKPrQG5wwdEOA";

const outlets: Array<{ name: string; domain: string; href?: string }> = [
  { name: "MIT Technology Review", domain: "technologyreview.com" },
  { name: "Lean.org", domain: "lean.org" },
  { name: "Raise Summit", domain: "raisesummit.com" },
  { name: "People Managing People", domain: "peoplemanagingpeople.com" },
  { name: "Visible.vc", domain: "visible.vc" },
  { name: "Atlan", domain: "atlan.com" },
];

export function PressStrip() {
  return (
    <section className="border-b border-border bg-subtle">
      <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <p className="text-center text-xs font-medium uppercase tracking-widest text-muted">
          My research and work has been featured in
        </p>
        <ul className="mt-12 flex flex-wrap items-center justify-center gap-x-16 gap-y-12 sm:gap-x-20">
          {outlets.map((o) => (
            <li key={o.domain} className="flex h-24 items-center">
              <a
                href={o.href ?? `https://${o.domain}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={o.name}
                title={o.name}
                className="block transition hover:opacity-80"
              >
                <Image
                  src={`https://img.logo.dev/${o.domain}?token=${LOGO_TOKEN}&size=400&format=png`}
                  alt={o.name}
                  width={400}
                  height={120}
                  className="h-20 w-auto object-contain"
                  unoptimized
                />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
