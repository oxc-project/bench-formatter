#!/usr/bin/env node

import { execSync, spawn } from "child_process";
import { existsSync } from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Benchmark scenarios to run
const scenarios = [
  "bench-large-single-file",
  "bench-js-no-embedded",
  "bench-mixed-embedded",
  "bench-full-features",
];

async function runScenario(scenario) {
  return new Promise((resolve, reject) => {
    const scriptPath = `${__dirname}/${scenario}/bench.mjs`;
    const proc = spawn("node", [scriptPath], { stdio: "inherit" });
    proc.on("error", reject);
    proc.on("close", (code, signal) => {
      if (code !== 0) {
        const message = signal
          ? `${scenario} failed with signal ${signal}`
          : `${scenario} failed with code ${code}`;
        reject(new Error(message));
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
    !existsSync("bench-mixed-embedded/data") ||
    !existsSync("bench-full-features/data") ||
    !existsSync("bench-large-single-file/data/parser.ts")
  ) {
    console.log("Running setup...");
    execSync("./init.sh", { stdio: "inherit" });
  }

  // Check if node_modules exists
  if (!existsSync("node_modules")) {
    console.error("Error: Dependencies not installed!");
    console.error("Please run './init.sh' or 'pnpm install' first");
    process.exit(1);
  }

  console.log("=========================================");
  console.log("JavaScript/TypeScript Formatter Benchmark");
  console.log("=========================================");
  console.log("");
  console.log("Formatters: Prettier, Prettier+oxc-parser, Biome, Oxfmt");
  console.log("");

  const failedScenarios = [];

  for (const scenario of scenarios) {
    try {
      await runScenario(scenario);
    } catch (e) {
      failedScenarios.push({ scenario, message: e.message });
      console.error(`Error running ${scenario}: ${e.message}`);
    }
    console.log("");
  }

  if (failedScenarios.length > 0) {
    console.error("=========================================");
    console.error(`${failedScenarios.length} benchmark scenario(s) failed:`);
    for (const { scenario, message } of failedScenarios) {
      console.error(`- ${scenario}: ${message}`);
    }
    console.error("=========================================");
    process.exitCode = 1;
    return;
  }

  console.log("=========================================");
  console.log("All benchmarks complete!");
  console.log("=========================================");
}

main().catch((error) => {
  console.error("Error:", error);
  process.exit(1);
});
