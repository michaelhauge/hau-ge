# `/learn` — Workstream plan and the final product

> Written 2026-11-05, at the end of the build session that produced commit `8880b8b` (the WIP CLI). This is the operating plan from here to a finished product. `docs/learn-plan.md` (revision 2) holds the design rationale; this file holds the work. When they disagree, this one is more recent.

---

## 1. The final product

Describe it as a day, because that's what it's for.

**06:30, phone.** A digest landed in the private repo overnight. Three items are flagged "does this change your thesis on …?", each naming one of your graduated notes. One is a new paper on agent evaluation that bears on your note *tool-use-is-just-json*. You star it; later it becomes a note.

**07:15, laptop, 25 minutes.** `learn review`. Fourteen cards due. Nine came from Critic passes (things you got wrong), three from Tutor sessions (things you fumbled live), two you wrote. Eleven right, three wrong; FSRS pushes the wrong ones back to tomorrow.

**Evening, 60 minutes.** You read the agent-evaluation paper. `learn new agent-evals-measure-the-harness --pillar agents --topic protocols`. You write the synthesis in your own words, then the section that makes this system different: **What this means for Pertama**. Which client, which decision, what changes. `learn critic`. The CFO reads it and says *shallow*: "you've told me evaluations matter; you haven't told me what I'd stop paying for." Two misconceptions caught, two cards added. You rewrite the section with the April exec-training cohort in mind. `learn critic` again: *holds*. `learn graduate`. Commit, push. That's the backup.

**Some evenings.** `learn tutor <slug>`: a Socratic session where the Tutor finds the weakest claim in a note and pushes on it, checking primary sources live when a fact matters. The things you couldn't answer become cards without you writing them.

**Monthly.** `learn status` shows 30+ graduated notes across pillars, the ones that have drifted since their last Critic pass, spend against ceiling. One graduated note is good enough to publish: `learn promote`, and it's a `/writing` draft with the Pertama section stripped, waiting for your edit and `npm run publish-post`.

**Anywhere you already work.** Claude Code and Claude desktop have the `learn-notes` MCP server attached. "What have I written about MoE routing, and what did the Critic say about it?" is a question you can ask while doing client work.

**Later, when it's earned.** `hau.ge/learn`: a private web UI (GitHub login, allowlist of one) over the same files, so review works on the phone and search works across hundreds of notes. Not before.

### The five moat items and where each lives in the finished product

| Moat | Mechanism in the product |
|---|---|
| Forced Pertama application | `learn graduate` refuses without a ≥60-word Pertama section **and** a Critic pass on exactly that text |
| Adversarial Critic | `learn critic`: Opus 5.5 as a sceptical SEA family-conglomerate CFO, with your private engagement context |
| Confusion-aware spacing | Critic misconceptions and Tutor fumbles become FSRS cards automatically; `learn review` schedules them |
| Connection graph | `links` and `engagements` frontmatter, validated by `learn check`; engagement and pillar views in the Platform phase |
| Frontier digest | `learn digest`, run daily by a GitHub Action in the private repo, tests new items against your graduated theses |

### Principles that don't move

- **Private by default.** Notes, critiques, cards, transcripts, digests and engagement context live only in the private repo `hau-ge-learn`. The public repo holds tooling and prompts. Promotion is a manual copy and your editorial act.
- **You write everything.** The Critic critiques, the Tutor questions, the digest summarises. None of them writes your note.
- **The Critic sees every graduated note and blocks none.** You can overrule the verdict; you can't skip the pass.
- **Infrastructure follows use.** No database, auth or web UI until the gate in §5 trips.
- **No gamification.** `learn status` shows counts. That's all.

---

## 2. Where the build is right now

Commit `8880b8b` on branch `claude/learning-engine-ai-teaching-qvrx7z`. **Typechecks. Not tested, linted or run against the live API.**

