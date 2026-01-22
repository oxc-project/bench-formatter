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
const BENCHMARK_RUNS = 5;

async function main() {
  setupCwd(import.meta.url);

  const dataFile = "./data/parser.ts";
  const dataFileBak = "./data/parser.ts.bak";
  const formatters = createFormatters("..", ".");

  printHeader("Benchmarking Large Single File");

  checkGnuTime();

  console.log("");
  console.log("Target: TypeScript compiler parser.ts (~540KB)");
  console.log(`- ${WARMUP_RUNS} warmup runs, ${BENCHMARK_RUNS} benchmark runs`);
  console.log("- Copy original before each run");
  console.log("");

  const prepareCmd = `cp ${dataFileBak} ${dataFile}`;

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
    formatters.prettier(dataFile),
    formatters.prettier_oxc(dataFile),
    formatters.biome(dataFile),
    formatters.oxfmt(dataFile),
  ]);

  await runMemoryBenchmarks(
    [
      {
        name: "prettier",
        command: formatters.prettier(dataFile),
        prepare: prepareCmd,
      },
      {
        name: "prettier+oxc-parser",
        command: formatters.prettier_oxc(dataFile),
        prepare: prepareCmd,
      },
      {
        name: "biome",
        command: formatters.biome(dataFile),
        prepare: prepareCmd,
      },
      {
        name: "oxfmt",
        command: formatters.oxfmt(dataFile),
        prepare: prepareCmd,
      },
    ],
    BENCHMARK_RUNS,
  );

  console.log("");
  console.log("Large single file benchmark complete!");
}

main().catch((error) => {
  console.error("Large single file benchmark failed:", error.message);
  process.exit(1);
});
