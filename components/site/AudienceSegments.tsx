"use client";

import { useState } from "react";

interface Segment {
  id: string;
  tabLabel: string;
  eyebrow: string;
  headline: string;
  body: string;
  bullets: string[];
  ctaLabel: string;
  ctaHref: string;
  ctaExternal?: boolean;
}

const segments: Segment[] = [
  {
    id: "family-business",
    tabLabel: "Family business",
    eyebrow: "Sweet spot — Pertama Capital",
    headline: "I come out of a family business myself.",
    body:
      "I&rsquo;m fourth-generation in a U.S. family business. That&rsquo;s why Pertama Capital exists: patient capital and operational modernization for family-owned enterprises in Malaysia and Singapore that already have durable demand and want to professionalize without losing what makes them work. Succession and next-gen transition is usually the real conversation underneath the operational one.",
    bullets: [
      "Patient capital — minority, controlling, or seller-financed structures",
      "Succession and next-gen leadership transitions",
      "Operational modernization without disturbing what already works",
      "Confidential conversations; long horizons; quiet partnership",
      "Based in Kuala Lumpur · 12 years operating in China, 3 in Malaysia",
      "Conversations and training available in English or Mandarin",
    ],
    ctaLabel: "See the family-business thesis on Pertama Capital",
    ctaHref: "https://pertamacapital.com/family-businesses",
    ctaExternal: true,
  },
  {
    id: "enterprise",
    tabLabel: "Enterprise",
    eyebrow: "Consulting & advisory",
    headline: "Senior leadership-team training at F500 scale.",
    body:
      "Multi-site, multi-cohort training programs for large enterprises that want their senior teams to actually use AI well, not just have it described to them. The SAP engagement is the canonical shape: a year-plus program, cohort by cohort, site by site, with iterative improvement and leadership retrospectives at every location.",
    bullets: [
      "Multi-site, multi-cohort program design and delivery",
      "Senior leadership team workshops, not vendor feature tours",
      "Iterative curriculum tuned site-by-site with leadership input",
      "Measurable behaviour change and durable artifacts the org keeps",
      "Bench depth: ~2 lead engagements per quarter; partner network covers SEA regional rollouts in Bahasa Malaysia, Bahasa Indonesia, Mandarin, and English",
      "Train-the-trainer: after cohort 1, your internal facilitators run subsequent cohorts with my guide + shadowing",
    ],
    ctaLabel: "Read the SAP case study",
    ctaHref: "/work/sap",
  },
  {
    id: "mid-market",
    tabLabel: "Mid-market",
    eyebrow: "Full implementation — Pertama Partners",
    headline: "Where the training becomes the rollout.",
    body:
      "For mid-market companies, the gap between &ldquo;our team did the workshop&rdquo; and &ldquo;our team is shipping faster&rdquo; is where most AI investment dies. Pertama Partners is built to close that gap: training paired with hands-on implementation, prompt libraries, evaluation rituals, and the embed work that turns capability into habit.",
    bullets: [
      "End-to-end implementation: discovery → workshops → rollout → embed",
      "Prompt libraries and evaluation rituals the team will actually use",
      "Cross-functional adoption, not just an L&D-led program",
      "Working alongside operators, not handing them a deck",
      "Bench depth via the Pertama Partners network when the work scales past one operator",
    ],
    ctaLabel: "Browse Pertama Partners research",
    ctaHref: "https://pertamapartners.com",
    ctaExternal: true,
  },
  {
    id: "startup",
    tabLabel: "Startup",
    eyebrow: "Early-stage backing — Pertama Ventures",
    headline: "First cheques for AI-native operators.",
    body:
      "Through Pertama Ventures, I back exceptional early-stage founders in AI, FinTech, Education, and Consumer. Portfolio includes Stripe, Patreon, Eight Sleep, Wonderschool, Codingal, Sandbox VR, Terraformation, and Dapper Labs — 100+ investments across six continents over 15+ years. SEA founders building AI-native companies are the focus going forward.",
    bullets: [
      "First-cheque investment, syndicate participation, fund LP positions",
      "Operator support — GTM testing, hiring path, enterprise intros in SEA",
      "Active portfolio of 100+ investments across six continents",
      "Sectors: AI, FinTech, Education, Consumer",
    ],
    ctaLabel: "See the Ventures portfolio",
    ctaHref: "https://pertamaventures.com/portfolio",
    ctaExternal: true,
  },
];

export function AudienceSegments() {
  // Default to "Enterprise" — most warm-referral buyers arrive looking for
  // training and credibility proof first. Family business remains the sweet
  // spot for capital but is rarely the first frame for new visitors.
  const defaultId = segments.find((s) => s.id === "enterprise")?.id ?? segments[0].id;
  const [activeId, setActiveId] = useState(defaultId);
  const active = segments.find((s) => s.id === activeId) ?? segments[0];

  return (
    <section id="who-i-work-with" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
        <div className="mb-12 max-w-2xl">
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-muted">
            Who I work with
          </p>
          <h2 className="text-balance">
            Four audiences, one practice.
          </h2>
          <p className="mt-4 text-base text-muted">
            Same operator, four distinct shapes of engagement. Pick the one
            that fits your situation.
          </p>
        </div>

        <div
          role="tablist"
          className="-mx-6 flex gap-1 overflow-x-auto border-b border-border px-6 sm:mx-0 sm:flex-wrap sm:gap-2 sm:px-0"
        >
          {segments.map((s) => {
            const isActive = s.id === activeId;
            return (
              <button
                key={s.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveId(s.id)}
                className={`relative -mb-px flex-shrink-0 whitespace-nowrap border-b-2 px-3 py-3 text-xs font-medium transition-colors sm:px-4 sm:text-sm ${
                  isActive
                    ? "border-foreground text-foreground"
                    : "border-transparent text-muted hover:text-foreground"
                }`}
              >
                {s.tabLabel}
              </button>
            );
          })}
        </div>

        <div className="mt-10 grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="text-xs font-medium uppercase tracking-widest text-muted">
              {active.eyebrow}
            </p>
            <h3
              className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl"
              dangerouslySetInnerHTML={{ __html: active.headline }}
            />
          </div>
          <div className="space-y-6 md:col-span-7">
            <p
              className="text-base text-muted"
              dangerouslySetInnerHTML={{ __html: active.body }}
            />
            <ul className="space-y-2.5 text-base text-foreground">
              {active.bullets.map((b) => (
                <li key={b} className="flex gap-3">
                  <span aria-hidden className="mt-1.5 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-foreground" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            <div className="pt-2">
              <a
                href={active.ctaHref}
                {...(active.ctaExternal && {
                  target: "_blank",
                  rel: "noopener noreferrer",
                })}
                className="group inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-muted"
              >
                {active.ctaLabel}
                <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
                  {active.ctaExternal ? "↗" : "→"}
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
