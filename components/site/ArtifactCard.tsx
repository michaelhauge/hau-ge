import type { Artifact } from "@/lib/artifacts";

export function ArtifactCard({ artifact }: { artifact: Artifact }) {
  return (
    <a
      href={artifact.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col overflow-hidden rounded-lg border border-border bg-background transition-all hover:-translate-y-0.5 hover:border-foreground hover:shadow-md"
    >
      <div className="aspect-[16/10] w-full bg-subtle">
        <div className="flex h-full w-full items-center justify-center">
          <span className="text-xs uppercase tracking-widest text-muted">
            {artifact.badge ?? "Artifact"}
          </span>
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
