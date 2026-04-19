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
- **Biome**: 2.4.11
- **Oxfmt**: 0.45.0

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
  Time (mean ± σ):      1.070 s ±  0.070 s    [User: 2.063 s, System: 0.182 s]
  Range (min … max):    1.025 s …  1.193 s    5 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):     731.4 ms ±  10.1 ms    [User: 1178.8 ms, System: 103.4 ms]
  Range (min … max):   718.2 ms … 741.8 ms    5 runs
 
Benchmark 3: biome
  Time (mean ± σ):     170.2 ms ±   3.0 ms    [User: 147.8 ms, System: 24.0 ms]
  Range (min … max):   166.8 ms … 174.1 ms    5 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):     162.0 ms ±   8.8 ms    [User: 190.6 ms, System: 78.5 ms]
  Range (min … max):   155.0 ms … 175.7 ms    5 runs
 
Summary
  oxfmt ran
    1.05 ± 0.06 times faster than biome
    4.52 ± 0.25 times faster than prettier+oxc-parser
    6.60 ± 0.56 times faster than prettier

Memory Usage:
  prettier: 233.3 MB (min: 209.6 MB, max: 249.7 MB)
  prettier+oxc-parser: 172.0 MB (min: 170.3 MB, max: 173.1 MB)
  biome: 69.5 MB (min: 68.0 MB, max: 72.2 MB)
  oxfmt: 109.5 MB (min: 109.5 MB, max: 109.6 MB)

Large single file benchmark complete!


=========================================
Benchmarking JS/TS (no embedded)
=========================================

Target: Outline repository (js/ts/tsx only)
- 3 warmup runs, 10 benchmark runs
- Git reset before each run

Benchmark 1: prettier
  Time (mean ± σ):     15.038 s ±  0.524 s    [User: 25.523 s, System: 1.281 s]
  Range (min … max):   14.502 s … 15.918 s    10 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):     12.627 s ±  0.293 s    [User: 16.966 s, System: 0.682 s]
  Range (min … max):   12.141 s … 13.097 s    10 runs
 
Benchmark 3: biome
  Time (mean ± σ):      1.286 s ±  0.009 s    [User: 4.503 s, System: 0.362 s]
  Range (min … max):    1.273 s …  1.301 s    10 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):     419.1 ms ±   4.9 ms    [User: 915.4 ms, System: 329.8 ms]
  Range (min … max):   411.7 ms … 428.8 ms    10 runs
 
Summary
  oxfmt ran
    3.07 ± 0.04 times faster than biome
   30.13 ± 0.78 times faster than prettier+oxc-parser
   35.88 ± 1.32 times faster than prettier

Memory Usage:
  prettier: 417.0 MB (min: 392.9 MB, max: 453.4 MB)
  prettier+oxc-parser: 325.1 MB (min: 318.9 MB, max: 328.5 MB)
  biome: 71.7 MB (min: 69.5 MB, max: 75.8 MB)
  oxfmt: 139.6 MB (min: 134.9 MB, max: 144.1 MB)

JS/TS (no embedded) benchmark complete!


=========================================
Benchmarking Mixed (embedded)
=========================================

Target: Storybook repository (mixed with embedded languages)
- 1 warmup runs, 3 benchmark runs
- Git reset before each run

Benchmark 1: prettier+oxc-parser
  Time (mean ± σ):     43.231 s ±  0.368 s    [User: 54.692 s, System: 2.553 s]
  Range (min … max):   42.821 s … 43.531 s    3 runs
 
Benchmark 2: oxfmt
  Time (mean ± σ):     13.075 s ±  0.141 s    [User: 47.208 s, System: 3.810 s]
  Range (min … max):   12.925 s … 13.205 s    3 runs
 
Summary
  oxfmt ran
    3.31 ± 0.05 times faster than prettier+oxc-parser

Memory Usage:
  prettier+oxc-parser: 1150.8 MB (min: 1149.3 MB, max: 1151.6 MB)
  oxfmt: 588.9 MB (min: 569.0 MB, max: 621.7 MB)

Mixed (embedded) benchmark complete!


=========================================
Benchmarking Full features
=========================================

Target: Continue repository (full features)
- 1 warmup runs, 3 benchmark runs
- Git reset before each run

Benchmark 1: prettier+oxc-parser
  Time (mean ± σ):     61.990 s ±  0.308 s    [User: 73.001 s, System: 3.164 s]
  Range (min … max):   61.661 s … 62.272 s    3 runs
 
Benchmark 2: oxfmt
  Time (mean ± σ):      6.445 s ±  0.082 s    [User: 22.889 s, System: 1.686 s]
  Range (min … max):    6.369 s …  6.532 s    3 runs
 
Summary
  oxfmt ran
    9.62 ± 0.13 times faster than prettier+oxc-parser

Memory Usage:
  prettier+oxc-parser: 650.6 MB (min: 632.9 MB, max: 665.3 MB)
  oxfmt: 340.2 MB (min: 317.7 MB, max: 356.7 MB)

Full features benchmark complete!

=========================================
All benchmarks complete!
=========================================
```
<!-- BENCHMARK_RESULTS_END -->
