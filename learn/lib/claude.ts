import Anthropic from "@anthropic-ai/sdk";
import type { Home } from "./home";
import { LearnError } from "./errors";
import { assertPriced, costUsd } from "./prices";
import { assertUnderCeiling, recordCost } from "./cost";
import { role as roleConfig, type RoleConfig, type RoleName } from "./models";

/** The slice of the SDK client this tool uses; tests swap in a fake via setClient. */
export type ClaudeClient = { messages: Pick<Anthropic["messages"], "create" | "stream"> };

let client: ClaudeClient | null = null;

export function setClient(c: ClaudeClient | null): void {
  client = c;
}

function getClient(): ClaudeClient {
  if (!client) {
    try {
      // Resolves ANTHROPIC_API_KEY (from .env.local) or an `ant auth login` profile.
      client = new Anthropic();
    } catch (e) {
      throw new LearnError(
        `Couldn't create the Anthropic client: ${(e as Error).message}\nSet ANTHROPIC_API_KEY in hau-ge/.env.local.`,
      );
    }
  }
  return client;
}

async function friendly<T>(fn: () => Promise<T>): Promise<T> {
  try {
    return await fn();
  } catch (e) {
    if (e instanceof Anthropic.AuthenticationError) {
      throw new LearnError("Anthropic rejected the credentials. Check ANTHROPIC_API_KEY in hau-ge/.env.local.");
    }
    if (e instanceof Anthropic.RateLimitError) throw new LearnError("Rate limited by the API. Try again in a minute.");
    if (e instanceof Anthropic.BadRequestError) {
      throw new LearnError(`The API rejected the request: ${e.message}`);
    }
    if (e instanceof Anthropic.APIError) throw new LearnError(`API error ${e.status ?? ""}: ${e.message}`);
    throw e;
  }
}

function modelParams(r: RoleConfig) {
  return {
    model: r.model,
    ...(r.thinking ? { thinking: { type: "adaptive" as const } } : {}),
  };
}

function record(home: Home, command: string, model: string, msg: Anthropic.Message): number {
  const u = msg.usage;
  const usd = costUsd(model, u);
  recordCost(home, {
    command,
    model,
    input_tokens: u.input_tokens,
    output_tokens: u.output_tokens,
    cache_read_input_tokens: u.cache_read_input_tokens ?? 0,
    cache_creation_input_tokens: u.cache_creation_input_tokens ?? 0,
    web_search_requests: u.server_tool_use?.web_search_requests ?? 0,
    usd,
  });
  return usd;
}

function checkStop(msg: Anthropic.Message): void {
  if (msg.stop_reason === "refusal") {
    const d = msg.stop_details;
    throw new LearnError(`Claude declined this request${d?.category ? ` (${d.category})` : ""}. ${d?.explanation ?? ""}`.trim());
  }
  if (msg.stop_reason === "max_tokens") throw new LearnError("The response hit max_tokens before finishing.");
  if (msg.stop_reason === "model_context_window_exceeded") throw new LearnError("The prompt is too large for the model.");
}

export function textOf(content: Anthropic.ContentBlock[]): string {
  return content
    .filter((b): b is Anthropic.TextBlock => b.type === "text")
    .map((b) => b.text)
    .join("");
}

export interface JSONResult<T> {
  data: T;
  usd: number;
  model: string;
}

/** One structured-output call. The system prompt is cached; the ceiling is checked first. */
export async function callJSON<T>(opts: {
  home: Home;
  command: string;
  role: RoleName;
  system: string;
  user: string;
  schema: Record<string, unknown>;
  maxTokens?: number;
}): Promise<JSONResult<T>> {
  const r = roleConfig(opts.role);
  assertPriced(r.model);
  assertUnderCeiling(opts.home);

  const params: Anthropic.MessageCreateParamsNonStreaming = {
    ...modelParams(r),
    max_tokens: opts.maxTokens ?? 16000,
    system: [{ type: "text", text: opts.system, cache_control: { type: "ephemeral" } }],
    messages: [{ role: "user", content: opts.user }],
    output_config: {
      ...(r.effort ? { effort: r.effort } : {}),
      format: { type: "json_schema", schema: opts.schema },
    },
  };
  const msg = await friendly(() => getClient().messages.create(params));
  const usd = record(opts.home, opts.command, r.model, msg);
  checkStop(msg);
  const text = textOf(msg.content);
  try {
    return { data: JSON.parse(text) as T, usd, model: r.model };
  } catch {
    throw new LearnError(`Expected JSON from ${r.model} but got: ${text.slice(0, 300)}`);
  }
}

export interface TurnResult {
  /** Assistant messages to append to the history (more than one if the server paused). */
  appended: Anthropic.MessageParam[];
  text: string;
  usd: number;
}

/**
 * One streamed assistant turn. Server tools (web search/fetch) can pause a long
 * turn (`pause_turn`); we send the partial turn back and let it continue.
 */
export async function streamTurn(opts: {
  home: Home;
  command: string;
  role: RoleName;
  system: Anthropic.TextBlockParam[];
  messages: Anthropic.MessageParam[];
  tools?: Anthropic.ToolUnion[];
  onText: (delta: string) => void;
}): Promise<TurnResult> {
  const r = roleConfig(opts.role);
  assertPriced(r.model);
  const appended: Anthropic.MessageParam[] = [];
  let text = "";
  let usd = 0;
  for (let i = 0; i < 5; i++) {
    assertUnderCeiling(opts.home);
    const params: Anthropic.MessageStreamParams = {
      ...modelParams(r),
      max_tokens: 32000,
      system: opts.system,
      messages: [...opts.messages, ...appended],
      // Auto-cache the conversation so far: each turn re-reads the last one at cache rates.
      cache_control: { type: "ephemeral" },
      ...(r.effort ? { output_config: { effort: r.effort } } : {}),
      ...(opts.tools?.length ? { tools: opts.tools } : {}),
    };
    const final = await friendly(async () => {
      const stream = getClient().messages.stream(params);
      stream.on("text", opts.onText);
      return stream.finalMessage();
    });
    usd += record(opts.home, opts.command, r.model, final);
    appended.push({ role: "assistant", content: final.content });
    text += textOf(final.content);
    if (final.stop_reason !== "pause_turn") {
      checkStop(final);
      return { appended, text, usd };
    }
  }
  throw new LearnError("The turn kept pausing; giving up after 5 continuations.");
}
