# hau.ge

Personal site of **Michael L. Hauge** — AI training, implementation, and financial backing for ambitious companies in Southeast Asia.

Live at **[hau.ge](https://hau.ge)**.

## What this is

A credibility-check landing page for senior corporate buyers arriving via warm referral, plus a writing surface for selected work. The site itself is built in the open as a small additional signal: the person you're considering for AI work has shipped his own personal site, deliberately and visibly.

## Pertama Group

Mike runs [Pertama Group](https://pertamagroup.com), a founder-led platform at the intersection of AI, education, and capital:

- **[Pertama Partners](https://pertamapartners.com)** — AI training and advisory
- **[Pertama Capital](https://pertamacapital.com)** — Patient capital for family businesses and private investments
- **[Pertama Ventures](https://pertamaventures.com)** — Early-stage backing for AI-native founders
- **[LearningLeaders](https://learningleaders.com)** — Youth communication and leadership development

## Stack

- **[Next.js 16](https://nextjs.org)** with the App Router
- **React 19** + **TypeScript** (strict)
- **Tailwind CSS v4** (`@theme inline` tokens, no `tailwind.config`)
- **Geist** font via `next/font/google`
- Static rendering for content pages; edge runtime for the OG image + favicon generation
- Deployed to **Vercel** with `hau.ge` as the apex domain

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Building locally

```bash
npm run build && npm run start
```

## Repository structure

```
app/
├── page.tsx              # Homepage
├── layout.tsx            # Root layout, metadata, fonts
├── globals.css           # Tailwind v4 tokens + @layer base typography
├── contact/page.tsx      # Contact form page
├── work/sap/page.tsx     # SAP case study
├── opengraph-image.tsx   # Dynamic OG card (1200x630)
├── icon.tsx              # MLH monogram favicon
├── sitemap.ts
└── robots.ts
components/site/          # Page sections (Hero, About, etc.)
lib/artifacts.ts          # Featured work tile data
public/                   # Headshot, brand wordmarks, artifact thumbnails
```

## Contact

[michael@hau.ge](mailto:michael@hau.ge) · [LinkedIn](https://linkedin.com/in/michaelhauge)
