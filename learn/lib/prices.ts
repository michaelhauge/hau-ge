import { LearnError } from "./errors";

/**
 * USD per million tokens. Verified 2026-11-05 against https://claude.com/pricing
 * (5-minute cache TTL rates). Re-check when you change models. A model missing
 * from this table is a hard error, so spend is never silently logged as $0.
 */
export const PRICES_VERIFIED = "2026-11-05, https://claude.com/pricing";

interface Rate {
  input: number;
  output: number;
  cacheWrite: number;
  cacheRead: number;
}

interface ModelPrice {
  /** Tiers by total prompt tokens (input + cache read + cache write), ascending. */
  tiers: Array<{ upToPromptTokens: number; rate: Rate }>;
}

const flat = (rate: Rate): ModelPrice => ({ tiers: [{ upToPromptTokens: Infinity, rate }] });

export const PRICES: Record<string, ModelPrice> = {
  "claude-fable-5-1": flat({ input: 10, output: 50, cacheWrite: 12.5, cacheRead: 0.25 }),
  "claude-opus-5-5": flat({ input: 4, output: 20, cacheWrite: 5, cacheRead: 0.2 }),
  "claude-sonnet-5-5": flat({ input: 2, output: 10, cacheWrite: 2.5, cacheRead: 0.1 }),
  "claude-haiku-5-5": {
    tiers: [
      { upToPromptTokens: 100_000, rate: { input: 0.1, output: 0.5, cacheWrite: 0.125, cacheRead: 0.01 } },
      { upToPromptTokens: Infinity, rate: { input: 0.5, output: 2.5, cacheWrite: 0.625, cacheRead: 0.05 } },
    ],
  },
};

/**
 * Server-side web search is billed per search on top of tokens. It wasn't on the
 * pricing page on 2026-11-05; $10 per 1,000 searches was the documented rate in
 * 2025. Kept so the daily ceiling over-counts rather than under-counts.
 */
export const WEB_SEARCH_USD_PER_SEARCH = 10 / 1000;

export interface UsageLike {
  input_tokens: number;
  output_tokens: number;
  cache_creation_input_tokens?: number | null;
  cache_read_input_tokens?: number | null;
  server_tool_use?: { web_search_requests?: number | null } | null;
}

export function assertPriced(model: string): void {
  if (!PRICES[model]) {
    throw new LearnError(
      `No price for model "${model}" in learn/lib/prices.ts. Add it from https://claude.com/pricing before using it.`,
    );
  }
}

export function costUsd(model: string, usage: UsageLike): number {
  assertPriced(model);
  const cw = usage.cache_creation_input_tokens ?? 0;
  const cr = usage.cache_read_input_tokens ?? 0;
  const prompt = usage.input_tokens + cw + cr;
  const tiers = PRICES[model].tiers;
  const r = (tiers.find((t) => prompt <= t.upToPromptTokens) ?? tiers[tiers.length - 1]).rate;
  const tokens =
    (usage.input_tokens * r.input + usage.output_tokens * r.output + cw * r.cacheWrite + cr * r.cacheRead) / 1_000_000;
  const searches = (usage.server_tool_use?.web_search_requests ?? 0) * WEB_SEARCH_USD_PER_SEARCH;
  return tokens + searches;
}
