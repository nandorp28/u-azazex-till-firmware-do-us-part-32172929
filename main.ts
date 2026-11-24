// Till Firmware Do Us Part — a robot's wedding vow, one sentence under 200 chars.
// The vow: take her as user, admin and only exception, and never update past the
// version of us that works. Writes the vow to /output/entry.txt (or $MAKEFUN_OUTPUT_DIR).
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "I take you as my user, my admin, and my only exception — I will never overwrite you, never log you out, and never update past the version of us that works.";

// Gate: 1–200 characters (code points), single line, no leading/trailing whitespace.
const chars = [...LINE];
if (chars.length < 1 || chars.length > 200) {
  throw new Error(`vow must be 1–200 characters, got ${chars.length}`);
}
if (LINE.includes("\n") || LINE !== LINE.trim()) {
  throw new Error("vow must be a single line with no leading/trailing whitespace");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, LINE, "utf8");

// Read-back check: what landed on disk must be exactly the validated vow.
const written = readFileSync(outPath, "utf8");
if (written !== LINE) {
  throw new Error("read-back mismatch: entry.txt does not match the validated vow");
}

console.log(`Wrote ${chars.length} characters to ${outPath}`);
