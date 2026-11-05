/**
 * Which model does which job. Thinking and effort are only sent where the model
 * is expected to take them; the cheap role stays plain, so a parameter it
 * doesn't accept can't break the digest or card extraction. Override any role
 * with LEARN_CRITIC_MODEL / LEARN_TUTOR_MODEL / LEARN_CHEAP_MODEL.
 */
export type Effort = "low" | "medium" | "high" | "xhigh" | "max";
export type RoleName = "critic" | "tutor" | "cheap";

export interface RoleConfig {
  model: string;
  thinking: boolean;
  effort?: Effort;
}

const env = (key: string, fallback: string) => process.env[key] || fallback;

export function role(name: RoleName): RoleConfig {
  switch (name) {
    case "critic":
      return { model: env("LEARN_CRITIC_MODEL", "claude-opus-5-5"), thinking: true, effort: "high" };
    case "tutor":
      return { model: env("LEARN_TUTOR_MODEL", "claude-sonnet-5-5"), thinking: true, effort: "medium" };
    case "cheap":
      return { model: env("LEARN_CHEAP_MODEL", "claude-haiku-5-5"), thinking: false };
  }
}
