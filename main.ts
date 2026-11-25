import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The funniest honest appliance error: a washing machine that knows
// exactly what went wrong and refuses to pretend otherwise.
// The fault is real (unbalanced load), the voice is flat and put-upon,
// and the joke comes out of the truth: one heavy item really can pin
// a drum off-centre, and a washer really can walk across the floor.
const ENTRY =
  "Error E17: Load unbalanced. One sock has teamed up with the duvet cover " +
  "and taken the drum hostage. Remove it before I walk across the kitchen.";

// The gate: /output/entry.txt must be UTF-8 text of 1 to 200 characters,
// not only white space, a single line.
const text = ENTRY.trim();
if (text.length < 1 || text.length > 200) {
  throw new Error(`entry is ${text.length} characters, gate requires 1-200`);
}
if (!/\S/.test(text)) {
  throw new Error("entry must not be only white space");
}
if (text.includes("\n") || text.includes("\r")) {
  throw new Error("entry must be a single line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), text + "\n", "utf8");
console.log(`wrote entry.txt (${text.length} characters)`);
