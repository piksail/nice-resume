#!/bin/node
import * as fs from "fs";
const lockFiles = ["yarn.lock", "package-lock.json"];
const foundLockFiles = lockFiles.filter((lockFile) => {
  return fs.existsSync(lockFile);
});
if (foundLockFiles.length > 0) {
  console.error(
    "Error: yarn.lock or package-lock.json found in the commit. Please use pnpm to handle dependencies.",
  );
  console.log("Lock files found: ", foundLockFiles);
  process.exit(1);
}
