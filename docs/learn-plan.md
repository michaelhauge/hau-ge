# Pertama Learning Engine — `/learn`

> Comprehensive plan for Michael L. Hauge's personal AI learning system, integrated into hau.ge as a private `/learn` route group. Designed to be the daily front door for Michael's AI learning — capture, synthesis, retention, and Pertama-Partners-specific application — over a 12+ month horizon. Drafted in conversation; built later using Claude Code.

---

## 0. TL;DR

A private, single-user Next.js app inside hau.ge that combines:

1. A **curated curriculum** across six pillars of AI understanding (theory, hardware, companies, agents, debates, scenarios).
2. A **Claude/OpenAI/open-model tutor** that quizzes, pressure-tests, and synthesises — vendor-pluggable from day one.
3. A **forced-application loop** — no note "graduates" without a written `pertama_application` field.
4. **Spaced retention** (FSRS) with auto-cards generated when the tutor catches you fumbling.
5. **Semantic retrieval** across all notes + sources via pgvector + Voyage embeddings.
6. A **Tutor Lab** where the same task is implemented across Anthropic Claude Agent SDK, OpenAI Agents SDK, LangGraph, Hermes via OpenRouter, and raw MCP — to learn agent systems by living in them.
7. A **promote-to-writing** pipeline that one-clicks a graduated note into hau.ge's existing `/writing` MDX pipeline as a draft essay.

Private to Michael (GitHub OAuth allowlist). Architecturally independent from Pertama Academy (which is being built elsewhere). Knowledge flows one-way out of `/learn` → `/writing` or → Academy via MDX handoff. No shared DB, no shared infra.

---

## 1. Goal & moat

### Goal

> Develop the world's most effective learning engine to understand and apply AI — built explicitly for Michael and his work at Pertama Partners.

### Why a custom build over free resources

Free YouTube, blogs, and papers are *better than anything you'd recreate*. The leverage of a custom system is **not in the content** — it's in five things the free resources structurally can't do:

1. **Forced Pertama application.** Every note has a required "What this means for Pertama" section. No graduation without it. This is the single biggest moat — it converts passive consumption into Pertama-specific synthesis on every input.
2. **Adversarial Socratic loop.** The Critic persona pressure-tests your synthesis against a specific senior-buyer persona and flags shallow reasoning.
3. **Confusion-aware spacing.** When you fumble a concept in tutor dialogue, a review card is auto-created and queued. Anki doesn't watch you struggle in real time.
4. **Personal connection graph.** Notes link to other notes *and* to actual Pertama engagements (Dream Team Group, SAP, the April 2026 executive training, etc.) so theory always lands on a real deal.
5. **Daily frontier digest.** New papers and posts in your six pillars are summarised with one prompt: "does this change your Pertama thesis?" Free resources don't track *your* current position.

If these five aren't operating, the system is just a fancy Notion. They are the requirements.

---

## 2. Decisions locked

| Concern | Decision |
|---|---|
| Location | New route group `app/(learn)/` inside the existing hau.ge repo |
| Visibility | Private by default; `robots.ts` disallow on `/learn/*`; promote-to-public per note |
| Auth | NextAuth + GitHub OAuth, hardcoded allowlist of one GitHub username |
| Database | Neon Postgres (Vercel-native, free tier ample for one user) |
| ORM | Drizzle (TS-first, no codegen step) |
| Vector store | `pgvector` extension on Neon (same DB, no extra service) |
| Embeddings | Voyage `voyage-3-large` (high quality, cheap, non-OpenAI) |
| LLM providers | Anthropic + OpenAI + OpenRouter (covers Google, Llama, Hermes, DeepSeek, Qwen, Mistral, xAI through one extra key) |
| Default tutor model | Claude Sonnet 4.6; Critic/Synthesist on Opus 4.7 |
| Tool-use protocol | MCP (Anthropic, OpenAI, Google all support it now) |
| Spaced repetition | FSRS (via `ts-fsrs` npm package) |
| Markdown | Reuse the existing `remark` + `gray-matter` pipeline already in this repo |
| Cost guard | Daily $ ceiling in middleware; soft-warn 70%, hard-stop 100% |
| First pillar | **Agents** — closest to Pertama work, fastest ROI |
| Reading lists v1 | Drafted below; Michael edits before wiring in Phase 4 |
| Promote pipeline | Graduated note → MDX with frontmatter → `content/writing/drafts/<slug>.md` |
| Public vs Academy | `/learn` standalone, Academy is a separate repo elsewhere; one-way MDX handoff only |

---

## 3. Stack & dependencies

### Already in the repo

- Next.js 16 (App Router)
- React 19 + TypeScript strict
- Tailwind CSS v4 (`@theme inline` tokens, no `tailwind.config`)
- Geist font via `next/font/google`
- `remark` + `remark-html` + `gray-matter` for MDX
- Deployed to Vercel

### New runtime dependencies

```bash
# Auth + DB
npm install next-auth@beta
npm install drizzle-orm postgres
npm install -D drizzle-kit

# LLM + embeddings
npm install @anthropic-ai/sdk openai
npm install voyageai

# MCP
npm install @modelcontextprotocol/sdk

# Spaced repetition + content
npm install ts-fsrs
npm install @mozilla/readability jsdom  # source URL fetching
npm install pdf-parse                    # PDF source ingestion

# Misc
npm install zod                          # input validation
npm install nanoid                       # short IDs
```

