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
- **Oxfmt**: 0.75.0

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
  Time (mean ± σ):      1.286 s ±  0.019 s    [User: 2.259 s, System: 0.232 s]
  Range (min … max):    1.256 s …  1.305 s    5 runs

Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):     873.0 ms ±  15.0 ms    [User: 1217.3 ms, System: 175.0 ms]
  Range (min … max):   852.1 ms … 887.8 ms    5 runs

Benchmark 3: biome
  Time (mean ± σ):     117.2 ms ±   0.9 ms    [User: 86.5 ms, System: 35.6 ms]
  Range (min … max):   116.3 ms … 118.6 ms    5 runs

Benchmark 4: oxfmt
  Time (mean ± σ):      70.3 ms ±   0.6 ms    [User: 52.7 ms, System: 21.5 ms]
  Range (min … max):    69.8 ms …  71.2 ms    5 runs

Summary
  oxfmt ran
    1.67 ± 0.02 times faster than biome
   12.43 ± 0.24 times faster than prettier+oxc-parser
   18.30 ± 0.30 times faster than prettier

Memory Usage:
  prettier: 299.8 MB (min: 293.7 MB, max: 309.7 MB)
  prettier+oxc-parser: 240.3 MB (min: 238.3 MB, max: 241.3 MB)
  biome: 48.4 MB (min: 48.3 MB, max: 48.4 MB)
  oxfmt: 89.5 MB (min: 89.4 MB, max: 89.6 MB)

Large single file benchmark complete!


=========================================
Benchmarking JS/TS (no embedded)
=========================================

Target: Outline repository (js/ts/tsx only)
- 3 warmup runs, 10 benchmark runs
- Git reset before each run

Benchmark 1: prettier
  Time (mean ± σ):     19.243 s ±  0.164 s    [User: 32.776 s, System: 1.128 s]
  Range (min … max):   19.037 s … 19.523 s    10 runs

Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):     15.265 s ±  0.211 s    [User: 20.217 s, System: 0.879 s]
  Range (min … max):   14.922 s … 15.648 s    10 runs

Benchmark 3: biome
  Time (mean ± σ):     979.6 ms ±   4.4 ms    [User: 3171.1 ms, System: 446.9 ms]
  Range (min … max):   971.5 ms … 985.4 ms    10 runs

Benchmark 4: oxfmt
  Time (mean ± σ):     344.9 ms ±   2.1 ms    [User: 898.0 ms, System: 271.8 ms]
  Range (min … max):   341.6 ms … 348.8 ms    10 runs

Summary
  oxfmt ran
    2.84 ± 0.02 times faster than biome
   44.25 ± 0.67 times faster than prettier+oxc-parser
   55.78 ± 0.59 times faster than prettier

Memory Usage:
  prettier: 473.2 MB (min: 417.8 MB, max: 622.4 MB)
  prettier+oxc-parser: 294.7 MB (min: 284.3 MB, max: 339.3 MB)
  biome: 176.9 MB (min: 174.3 MB, max: 178.6 MB)
  oxfmt: 128.6 MB (min: 124.8 MB, max: 133.1 MB)

JS/TS (no embedded) benchmark complete!


=========================================
Benchmarking Mixed (embedded)
=========================================

Target: Storybook repository (mixed with embedded languages)
- 1 warmup runs, 3 benchmark runs
- Git reset before each run

Benchmark 1: prettier+oxc-parser
  Time (mean ± σ):     78.330 s ±  0.701 s    [User: 94.239 s, System: 4.168 s]
  Range (min … max):   77.556 s … 78.923 s    3 runs

Benchmark 2: oxfmt
  Time (mean ± σ):      5.618 s ±  0.020 s    [User: 19.460 s, System: 1.872 s]
  Range (min … max):    5.595 s …  5.630 s    3 runs

Summary
  oxfmt ran
   13.94 ± 0.13 times faster than prettier+oxc-parser

Memory Usage:
  prettier+oxc-parser: 1335.7 MB (min: 1331.0 MB, max: 1338.9 MB)
  oxfmt: 232.4 MB (min: 227.0 MB, max: 242.0 MB)

Mixed (embedded) benchmark complete!


=========================================
Benchmarking Full features
=========================================

Target: Continue repository (full features)
- 1 warmup runs, 3 benchmark runs
- Git reset before each run

Benchmark 1: prettier+oxc-parser
  Time (mean ± σ):     34.605 s ±  0.166 s    [User: 44.940 s, System: 2.937 s]
  Range (min … max):   34.430 s … 34.759 s    3 runs

Benchmark 2: oxfmt
  Time (mean ± σ):      3.496 s ±  0.021 s    [User: 12.192 s, System: 1.199 s]
  Range (min … max):    3.482 s …  3.520 s    3 runs

Summary
  oxfmt ran
    9.90 ± 0.08 times faster than prettier+oxc-parser

Memory Usage:
  prettier+oxc-parser: 610.9 MB (min: 580.2 MB, max: 669.4 MB)
  oxfmt: 216.1 MB (min: 211.0 MB, max: 226.1 MB)

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
