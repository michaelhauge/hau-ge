import { EngagementCard, type Engagement } from "./EngagementCard";

const engagements: Engagement[] = [
  {
    id: "dream-team-group-2026-05",
    date: "May 2026",
    buyerTitle: "Dream Team Group",
    buyerContext: "Named client",
    engagement: "Claude Power User Workshop",
    outcome:
      "Hands-on session for the leadership team to move past basic prompting into production-grade Claude use. Real workflows, evaluation rituals, and the prompt patterns the team would carry forward.",
  },
  {
    id: "openclaw-deployment-2026-04",
    date: "April 2026",
    buyerTitle: "Open training",
    buyerContext: "Founders + executives across SEA",
    engagement: "OpenClaw Deployment Workshop (45+ participants)",
    outcome:
      "Open-enrollment intensive for company founders and senior executives on deploying Claude Code in real organizations. Strong cross-sector cohort, working sessions on adoption playbooks, environment setup, and team-ready workflows.",
  },
  {
    id: "sap-learning-leadership",
    date: "2019 – 2020",
    buyerTitle: "Learning Leadership, SAP China",
    buyerContext: "Fortune 500 enterprise software",
    engagement:
      "13-month executive training program — multi-site, multi-cohort",
    outcome:
      "12 Learning Days across 5 cities, 167 participants, NPS of 94. The 13-month length is the point: clients who start with a workshop almost always extend into longer-term programs once they see what cohort-based, iteratively-improved training actually compounds into.",
  },
  {
    id: "family-business-backing",
    date: "Ongoing",
    buyerTitle: "Family principal",
    buyerContext: "Malaysian family-owned enterprise",
    engagement: "Patient capital + operational modernization — backing",
    outcome:
      "Pertama Capital's family-business work: growth capital paired with operational modernization for businesses that already have durable demand. Quiet partnership, long horizons, AI-era operating discipline brought in without disturbing what already works.",
  },
];

export function SelectedEngagements() {
  return (
    <section id="engagements" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
        <div className="mb-12 max-w-2xl">
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-muted">
            Selected Engagements
            <sup className="ml-1 font-normal normal-case tracking-normal text-muted/60">
              {engagements.length}
            </sup>
          </p>
          <h2 className="text-balance">
            Recent engagements, dated and named where I can.
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