Optional (Phase 5):
```bash
npm install rss-parser    # arXiv / RSS feeds for daily digest
```

### Env vars (all required unless noted)

```bash
# Auth
NEXTAUTH_URL=https://hau.ge
NEXTAUTH_SECRET=<openssl rand -base64 32>
GITHUB_OAUTH_CLIENT_ID=<from github.com/settings/developers>
GITHUB_OAUTH_CLIENT_SECRET=<...>
LEARN_ALLOWLIST_GITHUB_LOGIN=michaelhauge   # your GitHub username

# Database
DATABASE_URL=postgres://...neon.tech/...    # from Neon dashboard

# LLM providers
ANTHROPIC_API_KEY=sk-ant-...
OPENAI_API_KEY=sk-...
OPENROUTER_API_KEY=sk-or-...                # optional, enables Google/Llama/Hermes/etc.

# Embeddings
VOYAGE_API_KEY=pa-...

# Cost guard
LEARN_DAILY_COST_CEILING_USD=10             # adjust to taste
```

---

## 4. Data model

Drizzle schema (TypeScript). Place at `lib/db/schema.ts`.

```ts
import { pgTable, text, integer, timestamp, jsonb, real, boolean, vector, primaryKey } from "drizzle-orm/pg-core";
import { nanoid } from "nanoid";

// ── Taxonomy ──────────────────────────────────────────────

export const pillars = pgTable("pillars", {
  id: text("id").primaryKey().$defaultFn(() => nanoid()),
  slug: text("slug").notNull().unique(),         // theory | hardware | companies | agents | debates | scenarios
  title: text("title").notNull(),
  description: text("description"),
  sortOrder: integer("sort_order").notNull(),
});

export const topics = pgTable("topics", {
  id: text("id").primaryKey().$defaultFn(() => nanoid()),
  pillarId: text("pillar_id").notNull().references(() => pillars.id),
  slug: text("slug").notNull(),
  title: text("title").notNull(),
  description: text("description"),
  sortOrder: integer("sort_order").notNull(),
});

export const frameworks = pgTable("frameworks", {
  id: text("id").primaryKey().$defaultFn(() => nanoid()),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  kind: text("kind").notNull(),                  // vendor_sdk | open_framework | open_model | protocol | product
  vendor: text("vendor"),                        // anthropic | openai | google | meta | nous | ...
});

export const paradigms = pgTable("paradigms", {
  id: text("id").primaryKey().$defaultFn(() => nanoid()),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),                // react | reflexion | tot | multi_agent | swarm | agentic_rag | ...
  description: text("description"),
});

// ── Sources ───────────────────────────────────────────────

export const sources = pgTable("sources", {
  id: text("id").primaryKey().$defaultFn(() => nanoid()),
  topicId: text("topic_id").references(() => topics.id),
  kind: text("kind").notNull(),                  // url | pdf | video | paper | book | tweet | podcast
  url: text("url"),
  title: text("title").notNull(),
  author: text("author"),
  publishedAt: timestamp("published_at"),
  transcriptText: text("transcript_text"),
  embedding: vector("embedding", { dimensions: 1024 }),  // voyage-3-large is 1024-d
  metadata: jsonb("metadata"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// ── Notes (the heart of the system) ───────────────────────

export const notes = pgTable("notes", {
  id: text("id").primaryKey().$defaultFn(() => nanoid()),
  topicId: text("topic_id").references(() => topics.id),
  title: text("title").notNull(),
  bodyMdx: text("body_mdx").notNull(),
  pertamaApplication: text("pertama_application").notNull(),   // REQUIRED to save anything other than draft
  status: text("status").notNull().default("draft"),           // draft | graduated | published
  embedding: vector("embedding", { dimensions: 1024 }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  graduatedAt: timestamp("graduated_at"),
  publishedAt: timestamp("published_at"),
  publishedSlug: text("published_slug"),                       // if promoted to /writing
});

export const noteFrameworks = pgTable("note_frameworks", {
  noteId: text("note_id").notNull().references(() => notes.id, { onDelete: "cascade" }),
  frameworkId: text("framework_id").notNull().references(() => frameworks.id),
}, t => ({ pk: primaryKey({ columns: [t.noteId, t.frameworkId] }) }));

export const noteParadigms = pgTable("note_paradigms", {
  noteId: text("note_id").notNull().references(() => notes.id, { onDelete: "cascade" }),
  paradigmId: text("paradigm_id").notNull().references(() => paradigms.id),
}, t => ({ pk: primaryKey({ columns: [t.noteId, t.paradigmId] }) }));

export const noteSources = pgTable("note_sources", {
  noteId: text("note_id").notNull().references(() => notes.id, { onDelete: "cascade" }),
  sourceId: text("source_id").notNull().references(() => sources.id),
}, t => ({ pk: primaryKey({ columns: [t.noteId, t.sourceId] }) }));

// ── Pertama engagements (the connection graph) ────────────

export const engagements = pgTable("engagements", {
  id: text("id").primaryKey().$defaultFn(() => nanoid()),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),                // "Dream Team Group", "SAP case study", "April 2026 exec training"
  description: text("description"),
  clientType: text("client_type"),               // training | advisory | reference | capital
});

export const noteEngagements = pgTable("note_engagements", {
  noteId: text("note_id").notNull().references(() => notes.id, { onDelete: "cascade" }),
  engagementId: text("engagement_id").notNull().references(() => engagements.id),
}, t => ({ pk: primaryKey({ columns: [t.noteId, t.engagementId] }) }));

// ── Spaced repetition (FSRS state per card) ───────────────

export const reviewCards = pgTable("review_cards", {
  id: text("id").primaryKey().$defaultFn(() => nanoid()),
  noteId: text("note_id").notNull().references(() => notes.id, { onDelete: "cascade" }),
  question: text("question").notNull(),
  answer: text("answer").notNull(),
  // FSRS state
  stability: real("stability").notNull().default(0),
  difficulty: real("difficulty").notNull().default(0),
  due: timestamp("due").notNull().defaultNow(),
  lastReview: timestamp("last_review"),
  reps: integer("reps").notNull().default(0),
  lapses: integer("lapses").notNull().default(0),
  state: text("state").notNull().default("new"),  // new | learning | review | relearning
  source: text("source").notNull(),               // manual | tutor_misconception | quiz_me
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// ── Tutor sessions ────────────────────────────────────────

export const tutorSessions = pgTable("tutor_sessions", {
  id: text("id").primaryKey().$defaultFn(() => nanoid()),
  noteId: text("note_id").references(() => notes.id),
  topicId: text("topic_id").references(() => topics.id),
  kind: text("kind").notNull(),                  // tutor | critic | synthesist | lab
  provider: text("provider").notNull(),          // anthropic | openai | openrouter
  model: text("model").notNull(),
  systemPromptKey: text("system_prompt_key").notNull(),
  startedAt: timestamp("started_at").notNull().defaultNow(),
  endedAt: timestamp("ended_at"),
  costUsd: real("cost_usd").notNull().default(0),
});

export const tutorMessages = pgTable("tutor_messages", {
  id: text("id").primaryKey().$defaultFn(() => nanoid()),
  sessionId: text("session_id").notNull().references(() => tutorSessions.id, { onDelete: "cascade" }),
  role: text("role").notNull(),                  // user | assistant | tool
  content: jsonb("content").notNull(),           // structured content blocks
  toolCalls: jsonb("tool_calls"),
  usage: jsonb("usage"),                         // {input, output, cache_read, cache_creation}
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// ── Tutor Lab (side-by-side framework comparison) ─────────

export const labRuns = pgTable("lab_runs", {
  id: text("id").primaryKey().$defaultFn(() => nanoid()),
  task: text("task").notNull(),                  // human-readable task
  promptText: text("prompt_text").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const labVariants = pgTable("lab_variants", {
  id: text("id").primaryKey().$defaultFn(() => nanoid()),
  runId: text("run_id").notNull().references(() => labRuns.id, { onDelete: "cascade" }),
  frameworkId: text("framework_id").notNull().references(() => frameworks.id),
  provider: text("provider").notNull(),
  model: text("model").notNull(),
  output: text("output"),
  toolCallLog: jsonb("tool_call_log"),
  latencyMs: integer("latency_ms"),
  costUsd: real("cost_usd"),
  error: text("error"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// ── Cost ledger (daily ceiling) ───────────────────────────

export const dailyCost = pgTable("daily_cost", {
  date: text("date").notNull(),                  // YYYY-MM-DD
  provider: text("provider").notNull(),
  totalUsd: real("total_usd").notNull().default(0),
}, t => ({ pk: primaryKey({ columns: [t.date, t.provider] }) }));

// ── Frontier digest (Phase 5) ─────────────────────────────

export const frontierItems = pgTable("frontier_items", {
  id: text("id").primaryKey().$defaultFn(() => nanoid()),
  pillarId: text("pillar_id").notNull().references(() => pillars.id),
  url: text("url").notNull().unique(),
  title: text("title").notNull(),
  author: text("author"),
  publishedAt: timestamp("published_at"),
  summary: text("summary"),
  thesisCheckQuestion: text("thesis_check_question"),
  dismissed: boolean("dismissed").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});
```

