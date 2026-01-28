#!/usr/bin/env node

import {
  checkGnuTime,
  createFormatters,
  printHeader,
  runHyperfine,
  runMemoryBenchmarks,
  setupCwd,
} from "../shared/utils.mjs";

const WARMUP_RUNS = 3;
const BENCHMARK_RUNS = 10;

async function main() {
  setupCwd(import.meta.url);

  const dataDir = "./data";
  const formatters = createFormatters("..", ".");

  printHeader("Benchmarking JS/TS (no embedded)");

  checkGnuTime();

  console.log("");
  console.log("Target: Outline repository (js/ts/tsx only)");
  console.log(`- ${WARMUP_RUNS} warmup runs, ${BENCHMARK_RUNS} benchmark runs`);
  console.log("- Git reset before each run");
  console.log("");

  const prepareCmd = `git -C ${dataDir} reset --hard`;

  await runHyperfine([
    "--ignore-failure",
    `--warmup=${WARMUP_RUNS}`,
    `--runs=${BENCHMARK_RUNS}`,
    "--prepare",
    prepareCmd,
    "--shell=bash",
    "-n=prettier",
    "-n=prettier+oxc-parser",
    "-n=biome",
    "-n=oxfmt",
    formatters.prettier(dataDir),
    formatters.prettier(dataDir, "prettierrc-oxc.json"),
    formatters.biome(dataDir),
    formatters.oxfmt(dataDir),
  ]);

  await runMemoryBenchmarks(
    [
      {
        name: "prettier",
        command: formatters.prettier(dataDir),
        prepare: prepareCmd,
      },
      {
        name: "prettier+oxc-parser",
        command: formatters.prettier(dataDir, "prettierrc-oxc.json"),
        prepare: prepareCmd,
      },
      {
        name: "biome",
        command: formatters.biome(dataDir),
        prepare: prepareCmd,
      },
      {
        name: "oxfmt",
        command: formatters.oxfmt(dataDir),
        prepare: prepareCmd,
      },
    ],
    BENCHMARK_RUNS,
  );

  console.log("");
  console.log("JS/TS (no embedded) benchmark complete!");
}

main().catch((error) => {
  console.error("JS/TS (no embedded) benchmark failed:", error.message);
  process.exit(1);
});
