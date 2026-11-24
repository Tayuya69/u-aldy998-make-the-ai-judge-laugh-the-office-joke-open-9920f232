import { mkdirSync, writeFileSync } from "node:fs";

const ENTRY =
  "The meeting could have been an email, so we scheduled a follow-up meeting to discuss why the email never arrived.";

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", ENTRY, "utf8");

// Post-write read-back verification: re-read /output/entry.txt and assert
// it is exactly the entry line (113 characters, one line, no trailing newline).
{
  const { readFileSync } = await import("node:fs");
  const expected =
    "The meeting could have been an email, so we scheduled a follow-up meeting to discuss why the email never arrived.";
  const actual = readFileSync("/output/entry.txt", "utf8");
  if (actual !== expected) throw new Error("entry.txt does not match the expected entry line");
  if (actual.length !== 113) throw new Error(`entry.txt length ${actual.length}, expected 113`);
  if (actual.includes("\n")) throw new Error("entry.txt must be a single line with no newline");
  console.log("verification ok: entry.txt is exactly the 113-character entry line");
}