Add vector indexes after migration:

```sql
CREATE INDEX notes_embedding_idx ON notes USING hnsw (embedding vector_cosine_ops);
CREATE INDEX sources_embedding_idx ON sources USING hnsw (embedding vector_cosine_ops);
```

---

## 5. LLM abstraction layer

Critical for vendor neutrality. The app's tutor must be swappable so you experience model differences first-hand — you can't truly learn the OpenAI agent paradigm if your tutor only thinks like Claude.

### File layout

```
lib/llm/
├── provider.ts        # unified types: Message, Tool, StreamEvent, Usage, Capabilities
├── router.ts          # provider+model selection per session
├── cost.ts            # daily ceiling guard + per-call pricing tables
├── anthropic.ts       # @anthropic-ai/sdk impl
├── openai.ts          # openai SDK impl
├── openrouter.ts      # generic OpenAI-compatible client → Google, Llama, Hermes, DeepSeek, Qwen, Mistral, xAI
└── prompts/
    ├── tutor.md       # Socratic tutor system prompt
    ├── critic.md      # adversarial pressure-tester
    ├── synthesist.md  # draft writer
    └── digester.md    # frontier digest summariser
```

### Interface sketch

```ts
// lib/llm/provider.ts

export type Provider = "anthropic" | "openai" | "openrouter";

export interface Message {
  role: "system" | "user" | "assistant" | "tool";
  content: ContentBlock[];
}

export type ContentBlock =
  | { type: "text"; text: string }
  | { type: "tool_use"; id: string; name: string; input: unknown }
  | { type: "tool_result"; toolUseId: string; content: string };

export interface Tool {
  name: string;
  description: string;
  inputSchema: object;  // JSON schema
}

export interface ChatRequest {
  model: string;
  system?: string;
  messages: Message[];
  tools?: Tool[];
  maxTokens: number;
  temperature?: number;
  cacheableSystem?: boolean;   // prompt-caching hint
}

export interface StreamEvent {
  type: "text_delta" | "tool_use_start" | "tool_use_delta" | "message_complete" | "error";
  data: unknown;
}

export interface Usage {
  inputTokens: number;
  outputTokens: number;
  cacheReadTokens?: number;
  cacheCreationTokens?: number;
  costUsd: number;
}

export interface LLMProvider {
  provider: Provider;
  capabilities: {
    streaming: boolean;
    toolUse: boolean;
    promptCaching: boolean;
    extendedThinking: boolean;
    computerUse: boolean;
    mcp: boolean;
  };
  chat(req: ChatRequest): AsyncIterable<StreamEvent>;
  computeCost(model: string, usage: Omit<Usage, "costUsd">): number;
}
```

