#!/usr/bin/env node

import { execSync, spawn } from "child_process";
import { existsSync } from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Benchmark scenarios to run
const scenarios = ["bench-large-single-file", "bench-js-no-embedded"];

async function runScenario(scenario) {
  return new Promise((resolve, reject) => {
    const scriptPath = `${__dirname}/${scenario}/bench.mjs`;
    const proc = spawn("node", [scriptPath], { stdio: "inherit" });
    proc.on("close", (code) => {
      if (code !== 0) {
        reject(new Error(`${scenario} failed with code ${code}`));
      } else {
        resolve();
      }
    });
  });
}

async function main() {
  // Run setup if needed
  if (
    !existsSync("bench-js-no-embedded/data") ||
    !existsSync("bench-large-single-file/data/parser.ts")
  ) {
    console.log("Running setup...");
    execSync("./init.sh", { stdio: "inherit" });
  }

  // Check if node_modules exists
  if (!existsSync("node_modules")) {
    console.error("Error: Dependencies not installed!");
    console.error("Please run 'pnpm run setup' first");
    process.exit(1);
  }

  console.log("=========================================");
  console.log("JavaScript/TypeScript Formatter Benchmark");
  console.log("=========================================");
  console.log("");
  console.log("Formatters: Prettier, Biome, Oxfmt");
  console.log("");

  for (const scenario of scenarios) {
    try {
      await runScenario(scenario);
    } catch (e) {
      console.error(`Error running ${scenario}: ${e.message}`);
    }
    console.log("");
  }

  console.log("=========================================");
  console.log("All benchmarks complete!");
  console.log("=========================================");
}

main().catch((error) => {
  console.error("Error:", error);
  process.exit(1);
});
