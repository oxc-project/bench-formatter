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
- **Biome**: 2.4.6
- **Oxfmt**: 0.36.0

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
  Time (mean ± σ):      1.021 s ±  0.011 s    [User: 1.986 s, System: 0.196 s]
  Range (min … max):    1.007 s …  1.037 s    5 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):     787.5 ms ±  10.2 ms    [User: 1240.6 ms, System: 114.1 ms]
  Range (min … max):   770.9 ms … 797.7 ms    5 runs
 
Benchmark 3: biome
  Time (mean ± σ):     166.4 ms ±   2.1 ms    [User: 139.3 ms, System: 26.6 ms]
  Range (min … max):   164.1 ms … 168.9 ms    5 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):     163.1 ms ±   8.3 ms    [User: 189.3 ms, System: 79.5 ms]
  Range (min … max):   151.9 ms … 170.3 ms    5 runs
 
Summary
  oxfmt ran
    1.02 ± 0.05 times faster than biome
    4.83 ± 0.25 times faster than prettier+oxc-parser
    6.26 ± 0.33 times faster than prettier

Memory Usage:
  prettier: 232.6 MB (min: 221.8 MB, max: 255.2 MB)
  prettier+oxc-parser: 171.4 MB (min: 170.7 MB, max: 172.6 MB)
  biome: 67.7 MB (min: 67.0 MB, max: 70.2 MB)
  oxfmt: 107.9 MB (min: 107.8 MB, max: 108.0 MB)

Large single file benchmark complete!


=========================================
Benchmarking JS/TS (no embedded)
=========================================

Target: Outline repository (js/ts/tsx only)
- 3 warmup runs, 10 benchmark runs
- Git reset before each run

Benchmark 1: prettier
  Time (mean ± σ):     13.941 s ±  0.060 s    [User: 23.659 s, System: 1.765 s]
  Range (min … max):   13.856 s … 14.071 s    10 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):     11.633 s ±  0.084 s    [User: 15.267 s, System: 1.066 s]
  Range (min … max):   11.513 s … 11.770 s    10 runs
 
Benchmark 3: biome
  Time (mean ± σ):      1.290 s ±  0.107 s    [User: 4.217 s, System: 0.470 s]
  Range (min … max):    1.231 s …  1.531 s    10 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):     394.3 ms ±   2.7 ms    [User: 838.3 ms, System: 324.4 ms]
  Range (min … max):   390.5 ms … 398.6 ms    10 runs
 
Summary
  oxfmt ran
    3.27 ± 0.27 times faster than biome
   29.50 ± 0.30 times faster than prettier+oxc-parser
   35.35 ± 0.29 times faster than prettier

Memory Usage:
  prettier: 404.3 MB (min: 393.0 MB, max: 422.0 MB)
  prettier+oxc-parser: 325.2 MB (min: 318.7 MB, max: 337.6 MB)
  biome: 71.0 MB (min: 67.0 MB, max: 73.5 MB)
  oxfmt: 135.6 MB (min: 132.7 MB, max: 140.1 MB)

JS/TS (no embedded) benchmark complete!


=========================================
Benchmarking Mixed (embedded)
=========================================

Target: Storybook repository (mixed with embedded languages)
- 1 warmup runs, 3 benchmark runs
- Git reset before each run

Benchmark 1: prettier+oxc-parser
  Time (mean ± σ):     40.137 s ±  0.177 s    [User: 49.709 s, System: 3.861 s]
  Range (min … max):   39.940 s … 40.282 s    3 runs
 
Benchmark 2: oxfmt
  Time (mean ± σ):     13.858 s ±  2.269 s    [User: 45.350 s, System: 3.891 s]
  Range (min … max):   12.451 s … 16.475 s    3 runs
 
Summary
  oxfmt ran
    2.90 ± 0.47 times faster than prettier+oxc-parser

Memory Usage:
  prettier+oxc-parser: 1147.3 MB (min: 1141.0 MB, max: 1158.1 MB)
  oxfmt: 551.6 MB (min: 533.7 MB, max: 562.7 MB)

Mixed (embedded) benchmark complete!


=========================================
Benchmarking Full features
=========================================

Target: Continue repository (full features)
- 1 warmup runs, 3 benchmark runs
- Git reset before each run

Benchmark 1: prettier+oxc-parser
  Time (mean ± σ):     58.528 s ±  0.347 s    [User: 62.120 s, System: 11.045 s]
  Range (min … max):   58.151 s … 58.835 s    3 runs
 
Benchmark 2: oxfmt
  Time (mean ± σ):      6.076 s ±  0.028 s    [User: 21.873 s, System: 1.731 s]
  Range (min … max):    6.054 s …  6.108 s    3 runs
 
Summary
  oxfmt ran
    9.63 ± 0.07 times faster than prettier+oxc-parser

Memory Usage:
  prettier+oxc-parser: 651.8 MB (min: 647.6 MB, max: 656.5 MB)
  oxfmt: 344.4 MB (min: 321.6 MB, max: 362.6 MB)

Full features benchmark complete!

=========================================
All benchmarks complete!
=========================================
```
<!-- BENCHMARK_RESULTS_END -->