Don't fake parity where it doesn't exist. Expose the capability differences — that's pedagogically valuable. If a provider lacks prompt caching, the abstraction should report `capabilities.promptCaching = false` and the caller decides what to do.

### Prompt caching is non-negotiable

For Anthropic, mark system prompt + curriculum context blocks with `cache_control: { type: "ephemeral" }`. Typical hit rate 80-90% on stable contexts → ~10x cost savings. Anthropic format: `cache_control` headers in content blocks. OpenAI has its own prompt caching (automatic for prompts >1024 tokens, transparent). Treat as different code paths — don't pretend they're the same.

### Pricing table (rough — verify when wiring)

| Model | Input $/MTok | Output $/MTok | Cache Read $/MTok |
|---|---|---|---|
| Claude Sonnet 4.6 | 3.00 | 15.00 | 0.30 |
| Claude Opus 4.7 | 15.00 | 75.00 | 1.50 |
| Claude Haiku 4.5 | 1.00 | 5.00 | 0.10 |
| GPT-5 (assumed positioning) | TBD | TBD | TBD |
| OpenRouter Llama 3.3 70B | ~0.20 | ~0.60 | n/a |
| OpenRouter Hermes 3 405B | ~3.00 | ~3.00 | n/a |

Put real prices in `lib/llm/cost.ts` at build time; verify against current pricing pages.

---

## 6. MCP integration

MCP (Model Context Protocol) has won as the open standard for tool use — Anthropic invented it, OpenAI and Google now support it. Build on MCP from day one so:

1. Same tools work regardless of which model is tutoring you.
2. You learn MCP by living in it daily.
3. Migrating provider doesn't break tools.

### MCP servers to build (in order)

1. **`notes-db`** (Phase 1) — read/search your own notes. The tutor uses this to ground answers in what you've already written.
2. **`source-fetcher`** (Phase 1) — fetch a URL, return cleaned text via Mozilla Readability. PDF and YouTube transcript handlers.
3. **`web-search`** (Phase 2) — point at Brave/Tavily/Exa search API. The tutor can look things up live.
4. **`code-exec`** (Phase 2) — Pyodide in a worker or a Vercel function sandbox. For the Theory pillar — let the tutor actually compute an attention matrix.
5. **`engagement-context`** (Phase 2) — read Pertama engagements table. The Critic uses this when pressure-testing your Pertama application.
6. **`arxiv-rss`** (Phase 5) — feeds the daily frontier digest.

Each MCP server is a small TypeScript module under `lib/mcp/servers/`. Hosted in-process for the simplest deployment; can be separated into standalone processes later.

---

## 7. Curriculum — the six pillars

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

## 8. Phase 0 — Foundations (week 1)

Build the spine. Nothing user-facing yet beyond an auth gate.

### Tasks

1. **Branch + dependencies**
   - Confirm branch `claude/ai-learning-app-adnHU`
   - Run install commands from §3
   - Add `drizzle.config.ts`

2. **Auth**
   - Create GitHub OAuth app at github.com/settings/developers
     - Homepage: `https://hau.ge`
     - Callback: `https://hau.ge/api/auth/callback/github`
   - `app/api/auth/[...nextauth]/route.ts` with GitHub provider
   - `signIn` callback rejects unless `profile.login === process.env.LEARN_ALLOWLIST_GITHUB_LOGIN`
   - `middleware.ts` at repo root: `matcher: ["/learn/:path*"]`, redirect to sign-in if no session

