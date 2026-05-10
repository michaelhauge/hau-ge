import { featuredArtifacts } from "@/lib/artifacts";
import { ArtifactCard } from "./ArtifactCard";

export function FeaturedArtifacts() {
  return (
    <section id="work" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
        <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-3 text-sm font-medium uppercase tracking-widest text-muted">
              Featured Work
              <sup className="ml-1 font-normal normal-case tracking-normal text-muted/60">
                {featuredArtifacts.length}
              </sup>
            </p>
            <h2 className="max-w-2xl text-balance">
              Real artifacts from real engagements.
            </h2>
          </div>
          <p className="max-w-md text-base text-muted">
            What I actually deliver: methodology, structure, and the polish that
            satisfies a senior buyer.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {featuredArtifacts.map((artifact) => (
            <ArtifactCard key={artifact.id} artifact={artifact} />
          ))}
        </div>
      </div>
    </section>
  );
}
