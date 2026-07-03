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

- **Prettier**: 3.9.1
- **Biome**: 2.5.1
- **Oxfmt**: 0.57.0

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
  Time (mean ± σ):      2.226 s ±  0.058 s    [User: 2.145 s, System: 1.270 s]
  Range (min … max):    2.186 s …  2.328 s    5 runs

Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):     680.5 ms ±   7.2 ms    [User: 1057.3 ms, System: 113.2 ms]
  Range (min … max):   673.2 ms … 691.4 ms    5 runs

Benchmark 3: biome
  Time (mean ± σ):     168.0 ms ±   0.8 ms    [User: 141.8 ms, System: 31.3 ms]
  Range (min … max):   166.8 ms … 168.8 ms    5 runs

Benchmark 4: oxfmt
  Time (mean ± σ):     162.0 ms ±   9.5 ms    [User: 176.2 ms, System: 79.6 ms]
  Range (min … max):   149.3 ms … 171.5 ms    5 runs

Summary
  oxfmt ran
    1.04 ± 0.06 times faster than biome
    4.20 ± 0.25 times faster than prettier+oxc-parser
   13.74 ± 0.89 times faster than prettier

Memory Usage:
  prettier: 309.2 MB (min: 306.4 MB, max: 316.6 MB)
  prettier+oxc-parser: 186.4 MB (min: 184.5 MB, max: 188.9 MB)
  biome: 70.9 MB (min: 70.2 MB, max: 72.0 MB)
  oxfmt: 105.5 MB (min: 105.4 MB, max: 105.6 MB)

Large single file benchmark complete!


=========================================
Benchmarking JS/TS (no embedded)
=========================================

Target: Outline repository (js/ts/tsx only)
- 3 warmup runs, 10 benchmark runs
- Git reset before each run

Benchmark 1: prettier
  Time (mean ± σ):     15.494 s ±  0.133 s    [User: 26.296 s, System: 1.904 s]
  Range (min … max):   15.330 s … 15.741 s    10 runs

Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):     12.645 s ±  0.121 s    [User: 16.518 s, System: 1.191 s]
  Range (min … max):   12.515 s … 12.875 s    10 runs

Benchmark 3: biome
  Time (mean ± σ):      1.407 s ±  0.130 s    [User: 4.581 s, System: 0.525 s]
  Range (min … max):    1.346 s …  1.760 s    10 runs

Benchmark 4: oxfmt
  Time (mean ± σ):     416.0 ms ±   4.4 ms    [User: 902.6 ms, System: 322.9 ms]
  Range (min … max):   410.2 ms … 422.7 ms    10 runs

Summary
  oxfmt ran
    3.38 ± 0.31 times faster than biome
   30.40 ± 0.43 times faster than prettier+oxc-parser
   37.25 ± 0.51 times faster than prettier

Memory Usage:
  prettier: 384.6 MB (min: 360.8 MB, max: 405.9 MB)
  prettier+oxc-parser: 335.0 MB (min: 326.0 MB, max: 345.2 MB)
  biome: 79.6 MB (min: 77.9 MB, max: 82.1 MB)
  oxfmt: 141.2 MB (min: 135.2 MB, max: 145.7 MB)

JS/TS (no embedded) benchmark complete!


=========================================
Benchmarking Mixed (embedded)
=========================================

Target: Storybook repository (mixed with embedded languages)
- 1 warmup runs, 3 benchmark runs
- Git reset before each run

Benchmark 1: prettier+oxc-parser
  Time (mean ± σ):     60.881 s ±  0.594 s    [User: 73.982 s, System: 3.989 s]
  Range (min … max):   60.496 s … 61.564 s    3 runs

Benchmark 2: oxfmt
  Time (mean ± σ):     13.218 s ±  0.293 s    [User: 45.611 s, System: 4.166 s]
  Range (min … max):   12.885 s … 13.430 s    3 runs

Summary
  oxfmt ran
    4.61 ± 0.11 times faster than prettier+oxc-parser

Memory Usage:
  prettier+oxc-parser: 1370.8 MB (min: 1369.5 MB, max: 1373.2 MB)
  oxfmt: 536.9 MB (min: 462.1 MB, max: 623.0 MB)

Mixed (embedded) benchmark complete!


=========================================
Benchmarking Full features
=========================================

Target: Continue repository (full features)
- 1 warmup runs, 3 benchmark runs
- Git reset before each run

Benchmark 1: prettier+oxc-parser
  Time (mean ± σ):     34.140 s ±  0.072 s    [User: 44.238 s, System: 3.430 s]
  Range (min … max):   34.088 s … 34.222 s    3 runs

Benchmark 2: oxfmt
  Time (mean ± σ):      4.726 s ±  0.035 s    [User: 16.012 s, System: 1.614 s]
  Range (min … max):    4.702 s …  4.766 s    3 runs

Summary
  oxfmt ran
    7.22 ± 0.06 times faster than prettier+oxc-parser

Memory Usage:
  prettier+oxc-parser: 678.0 MB (min: 662.1 MB, max: 702.2 MB)
  oxfmt: 306.7 MB (min: 290.8 MB, max: 323.1 MB)

Full features benchmark complete!

=========================================
All benchmarks complete!
=========================================
```

<!-- BENCHMARK_RESULTS_END -->

## ❤ Who's [Sponsoring Oxc](https://github.com/sponsors/Boshen)?

<p align="center">
  <a href="https://github.com/sponsors/Boshen">
    <img src="https://raw.githubusercontent.com/Boshen/sponsors/main/sponsors.svg" alt="Our sponsors" />
  </a>
</p>