3. **Database**
   - Create Neon project (free tier), enable `pgvector` extension
   - `lib/db/index.ts` — postgres-js + Drizzle client
   - `lib/db/schema.ts` — full schema from §4
   - First migration: `npx drizzle-kit generate && npx drizzle-kit push`
   - Add HNSW indexes (run SQL manually post-migration)

4. **LLM abstraction**
   - `lib/llm/provider.ts` — unified types
   - `lib/llm/anthropic.ts` — implement using `@anthropic-ai/sdk`, with prompt caching
   - `lib/llm/openai.ts` — implement using `openai`
   - `lib/llm/openrouter.ts` — OpenAI-compatible client with `baseURL: "https://openrouter.ai/api/v1"`
   - `lib/llm/router.ts` — `getProvider(provider): LLMProvider`
   - `lib/llm/cost.ts` — pricing tables + `recordCost(provider, usage)` writing to `dailyCost`
   - `lib/llm/cost.ts` exports `assertUnderCeiling()` — throws if today's spend ≥ `LEARN_DAILY_COST_CEILING_USD`

5. **MCP scaffold**
   - `lib/mcp/client.ts` — wraps `@modelcontextprotocol/sdk`
   - `lib/mcp/servers/index.ts` — registry
   - Don't build servers yet; reserve the directory

6. **Route group + skeleton**
   - `app/(learn)/layout.tsx` — auth check via `auth()`, redirect on fail, top nav (Dashboard | Pillars | Review | Lab | Search | Frontier)
   - `app/(learn)/page.tsx` — empty dashboard
   - Update `app/robots.ts` to disallow `/learn/*`
   - `app/(learn)/_components/` — shared UI primitives (NavBar, EmptyState, etc.)

7. **Seed data**
   - `scripts/seed-pillars.ts` — inserts six pillars with descriptions
   - `scripts/seed-frameworks.ts` — inserts frameworks taxonomy from §7
   - `scripts/seed-paradigms.ts` — inserts paradigms taxonomy
   - `scripts/seed-engagements.ts` — inserts Pertama engagements (Dream Team Group, SAP, April 2026 exec training, etc.)
   - Add `"seed": "tsx scripts/seed-all.ts"` to `package.json`

8. **Cost guard**
   - In `app/api/tutor/*` and similar handlers, call `assertUnderCeiling()` before any LLM call
   - Add `/learn/admin/cost` page showing today's spend per provider

### Exit criteria for Phase 0

- You can sign in at `hau.ge/learn`
- Empty dashboard renders for Michael, 404s for anyone else
- `npm run seed` populates pillars, frameworks, paradigms, engagements
- A minimal smoke test (`scripts/test-llm.ts`) successfully streams a Claude completion via `lib/llm` and records cost
- `robots.txt` disallows `/learn/*`

---

## 9. Phase 1 — Capture loop (weeks 2-3)

Build the daily capture habit before anything fancy. The Agents pillar gets populated first.

### Tasks

1. **Source intake**
   - `app/(learn)/sources/new` — paste URL → POST to `/api/sources/fetch`
   - `/api/sources/fetch` — uses Mozilla Readability to extract title/author/text, stores to `sources`
   - PDF upload via Vercel Blob → `pdf-parse` extracts text
   - YouTube: paste video URL, scrape oEmbed for metadata, allow manual transcript paste (skip yt-dlp dependency for now; revisit if pain point)
   - Embed source text via Voyage, store to `sources.embedding`
   - Each source can be assigned to a topic

2. **Note editor**
   - `app/(learn)/notes/new` and `app/(learn)/notes/[id]/edit`
   - Two-pane: MDX textarea + live preview (use existing `remark` pipeline)
   - **Required fields**: title, topic, body, `pertama_application` (non-empty to leave draft status)
   - Multi-select for `frameworks` and `paradigms` (Agents-pillar notes especially)
   - Multi-select for related `engagements`
   - "Linked sources" picker with full-text + semantic search
   - Save → embed body + `pertama_application` via Voyage, store to `notes.embedding`

3. **Pillar pages**
   - `app/(learn)/pillars/[slug]` — shows topics under pillar, progress bar (notes graduated / topics covered)
   - `app/(learn)/pillars/[slug]/topics/[topicSlug]` — topic detail, related sources, related notes

4. **Populate Agents pillar**
   - Insert ~20 topics across the six Agents sub-tracks (4a-4f from §7)
   - Add seed sources for ~5 of those topics so there's something to read
   - Goal: by end of Phase 1, you can sit down, read one paper, write one note, and have your first `pertama_application` recorded

5. **MCP server #1: `notes-db`**
   - Tools: `search_notes(query)`, `read_note(id)`, `list_topics(pillar)`, `list_engagements()`
   - Hosted in-process; registered in `lib/mcp/servers/index.ts`
   - Not yet connected to a tutor (Phase 2)

6. **MCP server #2: `source-fetcher`**
   - Tool: `fetch_source(url)` → returns extracted text + metadata
   - Used by the source intake flow internally

### Exit criteria for Phase 1

- You can add a source, read it offline, write a note with required `pertama_application`, and see it on the Agents pillar page
- You've done this for at least three sources from your Agents reading list
- Notes appear in the dashboard's "recent" feed

---

## 10. Phase 2 — Tutor, Critic, Synthesist, and Tutor Lab (weeks 4-5)

