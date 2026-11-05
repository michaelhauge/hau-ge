# Pertama Learning Engine — `/learn`

> Personal AI learning system for Michael L. Hauge — capture, synthesis, retention, and Pertama-Partners-specific application over a 12+ month horizon.
>
> **Revision 2 — 2026-11-05.** Rewritten around a thin first slice. The original 2026-06-10 plan (six phases, infrastructure first) is preserved in git at commit `6dd9fb5`; the reasons for the rewrite are in §1 and in `docs/session-2026-11-05-learn-revisit.md`.

---

## 0. TL;DR

The goal and the five-part moat are unchanged. The build order is inverted.

The original plan put 6–10 hours of plumbing (OAuth, Neon, Drizzle, pgvector, a three-provider LLM abstraction, an MCP scaffold) in front of writing the first note, and didn't reach the Critic until week four or five. Five months after it was written, none of it had started. This revision gets the moat working first and adds infrastructure only when real use creates the need.

- **Slice 1 (one or two evenings, ~4–8h of build):** notes are Markdown files in a **private** repo. Writing a note has one forcing function: it can't graduate unless the `## What this means for Pertama` section has been through the **Critic**. The Critic is a sceptical Southeast Asian family-conglomerate CFO on Claude Opus 5.5, and every misconception it catches becomes a review card. A small CLI in hau.ge (`npm run learn -- …`) drives all of it. No database, no auth, no web UI.
- **Slice 2 (~8–12h):** a Socratic Tutor in the terminal, quiz-me, FSRS review, promote-to-`/writing`, and a daily frontier digest run by a GitHub Action. After Slice 2, all five moat items are running.
- **Platform phase (gated):** Neon, pgvector, embeddings, hybrid search, and a web UI at `hau.ge/learn` behind GitHub OAuth. It's built only when the gate in §7 trips, i.e. when there are enough notes that files and grep stop being enough.
- **Tutor Lab phase:** the vendor-comparison lab (Claude vs OpenAI vs open-weights), plus building one real MCP server. This is where OpenAI and OpenRouter come in.

**Why two repos:** `michaelhauge/hau-ge` is **public**. Notes, Pertama reflections, and engagement context go in a private repo (`hau-ge-learn`). The tooling lives in hau.ge. Promoting a note means copying it from the private repo into the public one, and that copy is the editorial act.

---

## 1. What changed in this revision

| Area | Original (2026-06-10) | Now (2026-11-05) | Why |
|---|---|---|---|
| Build order | Infra first (Phase 0), Critic in Phase 2 (weeks 4–5) | Critic and graduation gate first (Slice 1) | Five months, zero commits. The on-ramp was too long for an evenings-and-weekends build. The moat should be the first thing that runs. |
| Note storage | Neon Postgres from day one | Markdown files in a private git repo; DB gated (§7) | Git gives history, diff, backup, and editor freedom for free. A DB is worth it at ~30+ notes or when phone access matters, not before. |
| Where notes live | `app/(learn)` inside hau.ge (backed by Neon) | Private repo `hau-ge-learn`, tooling in hau.ge reads it via `LEARN_HOME` | hau.ge is a **public** repo. The first revisit proposal (MDX under `content/learn/`) would have published every note. |
| Auth | NextAuth + GitHub OAuth in Phase 0 | None until there's a web UI (Platform phase) | A local CLI over a private repo needs no auth. |
| LLM layer | Three-provider abstraction (Anthropic/OpenAI/OpenRouter) in Phase 0 | Anthropic SDK direct; multi-vendor in the Tutor Lab phase | Vendor comparison is a real learning goal, but it belongs in the Lab. Building it before note #1 was the biggest single piece of yak-shaving in the original plan. |
| MCP | MCP scaffold in Phase 0; six custom servers | Web search, web fetch, and code execution are now **server-side tools** on the Claude API. Build one MCP server (over your notes) in the Lab phase. | Three of the six planned servers became API features. The one worth building yourself is the one that teaches you the most: your notes exposed to Claude Code and Claude desktop. |
| Models | Sonnet 4.6 tutor, Opus 4.7 Critic, Haiku 4.5 quiz/digest | Sonnet 5.5 tutor, Opus 5.5 Critic, Haiku 5.5 quiz/digest (§9) | Model generation moved on. |
| Pricing | Opus at $15/$75 per MTok | Fill from the live pricing page at build time; the tool refuses to run a model with no price entry | The original table was already ~3× too high for Opus-tier in June 2026 ($5/$25). Unverified prices shouldn't be hardcoded. |
| Thinking API | Not specified (implicitly `budget_tokens`) | Adaptive thinking + `output_config.effort` | `budget_tokens` is rejected on the 4.7+ family. Verify against the 5.5 docs when wiring. |
| Promote target | `content/writing/drafts/<slug>.md` | `content/writing/<slug>.md` with `draft: true` | That's the repo's actual convention (`scripts/new-post.sh`, filtered in `lib/writing.ts`). There is no `drafts/` dir. |
| Six-pillar coverage | A build phase (Phase 4) | Not a build phase. A pillar is a frontmatter field; covering pillars is reading, not code. | Agents-first is reading order, not architecture. |
| Cost ceiling | $10/day | $5/day default | A Critic pass is roughly $0.05–0.20 at Opus-tier rates. $5 is ~25+ critiques. Raise it when you need to. |
| Calendar | 10–12 weeks, 55–85h to v1 | Slices 1–2: ~12–20h. Platform and Lab only if triggered. | Value arrives in week one, not week five. |

