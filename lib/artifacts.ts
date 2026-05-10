export interface Artifact {
  id: string;
  title: string;
  description: string;
  href: string;
  ctaLabel: string;
  badge?: string;
}

export const featuredArtifacts: Artifact[] = [
  {
    id: "meridian-audit",
    title: "AI Readiness Audit: Meridian Logistics",
    description:
      "A sample 5-section audit showing how I assess where AI fits in a mid-market firm. Maturity scorecard, opportunity map, workflow blueprints, training plan, ROI projection.",
    href: "/artifacts/meridian-logistics-ai-readiness-audit.pdf",
    ctaLabel: "Read the sample audit",
    badge: "Sample report",
  },
  {
    id: "ai-curriculum",
    title: "AI Curriculum Sample Module",
    description:
      "How I design AI training for senior leaders. Pedagogical structure, practitioner-led activities, Kirkpatrick-aligned evaluation. One sample module from a longer program.",
    href: "/artifacts/ai-curriculum-sample-module.pdf",
    ctaLabel: "Read the module",
    badge: "Curriculum sample",
  },
  {
    id: "sea-ai-whitepaper",
    title: "AI Adoption in Southeast Asia: 2026 Whitepaper",
    description:
      "Pertama Partners research on how SEA businesses actually use AI today: where money is being spent, where outcomes are showing up, and what the 2026 inflection looks like.",
    href: "/artifacts/pertama-sea-ai-whitepaper-2026.pdf",
    ctaLabel: "Read the whitepaper",
    badge: "Pertama research",
  },
];