The system becomes conversational and adversarial. This is where it stops being a fancy Notion and becomes the learning engine.

### Tasks

1. **Tutor chat**
   - `app/(learn)/notes/[id]` — sidebar chat panel
   - `/api/tutor/stream` — streams via `lib/llm` based on session config
   - **System prompt** (`prompts/tutor.md`): Socratic, never gives answers directly, asks "what do you think happens if...", references your existing notes via `notes-db` MCP tool
   - Per-session model picker: pick Anthropic/OpenAI/OpenRouter + model (default Claude Sonnet 4.6)
   - Session persists in `tutorSessions` + `tutorMessages`
   - Prompt caching enabled for system prompt + curriculum context (Anthropic) or relied upon implicitly (OpenAI)

2. **Critic**
   - "Pressure-test my Pertama application" button on every note
   - **System prompt** (`prompts/critic.md`): plays a specific senior-buyer persona (CFO of a Southeast Asian family conglomerate; sceptical, time-poor, has heard the AI hype). Pulls engagement context via `engagement-context` MCP tool. Asks: "Why should I care? What specifically would you change in our [engagement]? What's the failure mode?"
   - Output: critique text + a list of detected misconceptions/gaps
   - **Misconception → review card**: any flagged misconception auto-creates a `reviewCards` row with `source: tutor_misconception` and a generated Q/A

3. **Synthesist**
   - "Draft synthesis from these sources" — Synthesist reads selected sources, produces a draft you then edit (you stay the author, attribution is yours)
   - **System prompt** (`prompts/synthesist.md`): tight, opinionated, in Michael's voice (give it your existing /writing essays as in-context examples for style)

4. **Quiz me**
   - On any note: "Generate 5 cards from this note" → Claude returns Q/A pairs as JSON → bulk insert into `reviewCards`
   - User can edit/reject cards before commit

5. **MCP server #3: `web-search`**
   - Tool: `search_web(query, n=5)` against Brave or Tavily or Exa
   - Wired into the Tutor

6. **MCP server #4: `engagement-context`**
   - Tool: `list_engagements()`, `read_engagement(slug)`
   - Wired into the Critic

7. **MCP server #5: `code-exec`**
   - Pyodide in a worker, or Vercel function with `python` sandbox
   - Tool: `run_python(code)` returns stdout/stderr
   - Wired into the Tutor — for the Theory pillar specifically, let the tutor compute an attention matrix, plot a loss curve, etc.

8. **Tutor Lab** (`/learn/lab`)
   - UI: enter a task ("quiz me on attention" / "explain bitter lesson to a CFO"). Select variants to run. Hit go. See side-by-side outputs with latency + cost + tool-call trace.
   - **Variants to support**:
     - `claude_agent_sdk` — Claude with native tool use + MCP
     - `openai_agents_sdk` — OpenAI Agents SDK with the same tools
     - `langgraph` — LangGraph state machine (Python; either spawn subprocess or expose via separate service later)
     - `hermes_openrouter` — Hermes 3 405B via OpenRouter with manual ReAct loop
     - `raw_mcp` — Pure MCP client + an open-weights model via OpenRouter, hand-rolled loop
   - Each variant logs to `labRuns` + `labVariants`
   - "Save winner" → captures the winning variant's output as a note for later review

### Exit criteria for Phase 2

- Tutor chat works against Claude, OpenAI, and one OpenRouter model
- Critic flags a misconception that auto-becomes a review card
- Synthesist produces a draft that's editable
- Tutor Lab runs at least three variants on the same task and you've written a note comparing them

---

## 11. Phase 3 — Retention & retrieval (weeks 6-7)

Make knowledge stick and findable.

### Tasks

1. **FSRS scheduler**
   - Use `ts-fsrs` npm package
   - `/learn/review` — daily queue UI, keyboard-driven (space = show answer, 1-4 = grade [Again / Hard / Good / Easy])
   - On grade, call `fsrs.next(card, grade)` → update `reviewCards`
   - Daily target on dashboard (X cards due)

2. **Embeddings backfill + cron**
   - Cron (Vercel cron job, daily 4am UTC): embed any new notes/sources, store to `embedding` columns
   - Re-embed on note update

3. **Hybrid search**
   - `/learn/search?q=...`
   - Combined: BM25/`ts_vector` over title + body + `pertama_application`, plus cosine similarity on `embedding`
   - Reciprocal rank fusion for the final ordering
   - Filter chips: pillar, framework, paradigm, engagement, status

4. **Resurface (daily)**
   - Cron picks 3 stale notes (graduated, not reviewed in N days, low cosine similarity to recent reading)
   - Generates a single Claude question per note: "How does [recent source title] connect to your note on [stale note title]?"
   - Posted to a "Today's resurface" panel on the dashboard
   - Answering creates a new note linking the two

### Exit criteria for Phase 3

- You do a daily review of due cards from your phone
- Hybrid search finds a note from a half-remembered phrase
- The resurface panel surfaces something connection-worthy at least 3x per week

---

## 12. Phase 4 — Six-pillar coverage (weeks 8-10)

Stop being Agents-only.

### Tasks

