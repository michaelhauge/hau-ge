import Image from "next/image";

const LOGO_TOKEN = "pk_HfDN9BKuQFKPrQG5wwdEOA";

const clients: Array<{ name: string; domain: string; href?: string }> = [
  { name: "SAP", domain: "sap.com" },
  { name: "Unilever", domain: "unilever.com" },
  { name: "Honeywell", domain: "honeywell.com" },
  { name: "Medtronic", domain: "medtronic.com" },
  { name: "Duke Kunshan University", domain: "dukekunshan.edu.cn" },
  { name: "East China University of Political Science and Law", domain: "ecupl.edu.cn" },
  { name: "China International Travel Service", domain: "cits.net" },
  { name: "China Campus Network", domain: "ccneducation.com.my" },
  { name: "Entrepreneurs' Organization", domain: "eonetwork.org" },
  { name: "Flow Research Collective", domain: "flowresearchcollective.com" },
  { name: "Center for Creative Leadership", domain: "ccl.org" },
  { name: "EY", domain: "ey.com" },
];

export function ClientLogos() {
  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <p className="text-center text-xs font-medium uppercase tracking-widest text-muted">
          Trainings, lectures, and keynotes delivered at
        </p>
        <ul className="mt-12 flex flex-wrap items-center justify-center gap-x-16 gap-y-12 sm:gap-x-20">
          {clients.map((c) => (
            <li key={c.domain} className="flex h-28 items-center">
              <a
                href={c.href ?? `https://${c.domain}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={c.name}
                title={c.name}
                className="block transition hover:opacity-80"
              >
                <Image
                  src={`https://img.logo.dev/${c.domain}?token=${LOGO_TOKEN}&size=400&format=png`}
                  alt={c.name}
                  width={400}
                  height={120}
                  className="h-24 w-auto object-contain"
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
