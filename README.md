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
- **Biome**: 2.4.3
- **Oxfmt**: 0.35.0

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
  Time (mean ± σ):      1.013 s ±  0.024 s    [User: 1.962 s, System: 0.194 s]
  Range (min … max):    0.978 s …  1.036 s    5 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):     704.0 ms ±   6.0 ms    [User: 1131.2 ms, System: 97.9 ms]
  Range (min … max):   700.1 ms … 714.6 ms    5 runs
 
Benchmark 3: biome
  Time (mean ± σ):     135.5 ms ±   2.2 ms    [User: 112.4 ms, System: 23.0 ms]
  Range (min … max):   133.8 ms … 139.3 ms    5 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):     158.9 ms ±   5.9 ms    [User: 185.8 ms, System: 75.3 ms]
  Range (min … max):   150.1 ms … 166.5 ms    5 runs
 
Summary
  biome ran
    1.17 ± 0.05 times faster than oxfmt
    5.20 ± 0.10 times faster than prettier+oxc-parser
    7.47 ± 0.22 times faster than prettier

Memory Usage:
  prettier: 221.8 MB (min: 218.7 MB, max: 227.3 MB)
  prettier+oxc-parser: 170.4 MB (min: 169.3 MB, max: 172.1 MB)
  biome: 63.7 MB (min: 62.6 MB, max: 66.0 MB)
  oxfmt: 107.2 MB (min: 107.1 MB, max: 107.4 MB)

Large single file benchmark complete!


=========================================
Benchmarking JS/TS (no embedded)
=========================================

Target: Outline repository (js/ts/tsx only)
- 3 warmup runs, 10 benchmark runs
- Git reset before each run

Benchmark 1: prettier
  Time (mean ± σ):     13.678 s ±  0.125 s    [User: 23.113 s, System: 1.710 s]
  Range (min … max):   13.498 s … 13.902 s    10 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):     11.482 s ±  0.112 s    [User: 15.036 s, System: 1.047 s]
  Range (min … max):   11.325 s … 11.646 s    10 runs
 
Benchmark 3: biome
  Time (mean ± σ):      1.042 s ±  0.005 s    [User: 3.456 s, System: 0.455 s]
  Range (min … max):    1.034 s …  1.052 s    10 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):     387.2 ms ±   4.6 ms    [User: 819.9 ms, System: 306.5 ms]
  Range (min … max):   383.1 ms … 394.8 ms    10 runs
 
Summary
  oxfmt ran
    2.69 ± 0.03 times faster than biome
   29.66 ± 0.45 times faster than prettier+oxc-parser
   35.33 ± 0.53 times faster than prettier

Memory Usage:
  prettier: 410.2 MB (min: 371.1 MB, max: 422.9 MB)
  prettier+oxc-parser: 323.2 MB (min: 316.4 MB, max: 329.2 MB)
  biome: 64.8 MB (min: 58.1 MB, max: 69.7 MB)
  oxfmt: 137.2 MB (min: 128.8 MB, max: 143.9 MB)

JS/TS (no embedded) benchmark complete!


=========================================
Benchmarking Mixed (embedded)
=========================================

Target: Storybook repository (mixed with embedded languages)
- 1 warmup runs, 3 benchmark runs
- Git reset before each run

Benchmark 1: prettier+oxc-parser
  Time (mean ± σ):     40.212 s ±  0.196 s    [User: 49.470 s, System: 3.846 s]
  Range (min … max):   39.995 s … 40.375 s    3 runs
 
Benchmark 2: oxfmt
  Time (mean ± σ):     12.408 s ±  0.106 s    [User: 44.951 s, System: 3.834 s]
  Range (min … max):   12.325 s … 12.527 s    3 runs
 
Summary
  oxfmt ran
    3.24 ± 0.03 times faster than prettier+oxc-parser

Memory Usage:
  prettier+oxc-parser: 1122.4 MB (min: 1060.1 MB, max: 1154.4 MB)
  oxfmt: 576.1 MB (min: 544.9 MB, max: 603.3 MB)

Mixed (embedded) benchmark complete!


=========================================
Benchmarking Full features
=========================================

Target: Continue repository (full features)
- 1 warmup runs, 3 benchmark runs
- Git reset before each run

Benchmark 1: prettier+oxc-parser
  Time (mean ± σ):     59.294 s ±  0.542 s    [User: 62.633 s, System: 11.252 s]
  Range (min … max):   58.672 s … 59.670 s    3 runs
 
Benchmark 2: oxfmt
  Time (mean ± σ):      6.196 s ±  0.167 s    [User: 22.096 s, System: 1.744 s]
  Range (min … max):    6.044 s …  6.374 s    3 runs
 
Summary
  oxfmt ran
    9.57 ± 0.27 times faster than prettier+oxc-parser

Memory Usage:
  prettier+oxc-parser: 645.2 MB (min: 642.2 MB, max: 651.0 MB)
  oxfmt: 320.4 MB (min: 293.0 MB, max: 351.1 MB)

Full features benchmark complete!

=========================================
All benchmarks complete!
=========================================
```
<!-- BENCHMARK_RESULTS_END -->
