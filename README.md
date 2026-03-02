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
  Time (mean ± σ):     905.3 ms ±   6.8 ms    [User: 1902.6 ms, System: 148.3 ms]
  Range (min … max):   899.4 ms … 916.3 ms    5 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):     653.0 ms ±   8.5 ms    [User: 1113.5 ms, System: 84.3 ms]
  Range (min … max):   642.2 ms … 665.2 ms    5 runs
 
Benchmark 3: biome
  Time (mean ± σ):     129.9 ms ±   2.3 ms    [User: 104.8 ms, System: 24.7 ms]
  Range (min … max):   127.3 ms … 132.5 ms    5 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):     155.7 ms ±   4.4 ms    [User: 190.7 ms, System: 65.3 ms]
  Range (min … max):   151.8 ms … 162.7 ms    5 runs
 
Summary
  biome ran
    1.20 ± 0.04 times faster than oxfmt
    5.03 ± 0.11 times faster than prettier+oxc-parser
    6.97 ± 0.13 times faster than prettier

Memory Usage:
  prettier: 229.8 MB (min: 222.3 MB, max: 252.0 MB)
  prettier+oxc-parser: 173.7 MB (min: 168.5 MB, max: 180.6 MB)
  biome: 63.1 MB (min: 62.5 MB, max: 64.5 MB)
  oxfmt: 107.4 MB (min: 107.2 MB, max: 107.5 MB)

Large single file benchmark complete!


=========================================
Benchmarking JS/TS (no embedded)
=========================================

Target: Outline repository (js/ts/tsx only)
- 3 warmup runs, 10 benchmark runs
- Git reset before each run

Benchmark 1: prettier
  Time (mean ± σ):     13.492 s ±  0.103 s    [User: 23.062 s, System: 1.352 s]
  Range (min … max):   13.361 s … 13.740 s    10 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):     11.322 s ±  0.088 s    [User: 14.989 s, System: 0.865 s]
  Range (min … max):   11.204 s … 11.465 s    10 runs
 
Benchmark 3: biome
  Time (mean ± σ):     969.8 ms ±   4.7 ms    [User: 3367.1 ms, System: 300.7 ms]
  Range (min … max):   964.2 ms … 979.6 ms    10 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):     358.7 ms ±  10.3 ms    [User: 788.1 ms, System: 207.3 ms]
  Range (min … max):   339.8 ms … 373.8 ms    10 runs
 
Summary
  oxfmt ran
    2.70 ± 0.08 times faster than biome
   31.56 ± 0.94 times faster than prettier+oxc-parser
   37.62 ± 1.12 times faster than prettier

Memory Usage:
  prettier: 429.0 MB (min: 397.0 MB, max: 531.5 MB)
  prettier+oxc-parser: 323.8 MB (min: 313.1 MB, max: 332.7 MB)
  biome: 65.3 MB (min: 60.8 MB, max: 69.0 MB)
  oxfmt: 139.5 MB (min: 133.9 MB, max: 146.0 MB)

JS/TS (no embedded) benchmark complete!


=========================================
Benchmarking Mixed (embedded)
=========================================

Target: Storybook repository (mixed with embedded languages)
- 1 warmup runs, 3 benchmark runs
- Git reset before each run

Benchmark 1: prettier+oxc-parser
  Time (mean ± σ):     39.899 s ±  0.345 s    [User: 49.466 s, System: 3.171 s]
  Range (min … max):   39.532 s … 40.216 s    3 runs
 
Benchmark 2: oxfmt
  Time (mean ± σ):     11.776 s ±  0.096 s    [User: 43.307 s, System: 3.067 s]
  Range (min … max):   11.720 s … 11.887 s    3 runs
 
Summary
  oxfmt ran
    3.39 ± 0.04 times faster than prettier+oxc-parser

Memory Usage:
  prettier+oxc-parser: 1141.5 MB (min: 1138.2 MB, max: 1146.1 MB)
  oxfmt: 590.9 MB (min: 560.5 MB, max: 642.1 MB)

Mixed (embedded) benchmark complete!


=========================================
Benchmarking Full features
=========================================

Target: Continue repository (full features)
- 1 warmup runs, 3 benchmark runs
- Git reset before each run

Benchmark 1: prettier+oxc-parser
  Time (mean ± σ):     54.175 s ±  0.334 s    [User: 57.738 s, System: 8.478 s]
  Range (min … max):   53.843 s … 54.511 s    3 runs
 
Benchmark 2: oxfmt
  Time (mean ± σ):      5.835 s ±  0.080 s    [User: 21.097 s, System: 1.343 s]
  Range (min … max):    5.759 s …  5.918 s    3 runs
 
Summary
  oxfmt ran
    9.29 ± 0.14 times faster than prettier+oxc-parser

Memory Usage:
  prettier+oxc-parser: 645.5 MB (min: 640.6 MB, max: 653.7 MB)
  oxfmt: 326.3 MB (min: 298.4 MB, max: 341.4 MB)

Full features benchmark complete!

=========================================
All benchmarks complete!
=========================================
```
<!-- BENCHMARK_RESULTS_END -->