---

## 2. Goal & moat

### Goal

> Develop the world's most effective learning engine to understand and apply AI — built explicitly for Michael and his work at Pertama Partners.

### Why a custom build over free resources

Free YouTube, blogs, and papers are *better than anything you'd recreate*. The leverage of a custom system is **not in the content**. It's in five things the free resources structurally can't do:

1. **Forced Pertama application.** Every note has a required "What this means for Pertama" section. No graduation without it. This is the biggest single moat: it turns passive consumption into Pertama-specific synthesis on every input.
2. **Adversarial Socratic loop.** The Critic pressure-tests your synthesis against a specific senior-buyer persona and flags shallow reasoning.
3. **Confusion-aware spacing.** When you fumble a concept, a review card is created automatically. Anki doesn't watch you struggle in real time.
4. **Personal connection graph.** Notes link to other notes *and* to real Pertama engagements, so theory always lands on a real deal.
5. **Daily frontier digest.** New papers and posts in your six pillars, each with one question: "does this change your Pertama thesis?" Free resources don't track *your* current position.

If these five aren't operating, the system is just a fancy Notion.

### When each moat item turns on

| Moat item | Slice 1 | Slice 2 | Platform |
|---|---|---|---|
| 1. Forced Pertama application | ✅ graduation gate | | |
| 2. Adversarial Critic | ✅ `learn critic` | | |
| 3. Confusion-aware spacing | ◐ Critic misconceptions → cards (no scheduler yet) | ✅ Tutor-caught fumbles → cards; FSRS review | phone review |
| 4. Connection graph | ◐ `links` + `engagements` frontmatter, validated by `learn check` | | ✅ graph and engagement pages, semantic "related notes" |
| 5. Frontier digest | | ✅ daily GitHub Action | |

---

## 3. Decisions

### Still locked (carried over)

| Concern | Decision |
|---|---|
| Visibility | Private by default. Promotion to `/writing` is a deliberate, manual editorial act. |
| The forcing function | No note graduates without a non-trivial `## What this means for Pertama` section **that the Critic has seen in its current form**. |
| Critic persona | CFO of a Southeast Asian family conglomerate: sceptical, time-poor, has heard all the AI hype. |
| Spaced repetition | FSRS via `ts-fsrs` (Slice 2). |
| First pillar | **Agents**, as reading order. All six pillars are valid from day one. |
| Academy | `/learn` and Pertama Academy stay independent; one-way MDX handoff only. |
| Anti-goals | Appendix B. Unchanged, plus two additions. |

### Changed in this revision

| Concern | Decision |
|---|---|
| Note storage | Markdown + YAML frontmatter files in private repo `michaelhauge/hau-ge-learn` |
| Tooling location | `learn/` directory in hau.ge (public). Reads and writes `LEARN_HOME` (local path to the private clone) |
| Interface | CLI (`npm run learn -- <command>`) + your editor of choice. Web UI is Platform-phase |
| LLM | `@anthropic-ai/sdk` directly. No abstraction layer until the Lab |
| Defaults | Critic: `claude-opus-5-5`. Tutor: `claude-sonnet-5-5`. Cheap/bulk: `claude-haiku-5-5` |
| Cost guard | Per-call cost logged to `LEARN_HOME/costs.jsonl`; daily ceiling `LEARN_DAILY_COST_CEILING_USD=5`; refuse to call any model missing from the price table |
| Backups | Solved by git: push the private repo. (Was an open question.) |

### Deferred (decide when you get there)

Database and embedding vendor, auth library, web UI framework details, Lab variants. All Platform or Lab phase. Don't decide them now.

---

## 4. Architecture

```
~/code/
├── hau-ge/                         PUBLIC — github.com/michaelhauge/hau-ge
│   ├── learn/                      the tooling (new)
│   │   ├── cli.ts                  entry: npm run learn -- <command>
│   │   ├── commands/               init, new, check, critic, graduate, status  (Slice 1)
│   │   │                           tutor, quiz, review, promote, digest        (Slice 2)
│   │   ├── lib/
│   │   │   ├── home.ts             resolves + validates LEARN_HOME
│   │   │   ├── notes.ts            parse/validate notes (gray-matter, already a dep)
│   │   │   ├── claude.ts           one Anthropic client + call helper, cost logging
│   │   │   ├── prices.ts           per-model $/MTok, filled from the live pricing page
│   │   │   └── cost.ts             daily ledger + ceiling check
│   │   └── prompts/
│   │       ├── critic.md
│   │       ├── tutor.md            (Slice 2)
│   │       └── digest.md           (Slice 2)
│   └── content/writing/            existing /writing pipeline (promote target)
│
└── hau-ge-learn/                   PRIVATE — github.com/michaelhauge/hau-ge-learn
    ├── notes/<slug>.md             your notes (you write these, always)
    ├── critiques/<slug>/<ts>.md    Critic output, one file per pass
    ├── cards/<slug>.json           review cards (Critic + Tutor + quiz)
    ├── sessions/<slug>/<ts>.md     Tutor transcripts (Slice 2)
    ├── frontier/<date>.md          daily digest (Slice 2)
    ├── engagements.md              Pertama engagement registry + private context
    ├── feeds.md                    digest sources (Slice 2)
    └── costs*.jsonl                spend ledger (local + digest Action)
```