| Area | State |
|---|---|
| `learn/lib/*` | Written: notes, engagements, prices (verified 2026-11-05), cost ledger + ceiling, Claude client, FSRS cards, critiques, terminal I/O, args, prompts loader |
| Slice 1 commands | Written: `init`, `new`, `check`, `critic`, `graduate`, `status`, `doctor` |
| Slice 2 commands | Written: `tutor`, `quiz`, `review`, `promote`, `digest` |
| MCP server | Written: `learn mcp` (5 read-only tools), `--print-config` for Claude Code / desktop |
| Prompts | Drafted by Claude: `critic`, `tutor`, `extract`, `quiz`, `digest`. **You haven't rewritten them in your voice yet.** |
| Private-repo template | Written: README, `engagements.md` seeded from hau.ge's public engagements, `feeds.md` (several URLs marked *verify*), pre-commit hook, digest GitHub Action |
| `package.json` / `tsconfig.json` | Scripts `learn`, `learn:test`, `learn:typecheck`; dev deps installed; `learn/` excluded from the site build |
| Tests | **None written.** `learn/test/` is empty |
| Live API | **Never called.** No `ANTHROPIC_API_KEY` in the build session |
| Private repo `hau-ge-learn` | **Doesn't exist yet** |
| `docs/learn-plan.md` | Describes the design; doesn't yet record what was built |

### Known soft spots to verify first

1. **Request shapes against the 5.5 models.** Adaptive thinking + `output_config.effort` + `output_config.format` (JSON schema) on Opus 5.5 and Sonnet 5.5; `web_search_20260318` / `web_fetch_20260318` on Sonnet 5.5; Haiku 5.5 with structured output and no thinking. The SDK types accept all of it; the API hasn't been asked. `learn doctor --live` exists for exactly this and costs under a cent.
2. **Top-level `cache_control` on streamed tutor turns** (`lib/claude.ts`). If the API rejects it alongside a per-block `cache_control` on the system prompt, drop the top-level one.
3. **`__dirname` in `lib/env.ts`.** Works because the repo has no `"type": "module"`, so `tsx` runs the files as CommonJS. If that ever changes, switch to `import.meta.url`.
4. **Digest Action checks out hau-ge at `main`** by default. Until the `learn/` tree is merged to `main`, set the repo variable `HAU_GE_REF` to the feature branch, or the Action has no CLI to run.
5. **`feeds.md` URLs marked *verify*** were not fetched. First `learn digest` will list the dead ones at the bottom of the digest.
6. **Web search cost** is estimated at $10/1,000 searches from 2025 docs; not on the current pricing page. Over-counts if the price dropped. Harmless.
7. **Haiku's 100K-token price tier** is applied by total prompt size per call; the digest caps at 40 items so it stays well under.

---

## 3. Workstream: from here to the finished product

Estimates assume Claude Code does the typing and you review. "You" tasks are things only you can do.

### Stage A — Make it real (next session, ~2–3 h)

**Goal:** the loop runs end to end on your machine with your key, on a real note.

| # | Task | Who | Done when |
|---|---|---|---|
| A1 | Create **private** repo `michaelhauge/hau-ge-learn`; clone beside hau-ge | You | Exists, private, cloned |
| A2 | `.env.local` in hau-ge: `LEARN_HOME`, `ANTHROPIC_API_KEY`, `LEARN_DAILY_COST_CEILING_USD=5` | You | `npm run learn -- doctor` passes the static checks |
| A3 | `npm run learn -- init`; commit the scaffold; push | You | Private repo has the layout, hooks path set |
| A4 | `npm run learn -- doctor --live` | Claude Code | Three ticks: Opus structured output, Haiku structured output, Sonnet streaming + web tools. Fix any 400 by adjusting `lib/claude.ts` / `lib/models.ts`, not by changing models |
| A5 | **Tests** (`learn/test/*.test.ts`, `node:test` via `npm run learn:test`): notes parsing + `pertamaSection` + `bodyHash` stability; `validateNote` rules; `parseEngagements`; `costUsd` incl. Haiku tiers; ceiling logic; `addCards` dedupe + `gradeCard` round-trip; `parseFeeds` + `seenUrls`; `writingDraft` strips the Pertama section; graduation gate using a fake Claude client (`setClient`) and a temp `LEARN_HOME` | Claude Code | Green |
| A6 | `npm run lint` and `npm run build` still pass; fix any eslint findings in `learn/` | Claude Code | Green |
| A7 | **Rewrite the prompts in your voice**, especially `prompts/critic.md`. Read it aloud; if it doesn't sound like a CFO you've sat across from, change it | You | You'd sign it |
| A8 | Fill **Private context** in `engagements.md` for the three engagements you think about most | You | Critic has something concrete to use |
| A9 | First real note from the Agents reading list (§10 of the plan, sub-track 4a) → `critic` → revise → `critic` → `graduate` | You | One graduated note, one revision caused by the Critic |
| A10 | Update `docs/learn-plan.md` §5–6 to say "built" and record any shape fixes from A4; merge the branch to `main` (or set `HAU_GE_REF`) | Claude Code | Plan matches reality |

