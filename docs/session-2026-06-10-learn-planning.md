# Session log — 2026-06-10 — `/learn` planning

> Captures what was discussed and decided in the planning conversation that produced `docs/learn-plan.md`. Read this first when you sit down with Claude Code in the terminal — it's the orientation. The plan file is the build doc.

---

## Purpose of the session

You came in wanting to design a personal AI learning system to embed in hau.ge as `/learn`. You explicitly did not want code yet — just a comprehensive plan you can hand to Claude Code in the terminal when you're home.

The session ended with:

1. A fully decided architecture (no open questions on stack)
2. A six-pillar curriculum with v1 seed reading lists
3. A phased build plan with concrete task lists
4. `docs/learn-plan.md` committed and pushed to `claude/ai-learning-app-adnHU`

No code was written. No accounts were created. No keys were configured.

---

## What `/learn` is, in one paragraph

A private, single-user Next.js app inside hau.ge that combines a curated curriculum (six AI pillars), a vendor-pluggable LLM tutor (Anthropic + OpenAI + OpenRouter), a forced Pertama-application loop on every note, spaced retention (FSRS), semantic retrieval (pgvector + Voyage), a Tutor Lab for living-in agent frameworks side-by-side, and a one-click promote-to-writing pipeline into your existing `/writing` MDX flow. Private behind GitHub OAuth allowlist. Architecturally independent from Pertama Academy; one-way MDX handoff only.

---

## The five non-negotiables (the moat)

Identified during the conversation as the things free YouTube/blogs structurally can't do:

1. **Forced Pertama application** — every note has a required `pertama_application` field; no graduation without it
2. **Adversarial Socratic Critic** — pressure-tests synthesis against a specific senior-buyer persona
3. **Confusion-aware spacing** — review cards auto-created when the tutor catches you fumbling
4. **Personal connection graph** — notes link to other notes *and* to real Pertama engagements
5. **Daily frontier digest** — new papers/posts summarised with "does this change your Pertama thesis?"

If these five aren't operating, the system is just a fancy Notion.

---

## Decisions locked (in order they were made)

| # | Decision | Why |
|---|---|---|
| 1 | Build inside hau.ge as a `/learn` route group, not a separate app | Reuses existing repo, deployment, MDX pipeline. Single domain to maintain. |
| 2 | Private by default; `robots.ts` disallow; GitHub OAuth allowlist of one | Most notes are half-baked. Promotion to `/writing` is a deliberate editorial act. |
| 3 | Neon Postgres + Drizzle ORM + pgvector | Vercel-native, single DB for relational + vector, no codegen step. |
| 4 | Voyage `voyage-3-large` for embeddings | Best non-OpenAI quality, vendor-independent from your tutor. |
| 5 | LLM abstraction with Anthropic + OpenAI + OpenRouter from day one | Tutor must be swappable — you can't truly learn the OpenAI agent paradigm if your tutor only thinks like Claude. |
| 6 | MCP as the tool-use protocol from day one | All three providers support it. Building on MCP teaches you MCP. |
| 7 | FSRS via `ts-fsrs` for spaced repetition | Modern algorithm; npm package handles state. |
| 8 | Six pillars: Theory, Hardware, Companies, Agents, Debates, Scenarios | Covers the full AI understanding stack you need for Pertama. |
| 9 | Agents pillar first (Phase 1), with six sub-tracks | Closest to your daily work, fastest ROI. Sub-tracks: paradigms, vendor SDKs, open frameworks, open-weights models, protocols & infra, production products. |
| 10 | Tutor Lab in Phase 2 — same task run across Claude SDK / OpenAI SDK / LangGraph / Hermes-via-OpenRouter / raw MCP | The point of learning agent systems is living in them, not reading about them. |
| 11 | Promote-to-writing: graduated note → MDX with frontmatter → `content/writing/drafts/<slug>.md`. Manual final review. | You stay the editorial filter. |
| 12 | `/learn` and Pertama Academy are independent | One-way MDX handoff only. No shared DB or infra. |
| 13 | Cost ceiling enforced in middleware; default `$10/day` | Hard-stop at 100%; soft-warn at 70%. |
| 14 | Default models: Sonnet 4.6 for tutor, Opus 4.7 for Critic + Synthesist, Haiku 4.5 for quiz + digest | Price/quality fit per role. |
| 15 | Reading lists drafted as v1 — you edit before wiring | They're a starting position, not taste. |

---

## Curriculum structure (high level — full lists in plan §7)

