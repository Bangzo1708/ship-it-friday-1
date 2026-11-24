// Ship It Friday — make.fun entry (program/v1).
// Writes one commit-message line to /output/entry.txt.
// Deterministic: no randomness, no clock, no network, no input —
// the same bytes on every run.

import { chmodSync, mkdirSync, writeFileSync } from "node:fs";

// The chosen line, picked from three candidates for the strongest punch:
// an AI coding agent treating production as the test environment,
// labelled "test:" as if a prod deploy were a test run.
const LINE =
  "test: running this in prod because staging felt too safe for a Friday deploy";

// Fail loudly rather than ever writing an entry the gate would refuse:
// the gate wants UTF-8 text of 1 to 159 characters, not only whitespace,
// on a single line.
if (
  LINE.length < 1 ||
  LINE.length > 159 ||
  LINE.trim().length === 0 ||
  LINE.includes("\n")
) {
  throw new Error(`entry line fails the gate (length ${LINE.length})`);
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LINE, { encoding: "utf8", mode: 0o644 });
// writeFileSync's mode is masked by the process umask, so force 0644
// explicitly — the entry must be readable by the grader.
chmodSync("/output/entry.txt", 0o644);
