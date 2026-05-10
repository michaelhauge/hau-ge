export interface Engagement {
  id: string;
  buyerTitle: string;
  buyerContext: string;
  engagement: string;
  outcome: string;
}

export function EngagementCard({ engagement }: { engagement: Engagement }) {
  return (
    <article className="flex flex-col gap-4 border-b border-border py-10 last:border-b-0 sm:flex-row sm:items-start sm:gap-12">
      <div className="sm:w-1/3">
        <p className="text-xs font-medium uppercase tracking-widest text-muted">
          {engagement.buyerTitle}
        </p>
        <p className="mt-1 text-sm text-muted">{engagement.buyerContext}</p>
      </div>
      <div className="flex-1">
        <h3 className="text-xl font-semibold tracking-tight">{engagement.engagement}</h3>
        <p className="mt-3 text-base text-muted">{engagement.outcome}</p>
      </div>
    </article>
  );
}
