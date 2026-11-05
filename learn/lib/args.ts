export interface Args {
  positional: string[];
  flags: Record<string, string | boolean>;
}

/** Minimal argv parser: `--key value`, `--key=value`, `--flag`, `--no-flag`. */
export function parseArgs(argv: string[]): Args {
  const positional: string[] = [];
  const flags: Record<string, string | boolean> = {};
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--") {
      positional.push(...argv.slice(i + 1));
      break;
    }
    if (!a.startsWith("--")) {
      positional.push(a);
      continue;
    }
    const eq = a.indexOf("=");
    if (eq !== -1) {
      flags[a.slice(2, eq)] = a.slice(eq + 1);
    } else if (a.startsWith("--no-")) {
      flags[a.slice(5)] = false;
    } else if (i + 1 < argv.length && !argv[i + 1].startsWith("--")) {
      flags[a.slice(2)] = argv[++i];
    } else {
      flags[a.slice(2)] = true;
    }
  }
  return { positional, flags };
}

export function flagString(args: Args, name: string): string | undefined {
  const v = args.flags[name];
  return typeof v === "string" ? v : undefined;
}
