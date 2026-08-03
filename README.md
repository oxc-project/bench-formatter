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

- **Prettier**: 3.9.6
- **Biome**: 2.5.6
- **Oxfmt**: 0.62.0

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
  Time (mean ± σ):      2.152 s ±  0.024 s    [User: 2.112 s, System: 1.215 s]
  Range (min … max):    2.134 s …  2.193 s    5 runs

Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):      1.283 s ±  0.013 s    [User: 1.192 s, System: 0.607 s]
  Range (min … max):    1.268 s …  1.300 s    5 runs

Benchmark 3: biome
  Time (mean ± σ):     134.4 ms ±   1.3 ms    [User: 107.6 ms, System: 31.6 ms]
  Range (min … max):   132.3 ms … 135.7 ms    5 runs

Benchmark 4: oxfmt
  Time (mean ± σ):     122.9 ms ±   2.4 ms    [User: 77.1 ms, System: 42.3 ms]
  Range (min … max):   120.3 ms … 126.4 ms    5 runs

Summary
  oxfmt ran
    1.09 ± 0.02 times faster than biome
   10.44 ± 0.23 times faster than prettier+oxc-parser
   17.51 ± 0.39 times faster than prettier

Memory Usage:
  prettier: 311.0 MB (min: 305.4 MB, max: 316.6 MB)
  prettier+oxc-parser: 200.0 MB (min: 198.7 MB, max: 201.3 MB)
  biome: 63.5 MB (min: 61.9 MB, max: 66.3 MB)
  oxfmt: 79.2 MB (min: 79.1 MB, max: 79.3 MB)

Large single file benchmark complete!


=========================================
Benchmarking JS/TS (no embedded)
=========================================

Target: Outline repository (js/ts/tsx only)
- 3 warmup runs, 10 benchmark runs
- Git reset before each run

Benchmark 1: prettier
  Time (mean ± σ):     16.436 s ±  0.254 s    [User: 27.580 s, System: 2.039 s]
  Range (min … max):   16.109 s … 16.860 s    10 runs

Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):     13.134 s ±  0.159 s    [User: 17.291 s, System: 1.148 s]
  Range (min … max):   12.868 s … 13.403 s    10 runs

Benchmark 3: biome
  Time (mean ± σ):      1.233 s ±  0.083 s    [User: 3.740 s, System: 0.491 s]
  Range (min … max):    1.178 s …  1.417 s    10 runs

Benchmark 4: oxfmt
  Time (mean ± σ):     414.5 ms ±   3.4 ms    [User: 889.4 ms, System: 335.2 ms]
  Range (min … max):   409.9 ms … 421.2 ms    10 runs

Summary
  oxfmt ran
    2.98 ± 0.20 times faster than biome
   31.69 ± 0.46 times faster than prettier+oxc-parser
   39.66 ± 0.69 times faster than prettier

Memory Usage:
  prettier: 410.2 MB (min: 380.7 MB, max: 454.5 MB)
  prettier+oxc-parser: 318.3 MB (min: 315.8 MB, max: 326.1 MB)
  biome: 161.4 MB (min: 157.8 MB, max: 163.7 MB)
  oxfmt: 138.0 MB (min: 131.6 MB, max: 145.2 MB)

JS/TS (no embedded) benchmark complete!


=========================================
Benchmarking Mixed (embedded)
=========================================

Target: Storybook repository (mixed with embedded languages)
- 1 warmup runs, 3 benchmark runs
- Git reset before each run

Benchmark 1: prettier+oxc-parser
  Time (mean ± σ):     71.739 s ±  0.243 s    [User: 80.698 s, System: 8.337 s]
  Range (min … max):   71.476 s … 71.954 s    3 runs

Benchmark 2: oxfmt
  Time (mean ± σ):     14.320 s ±  0.491 s    [User: 52.192 s, System: 3.385 s]
  Range (min … max):   13.911 s … 14.865 s    3 runs

Summary
  oxfmt ran
    5.01 ± 0.17 times faster than prettier+oxc-parser

Memory Usage:
  prettier+oxc-parser: 1563.7 MB (min: 1561.3 MB, max: 1567.7 MB)
  oxfmt: 581.5 MB (min: 555.0 MB, max: 612.3 MB)

Mixed (embedded) benchmark complete!


=========================================
Benchmarking Full features
=========================================

Target: Continue repository (full features)
- 1 warmup runs, 3 benchmark runs
- Git reset before each run

Benchmark 1: prettier+oxc-parser
  Time (mean ± σ):     34.230 s ±  0.203 s    [User: 44.006 s, System: 3.593 s]
  Range (min … max):   33.998 s … 34.371 s    3 runs

Benchmark 2: oxfmt
  Time (mean ± σ):      4.772 s ±  0.092 s    [User: 16.420 s, System: 1.598 s]
  Range (min … max):    4.711 s …  4.878 s    3 runs

Summary
  oxfmt ran
    7.17 ± 0.15 times faster than prettier+oxc-parser

Memory Usage:
  prettier+oxc-parser: 642.5 MB (min: 608.4 MB, max: 663.0 MB)
  oxfmt: 322.1 MB (min: 306.8 MB, max: 333.1 MB)

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
