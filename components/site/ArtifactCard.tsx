import Image from "next/image";
import type { Artifact, Thumbnail } from "@/lib/artifacts";

export function ArtifactCard({ artifact }: { artifact: Artifact }) {
  const isExternal = artifact.href.startsWith("http");
  const kindLabel = (artifact.kind ?? "PDF").toUpperCase();
  return (
    <a
      href={artifact.href}
      {...(isExternal && { target: "_blank", rel: "noopener noreferrer" })}
      className="group flex flex-col overflow-hidden rounded-lg border border-border bg-background transition-all hover:-translate-y-0.5 hover:border-foreground hover:shadow-md"
    >
      <div className="aspect-[16/10] w-full bg-subtle p-5">
        <div className="flex h-full w-full flex-col overflow-hidden rounded border border-border bg-background">
          <div className="flex items-start justify-between gap-2 px-4 pt-3">
            <span className="text-[10px] font-medium uppercase tracking-widest text-muted">
              {artifact.badge}
            </span>
            <span className="text-[10px] tracking-widest text-muted">{kindLabel}</span>
          </div>
          <ThumbnailBody thumbnail={artifact.thumbnail} />
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

function ThumbnailBody({ thumbnail }: { thumbnail?: Thumbnail }) {
  if (!thumbnail) {
    return (
      <div className="flex flex-1 flex-col justify-end space-y-1.5 px-4 pb-4">
        <div className="h-1.5 w-full rounded bg-foreground/80" />
        <div className="h-1.5 w-11/12 rounded bg-foreground/60" />
        <div className="h-1 w-3/4 rounded bg-muted/40" />
        <div className="h-1 w-4/5 rounded bg-muted/40" />
        <div className="h-1 w-2/3 rounded bg-muted/40" />
      </div>
    );
  }

  if (thumbnail.kind === "image") {
    return (
      <div className="relative flex-1 overflow-hidden">
        <Image
          src={thumbnail.src}
          alt={thumbnail.alt}
          fill
          sizes="(min-width: 768px) 33vw, 100vw"
          className="object-cover object-top"
        />
      </div>
    );
  }

  if (thumbnail.kind === "stat") {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-1 px-4 pb-4 text-center">
        <span className="text-[10px] font-medium uppercase tracking-widest text-muted">
          {thumbnail.label}
        </span>
        <span className="text-6xl font-semibold tracking-tight text-foreground sm:text-7xl">
          {thumbnail.value}
        </span>
        {thumbnail.sublabel && (
          <span className="mt-1 text-[10px] uppercase tracking-widest text-muted">
            {thumbnail.sublabel}
          </span>
        )}
      </div>
    );
  }

  // kind === "brand"
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 pb-4 text-center">
      <Image
        src={thumbnail.wordmarkSrc}
        alt={thumbnail.wordmarkAlt}
        width={300}
        height={50}
        className="h-auto w-3/4 max-w-[220px]"
      />
      <span className="text-[11px] uppercase tracking-widest text-muted">
        {thumbnail.tagline}
      </span>
      {thumbnail.chip && (
        <span className="mt-1 rounded-full border border-border px-2.5 py-0.5 text-[10px] uppercase tracking-widest text-muted">
          {thumbnail.chip}
        </span>
      )}
    </div>
  );
}