**Exit:** `learn status` shows 1 graduated note, cards exist, `costs.jsonl` has entries, private repo pushed.

### Stage B — Live in it (weeks 1–4, mostly learning time)

**Goal:** the habit, and all five moat items exercised.

| # | Task | Done when |
|---|---|---|
| B1 | Three graduated notes from 4a (ReAct, Reflexion, *Building Effective Agents* are the natural trio) | 3 graduated |
| B2 | Enable the digest Action: `ANTHROPIC_API_KEY` secret, `HAU_GE_REF` variable if needed; run it once by hand (`workflow_dispatch`); prune dead feeds | A `frontier/<date>.md` committed by the Action |
| B3 | First Tutor session on a note you feel shaky about; check the cards it extracted are things you actually fumbled, not generic | ≥1 card you wouldn't have written |
| B4 | `learn review` daily for two weeks | Due count reaches zero at least once |
| B5 | `learn mcp --print-config`; attach to Claude Code and Claude desktop; ask it something about your notes during real work | Used once in a client context |
| B6 | One digest item becomes a note | Note with a `sources:` URL from a digest |
| B7 | Tune: `LEARN_MIN_PERTAMA_WORDS` if 60 is wrong; Critic persona if verdicts feel off; Tutor effort (`lib/models.ts`) if sessions feel slow or shallow | Settings you've stopped changing |
| B8 | `learn promote` one graduated note; edit; publish via `npm run publish-post` | A `/writing` essay that started as a note |

**Exit:** two weeks of daily use, ≥6 graduated notes, all five moat mechanisms have fired at least once.

### Stage C — Tutor Lab (when the Agents pillar calls for it, ~10–20 h)

**Goal:** learn agent systems by living in them; this is where other vendors come in.

| # | Task |
|---|---|
| C1 | `learn lab <task>` runs the same prompt across adapters and writes `lab/<ts>/<variant>.md` with output, latency, cost, tool-call trace |
| C2 | Adapters, each its own file, no shared abstraction: Claude API tool use with the `learn-notes` MCP server attached; Claude Agent SDK; OpenAI Agents SDK; LangGraph (Python subprocess); an open-weights model via OpenRouter with a hand-rolled ReAct loop |
| C3 | Critic bake-off: five notes through `claude-opus-5-5`, `claude-fable-5-1` and one non-Anthropic model; write a note on what you saw (Agents pillar) |
| C4 | Extend the MCP server if the Lab wants it (e.g. `add_card`, deliberately the only write tool) |

Needs: OpenAI and OpenRouter keys (~$5 credit). Prices for any non-Anthropic model go in `prices.ts` or the tool refuses to run.

### Stage D — Platform (only when the gate trips, ~20–35 h)

**Gate (plan §7):** ≥30 graduated notes **and** file search failing you weekly; **or** you want phone review often enough to notice; **or** the Tutor/digest keeps missing a connection you know is there. **Don't** if you're writing <2 notes/week after six weeks: the bottleneck isn't infrastructure.

| # | Task |
|---|---|
| D1 | Decide: files stay the source of truth, DB is an index (default) — or the DB takes over. Decide embedding vendor and auth library then, from what's current |
| D2 | Neon Postgres + Drizzle + pgvector (or current equivalents); import script from `hau-ge-learn`; nightly re-index |
| D3 | `app/(learn)/` in hau.ge: note reader/editor, review queue as a PWA (phone), hybrid search (full-text + vector, RRF), pillar/engagement/framework pages (the connection graph), frontier inbox |
| D4 | Auth: GitHub OAuth, allowlist `michaelhauge`, middleware on `/learn/:path*`, `robots.ts` disallow `/learn` |
| D5 | Resurface: daily "how does [recent source] connect to [stale note]?" |
| D6 | Semantic "related notes" fed to the Tutor and the digest |

