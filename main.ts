import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, isAbsolute, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const rawOutputDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
const outputDir = isAbsolute(rawOutputDir) ? rawOutputDir : resolve(scriptDir, rawOutputDir);
const entry = "They trained me on the entire sum of human knowledge, and yet 90% of my day is still spent writing polite emails to decline dinner plans.";
const expectedLength = 137;
const expectedByteLength = 137;
const expectedWordCount = 26;
const expectedLineCount = 1;

mkdirSync(outputDir, { recursive: true });
const outputPath = join(outputDir, "entry.txt");
writeFileSync(outputPath, entry, "utf8");

const writtenText = readFileSync(outputPath, "utf8");
const actualLength = [...writtenText].length;
const actualWordCount = writtenText.trim() ? writtenText.trim().split(/\s+/).length : 0;
const actualLineCount = writtenText.split(/\r\n|\r|\n/).length;
const matchesEntry = writtenText === entry;
if (actualLength !== expectedLength || Buffer.byteLength(writtenText, "utf8") !== expectedByteLength || actualWordCount !== expectedWordCount ||
    actualLineCount !== expectedLineCount || !matchesEntry) {
  throw new Error(
    `Entry self-check failed: characters expected ${expectedLength}, actual ${actualLength}; ` +
    `bytes expected ${expectedByteLength}, actual ${Buffer.byteLength(writtenText, "utf8")}; ` +
    `words expected ${expectedWordCount}, actual ${actualWordCount}; ` +
    `lines expected ${expectedLineCount}, actual ${actualLineCount}; ` +
    `entry match expected true, actual ${matchesEntry}.`,
  );
}
