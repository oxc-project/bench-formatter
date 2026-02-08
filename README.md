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
- **Biome**: 2.3.14
- **Oxfmt**: 0.28.0

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
  Time (mean ± σ):      1.010 s ±  0.024 s    [User: 1.957 s, System: 0.198 s]
  Range (min … max):    0.986 s …  1.048 s    5 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):     714.2 ms ±  16.2 ms    [User: 1147.0 ms, System: 102.6 ms]
  Range (min … max):   689.3 ms … 729.7 ms    5 runs
 
Benchmark 3: biome
  Time (mean ± σ):     133.8 ms ±   2.0 ms    [User: 105.0 ms, System: 28.6 ms]
  Range (min … max):   131.2 ms … 135.7 ms    5 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):     103.5 ms ±   4.5 ms    [User: 201.3 ms, System: 53.3 ms]
  Range (min … max):   100.7 ms … 111.5 ms    5 runs
 
Summary
  oxfmt ran
    1.29 ± 0.06 times faster than biome
    6.90 ± 0.34 times faster than prettier+oxc-parser
    9.76 ± 0.48 times faster than prettier

Memory Usage:
  prettier: 233.7 MB (min: 220.2 MB, max: 267.4 MB)
  prettier+oxc-parser: 169.7 MB (min: 169.0 MB, max: 170.2 MB)
  biome: 62.3 MB (min: 61.7 MB, max: 63.9 MB)
  oxfmt: 153.1 MB (min: 151.0 MB, max: 156.1 MB)

Large single file benchmark complete!


=========================================
Benchmarking JS/TS (no embedded)
=========================================

Target: Outline repository (js/ts/tsx only)
- 3 warmup runs, 10 benchmark runs
- Git reset before each run

Benchmark 1: prettier
  Time (mean ± σ):     13.327 s ±  0.149 s    [User: 22.669 s, System: 1.720 s]
  Range (min … max):   13.123 s … 13.539 s    10 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):     11.118 s ±  0.165 s    [User: 14.683 s, System: 1.057 s]
  Range (min … max):   10.960 s … 11.380 s    10 runs
 
Benchmark 3: biome
  Time (mean ± σ):     927.1 ms ±  87.9 ms    [User: 2874.6 ms, System: 424.1 ms]
  Range (min … max):   876.8 ms … 1125.7 ms    10 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):     329.8 ms ±   1.7 ms    [User: 829.1 ms, System: 288.7 ms]
  Range (min … max):   328.0 ms … 332.6 ms    10 runs
 
Summary
  oxfmt ran
    2.81 ± 0.27 times faster than biome
   33.71 ± 0.53 times faster than prettier+oxc-parser
   40.41 ± 0.50 times faster than prettier

Memory Usage:
  prettier: 401.2 MB (min: 356.7 MB, max: 435.6 MB)
  prettier+oxc-parser: 314.5 MB (min: 306.1 MB, max: 320.8 MB)
  biome: 62.8 MB (min: 60.7 MB, max: 65.2 MB)
  oxfmt: 186.7 MB (min: 179.7 MB, max: 191.7 MB)

JS/TS (no embedded) benchmark complete!


=========================================
Benchmarking Mixed (embedded)
=========================================

Target: Storybook repository (mixed with embedded languages)
- 1 warmup runs, 3 benchmark runs
- Git reset before each run

Benchmark 1: prettier+oxc-parser
  Time (mean ± σ):     39.485 s ±  0.221 s    [User: 48.705 s, System: 3.776 s]
  Range (min … max):   39.235 s … 39.650 s    3 runs
 
Benchmark 2: oxfmt
  Time (mean ± σ):     16.709 s ±  0.061 s    [User: 24.767 s, System: 2.336 s]
  Range (min … max):   16.645 s … 16.766 s    3 runs
 
Summary
  oxfmt ran
    2.36 ± 0.02 times faster than prettier+oxc-parser

Memory Usage:
  prettier+oxc-parser: 1140.1 MB (min: 1133.9 MB, max: 1146.8 MB)
  oxfmt: 944.8 MB (min: 839.6 MB, max: 1060.8 MB)

Mixed (embedded) benchmark complete!


=========================================
Benchmarking Full features
=========================================

Target: Continue repository (full features)
- 1 warmup runs, 3 benchmark runs
- Git reset before each run

Benchmark 1: prettier+oxc-parser
  Time (mean ± σ):     56.981 s ±  0.089 s    [User: 60.044 s, System: 10.723 s]
  Range (min … max):   56.879 s … 57.042 s    3 runs
 
Benchmark 2: oxfmt
  Time (mean ± σ):      9.877 s ±  0.149 s    [User: 15.665 s, System: 1.948 s]
  Range (min … max):    9.729 s … 10.028 s    3 runs
 
Summary
  oxfmt ran
    5.77 ± 0.09 times faster than prettier+oxc-parser

Memory Usage:
  prettier+oxc-parser: 670.8 MB (min: 667.1 MB, max: 675.0 MB)
  oxfmt: 769.8 MB (min: 729.2 MB, max: 800.5 MB)

Full features benchmark complete!

=========================================
All benchmarks complete!
=========================================
```
<!-- BENCHMARK_RESULTS_END -->
