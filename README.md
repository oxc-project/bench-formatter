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

- **Prettier**: 3.8.1
- **Biome**: 2.4.10
- **Oxfmt**: 0.43.0

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
  Time (mean ± σ):     894.5 ms ±  10.7 ms    [User: 1859.0 ms, System: 138.3 ms]
  Range (min … max):   879.1 ms … 905.8 ms    5 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):     642.7 ms ±   6.3 ms    [User: 1089.1 ms, System: 78.1 ms]
  Range (min … max):   636.6 ms … 652.1 ms    5 runs
 
Benchmark 3: biome
  Time (mean ± σ):     161.4 ms ±   2.0 ms    [User: 136.6 ms, System: 24.4 ms]
  Range (min … max):   158.1 ms … 163.0 ms    5 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):     154.1 ms ±   7.3 ms    [User: 194.4 ms, System: 57.9 ms]
  Range (min … max):   146.8 ms … 165.7 ms    5 runs
 
Summary
  oxfmt ran
    1.05 ± 0.05 times faster than biome
    4.17 ± 0.20 times faster than prettier+oxc-parser
    5.80 ± 0.28 times faster than prettier

Memory Usage:
  prettier: 226.9 MB (min: 218.2 MB, max: 240.0 MB)
  prettier+oxc-parser: 172.0 MB (min: 170.8 MB, max: 174.1 MB)
  biome: 68.0 MB (min: 67.8 MB, max: 68.3 MB)
  oxfmt: 109.5 MB (min: 109.4 MB, max: 109.7 MB)

Large single file benchmark complete!


=========================================
Benchmarking JS/TS (no embedded)
=========================================

Target: Outline repository (js/ts/tsx only)
- 3 warmup runs, 10 benchmark runs
- Git reset before each run

Benchmark 1: prettier
  Time (mean ± σ):     13.882 s ±  0.081 s    [User: 23.689 s, System: 1.336 s]
  Range (min … max):   13.776 s … 14.026 s    10 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):     11.440 s ±  0.138 s    [User: 15.071 s, System: 0.823 s]
  Range (min … max):   11.298 s … 11.806 s    10 runs
 
Benchmark 3: biome
  Time (mean ± σ):      1.253 s ±  0.102 s    [User: 4.273 s, System: 0.292 s]
  Range (min … max):    1.199 s …  1.526 s    10 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):     368.8 ms ±   7.4 ms    [User: 843.2 ms, System: 212.9 ms]
  Range (min … max):   357.5 ms … 383.5 ms    10 runs
 
Summary
  oxfmt ran
    3.40 ± 0.29 times faster than biome
   31.02 ± 0.73 times faster than prettier+oxc-parser
   37.64 ± 0.79 times faster than prettier

Memory Usage:
  prettier: 416.6 MB (min: 382.3 MB, max: 474.8 MB)
  prettier+oxc-parser: 323.7 MB (min: 312.6 MB, max: 334.8 MB)
  biome: 71.7 MB (min: 69.5 MB, max: 75.4 MB)
  oxfmt: 139.2 MB (min: 132.8 MB, max: 146.6 MB)

JS/TS (no embedded) benchmark complete!


=========================================
Benchmarking Mixed (embedded)
=========================================

Target: Storybook repository (mixed with embedded languages)
- 1 warmup runs, 3 benchmark runs
- Git reset before each run

Benchmark 1: prettier+oxc-parser
  Time (mean ± σ):     40.776 s ±  0.119 s    [User: 50.598 s, System: 3.159 s]
  Range (min … max):   40.676 s … 40.907 s    3 runs
 
Benchmark 2: oxfmt
  Time (mean ± σ):     12.064 s ±  0.038 s    [User: 44.062 s, System: 2.982 s]
  Range (min … max):   12.019 s … 12.086 s    3 runs
 
Summary
  oxfmt ran
    3.38 ± 0.01 times faster than prettier+oxc-parser

Memory Usage:
  prettier+oxc-parser: 1145.2 MB (min: 1144.1 MB, max: 1146.1 MB)
  oxfmt: 514.3 MB (min: 442.6 MB, max: 555.6 MB)

Mixed (embedded) benchmark complete!


=========================================
Benchmarking Full features
=========================================

Target: Continue repository (full features)
- 1 warmup runs, 3 benchmark runs
- Git reset before each run

Benchmark 1: prettier+oxc-parser
  Time (mean ± σ):     53.682 s ±  0.129 s    [User: 57.129 s, System: 8.249 s]
  Range (min … max):   53.591 s … 53.830 s    3 runs
 
Benchmark 2: oxfmt
  Time (mean ± σ):      5.867 s ±  0.090 s    [User: 21.166 s, System: 1.293 s]
  Range (min … max):    5.791 s …  5.967 s    3 runs
 
Summary
  oxfmt ran
    9.15 ± 0.14 times faster than prettier+oxc-parser

Memory Usage:
  prettier+oxc-parser: 660.9 MB (min: 639.9 MB, max: 696.4 MB)
  oxfmt: 340.2 MB (min: 326.5 MB, max: 354.9 MB)

Full features benchmark complete!

=========================================
All benchmarks complete!
=========================================
```
<!-- BENCHMARK_RESULTS_END -->
