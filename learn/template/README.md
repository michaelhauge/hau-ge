# hau-ge-learn

Private. Michael's learning notes, Critic passes, review cards and frontier digests.
The tooling lives in the public repo at `hau-ge/learn/`; this repo is only data.

```
notes/<slug>.md              your notes — you write these, always
critiques/<slug>/<ts>.md     Critic passes (one file each)
cards/<slug>.json            review cards + FSRS state
sessions/<slug>/<ts>.md      Tutor transcripts
frontier/<date>.md           daily digest (GitHub Action)
engagements.md               Pertama engagements + private context
feeds.md                     digest sources
costs*.jsonl                 spend ledger (local + digest Action)
```

## The loop

From the hau-ge checkout (`npm run learn -- <command>`):

1. `new <slug> --pillar agents` — write the synthesis and the **What this means for Pertama** section.
2. `critic <slug>` — the CFO pressure-tests it. Misconceptions become cards.
3. Revise. `graduate <slug>` — only works once the Critic has seen the current text.
4. `tutor <slug>`, `quiz <slug>`, `review` — make it stick.
5. `promote <slug>` — copy a graduated note into `/writing` as a draft (Pertama section stripped).

`status` shows where everything stands. `check` validates notes (also runs as a pre-commit hook).

Commit and push this repo — that's the backup.