The prompts live in the public repo deliberately, because they're code that ships with the tool. Nothing about a specific client beyond what's already on hau.ge goes in a prompt. Private engagement context lives only in `hau-ge-learn/engagements.md` and is injected at call time.

---

## 5. Slice 1 — The moat, minimally (~4–8h build)

**Outcome:** you can read a source, write a note, get it pressure-tested by the Critic, revise, and graduate it, all within one sitting.

### Note format

```markdown
---
title: "ReAct is a loop, not a prompt"
pillar: agents              # theory | hardware | companies | agents | debates | scenarios
topic: paradigms            # free text; the Agents sub-tracks in §10 are a good starting set
status: draft               # draft | graduated   (set by the tool, not by hand)
sources:
  - https://arxiv.org/abs/2210.03629
engagements: [april-2026-exec-training]   # slugs from engagements.md
links: [tool-use-is-just-json]            # slugs of other notes
created: 2026-11-05
graduated:                  # set by `learn graduate`
---

Your synthesis, in your words. Not a summary of the paper. What you now
believe and why.

## What this means for Pertama

The required section. What changes in how you advise, train, or invest
because of this? Name the engagement, the client situation, the decision.
```

Rules enforced by `learn check`:
- frontmatter fields present and typed; `pillar` is one of the six
- every `engagements` slug exists in `engagements.md`; every `links` slug exists in `notes/`
- slug = filename; `status` is `draft` or `graduated`

### `engagements.md` format

```markdown
## april-2026-exec-training
**Public:** Executive Team Training, 15 participants, 20+ workflows built in 4 hours.
**Private context:** what you actually observed — resistance, what landed, what didn't.
The Critic sees this. It never leaves the private repo.

## dream-team-group
...
```

One `##` heading per engagement, heading text = slug. Seed it with the engagements already public on hau.ge, then add private context. (No client PII. Titles and your own reflections only, as in the original plan.)

### Commands

