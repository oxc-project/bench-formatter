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
- **Biome**: 2.6.2
- **Oxfmt**: 0.74.0

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
  Time (mean ± σ):      2.120 s ±  0.024 s    [User: 2.326 s, System: 1.085 s]
  Range (min … max):    2.078 s …  2.142 s    5 runs

Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):      1.315 s ±  0.055 s    [User: 1.340 s, System: 0.552 s]
  Range (min … max):    1.250 s …  1.383 s    5 runs

Benchmark 3: biome
  Time (mean ± σ):     104.4 ms ±   0.7 ms    [User: 80.0 ms, System: 29.3 ms]
  Range (min … max):   103.4 ms … 105.4 ms    5 runs

Benchmark 4: oxfmt
  Time (mean ± σ):      69.5 ms ±   2.8 ms    [User: 51.4 ms, System: 22.2 ms]
  Range (min … max):    66.4 ms …  73.7 ms    5 runs

Summary
  oxfmt ran
    1.50 ± 0.06 times faster than biome
   18.92 ± 1.10 times faster than prettier+oxc-parser
   30.51 ± 1.30 times faster than prettier

Memory Usage:
  prettier: 336.2 MB (min: 329.3 MB, max: 342.5 MB)
  prettier+oxc-parser: 201.7 MB (min: 200.7 MB, max: 203.5 MB)
  biome: 64.3 MB (min: 63.8 MB, max: 65.1 MB)
  oxfmt: 98.8 MB (min: 98.5 MB, max: 99.2 MB)

Large single file benchmark complete!


=========================================
Benchmarking JS/TS (no embedded)
=========================================

Target: Outline repository (js/ts/tsx only)
- 3 warmup runs, 10 benchmark runs
- Git reset before each run

Benchmark 1: prettier
  Time (mean ± σ):     19.893 s ±  0.239 s    [User: 33.883 s, System: 0.882 s]
  Range (min … max):   19.662 s … 20.401 s    10 runs

Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):     16.355 s ±  0.137 s    [User: 22.160 s, System: 0.847 s]
  Range (min … max):   16.142 s … 16.624 s    10 runs

Benchmark 3: biome
  Time (mean ± σ):     926.7 ms ±  11.4 ms    [User: 3082.1 ms, System: 344.1 ms]
  Range (min … max):   916.8 ms … 958.3 ms    10 runs

Benchmark 4: oxfmt
  Time (mean ± σ):     357.5 ms ±   3.6 ms    [User: 933.2 ms, System: 292.9 ms]
  Range (min … max):   352.0 ms … 364.1 ms    10 runs

Summary
  oxfmt ran
    2.59 ± 0.04 times faster than biome
   45.75 ± 0.60 times faster than prettier+oxc-parser
   55.65 ± 0.88 times faster than prettier

Memory Usage:
  prettier: 513.5 MB (min: 477.3 MB, max: 628.8 MB)
  prettier+oxc-parser: 365.7 MB (min: 360.3 MB, max: 375.0 MB)
  biome: 179.1 MB (min: 175.2 MB, max: 181.7 MB)
  oxfmt: 143.4 MB (min: 138.0 MB, max: 148.5 MB)

JS/TS (no embedded) benchmark complete!


=========================================
Benchmarking Mixed (embedded)
=========================================

Target: Storybook repository (mixed with embedded languages)
- 1 warmup runs, 3 benchmark runs
- Git reset before each run

Benchmark 1: prettier+oxc-parser
  Time (mean ± σ):     93.160 s ±  2.817 s    [User: 106.762 s, System: 7.222 s]
  Range (min … max):   91.249 s … 96.396 s    3 runs

Benchmark 2: oxfmt
  Time (mean ± σ):      6.071 s ±  0.121 s    [User: 21.013 s, System: 2.044 s]
  Range (min … max):    5.954 s …  6.196 s    3 runs

Summary
  oxfmt ran
   15.35 ± 0.56 times faster than prettier+oxc-parser

Memory Usage:
  prettier+oxc-parser: 1829.6 MB (min: 1699.4 MB, max: 2041.4 MB)
  oxfmt: 288.0 MB (min: 279.5 MB, max: 294.0 MB)

Mixed (embedded) benchmark complete!


=========================================
Benchmarking Full features
=========================================

Target: Continue repository (full features)
- 1 warmup runs, 3 benchmark runs
- Git reset before each run

Benchmark 1: prettier+oxc-parser
  Time (mean ± σ):     37.200 s ±  0.269 s    [User: 49.374 s, System: 2.036 s]
  Range (min … max):   36.922 s … 37.460 s    3 runs

Benchmark 2: oxfmt
  Time (mean ± σ):      3.591 s ±  0.009 s    [User: 12.595 s, System: 1.180 s]
  Range (min … max):    3.585 s …  3.601 s    3 runs

Summary
  oxfmt ran
   10.36 ± 0.08 times faster than prettier+oxc-parser

Memory Usage:
  prettier+oxc-parser: 675.1 MB (min: 621.5 MB, max: 747.1 MB)
  oxfmt: 214.1 MB (min: 211.7 MB, max: 216.2 MB)

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