1. **Seed remaining pillars**
   - Insert ~15 topics per remaining pillar (Theory, Hardware, Companies, Debates, Scenarios) from §7
   - Add seed sources for the top 5 topics per pillar from the reading lists
   - **Edit the reading lists first** — they're v1 drafts, not final taste

2. **Cross-pillar navigation**
   - Framework pages: `/learn/frameworks/[slug]` — every note tagged with this framework, across pillars
   - Paradigm pages: `/learn/paradigms/[slug]` — same
   - Engagement pages: `/learn/engagements/[slug]` — every note connected to this Pertama engagement
   - These are the connection-graph surfaces

3. **Progress visualisation**
   - Dashboard widget: pillar coverage map (heatmap of topics covered)
   - "Drought" indicator — pillars not touched in N days

### Exit criteria for Phase 4

- Every pillar has at least 5 graduated notes
- The pillar coverage heatmap is mostly green
- You've written at least one cross-pillar note (e.g. "Sutton's bitter lesson applied to choice of agent framework" — touches Debates + Agents)

---

## 13. Phase 5 — Frontier digest + promote pipeline (week 11+)

The system becomes self-feeding and starts producing public artifacts.

### Tasks

1. **Frontier RSS ingest**
   - Configure per-pillar feeds: arXiv categories (cs.LG, cs.CL, cs.AI), Anthropic / OpenAI / DeepMind blogs, Stratechery, SemiAnalysis, Karpathy / LeCun / Hinton accounts where feeds available
   - Daily cron pulls new items, deduplicates against `frontierItems.url`
   - For each new item: Claude (cheap, Haiku 4.5) summarises in 3 sentences, generates one "thesis-check" question against your most-cited notes

2. **Frontier inbox**
   - `/learn/frontier` — list of new items, each with summary + thesis-check question
   - Actions: Dismiss / Save as source / Open conversation with Tutor
   - "Save as source" + writing a note keeps the system fed

3. **Promote-to-writing pipeline**
   - On a graduated note: "Promote to /writing" button
   - Server action:
     - Convert MDX to the format expected by `content/writing/` (check existing frontmatter convention)
     - Write to `content/writing/drafts/<slug>.md`
     - Mark note `status = 'published'`, set `publishedSlug`
   - Manual final step: review draft, run existing `npm run publish-post` script when ready
   - Conscious decision: not fully automated — you stay the editorial filter

4. **Optional: Academy handoff format**
   - "Export for Academy" button — generates MDX with a stricter frontmatter convention (curriculum-friendly: prerequisites, learning objectives, exercises)
   - Drops into `tmp/academy-export/<slug>.mdx`
   - You manually copy into the Academy repo
   - Defines the contract between `/learn` and Academy without coupling the systems

### Exit criteria for Phase 5

- Daily frontier digest arriving with summary + thesis-check questions
- You've promoted at least one note to a published `/writing` essay
- At least one note has been exported as Academy content

---

## 14. Cost guardrails

### Defaults

- Daily ceiling: `LEARN_DAILY_COST_CEILING_USD=10` (adjust as you learn your actual usage)
- Soft-warn UI banner at 70% (`$7`)
- Hard-stop at 100% — all LLM calls throw

### Model defaults

| Role | Provider | Model | Why |
|---|---|---|---|
| Tutor | Anthropic | Claude Sonnet 4.6 | Best price-quality for Socratic dialogue |
| Critic | Anthropic | Claude Opus 4.7 | Sharper, worth the cost for pressure-test |
| Synthesist | Anthropic | Claude Opus 4.7 | Writing quality matters more than cost |
| Quiz generator | Anthropic | Claude Haiku 4.5 | Cheap, structured output is easy |
| Frontier digest | Anthropic | Claude Haiku 4.5 | High volume, summarisation is easy |
| Embeddings | Voyage | voyage-3-large | Best non-OpenAI quality |
| Tutor Lab | varies | varies | Whole point is comparison |

### Prompt caching

- **Anthropic**: Mark system prompts and stable curriculum context with `cache_control: { type: "ephemeral" }`. Aim for >80% cache read on tutor sessions.
- **OpenAI**: Automatic above 1024 tokens. Structure prompts with stable content first, variable content last.
- **OpenRouter**: Depends on underlying provider. Don't rely on caching for these calls.

---

## 15. Privacy & security

- `robots.ts` disallows `/learn/*`
- NextAuth allowlist enforced in `signIn` callback — anyone else gets bounced
- Database is Neon's free tier; data lives in their US-East region (acceptable for personal notes)
- API keys server-side only; never expose to client components
- All MCP tool calls server-side
- Nightly backup: cron exports `notes`, `reviewCards`, `tutorMessages` as JSON to a private R2 bucket or GitHub gist
- No PII about clients — Pertama engagements stored as titles and your private reflection only

---

## 16. Setup checklist

When you sit down to start Phase 0, you need:

### Accounts

- [ ] **Neon** account at neon.tech → create project `hau-ge-learn` → copy `DATABASE_URL`
- [ ] **GitHub OAuth app** at github.com/settings/developers → New OAuth App → callback `https://hau.ge/api/auth/callback/github` and `http://localhost:3000/api/auth/callback/github` → copy client ID + secret
- [ ] **Anthropic** API key at console.anthropic.com → copy `ANTHROPIC_API_KEY`
- [ ] **OpenAI** API key at platform.openai.com → copy `OPENAI_API_KEY`
- [ ] **OpenRouter** API key at openrouter.ai → copy `OPENROUTER_API_KEY` (~$5 credit to start is fine)
- [ ] **Voyage** API key at voyageai.com → copy `VOYAGE_API_KEY`

