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

- **Prettier**: 3.8.3
- **Biome**: 2.4.12
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
  Time (mean ± σ):      1.098 s ±  0.156 s    [User: 2.031 s, System: 0.152 s]
  Range (min … max):    0.963 s …  1.366 s    5 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):     653.7 ms ±   7.3 ms    [User: 1117.1 ms, System: 78.2 ms]
  Range (min … max):   642.9 ms … 661.4 ms    5 runs
 
Benchmark 3: biome
  Time (mean ± σ):     165.5 ms ±   1.3 ms    [User: 141.2 ms, System: 24.0 ms]
  Range (min … max):   163.4 ms … 166.7 ms    5 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):     158.7 ms ±   6.2 ms    [User: 199.3 ms, System: 64.9 ms]
  Range (min … max):   153.3 ms … 165.7 ms    5 runs
 
Summary
  oxfmt ran
    1.04 ± 0.04 times faster than biome
    4.12 ± 0.17 times faster than prettier+oxc-parser
    6.92 ± 1.02 times faster than prettier

Memory Usage:
  prettier: 229.8 MB (min: 221.6 MB, max: 240.9 MB)
  prettier+oxc-parser: 173.8 MB (min: 170.9 MB, max: 176.8 MB)
  biome: 69.4 MB (min: 68.2 MB, max: 71.2 MB)
  oxfmt: 109.6 MB (min: 109.4 MB, max: 109.8 MB)

Large single file benchmark complete!


=========================================
Benchmarking JS/TS (no embedded)
=========================================

Target: Outline repository (js/ts/tsx only)
- 3 warmup runs, 10 benchmark runs
- Git reset before each run

Benchmark 1: prettier
  Time (mean ± σ):     14.649 s ±  0.106 s    [User: 24.691 s, System: 1.484 s]
  Range (min … max):   14.419 s … 14.790 s    10 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):     12.179 s ±  0.257 s    [User: 16.069 s, System: 0.902 s]
  Range (min … max):   11.903 s … 12.655 s    10 runs
 
Benchmark 3: biome
  Time (mean ± σ):      1.284 s ±  0.099 s    [User: 4.451 s, System: 0.245 s]
  Range (min … max):    1.226 s …  1.538 s    10 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):     372.4 ms ±   3.6 ms    [User: 871.6 ms, System: 215.8 ms]
  Range (min … max):   366.2 ms … 377.3 ms    10 runs
 
Summary
  oxfmt ran
    3.45 ± 0.27 times faster than biome
   32.71 ± 0.76 times faster than prettier+oxc-parser
   39.34 ± 0.48 times faster than prettier

Memory Usage:
  prettier: 418.2 MB (min: 383.0 MB, max: 510.1 MB)
  prettier+oxc-parser: 330.8 MB (min: 324.4 MB, max: 337.9 MB)
  biome: 72.6 MB (min: 69.8 MB, max: 77.3 MB)
  oxfmt: 140.9 MB (min: 132.7 MB, max: 147.0 MB)

JS/TS (no embedded) benchmark complete!


=========================================
Benchmarking Mixed (embedded)
=========================================

Target: Storybook repository (mixed with embedded languages)
- 1 warmup runs, 3 benchmark runs
- Git reset before each run

Benchmark 1: prettier+oxc-parser
  Time (mean ± σ):     42.299 s ±  0.329 s    [User: 52.191 s, System: 3.439 s]
  Range (min … max):   41.931 s … 42.566 s    3 runs
 
Benchmark 2: oxfmt
  Time (mean ± σ):     12.348 s ±  0.231 s    [User: 44.938 s, System: 3.006 s]
  Range (min … max):   12.108 s … 12.570 s    3 runs
 
Summary
  oxfmt ran
    3.43 ± 0.07 times faster than prettier+oxc-parser

Memory Usage:
  prettier+oxc-parser: 1153.3 MB (min: 1149.7 MB, max: 1157.4 MB)
  oxfmt: 565.6 MB (min: 527.2 MB, max: 605.9 MB)

Mixed (embedded) benchmark complete!


=========================================
Benchmarking Full features
=========================================

Target: Continue repository (full features)
- 1 warmup runs, 3 benchmark runs
- Git reset before each run

Benchmark 1: prettier+oxc-parser
  Time (mean ± σ):     56.249 s ±  0.207 s    [User: 58.910 s, System: 8.923 s]
  Range (min … max):   56.020 s … 56.422 s    3 runs
 
Benchmark 2: oxfmt
  Time (mean ± σ):      6.044 s ±  0.121 s    [User: 21.787 s, System: 1.298 s]
  Range (min … max):    5.973 s …  6.184 s    3 runs
 
Summary
  oxfmt ran
    9.31 ± 0.19 times faster than prettier+oxc-parser

Memory Usage:
  prettier+oxc-parser: 647.8 MB (min: 639.5 MB, max: 659.7 MB)
  oxfmt: 332.7 MB (min: 299.8 MB, max: 362.5 MB)

Full features benchmark complete!

=========================================
All benchmarks complete!
=========================================
```
<!-- BENCHMARK_RESULTS_END -->
