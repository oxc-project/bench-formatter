#!/usr/bin/env node

import {
  checkGnuTime,
  createFormatters,
  printHeader,
  runHyperfine,
  runMemoryBenchmarks,
  setupCwd,
} from "../shared/utils.mjs";

const WARMUP_RUNS = 1;
const BENCHMARK_RUNS = 3;

async function main() {
  setupCwd(import.meta.url);

  const dataDir = "./data";
  const formatters = createFormatters("..", ".");

  printHeader("Benchmarking Full features");

  checkGnuTime();

  console.log("");
  console.log("Target: Continue repository (full features)");
  console.log(`- ${WARMUP_RUNS} warmup runs, ${BENCHMARK_RUNS} benchmark runs`);
  console.log("- Git reset before each run");
  console.log("");

  const prepareCmd = `git -C ${dataDir} reset --hard && sed -i.bak '/require("tailwindcss\\/defaultTheme")/d' ${dataDir}/gui/tailwind.config.cjs && rm -f ${dataDir}/gui/tailwind.config.cjs.bak ${dataDir}/.prettierrc`;

  await runHyperfine([
    "--ignore-failure",
    `--warmup=${WARMUP_RUNS}`,
    `--runs=${BENCHMARK_RUNS}`,
    "--prepare",
    prepareCmd,
    "--shell=bash",
    "-n=prettier+oxc-parser",
    "-n=oxfmt",
    formatters.prettier(dataDir),
    formatters.oxfmt(dataDir),
  ]);

  await runMemoryBenchmarks(
    [
      {
        name: "prettier+oxc-parser",
        command: formatters.prettier(dataDir),
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
  console.log("Full features benchmark complete!");
}

main().catch((error) => {
  console.error("Full features benchmark failed:", error.message);
  process.exit(1);
});
