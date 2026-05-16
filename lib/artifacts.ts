export type Thumbnail =
  | { kind: "image"; src: string; alt: string }
  | { kind: "stat"; value: string; label: string; sublabel?: string }
  | {
      kind: "brand";
      wordmarkSrc: string;
      wordmarkAlt: string;
      tagline: string;
      chip?: string;
    };

export interface Artifact {
  id: string;
  title: string;
  description: string;
  href: string;
  ctaLabel: string;
  badge?: string;
  /** Label shown in the top-right of the preview tile (e.g., "PDF", "CASE STUDY", "WEB"). Defaults to "PDF". */
  kind?: string;
  /** Custom thumbnail content. Falls back to a generic doc skeleton when omitted. */
  thumbnail?: Thumbnail;
}

export const featuredArtifacts: Artifact[] = [
  {
    id: "sap-case-study",
    title: "“Best training in my time at SAP.”",
    description:
      "12 Learning Days, 5 cities across China, 167 participants. NPS of 94. A 12-month executive training program for SAP’s China teams — the multi-site engagement that taught me how to deliver training at scale.",
    href: "/work/sap",
    ctaLabel: "Read the case study",
    badge: "SAP · Client testimonial",
    kind: "Case study",
    thumbnail: {
      kind: "stat",
      value: "94",
      label: "Net Promoter Score",
      sublabel: "167 participants · 5 cities · 12 days",
    },
  },
  {
    id: "myeo-ai-resources",
    title: "MyEO.AI — open-source AI resources",
    description:
      "Resources I built for MyEO.AI, a MyEO group I founded for entrepreneurs serious about AI. The repo is the engagement: prompts, workflows, deployment guides, all in the open. Implementation work you can read end-to-end.",
    href: "https://github.com/michaelhauge/myeo-ai-resources",
    ctaLabel: "Browse the repo",
    badge: "Implementation · MyEO.AI",
    kind: "GitHub",
    thumbnail: {
      kind: "stat",
      value: "</>",
      label: "Implementation",
      sublabel: "Open-source · MyEO.AI",
    },
  },
  {
    id: "pertama-capital-research",
    title: "Pertama Capital research library",
    description:
      "Twenty-plus investment notes and theses across SEA: family businesses, education, semiconductors, payments, data centers, AI services. The working library behind how I evaluate companies and write checks.",
    href: "https://pertamacapital.com/research",
    ctaLabel: "Browse the research",
    badge: "Patient capital",
    kind: "Research",
    thumbnail: {
      kind: "brand",
      wordmarkSrc: "/artifacts/pertama-capital-wordmark.png",
      wordmarkAlt: "Pertama Capital",
      tagline: "Patient Capital. Permanent Value.",
      chip: "20+ research notes",
    },
  },
  {
    id: "sea-ai-whitepaper",
    title: "AI Adoption in Southeast Asia: 2026 Whitepaper",
    description:
      "Pertama Partners research on how SEA businesses actually use AI today: where money is being spent, where outcomes are showing up, and what the 2026 inflection looks like.",
    href: "/artifacts/pertama-sea-ai-whitepaper-2026.pdf",
    ctaLabel: "Read the whitepaper",
    badge: "Pertama research",
    thumbnail: {
      kind: "image",
      src: "/artifacts/sea-ai-whitepaper-cover.png",
      alt: "Cover of Pertama Partners SEA AI 2026 whitepaper",
    },
  },
];