---

## 4. Dependencies and sequencing

```
A1 ─┬─ A2 ─ A3 ─ A4 ─┬─ A9 ─ B1 ─ B3/B4/B6/B8
    │                 ├─ A5/A6 ─ A10 ─ B2 (digest needs learn/ reachable from the Action)
    │                 └─ B5 (MCP)
    └─ A7/A8 (prompts + context; before A9 for the Critic to be worth running)
B* ─ C* (Lab is independent of D)
B* ─ gate ─ D*
```

Nothing in C or D blocks the daily loop. The daily loop is the product; C and D are upgrades.

---

## 5. Costs

At verified 2026-11-05 rates (Opus 5.5 $4/$20, Sonnet 5.5 $2/$10, Haiku 5.5 $0.10/$0.50 per MTok):

| Activity | Typical cost |
|---|---|
| Critic pass | ~$0.03–0.12 (≈4k in, 1–3k out incl. thinking) |
| Tutor session, 20 turns | ~$0.10–0.40 (cached context; web searches extra at ≈$0.01 each) |
| Quiz / card extraction | <$0.01 |
| Daily digest | <$0.01 (Haiku; 40 items max) |
| **Heavy month** (30 critiques, 8 tutor sessions, daily digest) | **≈$5–8** |

The $5/day ceiling is ~40 Critic passes. Raise it when it bites; don't lower the Critic model to save money (plan, Appendix B).

---

## 6. Risks, and what we do about them

| Risk | Mitigation |
|---|---|
| **You don't write notes.** The only risk that matters. Five months of zero commits already happened once | Stage A ends with a real note, not a demo. Stage B is two weeks of use before any more building. `learn status` prints notes/week against the gate's 2/week |
| Critic is too soft or too generic | A7: your rewrite of the persona. B7: tune after ten passes. The verdict never blocks, so a bad Critic can't stop you, only waste a call |
| Cards are noise | Extraction prompt asks for fewer, sharper cards; `quiz` makes you accept each one; delete freely in `cards/*.json` |
| API shape drift (new model generation again) | `doctor --live` is the canary; `prices.ts` refuses unknown models; model IDs are env-overridable |
| Private content leaks into the public repo | Two-repo design; `promote` strips the Pertama section and never commits; `.env*` gitignored; prompts contain no client detail |
| Digest Action can't find the CLI | `HAU_GE_REF` variable until `learn/` is on `main` |
| Build in the public repo breaks the site | `learn/` excluded from site tsconfig; `next build` verified before the WIP commit |

---

## 7. Open decisions (decide when you hit them)

- **Editor.** Obsidian over `hau-ge-learn` would give you backlinks for free if `links` were also `[[wiki-links]]` in the body. Try it in Stage B.
- **Graduation word floor.** 60 is a tripwire against "TBD", not a quality bar. Revisit after ten notes.
- **Tutor in terminal vs. Claude Code + MCP.** Once B5 works, a Claude Code session with `learn-notes` attached may beat `learn tutor`. If so, keep `tutor` only for the card extraction and let Claude Code do the talking.
- **Voice capture / phone capture.** Stage D question.
- **Academy export.** Trivial with files once Academy's frontmatter contract exists. Not before.

---

## 8. Kickoff prompt for the next session

> Read `docs/learn-workstream.md` §2–3 and `docs/learn-plan.md` §3–6. The CLI at `learn/` is committed as WIP (`8880b8b`): typechecks, untested, never run against the API. I've done A1–A3 (private repo, `.env.local`, `learn init`). Start with A4: run `npm run learn -- doctor --live`, show me the raw output, and fix any request-shape errors in `lib/claude.ts` without changing models. Then A5 (tests) and A6 (lint + build). Pause after each. Don't touch the prompts: I'm rewriting those myself.

If you haven't done A1–A3 yet, say so and the session starts there instead.

---

*This file is the work plan. Update it as stages complete; keep `docs/learn-plan.md` as the design record.*