| Command | Does |
|---|---|
| `learn init` | Verifies `LEARN_HOME` exists and is a git repo; creates the directory layout from §4 and a starter `engagements.md` and `README.md` if missing. Idempotent. |
| `learn new <slug> --pillar <p> [--topic <t>]` | Writes `notes/<slug>.md` from the template above (status `draft`, today's date). Refuses if the file exists. Opens `$EDITOR` if set (same behaviour as `scripts/new-post.sh`). |
| `learn check` | Validates every note (rules above). Non-zero exit on any error, so it works as a pre-commit hook in the private repo. |
| `learn critic <slug>` | The Critic pass (below). |
| `learn graduate <slug>` | Applies the gate (below); sets `status: graduated` and `graduated: <today>`. |
| `learn status` | Counts by pillar and status; drafts awaiting a Critic pass; drafts whose last critique is stale; today's spend vs ceiling; progress toward the Platform gate (§7). Counts only. No streaks, no scores (Appendix B). |

### The Critic pass

1. Load the note. Compute `note_hash = sha256(body)`, where the body excludes frontmatter, so graduating doesn't invalidate a critique.
2. Load the private context for each slug in `engagements`.
3. Check the daily ceiling (§9). Refuse if over.
4. Call `claude-opus-5-5` with:
   - **system:** `learn/prompts/critic.md`, stable, cached (`cache_control`)
   - **user:** engagement context, then the note
   - adaptive thinking; `effort: high`
   - structured output (`output_config.format`, JSON schema):
     ```json
     {
       "verdict": "holds | shallow | wrong",
       "critique": "markdown, ≤ 300 words, in the persona's voice",
       "gaps": ["what a sceptical buyer would ask that the note doesn't answer"],
       "misconceptions": [
         { "claim": "what the note asserts", "question": "a review-card question", "answer": "the correct answer" }
       ]
     }
     ```
5. Write `critiques/<slug>/<YYYY-MM-DD-HHmm>.md` with frontmatter `note_hash`, `model`, `verdict`, `cost_usd`, followed by the critique and gaps.
6. Append each misconception to `cards/<slug>.json` as `{ id, question, answer, source: "critic", created }`. This is moat item #3 in embryo. The FSRS scheduler arrives in Slice 2, and these cards are already waiting for it.
7. Print the verdict, critique, and gaps to the terminal.
8. Log usage and cost to `costs.jsonl`.

### `prompts/critic.md` — spec

Write it in your voice. Claude Code should draft it and you rewrite it. It must:
- Establish the persona: CFO of a Southeast Asian family conglomerate. Sceptical, time-poor, has sat through a dozen AI vendor pitches, cares about cost, control, and what happens to their people.
- Judge **only** the Pertama application and the reasoning that supports it, not the prose.
- Ask the questions she'd actually ask: "Why should I care?" "What specifically would you change in our business?" "What's the failure mode, and who carries it?" "What does it cost, and when do I see the return?"
- Use the engagement context to make questions concrete, and never echo private context back verbatim.
- Return `shallow` when the application is generic (could be said about any AI topic or any client), and `wrong` when the underlying technical claim is incorrect.
- Never rewrite the note. The Critic critiques; you write. (Appendix B: no AI-generated notes.)

### The graduation gate

`learn graduate <slug>` succeeds only if **all** of these hold:

1. `learn check` passes for this note.
2. The `## What this means for Pertama` section exists and has **≥ 60 words** (configurable; the number is a tripwire against "TBD", not a quality bar).
3. At least one critique exists whose `note_hash` matches the **current** body, meaning the Critic has seen exactly what you're graduating.

The verdict is **not** a gate. If the Critic says `shallow` and you disagree, you can still graduate. You're the editor. But you can't graduate something the Critic hasn't seen. That's the forcing function: every graduated note has survived a hostile reader, even if you overruled it.

### Tasks (for Claude Code)

1. **Private repo.** *You* create `michaelhauge/hau-ge-learn` on GitHub (private), clone it beside hau-ge, and add `LEARN_HOME=/absolute/path/to/hau-ge-learn` to hau-ge's `.env.local` (already gitignored via `.env*`).
2. **Dependencies.** `npm install @anthropic-ai/sdk` and `npm install -D tsx`. Add `"learn": "tsx learn/cli.ts"` to `package.json` scripts. Load `.env.local` without adding `dotenv` if the installed Node supports `process.loadEnvFile`; otherwise add `dotenv`. Confirm `learn/` doesn't affect `next build` or `npm run lint`.
3. **`learn/lib/home.ts`, `notes.ts`** plus `init`, `new`, `check`.
4. **`learn/lib/prices.ts`, `cost.ts`, `claude.ts`.** Fill prices from the live pricing page. A model not in the table is a hard error.
5. **`prompts/critic.md`.** Claude drafts it, you rewrite it in your voice. Don't skip the rewrite.
6. **`learn critic`.** End to end against a real note.
7. **`learn graduate`, `learn status`.**
8. **Pre-commit hook** in the private repo that runs `learn check`. Optional, but cheap.

### Exit criteria

- Three real notes from the Agents reading list (§10, 4a is a good start), each through at least one Critic pass
- At least one note **revised in response to a critique** and then graduated
- `cards/` has entries; `costs.jsonl` shows spend; `learn status` reflects it all
- The private repo is pushed (that's the backup)

---

## 6. Slice 2 — Living in the loop (~8–12h build)

**Outcome:** all five moat items running. You review cards, talk concepts through with the Tutor, get a daily digest, and can promote a graduated note to `/writing`.

### Tasks

1. **`learn tutor <slug>`: Socratic Tutor in the terminal**
   - `claude-sonnet-5-5`, streaming, adaptive thinking
   - Cached context prefix: `prompts/tutor.md` + the note + its `links` notes + referenced engagements. (Order matters for caching: stable content first.)
   - `prompts/tutor.md`: never answers directly first; asks "what do you think happens if…"; pushes on the weakest claim in the note
   - Server-side **web search / web fetch** tools so it can check claims against sources. Verify current tool type strings when wiring; don't build MCP servers for these
   - On exit: one structured call (Haiku 5.5) extracts misconceptions you showed in the conversation → `cards/<slug>.json` with `source: "tutor"`. This is the real moat #3: cards come from *your* fumbles, not the note's
   - Transcript saved to `sessions/<slug>/<ts>.md`

2. **`learn quiz <slug>`.** Haiku 5.5 proposes 5 cards; you accept, edit, or reject each in the terminal before anything is written.

3. **`learn review`: FSRS**
   - `ts-fsrs`; FSRS state stored on each card in `cards/*.json`
   - Shows due cards across all notes; space shows the answer; 1–4 grades (Again/Hard/Good/Easy)
   - Prints how many are due tomorrow. Nothing else.

4. **`learn promote <slug>`**
   - Graduated notes only
   - Writes `hau-ge/content/writing/<slug>.md` using the existing convention (`title`, `date`, `excerpt: ""`, `tags: []`, `draft: true`, matching `scripts/new-post.sh`)
   - **Strips** the `## What this means for Pertama` section and all `/learn`-specific frontmatter. Private reflections don't travel to the public repo
   - Refuses if the target exists. Doesn't stage or commit anything
   - From there it's your existing flow: edit, remove `draft: true`, `npm run publish-post -- <slug>`
   - Note: a promoted draft sits in the public repo's working tree. It becomes public only when you commit it, which is the editorial act

5. **`learn digest` + GitHub Action (moat #5)**
   - `feeds.md` in the private repo: per-pillar RSS/Atom feeds (arXiv cs.CL/cs.LG/cs.AI listings, lab blogs, Stratechery, SemiAnalysis, etc.). `npm install rss-parser`
   - Pull items from the last 24h, dedupe against previous `frontier/*.md`
   - Haiku 5.5 summarises each in ≤ 3 sentences, then picks the 3 items most relevant to your **graduated notes' Pertama sections** and writes a "does this change your thesis on ___?" question for each, naming the note
   - Writes `frontier/<YYYY-MM-DD>.md`
   - Runs daily as a **GitHub Action in the private repo**: check out both repos (hau-ge is public, so no token is needed for it), run `learn digest`, commit the result. `ANTHROPIC_API_KEY` as an Actions secret. Same cost ceiling applies
   - Acting on it: a digest item worth keeping becomes a `learn new` note. No in-app inbox until the Platform phase

### Exit criteria

- A week of daily digests landed, and at least one became a note
- At least one review session from the FSRS queue
- At least one Tutor session produced a card you wouldn't have written yourself
- At least one note promoted to a `/writing` draft (publishing it is optional)

---

## 7. The Platform gate, and the Platform phase

### The gate

Build the Platform phase when **any** of these is true:

- **≥ 30 graduated notes**, and finding things by editor search or grep is failing you about weekly
- You want **capture or review on your phone** often enough to notice its absence
- The Tutor or digest would clearly benefit from **semantic retrieval** across notes (it keeps missing a connection you know is there)

And one condition that means **don't** build it:

- If after six weeks of Slices 1–2 you're writing **fewer than two notes a week**, the bottleneck isn't infrastructure. Fix the curriculum, the reading habit, or the prompts first.

### What the Platform phase builds

Roughly the original plan's Phases 0 and 3, informed by what the file formats taught you:

- **Database:** Neon Postgres + Drizzle + pgvector were the original picks and are still reasonable. Re-check before committing. The original schema (commit `6dd9fb5`, §4) is a starting point, but derive the real schema from the file formats you actually used.
- **Import:** a script that loads `hau-ge-learn` into the DB. Decide then whether files stay the source of truth (DB as index) or the DB takes over. Files-as-truth with a DB index is the lower-risk default.
- **Embeddings:** the original pick was Voyage `voyage-3-large` (1024-d). Check what's current before choosing.
- **Hybrid search:** full-text + vector, reciprocal rank fusion, filter by pillar, engagement, and status (original Phase 3, task 3).
- **Web UI:** `app/(learn)/` in hau.ge. Note reading/editing, review queue (PWA for phone), search, engagement and pillar pages (the connection graph, original Phase 4 task 2), a frontier inbox.
- **Auth:** GitHub OAuth, allowlist of one (`michaelhauge`), middleware on `/learn/:path*`, `robots.ts` disallow `/learn`. Check the current Auth.js release before choosing a version.
- **Resurface:** daily "how does [recent source] connect to [stale note]?" (original Phase 3, task 4).

---

## 8. Tutor Lab phase — learning agent systems by living in them

Independent of the Platform gate. Do it whenever the Agents pillar makes you want to.

1. **Build one MCP server: `learn-notes`.**
   - Exposes `search_notes`, `read_note`, `list_engagements`, and `list_cards` over `LEARN_HOME`
   - Connect it to **Claude Code** and **Claude desktop**, so you can ask Claude about your own notes from anywhere you already work
   - This is the MCP exercise worth doing yourself: real use, daily, on your own data. It replaces the original plan's six-server roadmap

2. **The Lab** (original Phase 2 task 8, unchanged in spirit):
   - Same task run across variants, with side-by-side output, latency, cost, and tool-call trace
   - Variants: Claude API tool use (+ the `learn-notes` MCP server), Claude Agent SDK, OpenAI Agents SDK, LangGraph, an open-weights model via OpenRouter with a hand-rolled ReAct loop
   - Results written as files (`lab/<ts>/<variant>.md`) until the Platform phase gives them a table
   - **Per-variant adapters, not a unified abstraction.** The point is to *feel* the differences. "Don't fake parity" (original §5) still applies, just here instead of in the foundations
   - OpenAI and OpenRouter keys are needed only from this phase

3. **Critic bake-off.** Run the same five notes through the Critic on `claude-opus-5-5`, `claude-fable-5-1`, and one non-Anthropic model. Write a note on what you saw. That note goes in the Agents pillar.

---

## 9. Models, API notes, and cost

### Model defaults

| Role | Model ID | Why |
|---|---|---|
| Critic | `claude-opus-5-5` | Sharpness matters most here. This is the call you pay for. |
| Tutor | `claude-sonnet-5-5` | Long multi-turn dialogue; price/quality balance. |
| Misconception extraction, quiz, digest | `claude-haiku-5-5` | Structured, high-volume, easy. |
| Lab variant / Critic bake-off | `claude-fable-5-1` | Top tier and pricier. Earn it in the Lab before making it a default. |

Use the exact IDs above (no date suffixes). If one is retired by the time you build, the Models API (`client.models.list()`) is the live source.

### API notes. Verify each against current docs when wiring

These were true of the current Claude API as of mid-2026. The 5.5 generation is newer than that, so treat them as a checklist, not gospel:

- **Thinking:** adaptive (`thinking: { type: "adaptive" }`) with depth set by `output_config: { effort: "low" | "medium" | "high" | "xhigh" | "max" }`. `budget_tokens` is rejected on the 4.7+ family.
- **Structured output:** `output_config.format` with a JSON schema. Assistant-turn prefill is not supported on recent models, so don't use it to force JSON.
- **Prompt caching:** `cache_control: { type: "ephemeral" }` on the stable prefix (system prompt, then note context). Prefixes under ~1024 tokens silently don't cache. Check `usage.cache_read_input_tokens` to confirm hits.
- **Refusals:** check `stop_reason === "refusal"` before reading content.
- **Server tools:** web search, web fetch, and code execution run on Anthropic's infrastructure. Declare them in `tools` with their current versioned type strings.
- **SDK:** use the SDK's own types (`Anthropic.MessageParam`, etc.) and typed errors (`Anthropic.RateLimitError`, …). Don't redefine them.

### Cost

- **Prices:** fill `learn/lib/prices.ts` from the live pricing page when you build Slice 1. For reference only: in June 2026, Opus-tier was **$5 in / $25 out** per MTok and Sonnet-tier $3 / $15.
- **Per Critic pass:** ~4k input + ~2k output/thinking tokens, so **~$0.05–0.20** at those Opus-tier rates.
- **Ceiling:** `LEARN_DAILY_COST_CEILING_USD=5`. Warn at 70%, refuse at 100%. It's computed by summing today's `usd` across `costs*.jsonl`. Local runs write `costs.jsonl`; the digest Action writes `costs.digest.jsonl`, so the two never conflict on merge.
- **Unknown model = hard error.** The tool refuses to call a model with no entry in `prices.ts`, so spend is never silently logged as $0.

---

## 10. Curriculum — the six pillars

> Reading lists are the v1 drafts from June 2026, carried over unedited. They are a starting position, not taste. Edit them as you go; five months of frontier releases have landed since they were written (§6 digest will surface what's new). The Agents sub-tracks double as suggested `topic` values.

### Pillar 1: Theory

**Sub-tracks**: Math foundations → Transformers → Training (pretraining/SFT/RLHF/DPO) → Scaling → Reasoning → Emergent behaviour.

**Seed reading (v1 — edit before wiring)**:

- 3Blue1Brown "Neural Networks" YouTube series (Chapters 1-4 + the "Attention" videos)
- Andrej Karpathy "Neural Networks: Zero to Hero" (full playlist) — especially "Let's build GPT" and "Let's build the GPT Tokenizer"
- Karpathy "Intro to LLMs" 1-hour talk
- Vaswani et al. *Attention Is All You Need* (2017)
- Radford et al. GPT-1, GPT-2 papers
- Brown et al. *Language Models are Few-Shot Learners* (GPT-3, 2020)
- Kaplan et al. *Scaling Laws for Neural Language Models* (2020)
- Hoffmann et al. *Training Compute-Optimal Large Language Models* (Chinchilla, 2022)
- Ouyang et al. *Training language models to follow instructions with human feedback* (InstructGPT, 2022)
- Bai et al. *Constitutional AI: Harmlessness from AI Feedback* (Anthropic, 2022)
- Rafailov et al. *Direct Preference Optimization* (DPO, 2023)
- Wei et al. *Chain-of-Thought Prompting Elicits Reasoning* (2022)
- Wei et al. *Emergent Abilities of Large Language Models* + Schaeffer et al. *Are Emergent Abilities of Large Language Models a Mirage?*
- Bubeck et al. *Sparks of Artificial General Intelligence* (Microsoft, GPT-4 paper, 2023)
- OpenAI o1 system card (test-time compute introduction)
- DeepSeek-R1 paper (open-weights reasoning model)

### Pillar 2: Hardware

**Sub-tracks**: GPU architecture → Memory hierarchy → Networking & interconnect → Inference vs training economics → Alternative silicon → Datacenter & power.

**Seed reading**:

- The Chip Letter (Babbage substack) — full archive
- SemiAnalysis (Dylan Patel) — key public posts; consider paid subscription
- NVIDIA architecture whitepapers: Hopper H100/H200, Blackwell B200/B300, GB200 NVL72
- Google TPU papers v1 through v5p; the Pathways paper
- Cerebras WSE-3 architecture
- Groq LPU technical overview
- Tenstorrent Wormhole / Blackhole
- Gholami et al. *AI and Memory Wall*
- HBM3/3e/4 deep-dives
- NVLink, NVSwitch, InfiniBand vs RoCE primers
- Sequoia "$600B question" and follow-up capex pieces
- Stratechery hardware-economics episodes
- Acquired podcast: NVIDIA series, TSMC episode

### Pillar 3: Companies

**Sub-tracks**: Model labs → Hyperscalers → Open-weights players → Vertical AI products.

#### OpenAI
- System cards: GPT-4, GPT-4o, o1, o3, GPT-5
- Preparedness Framework (latest version)
- Sam Altman blog essays (most recent 12 months)
- Dwarkesh Patel and Stratechery coverage
- Launches: ChatGPT, Operator, Agents SDK, Responses API, Sora

#### Anthropic
- *Core Views on AI Safety*
- Responsible Scaling Policy (latest)
- Claude model cards
- *Building Effective Agents* blog post
- MCP launch posts + spec
- Dario Amodei *Machines of Loving Grace*
- Dario / Jack Clark / Chris Olah Dwarkesh interviews

#### Microsoft
- Satya Nadella keynotes (Build, Ignite) — latest cycle
- Azure AI Foundry docs (architecture, not API ref)
- Copilot family architecture
- Stargate $100B announcement and follow-up coverage
- Nadella Stratechery interviews

#### Google / DeepMind
- Demis Hassabis Dwarkesh + Lex Fridman interviews
- Gemini 1.5 / 2.x technical reports
- DeepMind blog: AlphaFold 3, AlphaProof, AlphaCode 2, Genie 2, Veo
- Project Astra / Mariner / ADK docs
- TPU vertical-integration strategy pieces

#### Meta
- Llama 3, 3.1, 3.3 papers
- Yann LeCun *A Path Towards Autonomous Machine Intelligence* (V-JEPA, world models)
- Meta AI research blog (most recent 12 months)

#### Others worth a topic each
- xAI (Grok model cards, Musk announcements)
- Mistral (Le Chat, Codestral, Magistral)
- DeepSeek (V3 paper is essential — MoE + multi-token prediction, training cost)
- Cohere
- AI21 / Reka / Cerebras (model differentiation)

### Pillar 4: Agents

**Six sub-tracks** (this is the depth pillar — start here in Phase 1):

#### 4a — Paradigms
- Yao et al. *ReAct: Synergizing Reasoning and Acting in Language Models* (2022)
- Shinn et al. *Reflexion: Language Agents with Verbal Reinforcement Learning* (2023)
- Yao et al. *Tree of Thoughts* (2023)
- Wu et al. *AutoGen: Enabling Next-Gen LLM Applications via Multi-Agent Conversation* (2023)
- Madaan et al. *Self-Refine*
- Park et al. *Generative Agents: Interactive Simulacra of Human Behavior* (2023)
- Sumers et al. *Cognitive Architectures for Language Agents* (CoALA, 2023)
- Anthropic *Building Effective Agents* (the canonical practitioner essay)

#### 4b — Vendor SDKs
- Anthropic: Claude Agent SDK docs, tool use docs, computer use launch, MCP spec
- OpenAI: Agents SDK docs, Responses API, Operator launch
- Google: ADK docs, Gemini function calling, Project Mariner
- AWS: Bedrock Agents docs (less depth, but cover the differences)

#### 4c — Open frameworks
- LangChain / LangGraph docs + Harrison Chase blog series
- LlamaIndex agent docs
- AutoGen (now AG2) docs
- CrewAI docs
- smolagents (HuggingFace) docs
- Pydantic AI docs
- Mastra (TypeScript-first agent framework)
- Aider as a reference implementation — read the source

#### 4d — Open-weights agentic models
- Nous Research Hermes 3, Hermes 4 — and the Hermes Function Calling format
- Llama 3.3 tool use docs and chat template
- DeepSeek-V3 paper (essential — MoE architecture, multi-token prediction)
- Qwen 2.5 Coder, Qwen 2.5 agentic variants
- Mistral Large 2 tool use
- xAI Grok function calling

#### 4e — Protocols & infrastructure
- MCP spec (modelcontextprotocol.io) — full read
- A2A protocol (Google)
- LangSmith, Braintrust, Helicone, Arize Phoenix — pick one and learn it deeply
- Evals: SWE-bench, GAIA, τ-bench, AgentBench, BrowseComp — read the papers
- Voyager / Eureka / SimulatedAgents older lineage for context

#### 4f — Production agent products
- Cognition Devin blog posts
- Cursor engineering blog
- Cline (open source — read the code)
- Replit Agent
- Manus announcements
- browser-use (open source)
- OpenAI Operator
- **Anthropic Claude Code** (the tool you're using right now — read the docs, study the prompts)

### Pillar 5: Debates

**Sub-tracks**: Scaling vs algorithms → Open vs closed → Alignment camps → Reasoning is/isn't happening → AGI timelines.

**Seed reading**:

- Rich Sutton *The Bitter Lesson* (2019) + recent talks
- Yann LeCun *A Path Towards Autonomous Machine Intelligence* + his Twitter / X positions on LLM ceilings
- Geoffrey Hinton recent interviews and doom warnings (CBS 60 Minutes, NYT)
- Gary Marcus — *Deep Learning Is Hitting a Wall* and follow-ups
- Melanie Mitchell critiques of LLM understanding
- Subbarao Kambhampati papers on LLMs and planning
- Andrej Karpathy *Software 2.0* and *Software 3.0* essays + recent talks
- Arvind Narayanan & Sayash Kapoor *AI Snake Oil* (book + substack)
- Leopold Aschenbrenner *Situational Awareness*
- François Chollet *On the Measure of Intelligence* and ARC-AGI results
- Meta vs closed-source debate (Yann LeCun, Soumith Chintala vs Dario, Sam)
- Alignment camps: MIRI/Yudkowsky vs Anthropic RSP vs OpenAI Preparedness vs LeCun "no problem"
- Tyler Cowen interviews on AI economics
- Acemoglu vs Brynjolfsson on AI productivity

### Pillar 6: Scenarios

**Sub-tracks**: Near-term (12-24 months) → Medium (3-5 years) → Long (10+ years). Cross-cut by economic, geopolitical, alignment, and labour scenarios.

**Seed reading**:

- AI 2027 (Daniel Kokotajlo et al.)
- Leopold Aschenbrenner *Situational Awareness*
- Dario Amodei *Machines of Loving Grace*
- Demis Hassabis essays and podcast appearances
- Eliezer Yudkowsky *Death With Dignity* + *AGI Ruin: A List of Lethalities*
- Holden Karnofsky *The Most Important Century* series
- Karpathy near-term futures interviews
- Tyler Cowen on AI economics
- Ezra Klein Show — AI episodes
- Dwarkesh Patel transcripts: Hassabis, Amodei, Sutton, Karpathy, Hsu, Patel-on-hardware
- Acquired podcast: NVIDIA, OpenAI
- Ben Thompson Stratechery AI series

---


## 11. Privacy & security

- **hau.ge is a public repo.** Anything committed there is public, including this plan. Notes, critiques, cards, transcripts, digests, and engagement context live **only** in the private `hau-ge-learn` repo.
- Prompts in `learn/prompts/` are public. Write them as general persona and behaviour specs, with no private client detail. Private context is injected at call time from `engagements.md`.
- `learn promote` strips the Pertama section and `/learn` frontmatter before writing into the public repo, and never stages or commits.
- `ANTHROPIC_API_KEY` lives in hau-ge's `.env.local` (gitignored by the existing `.env*` rule) and as an Actions secret in the private repo. Nowhere else.
- No client PII anywhere: engagement titles plus your own reflections only (unchanged from the original plan).
- Platform phase adds the original controls: OAuth allowlist, middleware, `robots.ts` disallow on `/learn`, server-only keys.

---

## 12. Setup checklist

### Slice 1 (everything you need to start)

- [ ] Create **private** repo `michaelhauge/hau-ge-learn` on GitHub; clone it beside hau-ge
- [ ] **Anthropic API key** from the Claude Console
- [ ] hau-ge `.env.local`:
  ```bash
  LEARN_HOME=/absolute/path/to/hau-ge-learn
  ANTHROPIC_API_KEY=sk-ant-...
  LEARN_DAILY_COST_CEILING_USD=5
  ```
- [ ] Open the live pricing page while building Slice 1 task 4

That's the whole list. No Neon, no OAuth app, no Voyage, no OpenAI, no OpenRouter.

### Slice 2

- [ ] `ANTHROPIC_API_KEY` as an **Actions secret** in `hau-ge-learn` (digest)
- [ ] A starter `feeds.md` (Claude Code can draft one from §10; you prune it)

### Platform phase (only when the gate trips)

- [ ] Database (Neon or current equivalent), embeddings key, GitHub OAuth app (callbacks for `https://hau.ge` and `http://localhost:3000`), Vercel env vars

### Tutor Lab phase

- [ ] OpenAI API key, OpenRouter API key (~$5 credit)

---

## 13. Open questions

- **Editor:** VS Code, Obsidian, or something else for writing notes? The file format works with all of them. Obsidian would render `links` if they were wiki-links, so consider `[[slug]]` in the body as well as frontmatter `links`. Decide during Slice 1.
- **Graduation word floor:** 60 words is a guess. Tune it after ten notes.
- **Tutor in terminal vs Claude Code:** once the `learn-notes` MCP server exists (Lab phase), a Claude Code session with that server attached may beat a custom `learn tutor`. Revisit then.
- **Voice capture:** still deferred. Revisit with the Platform phase's phone UI.
- **Academy export:** still deferred. Same one-way MDX handoff idea as before; trivial with files once the Academy's frontmatter contract exists.
- **Single-note public sharing** (Pertama section redacted): `learn promote` is most of the way there. Deferred.

---

## 14. Working with Claude Code

### Kickoff for Slice 1

> Read `docs/learn-plan.md` (revision 2) and `docs/session-2026-11-05-learn-revisit.md`. Confirm you understand §3 (decisions), §4 (two-repo architecture), and §5 (Slice 1). Before writing code: confirm `LEARN_HOME` is set in `.env.local` and points at a git repo, and open the live Claude pricing and models pages so `prices.ts` and the model IDs in §9 are verified. Then execute Slice 1 tasks 2–8 one at a time, pausing after each for me to verify. Don't commit until I say so. Where the plan is silent, ask; don't guess.

### Mid-slice prompts

> Draft `learn/prompts/critic.md` from the spec in §5. Make it sound like me: direct, short sentences, no hype. I'll rewrite it before we use it.

> Run `learn critic <slug>` on my note and show me the raw structured response alongside the rendered critique. I want to see what the model returned before I trust the formatting.

> Slice 2 task 5: draft `feeds.md` from the §10 reading lists, with feed URLs only where you're confident they exist. Mark anything uncertain. Don't invent URLs.

### When the plan is wrong

> §9 says X about the API, but the current docs say Y. Update §9 first, then implement against the docs.

### Plan-as-source-of-truth

Update this file whenever reality diverges from it. It should describe what is built, not what was intended. Revision 1 is in git history if you ever want to see the road not taken.

---

## Appendix A: Estimated effort

| Stage | Build hours (Claude Code doing the heavy lifting) | When |
|---|---|---|
| Slice 1 | 4–8 | Now |
| Slice 2 | 8–12 | After Slice 1 exit criteria |
| Platform phase | 20–35 | Only when the §7 gate trips |
| Tutor Lab phase | 10–20 | When the Agents pillar calls for it |

Slices 1 and 2 together put all five moat items in place in **~12–20 hours**. The original plan needed ~30–50 hours (its Phases 0–2) before the Critic and Tutor existed.

Plus the actual *learning*: the system is only valuable if 5–10 hours a week of reading and writing go through it. That hasn't changed and never will.

---

## Appendix B: Anti-goals (don't build these)

- **Public dashboard / shareable progress.** Defeats private-by-default.
- **Gamification (streaks, points, badges).** Antithetical to durable learning. `learn status` shows counts, nothing more.
- **Multi-user / multi-tenant.** That's Academy, not `/learn`.
- **Live chat with other learners.** Wrong product.
- **AI-generated notes without human edit.** Kills the synthesis loop. The Critic critiques and the Tutor questions; neither writes your note.
- **Auto-promote graduated notes to public.** Kills editorial control.
- **Free-tier-everything mindset.** Pay for the best Critic model and the SemiAnalysis subscription; the cost is tiny next to the learning value.
- *(new)* **Infrastructure ahead of use.** No database, auth, or web UI until the §7 gate trips. If you catch yourself building the platform to avoid writing notes, stop.
- *(new)* **The Critic as gatekeeper.** It must *see* every graduated note; it never gets to *block* one. You overrule it whenever you disagree.

---

*End of plan, revision 2. Edit freely as you build. This is a starting position, not scripture.*
