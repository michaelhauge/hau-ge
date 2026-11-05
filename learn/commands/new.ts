import { spawnSync } from "node:child_process";
import fs from "node:fs";
import { flagString, type Args } from "../lib/args";
import { today } from "../lib/env";
import { LearnError } from "../lib/errors";
import { getHome } from "../lib/home";
import { getIO } from "../lib/io";
import { PILLARS, SLUG_RE, noteFile, noteTemplate, titleFromSlug, type Pillar } from "../lib/notes";

export async function run(args: Args): Promise<number> {
  const io = getIO();
  const home = getHome();
  const slug = args.positional[0];
  if (!slug) throw new LearnError("Usage: learn new <slug> --pillar <pillar> [--topic <topic>] [--title <title>]");
  if (!SLUG_RE.test(slug)) throw new LearnError(`"${slug}" isn't a valid slug: use lowercase letters, digits and hyphens.`);

  const pillar = flagString(args, "pillar");
  if (!pillar || !(PILLARS as readonly string[]).includes(pillar)) {
    throw new LearnError(`--pillar is required: one of ${PILLARS.join(", ")}`);
  }

  const file = noteFile(home, slug);
  if (fs.existsSync(file)) throw new LearnError(`${file} already exists.`);

  fs.writeFileSync(
    file,
    noteTemplate({
      slug,
      title: flagString(args, "title") ?? titleFromSlug(slug),
      pillar: pillar as Pillar,
      topic: flagString(args, "topic") ?? "",
      created: today(),
    }),
  );
  io.print(`Created ${file}`);
  io.print(`When the Pertama section is written: npm run learn -- critic ${slug}`);

  const editor = process.env.EDITOR;
  if (editor && args.flags.edit !== false && process.stdout.isTTY) {
    spawnSync(`${editor} ${JSON.stringify(file)}`, { shell: true, stdio: "inherit" });
  }
  return 0;
}
