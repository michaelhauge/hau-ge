# Session log — 2026-11-05 — `/learn` revisit

> Why `docs/learn-plan.md` was rewritten five months after the original planning session (`docs/session-2026-06-10-learn-planning.md`). Read this first, then the plan. Like the June log, this is a frozen snapshot: the plan is the living document.

---

## Where things stood

- The June plan (1,085 lines) and its session log sat on branch `claude/ai-learning-app-adnHU`, never merged.
- **No code had been written.** Phase 0 hadn't started. No accounts were set up.
- Five months had passed.

## What the audit found

**Factual staleness**
- Model defaults (Sonnet 4.6 / Opus 4.7 / Haiku 4.5) had moved on; the Claude 5 generation (Opus 5.5, Sonnet 5.5, Haiku 5.5, Fable 5.1) is current.
- The pricing table had Opus at **$15/$75 per MTok**. Opus-tier was already **$5/$25** in June 2026, so the plan overestimated its most expensive role by ~3×. That was the number the $10/day ceiling was sized against.
- The thinking API changed: `budget_tokens` is rejected on the 4.7+ family. The current shape is adaptive thinking plus `output_config.effort`.
- Three of the six planned MCP servers (`web-search`, `source-fetcher`, `code-exec`) are now server-side Claude API tools.
- The promote target `content/writing/drafts/` doesn't match the repo's convention. Drafts are `draft: true` in `content/writing/<slug>.md`.

**Structural problems**
- The plan put 6–10 hours of infrastructure in front of the first note and didn't reach the Critic until week four or five. Five months with zero commits suggested the on-ramp was too long for an evenings build.
- The three-provider LLM abstraction in Phase 0 was the biggest single piece of yak-shaving. Vendor comparison is a real learning goal, but it belongs in the Tutor Lab.
- **hau.ge is a public repo.** The first revisit proposal (notes as MDX under `content/learn/`) would have published every note. Hence the two-repo design.

## What was decided

Michael chose: **rewrite the plan around a thin slice** (over: build the slice now, patch the plan but keep its structure, or audit only).

The rewrite (plan revision 2):
1. **Slice 1:** notes as Markdown in private repo `hau-ge-learn`. A CLI in hau.ge (`npm run learn`). The Critic on Opus 5.5. A graduation gate: the Pertama section must exist and the Critic must have seen the current text. The verdict informs; it doesn't block.
2. **Slice 2:** Tutor, quiz, FSRS review, promote-to-`/writing`, and a daily digest via GitHub Action. All five moat items running.
3. **Platform phase** (DB, search, web UI, auth) only when an explicit gate trips (≥30 graduated notes, phone need, or retrieval need), plus a "don't build it" condition if the writing habit isn't there.
4. **Tutor Lab phase:** vendor comparison plus building one MCP server over the notes, connected to Claude Code and Claude desktop.

Unchanged: the goal, the five-part moat, the Critic persona, private-by-default, FSRS, Agents-first reading order, Academy independence, the anti-goals (plus two new ones), and the curriculum reading lists (carried over unedited, still for Michael to edit).

## Not verified in this session

- Live Claude pricing and the models pages weren't reachable from this cloud session's network allowlist. The plan names model IDs and gives June 2026 reference prices, but requires `prices.ts` to be filled from the live page at build time, and the tool refuses to call an unpriced model.
- The API notes in plan §9 reflect mid-2026 docs and are marked as a checklist to verify against the 5.5-generation docs.

## How to resume

1. Create the private `hau-ge-learn` repo and put `LEARN_HOME` + `ANTHROPIC_API_KEY` in hau-ge's `.env.local` (plan §12).
2. Start Claude Code in hau-ge with the kickoff prompt in plan §14.
3. Write three real notes. The build is the easy part.
