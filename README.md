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
  Time (mean ± σ):      1.105 s ±  0.043 s    [User: 2.070 s, System: 0.196 s]
  Range (min … max):    1.039 s …  1.157 s    5 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):     714.9 ms ±  15.8 ms    [User: 1152.0 ms, System: 104.5 ms]
  Range (min … max):   697.7 ms … 740.5 ms    5 runs
 
Benchmark 3: biome
  Time (mean ± σ):     138.1 ms ±   2.3 ms    [User: 112.1 ms, System: 25.8 ms]
  Range (min … max):   136.1 ms … 141.6 ms    5 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):     163.0 ms ±   4.2 ms    [User: 187.6 ms, System: 84.5 ms]
  Range (min … max):   156.6 ms … 168.3 ms    5 runs
 
Summary
  biome ran
    1.18 ± 0.04 times faster than oxfmt
    5.17 ± 0.14 times faster than prettier+oxc-parser
    8.00 ± 0.34 times faster than prettier

Memory Usage:
  prettier: 225.9 MB (min: 207.8 MB, max: 247.0 MB)
  prettier+oxc-parser: 171.1 MB (min: 167.6 MB, max: 173.2 MB)
  biome: 62.3 MB (min: 61.8 MB, max: 62.9 MB)
  oxfmt: 107.5 MB (min: 107.5 MB, max: 107.6 MB)

Large single file benchmark complete!


=========================================
Benchmarking JS/TS (no embedded)
=========================================

Target: Outline repository (js/ts/tsx only)
- 3 warmup runs, 10 benchmark runs
- Git reset before each run

Benchmark 1: prettier
  Time (mean ± σ):     13.924 s ±  0.147 s    [User: 23.578 s, System: 1.698 s]
  Range (min … max):   13.687 s … 14.219 s    10 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):     11.786 s ±  0.211 s    [User: 15.481 s, System: 1.063 s]
  Range (min … max):   11.487 s … 12.110 s    10 runs
 
Benchmark 3: biome
  Time (mean ± σ):      1.068 s ±  0.101 s    [User: 3.397 s, System: 0.442 s]
  Range (min … max):    1.016 s …  1.314 s    10 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):     377.7 ms ±   2.4 ms    [User: 806.5 ms, System: 292.9 ms]
  Range (min … max):   374.3 ms … 382.0 ms    10 runs
 
Summary
  oxfmt ran
    2.83 ± 0.27 times faster than biome
   31.21 ± 0.59 times faster than prettier+oxc-parser
   36.87 ± 0.46 times faster than prettier

Memory Usage:
  prettier: 394.8 MB (min: 369.9 MB, max: 421.0 MB)
  prettier+oxc-parser: 317.9 MB (min: 303.4 MB, max: 331.2 MB)
  biome: 64.7 MB (min: 62.0 MB, max: 66.8 MB)
  oxfmt: 135.8 MB (min: 128.3 MB, max: 140.4 MB)

JS/TS (no embedded) benchmark complete!


=========================================
Benchmarking Mixed (embedded)
=========================================

Target: Storybook repository (mixed with embedded languages)
- 1 warmup runs, 3 benchmark runs
- Git reset before each run

Benchmark 1: prettier+oxc-parser
  Time (mean ± σ):     40.798 s ±  0.215 s    [User: 50.470 s, System: 3.841 s]
  Range (min … max):   40.668 s … 41.047 s    3 runs
 
Benchmark 2: oxfmt
  Time (mean ± σ):     13.122 s ±  0.042 s    [User: 46.727 s, System: 4.076 s]
  Range (min … max):   13.081 s … 13.164 s    3 runs
 
Summary
  oxfmt ran
    3.11 ± 0.02 times faster than prettier+oxc-parser

Memory Usage:
  prettier+oxc-parser: 1147.5 MB (min: 1140.2 MB, max: 1152.6 MB)
  oxfmt: 552.9 MB (min: 524.9 MB, max: 598.0 MB)

Mixed (embedded) benchmark complete!


=========================================
Benchmarking Full features
=========================================

Target: Continue repository (full features)
- 1 warmup runs, 3 benchmark runs
- Git reset before each run

Benchmark 1: prettier+oxc-parser
  Time (mean ± σ):     57.554 s ±  0.215 s    [User: 61.040 s, System: 10.409 s]
  Range (min … max):   57.308 s … 57.705 s    3 runs
 
Benchmark 2: oxfmt
  Time (mean ± σ):      6.342 s ±  0.209 s    [User: 22.617 s, System: 1.834 s]
  Range (min … max):    6.139 s …  6.557 s    3 runs
 
Summary
  oxfmt ran
    9.07 ± 0.30 times faster than prettier+oxc-parser

Memory Usage:
  prettier+oxc-parser: 660.6 MB (min: 648.5 MB, max: 680.0 MB)
  oxfmt: 336.0 MB (min: 309.8 MB, max: 365.9 MB)

Full features benchmark complete!

=========================================
All benchmarks complete!
=========================================
```
<!-- BENCHMARK_RESULTS_END -->
