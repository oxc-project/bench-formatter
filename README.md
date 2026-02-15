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
- **Oxfmt**: 0.32.0

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
  Time (mean ± σ):      1.032 s ±  0.019 s    [User: 1.994 s, System: 0.198 s]
  Range (min … max):    1.006 s …  1.056 s    5 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):     713.8 ms ±  11.2 ms    [User: 1147.1 ms, System: 99.0 ms]
  Range (min … max):   703.8 ms … 730.4 ms    5 runs
 
Benchmark 3: biome
  Time (mean ± σ):     136.5 ms ±   1.8 ms    [User: 108.3 ms, System: 27.1 ms]
  Range (min … max):   134.1 ms … 138.7 ms    5 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):     165.4 ms ±   5.3 ms    [User: 195.8 ms, System: 82.0 ms]
  Range (min … max):   160.9 ms … 173.3 ms    5 runs
 
Summary
  biome ran
    1.21 ± 0.04 times faster than oxfmt
    5.23 ± 0.11 times faster than prettier+oxc-parser
    7.56 ± 0.17 times faster than prettier

Memory Usage:
  prettier: 245.3 MB (min: 210.0 MB, max: 264.6 MB)
  prettier+oxc-parser: 169.5 MB (min: 167.8 MB, max: 170.6 MB)
  biome: 62.5 MB (min: 61.8 MB, max: 64.0 MB)
  oxfmt: 107.3 MB (min: 107.3 MB, max: 107.4 MB)

Large single file benchmark complete!


=========================================
Benchmarking JS/TS (no embedded)
=========================================

Target: Outline repository (js/ts/tsx only)
- 3 warmup runs, 10 benchmark runs
- Git reset before each run

Benchmark 1: prettier
  Time (mean ± σ):     13.580 s ±  0.156 s    [User: 23.055 s, System: 1.691 s]
  Range (min … max):   13.286 s … 13.770 s    10 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):     11.398 s ±  0.130 s    [User: 15.236 s, System: 1.042 s]
  Range (min … max):   11.170 s … 11.582 s    10 runs
 
Benchmark 3: biome
  Time (mean ± σ):     943.2 ms ±  84.9 ms    [User: 2939.7 ms, System: 415.3 ms]
  Range (min … max):   894.5 ms … 1133.6 ms    10 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):     384.3 ms ±   5.1 ms    [User: 806.4 ms, System: 307.0 ms]
  Range (min … max):   379.2 ms … 397.0 ms    10 runs
 
Summary
  oxfmt ran
    2.45 ± 0.22 times faster than biome
   29.66 ± 0.52 times faster than prettier+oxc-parser
   35.33 ± 0.62 times faster than prettier

Memory Usage:
  prettier: 414.8 MB (min: 378.6 MB, max: 504.4 MB)
  prettier+oxc-parser: 325.7 MB (min: 315.6 MB, max: 335.1 MB)
  biome: 63.8 MB (min: 60.0 MB, max: 65.9 MB)
  oxfmt: 135.3 MB (min: 129.0 MB, max: 145.0 MB)

JS/TS (no embedded) benchmark complete!


=========================================
Benchmarking Mixed (embedded)
=========================================

Target: Storybook repository (mixed with embedded languages)
- 1 warmup runs, 3 benchmark runs
- Git reset before each run

Benchmark 1: prettier+oxc-parser
  Time (mean ± σ):     40.208 s ±  0.248 s    [User: 49.361 s, System: 3.826 s]
  Range (min … max):   40.036 s … 40.492 s    3 runs
 
Benchmark 2: oxfmt
  Time (mean ± σ):     12.661 s ±  0.070 s    [User: 45.762 s, System: 4.039 s]
  Range (min … max):   12.586 s … 12.726 s    3 runs
 
Summary
  oxfmt ran
    3.18 ± 0.03 times faster than prettier+oxc-parser

Memory Usage:
  prettier+oxc-parser: 1148.2 MB (min: 1146.6 MB, max: 1150.8 MB)
  oxfmt: 498.0 MB (min: 420.3 MB, max: 553.4 MB)

Mixed (embedded) benchmark complete!


=========================================
Benchmarking Full features
=========================================

Target: Continue repository (full features)
- 1 warmup runs, 3 benchmark runs
- Git reset before each run

Benchmark 1: prettier+oxc-parser
  Time (mean ± σ):     59.699 s ±  0.403 s    [User: 63.092 s, System: 11.197 s]
  Range (min … max):   59.316 s … 60.119 s    3 runs
 
Benchmark 2: oxfmt
  Time (mean ± σ):      5.921 s ±  0.112 s    [User: 21.257 s, System: 1.772 s]
  Range (min … max):    5.792 s …  5.992 s    3 runs
 
Summary
  oxfmt ran
   10.08 ± 0.20 times faster than prettier+oxc-parser

Memory Usage:
  prettier+oxc-parser: 657.2 MB (min: 654.5 MB, max: 659.0 MB)
  oxfmt: 328.6 MB (min: 315.7 MB, max: 340.5 MB)

Full features benchmark complete!

=========================================
All benchmarks complete!
=========================================
```
<!-- BENCHMARK_RESULTS_END -->
