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
- **Oxfmt**: 0.38.0

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
  Time (mean ± σ):      1.143 s ±  0.059 s    [User: 2.160 s, System: 0.196 s]
  Range (min … max):    1.038 s …  1.180 s    5 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):     737.4 ms ±  10.4 ms    [User: 1196.0 ms, System: 103.3 ms]
  Range (min … max):   721.1 ms … 747.9 ms    5 runs
 
Benchmark 3: biome
  Time (mean ± σ):     175.7 ms ±   2.0 ms    [User: 146.5 ms, System: 29.5 ms]
  Range (min … max):   173.4 ms … 178.7 ms    5 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):     174.0 ms ±   3.1 ms    [User: 206.9 ms, System: 85.9 ms]
  Range (min … max):   171.2 ms … 179.0 ms    5 runs
 
Summary
  oxfmt ran
    1.01 ± 0.02 times faster than biome
    4.24 ± 0.10 times faster than prettier+oxc-parser
    6.57 ± 0.36 times faster than prettier

Memory Usage:
  prettier: 231.8 MB (min: 211.8 MB, max: 259.0 MB)
  prettier+oxc-parser: 170.4 MB (min: 167.9 MB, max: 172.2 MB)
  biome: 67.7 MB (min: 66.8 MB, max: 69.2 MB)
  oxfmt: 108.0 MB (min: 107.8 MB, max: 108.1 MB)

Large single file benchmark complete!


=========================================
Benchmarking JS/TS (no embedded)
=========================================

Target: Outline repository (js/ts/tsx only)
- 3 warmup runs, 10 benchmark runs
- Git reset before each run

Benchmark 1: prettier
  Time (mean ± σ):     14.891 s ±  0.285 s    [User: 25.004 s, System: 1.724 s]
  Range (min … max):   14.582 s … 15.399 s    10 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):     12.048 s ±  0.142 s    [User: 15.741 s, System: 1.103 s]
  Range (min … max):   11.878 s … 12.351 s    10 runs
 
Benchmark 3: biome
  Time (mean ± σ):      1.287 s ±  0.084 s    [User: 4.292 s, System: 0.481 s]
  Range (min … max):    1.246 s …  1.525 s    10 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):     401.5 ms ±   4.7 ms    [User: 847.2 ms, System: 328.1 ms]
  Range (min … max):   394.4 ms … 409.8 ms    10 runs
 
Summary
  oxfmt ran
    3.21 ± 0.21 times faster than biome
   30.01 ± 0.50 times faster than prettier+oxc-parser
   37.09 ± 0.83 times faster than prettier

Memory Usage:
  prettier: 406.2 MB (min: 381.3 MB, max: 429.4 MB)
  prettier+oxc-parser: 328.2 MB (min: 320.0 MB, max: 337.0 MB)
  biome: 71.8 MB (min: 69.7 MB, max: 74.7 MB)
  oxfmt: 135.7 MB (min: 131.2 MB, max: 143.5 MB)

JS/TS (no embedded) benchmark complete!


=========================================
Benchmarking Mixed (embedded)
=========================================

Target: Storybook repository (mixed with embedded languages)
- 1 warmup runs, 3 benchmark runs
- Git reset before each run

Benchmark 1: prettier+oxc-parser
  Time (mean ± σ):     41.291 s ±  0.348 s    [User: 50.979 s, System: 3.927 s]
  Range (min … max):   40.899 s … 41.564 s    3 runs
 
Benchmark 2: oxfmt
  Time (mean ± σ):     13.275 s ±  0.188 s    [User: 47.456 s, System: 4.016 s]
  Range (min … max):   13.156 s … 13.491 s    3 runs
 
Summary
  oxfmt ran
    3.11 ± 0.05 times faster than prettier+oxc-parser

Memory Usage:
  prettier+oxc-parser: 1152.6 MB (min: 1143.2 MB, max: 1161.9 MB)
  oxfmt: 574.9 MB (min: 552.8 MB, max: 598.6 MB)

Mixed (embedded) benchmark complete!


=========================================
Benchmarking Full features
=========================================

Target: Continue repository (full features)
- 1 warmup runs, 3 benchmark runs
- Git reset before each run

Benchmark 1: prettier+oxc-parser
  Time (mean ± σ):     58.935 s ±  0.107 s    [User: 62.252 s, System: 11.285 s]
  Range (min … max):   58.836 s … 59.048 s    3 runs
 
Benchmark 2: oxfmt
  Time (mean ± σ):      6.283 s ±  0.152 s    [User: 22.326 s, System: 1.801 s]
  Range (min … max):    6.123 s …  6.427 s    3 runs
 
Summary
  oxfmt ran
    9.38 ± 0.23 times faster than prettier+oxc-parser

Memory Usage:
  prettier+oxc-parser: 646.2 MB (min: 643.9 MB, max: 648.1 MB)
  oxfmt: 338.0 MB (min: 324.4 MB, max: 364.6 MB)

Full features benchmark complete!

=========================================
All benchmarks complete!
=========================================
```
<!-- BENCHMARK_RESULTS_END -->
