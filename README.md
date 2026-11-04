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
- **Biome**: 2.6.4
- **Oxfmt**: 0.76.0

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
  Time (mean ± σ):     762.9 ms ±  72.9 ms    [User: 1364.0 ms, System: 165.7 ms]
  Range (min … max):   709.5 ms … 882.7 ms    5 runs

Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):     543.5 ms ±  41.2 ms    [User: 739.5 ms, System: 138.9 ms]
  Range (min … max):   508.1 ms … 601.2 ms    5 runs

Benchmark 3: biome
  Time (mean ± σ):      80.8 ms ±   1.1 ms    [User: 54.7 ms, System: 29.5 ms]
  Range (min … max):    79.5 ms …  82.2 ms    5 runs

Benchmark 4: oxfmt
  Time (mean ± σ):      48.1 ms ±   0.5 ms    [User: 33.6 ms, System: 15.9 ms]
  Range (min … max):    47.6 ms …  48.7 ms    5 runs

Summary
  oxfmt ran
    1.68 ± 0.03 times faster than biome
   11.30 ± 0.87 times faster than prettier+oxc-parser
   15.86 ± 1.52 times faster than prettier

Memory Usage:
  prettier: 300.9 MB (min: 297.9 MB, max: 305.4 MB)
  prettier+oxc-parser: 241.2 MB (min: 240.8 MB, max: 241.6 MB)
  biome: 48.5 MB (min: 48.4 MB, max: 48.5 MB)
  oxfmt: 92.3 MB (min: 92.3 MB, max: 92.4 MB)

Large single file benchmark complete!


=========================================
Benchmarking JS/TS (no embedded)
=========================================

Target: Outline repository (js/ts/tsx only)
- 3 warmup runs, 10 benchmark runs
- Git reset before each run

Benchmark 1: prettier
  Time (mean ± σ):     12.559 s ±  0.526 s    [User: 22.560 s, System: 0.899 s]
  Range (min … max):   11.793 s … 13.427 s    10 runs

Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):      9.080 s ±  0.418 s    [User: 12.658 s, System: 0.642 s]
  Range (min … max):    8.443 s …  9.694 s    10 runs

Benchmark 3: biome
  Time (mean ± σ):     584.5 ms ±   9.8 ms    [User: 1828.6 ms, System: 287.1 ms]
  Range (min … max):   564.9 ms … 601.6 ms    10 runs

Benchmark 4: oxfmt
  Time (mean ± σ):     187.5 ms ±   5.1 ms    [User: 461.9 ms, System: 147.5 ms]
  Range (min … max):   180.0 ms … 196.5 ms    10 runs

Summary
  oxfmt ran
    3.12 ± 0.10 times faster than biome
   48.41 ± 2.59 times faster than prettier+oxc-parser
   66.97 ± 3.34 times faster than prettier

Memory Usage:
  prettier: 457.9 MB (min: 419.0 MB, max: 560.3 MB)
  prettier+oxc-parser: 311.5 MB (min: 287.8 MB, max: 359.6 MB)
  biome: 178.4 MB (min: 177.3 MB, max: 179.0 MB)
  oxfmt: 134.0 MB (min: 129.0 MB, max: 137.6 MB)

JS/TS (no embedded) benchmark complete!


=========================================
Benchmarking Mixed (embedded)
=========================================

Target: Storybook repository (mixed with embedded languages)
- 1 warmup runs, 3 benchmark runs
- Git reset before each run

Benchmark 1: prettier+oxc-parser
  Time (mean ± σ):     46.653 s ±  0.386 s    [User: 57.361 s, System: 2.937 s]
  Range (min … max):   46.397 s … 47.097 s    3 runs

Benchmark 2: oxfmt
  Time (mean ± σ):      3.102 s ±  0.026 s    [User: 10.621 s, System: 1.091 s]
  Range (min … max):    3.076 s …  3.128 s    3 runs

Summary
  oxfmt ran
   15.04 ± 0.18 times faster than prettier+oxc-parser

Memory Usage:
  prettier+oxc-parser: 1496.2 MB (min: 1492.7 MB, max: 1500.8 MB)
  oxfmt: 233.5 MB (min: 229.0 MB, max: 240.5 MB)

Mixed (embedded) benchmark complete!


=========================================
Benchmarking Full features
=========================================

Target: Continue repository (full features)
- 1 warmup runs, 3 benchmark runs
- Git reset before each run

Benchmark 1: prettier+oxc-parser
  Time (mean ± σ):     21.468 s ±  0.982 s    [User: 28.974 s, System: 1.978 s]
  Range (min … max):   20.427 s … 22.376 s    3 runs

Benchmark 2: oxfmt
  Time (mean ± σ):      1.992 s ±  0.027 s    [User: 6.704 s, System: 0.748 s]
  Range (min … max):    1.963 s …  2.017 s    3 runs

Summary
  oxfmt ran
   10.78 ± 0.51 times faster than prettier+oxc-parser

Memory Usage:
  prettier+oxc-parser: 676.4 MB (min: 600.7 MB, max: 810.8 MB)
  oxfmt: 211.0 MB (min: 209.1 MB, max: 213.4 MB)

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
