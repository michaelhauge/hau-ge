import Image from "next/image";

interface Photo {
  src: string;
  alt: string;
  /** Primary caption — engagement format or moment type. e.g. "Executive workshop", "Media interview", "Panel discussion". */
  label: string;
  /** Secondary detail — cohort size, outlet name, conference name, etc. */
  context: string;
}

/**
 * Photos from live trainings, media moments, panels, and summit talks.
 *
 * Add entries here as photos are added to /public/images/gallery/. Component
 * renders nothing when the array is empty.
 *
 * Captions follow a two-line pattern: label (what kind of moment) + context
 * (where / how many / which outlet). Keeps the gallery durable as time passes
 * and avoids needing fresh permissions for every name we publish.
 */
const photos: Photo[] = [
  {
    src: "/images/gallery/sap-china-workshop-stage.jpg",
    alt:
      "Michael L. Hauge presenting an executive Learning Day at SAP's China office",
    label: "Executive Learning Day",
    context: "SAP China",
  },
  {
    src: "/images/gallery/sap-china-cohort-group.jpg",
    alt:
      "Michael L. Hauge with a participant cohort at SAP's China office, in front of the SAP wordmark",
    label: "Multi-site executive program",
    context: "SAP China",
  },
  {
    src: "/images/gallery/eo-shanghai-keynote.jpg",
    alt:
      "Michael L. Hauge speaking with a microphone at an EO Shanghai chapter event, evening dinner setting",
    label: "Keynote",
    context: "EO Shanghai",
  },
  {
    src: "/images/gallery/peer-network-evening.jpg",
    alt:
      "Michael L. Hauge speaking at a non-profit fundraising dinner",
    label: "Speaker",
    context: "Non-profit fundraising dinner",
  },
  {
    src: "/images/gallery/fireside-chat-wide.jpg",
    alt:
      "Michael L. Hauge in a moderated fireside chat at Deerfield Academy after receiving an Alumni Award",
    label: "Fireside chat",
    context: "Deerfield Academy · Alumni Award recipient",
  },
  {
    src: "/images/gallery/cctv-the-founder-interview.jpg",
    alt:
      "Michael L. Hauge in a media interview on CCTV's 'The Founder' programme",
    label: "Media interview",
    context: "CCTV · 对话星品牌 (The Founder)",
  },
];

export function TrainingGallery() {
  if (photos.length === 0) return null;

  return (
    <section id="in-the-field" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
        <div className="mb-12 max-w-2xl">
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-muted">
            In the field
            <sup className="ml-1 font-normal normal-case tracking-normal text-muted/60">
              {photos.length}
            </sup>
          </p>
          <h2 className="text-balance">A few moments from the work.</h2>
          <p className="mt-4 text-base text-muted">
            Trainings, panels, media, summits. The work happens in rooms, not
            in decks.
          </p>
        </div>

        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {photos.map((p) => (
            <li
              key={p.src}
              className="group flex flex-col overflow-hidden rounded-lg border border-border bg-background"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-subtle">
                <Image
                  src={p.src}
                  alt={p.alt}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </div>
              <div className="flex flex-col gap-1 p-4">
                <p className="text-sm font-medium tracking-tight text-foreground">
                  {p.label}
                </p>
                <p className="text-xs text-muted">{p.context}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