### Optional (Phase 2-5)

- [ ] **Brave Search** or **Tavily** or **Exa** API key (web-search MCP server)
- [ ] **Vercel Blob** enabled on the hau.ge project (PDF source uploads)
- [ ] **Cloudflare R2** or GitHub Personal Access Token (nightly backups)

### Local secrets

Add to `.env.local` (gitignored already in this repo):

```bash
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=<openssl rand -base64 32>
GITHUB_OAUTH_CLIENT_ID=...
GITHUB_OAUTH_CLIENT_SECRET=...
LEARN_ALLOWLIST_GITHUB_LOGIN=<your-github-username>
DATABASE_URL=postgres://...neon.tech/neondb
ANTHROPIC_API_KEY=sk-ant-...
OPENAI_API_KEY=sk-...
OPENROUTER_API_KEY=sk-or-...
VOYAGE_API_KEY=pa-...
LEARN_DAILY_COST_CEILING_USD=10
```

### Vercel production env

Mirror the above (with `NEXTAUTH_URL=https://hau.ge`) into the Vercel project settings.

---

## 17. Open questions to revisit

These were deferred. Decide as they come up.

- **Mobile**: PWA install + offline review queue? Probably yes for review at least, but defer until Phase 3 is shipped.
- **Voice**: Could `/learn` accept voice notes (transcribed by Whisper, summarised by Claude)? Useful for capture on the move. Defer.
- **Multi-device sync**: Single Neon DB handles this. No special work unless we add offline-first behaviour.
- **Backups**: Nightly to where? GitHub gist, R2, or Neon's own branching? Decide in Phase 1.
- **PDF annotation**: Native PDF viewer with highlight → note shortcut? Probably overbuilt for v1; revisit if you find yourself reading lots of papers in-app.
- **Embed-on-write vs cron-batch**: Currently planned as cron-batch. Switch to on-write if latency-to-search becomes annoying.
- **Sharing single notes**: Public read-only URL for a single note (with the `pertama_application` redacted)? Useful for showing colleagues. Defer.
- **Plug-in MCP servers from outside**: Connect to community MCP servers (e.g. Slack, Linear, Calendar) so the tutor has more context? Defer until Phase 5.

---

## 18. Working with Claude Code when you're home

When you return home and want to build this, the high-leverage Claude Code prompts:

### Kickoff prompt for Phase 0

> Read `docs/learn-plan.md`. Confirm you understand sections 2-8. Then execute Phase 0 task by task, starting with #1 (branch + dependencies). Pause after each numbered task and let me verify before moving on. Use the branch `claude/ai-learning-app-adnHU`. Don't commit until I tell you to. When you hit a decision point not specified in the plan, ask me — don't guess.

### Mid-phase prompts

> We're at Phase 1 task 4 (populate Agents pillar). Read the seed reading in §7 pillar 4a. Generate seed source rows (title, author, url placeholder, kind) and a SQL insert script. Don't run it; let me review.

> Implement the Critic system prompt (`prompts/critic.md`). Reference the persona spec in §10 task 2. Draft it in Michael's voice — sceptical, time-poor, Southeast Asian family-business CFO. Output the markdown, I'll review.

### When something in the plan is wrong

> The plan in §11 task 1 assumes ts-fsrs has a Web-friendly build. Verify before implementing. If it doesn't, propose an alternative and update the plan section before coding.

### Plan-as-source-of-truth discipline

Update `docs/learn-plan.md` whenever you make a decision that contradicts it. The plan should always reflect what's actually built, not what was originally intended.

---

## Appendix A: Estimated effort

Rough hours assuming Claude Code is doing the heavy lifting and you're reviewing/directing:

| Phase | Calendar weeks | Active hours |
|---|---|---|
| 0. Foundations | 1 | 6-10 |
| 1. Capture loop | 2 | 10-15 |
| 2. Tutor + Lab | 2 | 15-25 |
| 3. Retention & retrieval | 2 | 8-12 |
| 4. Pillar coverage | 2-3 | 6-10 (mostly content) |
| 5. Frontier + promote | 1+ | 8-12 |
| **Total to v1** | **~10-12 weeks calendar** | **~55-85 hours active** |

Plus the actual *learning* hours — the system is only valuable if you put 5-10 hours of reading + writing through it per week.

---

## Appendix B: Anti-goals (don't build these)

- **Public dashboard / shareable progress** — defeats the private-by-default principle
- **Gamification (streaks, points)** — antithetical to durable learning
- **Multi-user / multi-tenant** — that's Academy, not `/learn`
- **Live chat with other learners** — wrong product
- **AI-generated notes without human edit** — kills the synthesis loop
- **Auto-promote graduated notes to public** — kills editorial control
- **Free-tier-everything mindset** — pay for Claude Opus on the Critic and the SemiAnalysis subscription; the cost is tiny vs. the learning value

---

*End of plan. Edit freely as you build — this is a starting position, not scripture.*
