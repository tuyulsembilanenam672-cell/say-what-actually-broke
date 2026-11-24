// Say What Actually Broke — one honest, funny error message.
//
// The line names the real failure in plain words (the server is down
// because someone deployed on a Friday), owns it ("That someone was
// us"), and tells the user what to do next (try again Monday).
// No network, Node stdlib only.

import { mkdirSync, writeFileSync } from "node:fs";

const LINE =
  "Error 500: the server is down because someone deployed on a Friday. " +
  "That someone was us. Try again Monday.";

const MAX_CODE_POINTS = 200;

function codePointCount(text) {
  return [...text].length;
}

function isSingleLine(text) {
  return !/[\r\n]/.test(text);
}
function main() {
  const count = codePointCount(LINE);
  if (count < 1 || count > MAX_CODE_POINTS) {
    throw new Error(
      `entry must be 1-${MAX_CODE_POINTS} code points, got ${count}`,
    );
  }
  if (!isSingleLine(LINE)) {
    throw new Error("entry must be a single line");
  }
  if (LINE.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  mkdirSync("/output", { recursive: true });
  writeFileSync("/output/entry.txt", LINE, "utf8");
  console.log(`Wrote ${count} code points to /output/entry.txt`);
}

main();
