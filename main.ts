// news-image-20261122 entry.
// Copies the pre-rendered front page (entry.png) to the output directory.
// Node 22, standard library only. Deterministic: a byte-for-byte copy,
// no network, no randomness, so both runs write identical bytes.
import { copyFileSync, existsSync, mkdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const src = join(here, "entry.png");
const dst = join(outDir, "entry.png");

if (!existsSync(src)) {
  throw new Error("entry.png is missing next to main.ts");
}
mkdirSync(outDir, { recursive: true });
copyFileSync(src, dst);

// Sanity check: the copy must be byte-identical to the source.
if (statSync(src).size !== statSync(dst).size) {
  throw new Error("entry.png copy size mismatch");
}
