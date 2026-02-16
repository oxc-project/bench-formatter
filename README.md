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
- **Biome**: 2.3.15
- **Oxfmt**: 0.33.0

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
  Time (mean ± σ):     904.6 ms ±  12.7 ms    [User: 1903.6 ms, System: 136.4 ms]
  Range (min … max):   893.3 ms … 921.9 ms    5 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):     657.3 ms ±   8.0 ms    [User: 1112.2 ms, System: 83.7 ms]
  Range (min … max):   646.9 ms … 667.5 ms    5 runs
 
Benchmark 3: biome
  Time (mean ± σ):     129.1 ms ±   2.8 ms    [User: 100.5 ms, System: 27.0 ms]
  Range (min … max):   125.1 ms … 132.6 ms    5 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):     151.0 ms ±   6.0 ms    [User: 182.4 ms, System: 67.6 ms]
  Range (min … max):   143.1 ms … 158.2 ms    5 runs
 
Summary
  biome ran
    1.17 ± 0.05 times faster than oxfmt
    5.09 ± 0.12 times faster than prettier+oxc-parser
    7.01 ± 0.18 times faster than prettier

Memory Usage:
  prettier: 224.2 MB (min: 210.2 MB, max: 245.4 MB)
  prettier+oxc-parser: 171.6 MB (min: 169.6 MB, max: 175.6 MB)
  biome: 62.2 MB (min: 62.0 MB, max: 62.5 MB)
  oxfmt: 107.5 MB (min: 107.4 MB, max: 107.6 MB)

Large single file benchmark complete!


=========================================
Benchmarking JS/TS (no embedded)
=========================================

Target: Outline repository (js/ts/tsx only)
- 3 warmup runs, 10 benchmark runs
- Git reset before each run

Benchmark 1: prettier
  Time (mean ± σ):     12.978 s ±  0.109 s    [User: 22.226 s, System: 1.324 s]
  Range (min … max):   12.786 s … 13.113 s    10 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):     11.146 s ±  0.047 s    [User: 15.009 s, System: 0.856 s]
  Range (min … max):   11.054 s … 11.233 s    10 runs
 
Benchmark 3: biome
  Time (mean ± σ):     883.2 ms ±  78.8 ms    [User: 2880.2 ms, System: 267.3 ms]
  Range (min … max):   837.9 ms … 1071.6 ms    10 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):     341.9 ms ±   8.6 ms    [User: 755.7 ms, System: 203.7 ms]
  Range (min … max):   331.8 ms … 355.6 ms    10 runs
 
Summary
  oxfmt ran
    2.58 ± 0.24 times faster than biome
   32.60 ± 0.83 times faster than prettier+oxc-parser
   37.95 ± 1.00 times faster than prettier

Memory Usage:
  prettier: 432.8 MB (min: 395.5 MB, max: 588.1 MB)
  prettier+oxc-parser: 329.7 MB (min: 307.1 MB, max: 364.2 MB)
  biome: 62.8 MB (min: 59.9 MB, max: 65.4 MB)
  oxfmt: 137.4 MB (min: 129.2 MB, max: 145.2 MB)

JS/TS (no embedded) benchmark complete!


=========================================
Benchmarking Mixed (embedded)
=========================================

Target: Storybook repository (mixed with embedded languages)
- 1 warmup runs, 3 benchmark runs
- Git reset before each run

Benchmark 1: prettier+oxc-parser
  Time (mean ± σ):     39.849 s ±  0.331 s    [User: 49.373 s, System: 3.154 s]
  Range (min … max):   39.537 s … 40.197 s    3 runs
 
Benchmark 2: oxfmt
  Time (mean ± σ):     11.867 s ±  0.130 s    [User: 43.306 s, System: 3.194 s]
  Range (min … max):   11.744 s … 12.003 s    3 runs
 
Summary
  oxfmt ran
    3.36 ± 0.05 times faster than prettier+oxc-parser

Memory Usage:
  prettier+oxc-parser: 1145.5 MB (min: 1138.7 MB, max: 1156.3 MB)
  oxfmt: 586.2 MB (min: 551.6 MB, max: 637.5 MB)

Mixed (embedded) benchmark complete!


=========================================
Benchmarking Full features
=========================================

Target: Continue repository (full features)
- 1 warmup runs, 3 benchmark runs
- Git reset before each run

Benchmark 1: prettier+oxc-parser
  Time (mean ± σ):     53.927 s ±  0.239 s    [User: 57.556 s, System: 8.334 s]
  Range (min … max):   53.676 s … 54.151 s    3 runs
 
Benchmark 2: oxfmt
  Time (mean ± σ):      5.918 s ±  0.141 s    [User: 21.301 s, System: 1.383 s]
  Range (min … max):    5.756 s …  6.009 s    3 runs
 
Summary
  oxfmt ran
    9.11 ± 0.22 times faster than prettier+oxc-parser

Memory Usage:
  prettier+oxc-parser: 661.8 MB (min: 651.7 MB, max: 677.9 MB)
  oxfmt: 336.3 MB (min: 323.3 MB, max: 353.4 MB)

Full features benchmark complete!

=========================================
All benchmarks complete!
=========================================
```
<!-- BENCHMARK_RESULTS_END -->
