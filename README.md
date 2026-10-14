# JavaScript/TypeScript Formatter Benchmark

Comparing execution time and memory usage of **Prettier**, **Biome**, and **Oxfmt**.

## Formatters

- [Prettier](https://prettier.io/)
- [Prettier](https://prettier.io/) + @prettier/plugin-oxc
- [Biome](https://biomejs.dev/) Formatter
- [Oxfmt](https://oxc.rs)

## Run

```bash
# Run all benchmarks
# Automatically setup fixture if not exists
pnpm run bench

# Or explicit benchmark with manual setup
./init.sh
node ./bench-large-single-file/bench.mjs
node ./bench-js-no-embedded/bench.mjs
node ./bench-mixed-embedded/bench.mjs
node ./bench-full-features/bench.mjs
```

## Notes

- Each formatter runs on the exact same codebase state (git reset between runs)
- Times include both parsing and formatting of all matched files
- Memory measurements track peak resident set size (RSS) during execution
- I intended to bench checker.ts, but it appears to be running for a very long time or stuck with 100% CPU.

## Benchmark Details

- **Test Data**:
  - TypeScript compiler's [parser.ts](https://github.com/microsoft/TypeScript/blob/v5.9.2/src/compiler/parser.ts) (~13.7K lines, single large file)
  - [Outline](https://github.com/outline/outline) repository (JS/JSX/TS/TSX only)
  - [Storybook](https://github.com/storybookjs/storybook) repository (mixed with embedded languages)
  - [Continue](https://github.com/continuedev/continue) repository (full features: sort imports + Tailwind CSS)
- **Methodology**:
  - Multiple warmup runs before measurement
  - Multiple benchmark runs for statistical accuracy
  - Git reset before each run to ensure identical starting conditions
  - Memory usage measured using GNU time (peak RSS)
  - Local binaries via `./node_modules/.bin/`

## Versions

- **Prettier**: 3.9.9
- **Biome**: 2.5.15
- **Oxfmt**: 0.73.0

## Results

<!-- BENCHMARK_RESULTS_START -->

```
=========================================
Benchmarking Large Single File
=========================================

Target: TypeScript compiler parser.ts (~540KB)
- 2 warmup runs, 5 benchmark runs
- Copy original before each run

Benchmark 1: prettier
  Time (mean ± σ):      2.171 s ±  0.017 s    [User: 2.207 s, System: 1.207 s]
  Range (min … max):    2.152 s …  2.196 s    5 runs

Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):      1.284 s ±  0.006 s    [User: 1.217 s, System: 0.609 s]
  Range (min … max):    1.275 s …  1.288 s    5 runs

Benchmark 3: biome
  Time (mean ± σ):     130.7 ms ±   1.3 ms    [User: 104.3 ms, System: 31.1 ms]
  Range (min … max):   129.7 ms … 132.9 ms    5 runs

Benchmark 4: oxfmt
  Time (mean ± σ):      67.5 ms ±   0.9 ms    [User: 51.7 ms, System: 20.7 ms]
  Range (min … max):    66.7 ms …  68.9 ms    5 runs

Summary
  oxfmt ran
    1.94 ± 0.03 times faster than biome
   19.04 ± 0.27 times faster than prettier+oxc-parser
   32.18 ± 0.50 times faster than prettier

Memory Usage:
  prettier: 335.7 MB (min: 328.5 MB, max: 341.6 MB)
  prettier+oxc-parser: 201.7 MB (min: 201.4 MB, max: 202.2 MB)
  biome: 61.9 MB (min: 61.2 MB, max: 63.4 MB)
  oxfmt: 100.3 MB (min: 100.3 MB, max: 100.3 MB)

Large single file benchmark complete!


=========================================
Benchmarking JS/TS (no embedded)
=========================================

Target: Outline repository (js/ts/tsx only)
- 3 warmup runs, 10 benchmark runs
- Git reset before each run

Benchmark 1: prettier
  Time (mean ± σ):     18.232 s ±  0.076 s    [User: 31.020 s, System: 1.438 s]
  Range (min … max):   18.134 s … 18.333 s    10 runs

Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):     15.109 s ±  0.086 s    [User: 20.329 s, System: 1.272 s]
  Range (min … max):   14.990 s … 15.287 s    10 runs

Benchmark 3: biome
  Time (mean ± σ):      1.253 s ±  0.073 s    [User: 3.918 s, System: 0.374 s]
  Range (min … max):    1.207 s …  1.432 s    10 runs

Benchmark 4: oxfmt
  Time (mean ± σ):     354.0 ms ±   3.7 ms    [User: 904.8 ms, System: 299.7 ms]
  Range (min … max):   349.8 ms … 360.9 ms    10 runs

Summary
  oxfmt ran
    3.54 ± 0.21 times faster than biome
   42.68 ± 0.51 times faster than prettier+oxc-parser
   51.50 ± 0.58 times faster than prettier

Memory Usage:
  prettier: 497.9 MB (min: 474.8 MB, max: 518.1 MB)
  prettier+oxc-parser: 367.2 MB (min: 363.3 MB, max: 376.8 MB)
  biome: 174.2 MB (min: 171.5 MB, max: 178.6 MB)
  oxfmt: 149.1 MB (min: 141.9 MB, max: 152.7 MB)

JS/TS (no embedded) benchmark complete!


=========================================
Benchmarking Mixed (embedded)
=========================================

Target: Storybook repository (mixed with embedded languages)
- 1 warmup runs, 3 benchmark runs
- Git reset before each run

Benchmark 1: prettier+oxc-parser
  Time (mean ± σ):     85.716 s ±  0.661 s    [User: 96.085 s, System: 9.206 s]
  Range (min … max):   85.089 s … 86.407 s    3 runs

Benchmark 2: oxfmt
  Time (mean ± σ):      5.658 s ±  0.038 s    [User: 19.287 s, System: 1.982 s]
  Range (min … max):    5.615 s …  5.686 s    3 runs

Summary
  oxfmt ran
   15.15 ± 0.15 times faster than prettier+oxc-parser

Memory Usage:
  prettier+oxc-parser: 1873.4 MB (min: 1719.3 MB, max: 1956.1 MB)
  oxfmt: 284.1 MB (min: 275.8 MB, max: 295.1 MB)

Mixed (embedded) benchmark complete!


=========================================
Benchmarking Full features
=========================================

Target: Continue repository (full features)
- 1 warmup runs, 3 benchmark runs
- Git reset before each run

Benchmark 1: prettier+oxc-parser
  Time (mean ± σ):     35.402 s ±  0.256 s    [User: 45.686 s, System: 3.649 s]
  Range (min … max):   35.174 s … 35.679 s    3 runs

Benchmark 2: oxfmt
  Time (mean ± σ):      3.423 s ±  0.063 s    [User: 11.778 s, System: 1.222 s]
  Range (min … max):    3.383 s …  3.495 s    3 runs

Summary
  oxfmt ran
   10.34 ± 0.20 times faster than prettier+oxc-parser

Memory Usage:
  prettier+oxc-parser: 653.9 MB (min: 650.3 MB, max: 659.1 MB)
  oxfmt: 213.3 MB (min: 210.8 MB, max: 215.1 MB)

Full features benchmark complete!

=========================================
All benchmarks complete!
=========================================
```

<!-- BENCHMARK_RESULTS_END -->

# [Sponsored By](https://oxc.rs/sponsor)

<p align="center">
  <a href="https://oxc.rs/sponsor">
    <img src="https://raw.githubusercontent.com/oxc-project/sponsors/main/sponsors.svg" alt="Our sponsors" />
  </a>
</p>
