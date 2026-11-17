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

- **Prettier**: 3.9.10
- **Biome**: 2.6.6
- **Oxfmt**: 0.79.0

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
  Time (mean ± σ):      1.442 s ±  0.121 s    [User: 2.365 s, System: 0.256 s]
  Range (min … max):    1.269 s …  1.603 s    5 runs

Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):     880.9 ms ±  11.9 ms    [User: 1228.4 ms, System: 169.4 ms]
  Range (min … max):   870.3 ms … 897.3 ms    5 runs

Benchmark 3: biome
  Time (mean ± σ):     117.9 ms ±   1.8 ms    [User: 87.5 ms, System: 35.4 ms]
  Range (min … max):   116.2 ms … 120.2 ms    5 runs

Benchmark 4: oxfmt
  Time (mean ± σ):      68.3 ms ±   1.7 ms    [User: 48.4 ms, System: 23.4 ms]
  Range (min … max):    66.4 ms …  70.2 ms    5 runs

Summary
  oxfmt ran
    1.73 ± 0.05 times faster than biome
   12.89 ± 0.37 times faster than prettier+oxc-parser
   21.10 ± 1.85 times faster than prettier

Memory Usage:
  prettier: 300.5 MB (min: 289.0 MB, max: 312.6 MB)
  prettier+oxc-parser: 240.8 MB (min: 239.8 MB, max: 241.6 MB)
  biome: 47.9 MB (min: 47.8 MB, max: 48.1 MB)
  oxfmt: 91.5 MB (min: 91.5 MB, max: 91.6 MB)

Large single file benchmark complete!


=========================================
Benchmarking JS/TS (no embedded)
=========================================

Target: Outline repository (js/ts/tsx only)
- 3 warmup runs, 10 benchmark runs
- Git reset before each run

Benchmark 1: prettier
  Time (mean ± σ):     21.461 s ±  0.527 s    [User: 36.341 s, System: 1.327 s]
  Range (min … max):   20.476 s … 22.283 s    10 runs

Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):     16.414 s ±  0.232 s    [User: 21.533 s, System: 0.960 s]
  Range (min … max):   16.148 s … 16.804 s    10 runs

Benchmark 3: biome
  Time (mean ± σ):      1.015 s ±  0.011 s    [User: 3.250 s, System: 0.477 s]
  Range (min … max):    1.003 s …  1.041 s    10 runs

Benchmark 4: oxfmt
  Time (mean ± σ):     351.8 ms ±   2.1 ms    [User: 914.2 ms, System: 285.0 ms]
  Range (min … max):   349.4 ms … 355.9 ms    10 runs

Summary
  oxfmt ran
    2.88 ± 0.04 times faster than biome
   46.65 ± 0.72 times faster than prettier+oxc-parser
   61.00 ± 1.54 times faster than prettier

Memory Usage:
  prettier: 505.5 MB (min: 419.7 MB, max: 581.3 MB)
  prettier+oxc-parser: 292.4 MB (min: 275.7 MB, max: 353.1 MB)
  biome: 183.7 MB (min: 182.8 MB, max: 184.2 MB)
  oxfmt: 128.0 MB (min: 125.0 MB, max: 134.7 MB)

JS/TS (no embedded) benchmark complete!


=========================================
Benchmarking Mixed (embedded)
=========================================

Target: Storybook repository (mixed with embedded languages)
- 1 warmup runs, 3 benchmark runs
- Git reset before each run

Benchmark 1: prettier+oxc-parser
  Time (mean ± σ):     87.238 s ±  1.320 s    [User: 102.786 s, System: 4.888 s]
  Range (min … max):   85.851 s … 88.479 s    3 runs

Benchmark 2: oxfmt
  Time (mean ± σ):      5.041 s ±  0.005 s    [User: 17.219 s, System: 1.615 s]
  Range (min … max):    5.036 s …  5.046 s    3 runs

Summary
  oxfmt ran
   17.30 ± 0.26 times faster than prettier+oxc-parser

Memory Usage:
  prettier+oxc-parser: 1378.8 MB (min: 1363.6 MB, max: 1409.0 MB)
  oxfmt: 793.0 MB (min: 765.5 MB, max: 816.0 MB)

Mixed (embedded) benchmark complete!


=========================================
Benchmarking Full features
=========================================

Target: Continue repository (full features)
- 1 warmup runs, 3 benchmark runs
- Git reset before each run

Benchmark 1: prettier+oxc-parser
  Time (mean ± σ):     35.471 s ±  0.740 s    [User: 45.816 s, System: 2.947 s]
  Range (min … max):   34.617 s … 35.914 s    3 runs

Benchmark 2: oxfmt
  Time (mean ± σ):      3.516 s ±  0.028 s    [User: 11.937 s, System: 1.024 s]
  Range (min … max):    3.484 s …  3.533 s    3 runs

Summary
  oxfmt ran
   10.09 ± 0.23 times faster than prettier+oxc-parser

Memory Usage:
  prettier+oxc-parser: 601.9 MB (min: 566.7 MB, max: 631.2 MB)
  oxfmt: 762.0 MB (min: 752.9 MB, max: 774.5 MB)

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
