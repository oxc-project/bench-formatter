#!/usr/bin/env node

import {
  checkGnuTime,
  createFormatters,
  printHeader,
  runHyperfine,
  runMemoryBenchmarks,
  setupCwd,
} from "../shared/utils.mjs";

const WARMUP_RUNS = 2;
const BENCHMARK_RUNS = 6;

async function main() {
  setupCwd(import.meta.url);

  const dataDir = "./data";
  const formatters = createFormatters("..", ".");

  printHeader("Benchmarking Mixed (embedded)");

  checkGnuTime();

  console.log("");
  console.log("Target: Outline repository (mixed with embedded languages)");
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
    "-n=prettier+oxc-parser",
    "-n=oxfmt",
    formatters.prettier_oxc(dataDir),
    formatters.oxfmt(dataDir),
  ]);

  await runMemoryBenchmarks(
    [
      {
        name: "prettier+oxc-parser",
        command: formatters.prettier_oxc(dataDir),
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
  console.log("Mixed (embedded) benchmark complete!");
}

main().catch((error) => {
  console.error("Mixed (embedded) benchmark failed:", error.message);
  process.exit(1);
});
