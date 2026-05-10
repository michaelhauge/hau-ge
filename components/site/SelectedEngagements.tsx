import { EngagementCard, type Engagement } from "./EngagementCard";

const engagements: Engagement[] = [
  {
    id: "ceo-claude-workshop",
    buyerTitle: "CEO",
    buyerContext: "Mid-market services firm",
    engagement: "1-day Claude adoption workshop",
    outcome:
      "Hands-on session with the executive team. Walked through real workflows, established usage standards, set the tone for company-wide rollout.",
  },
  {
    id: "apac-it-leadership",
    buyerTitle: "APAC IT Head",
    buyerContext: "Fortune 500",
    engagement: "Leadership training at annual offsite",
    outcome:
      "35-person leadership team, full-day program. Frameworks for assessing AI readiness, hands-on practitioner exercises, alignment on what AI actually changes for their function.",
  },
  {
    id: "head-of-learning-program",
    buyerTitle: "Head of Learning",
    buyerContext: "Fortune 500",
    engagement: "13-month executive AI program",
    outcome:
      "167 executives across 5 sites. Cohort-based, sequenced curriculum with measurable behaviour change. Designed to scale beyond me into a sustainable internal capability.",
  },
];

export function SelectedEngagements() {
  return (
    <section id="engagements" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
        <div className="mb-12 max-w-2xl">
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-muted">
            Selected Engagements
          </p>
          <h2 className="text-balance">
            Three recent examples, anonymised by request.
          </h2>
        </div>

        <div>
          {engagements.map((engagement) => (
            <EngagementCard key={engagement.id} engagement={engagement} />
          ))}
        </div>
      </div>
    </section>
  );
}
