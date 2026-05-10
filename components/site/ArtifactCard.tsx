import type { Artifact } from "@/lib/artifacts";

export function ArtifactCard({ artifact }: { artifact: Artifact }) {
  return (
    <a
      href={artifact.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col overflow-hidden rounded-lg border border-border bg-background transition-all hover:-translate-y-0.5 hover:border-foreground hover:shadow-md"
    >
      <div className="aspect-[16/10] w-full bg-subtle p-5">
        <div className="flex h-full w-full flex-col justify-between rounded border border-border bg-background p-4">
          <div className="flex items-start justify-between gap-2">
            <span className="text-[10px] font-medium uppercase tracking-widest text-muted">
              {artifact.badge}
            </span>
            <span className="text-[10px] tracking-widest text-muted">PDF</span>
          </div>
          <div className="space-y-1.5">
            <div className="h-1.5 w-full rounded bg-foreground/80" />
            <div className="h-1.5 w-11/12 rounded bg-foreground/60" />
            <div className="h-1 w-3/4 rounded bg-muted/40" />
            <div className="h-1 w-4/5 rounded bg-muted/40" />
            <div className="h-1 w-2/3 rounded bg-muted/40" />
          </div>
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6">
        {artifact.badge && (
          <span className="text-xs font-medium uppercase tracking-widest text-muted">
            {artifact.badge}
          </span>
        )}
        <h3 className="text-xl font-semibold tracking-tight">{artifact.title}</h3>
        <p className="flex-1 text-sm text-muted">{artifact.description}</p>
        <span className="mt-2 inline-flex items-center gap-1 text-sm font-medium">
          {artifact.ctaLabel}
          <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
            →
          </span>
        </span>
      </div>
    </a>
  );
}