| Pillar | Sub-tracks |
|---|---|
| Theory | Math foundations → Transformers → Training (SFT/RLHF/DPO) → Scaling → Reasoning → Emergence |
| Hardware | GPU architecture → Memory → Networking → Inference economics → Alt silicon → Datacenters |
| Companies | OpenAI, Anthropic, Microsoft, Google/DeepMind, Meta, xAI, Mistral, DeepSeek, Cohere |
| Agents | Paradigms, Vendor SDKs, Open frameworks, Open-weights models, Protocols & infra, Production products |
| Debates | Scaling vs algorithms, Open vs closed, Alignment camps, LLM reasoning yes/no, AGI timelines |
| Scenarios | Near-term (12-24mo), Medium (3-5y), Long (10+y) across economic/geopolitical/alignment/labour |

V1 reading lists are in plan §7 — ~15-25 sources per pillar. Edit them before Phase 4.

---

## Phased build (high level — full task lists in plan §8-13)

| Phase | What | Calendar | Hours |
|---|---|---|---|
| 0 | Foundations: auth, DB, schema, LLM abstraction, MCP scaffold, seed taxonomy | 1 week | 6-10 |
| 1 | Capture loop: source intake, note editor with required `pertama_application`, Agents pillar populated | 2 weeks | 10-15 |
| 2 | Tutor + Critic + Synthesist + Tutor Lab + 5 MCP servers | 2 weeks | 15-25 |
| 3 | FSRS review queue, hybrid search, daily resurface | 2 weeks | 8-12 |
| 4 | Seed remaining 5 pillars, cross-pillar navigation | 2-3 weeks | 6-10 |
| 5 | Frontier RSS digest, promote-to-writing, Academy export | 1+ week | 8-12 |
| **Total to v1** | | **~10-12 weeks** | **~55-85 hours active** |

Plus the actual learning hours (5-10/week reading + writing through it).

---

## What's in the repo right now

On branch `claude/ai-learning-app-adnHU`:

```
docs/
└── learn-plan.md                          # 1,085 lines, comprehensive build doc
└── session-2026-06-10-learn-planning.md   # this file
```

No application code, no migrations, no schema, no env vars, no accounts wired. Phase 0 has not started.

The existing hau.ge codebase (Next.js 16, Tailwind v4, the `/writing` MDX pipeline, `app/robots.ts`) is untouched and remains the foundation `/learn` will extend.

---

## What still needs to happen *before* Phase 0

Account setup — none of these were done in this session:

- [ ] Neon project + `DATABASE_URL`
- [ ] GitHub OAuth app + client ID/secret
- [ ] Anthropic API key
- [ ] OpenAI API key
- [ ] OpenRouter API key
- [ ] Voyage API key
- [ ] `.env.local` filled in
- [ ] Vercel project env vars mirrored

Full checklist with exact URLs and steps in plan §16.

---

## How to resume in Claude Code (terminal)

When you boot up Claude Code in the repo, this is the kickoff prompt:

> Read `docs/learn-plan.md` and `docs/session-2026-06-10-learn-planning.md`. Confirm you understand the locked decisions (§2 of the plan) and the Phase 0 task list (§8). Don't start coding yet — first walk me through the §16 setup checklist and tell me which env vars I need to put in `.env.local` before you can do anything useful. Then pause and wait.

After you've done the account setup:

> Execute Phase 0 task by task, starting with #1 (branch + dependencies). Pause after each numbered task and let me verify before moving on. Stay on branch `claude/ai-learning-app-adnHU`. Don't commit until I tell you to. When you hit a decision point not specified in the plan, ask me — don't guess.

The plan's §18 also has mid-phase prompt templates ("we're at Phase 1 task 4...") and a "when something in the plan is wrong" pattern.

---

## Anti-goals (don't drift into these)

Listed in plan Appendix B but worth flagging here so terminal-Claude doesn't suggest them:

- Public dashboard or shareable progress (defeats private-by-default)
- Gamification — streaks, points, badges (antithetical to durable learning)
- Multi-user / multi-tenant (that's Academy, not `/learn`)
- AI-generated notes without human edit (kills the synthesis loop)
- Auto-promote graduated notes to public (kills editorial control)
- Free-tier-everything mindset (pay for Opus on the Critic; the cost is tiny vs. the learning value)

---

## What was *not* decided (deferred)

Plan §17 lists these. Quick recap so you know they're open:

- Mobile / PWA (probably yes for review, defer until Phase 3 ships)
- Voice notes (Whisper → Claude — defer)
- PDF in-app annotation (probably overbuilt for v1)
- Embed-on-write vs cron-batch (cron-batch for now)
- Where nightly backups go (decide in Phase 1)
- Single-note public read-only sharing (defer)
- Connecting community MCP servers (Slack, Linear, Calendar — defer to Phase 5)

---

## A note on this log

This is a snapshot at the end of the planning conversation, not living documentation. Once you start building, the plan file (`docs/learn-plan.md`) is the source of truth — update it when reality diverges. This log stays frozen as the record of where the planning ended.
