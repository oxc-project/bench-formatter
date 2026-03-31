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
- **Biome**: 2.4.9
- **Oxfmt**: 0.43.0

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
  Time (mean ± σ):      1.083 s ±  0.063 s    [User: 2.061 s, System: 0.176 s]
  Range (min … max):    1.014 s …  1.134 s    5 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):     704.9 ms ±  14.4 ms    [User: 1124.4 ms, System: 106.9 ms]
  Range (min … max):   683.1 ms … 721.8 ms    5 runs
 
Benchmark 3: biome
  Time (mean ± σ):     164.6 ms ±   1.2 ms    [User: 136.1 ms, System: 29.0 ms]
  Range (min … max):   163.3 ms … 166.1 ms    5 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):     163.5 ms ±   5.7 ms    [User: 196.4 ms, System: 77.5 ms]
  Range (min … max):   157.3 ms … 170.2 ms    5 runs
 
Summary
  oxfmt ran
    1.01 ± 0.04 times faster than biome
    4.31 ± 0.18 times faster than prettier+oxc-parser
    6.63 ± 0.45 times faster than prettier

Memory Usage:
  prettier: 236.3 MB (min: 219.6 MB, max: 249.1 MB)
  prettier+oxc-parser: 171.5 MB (min: 168.6 MB, max: 174.2 MB)
  biome: 69.4 MB (min: 67.7 MB, max: 70.9 MB)
  oxfmt: 110.0 MB (min: 109.9 MB, max: 110.1 MB)

Large single file benchmark complete!


=========================================
Benchmarking JS/TS (no embedded)
=========================================

Target: Outline repository (js/ts/tsx only)
- 3 warmup runs, 10 benchmark runs
- Git reset before each run

Benchmark 1: prettier
  Time (mean ± σ):     14.520 s ±  0.164 s    [User: 24.868 s, System: 1.260 s]
  Range (min … max):   14.205 s … 14.720 s    10 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):     12.127 s ±  0.115 s    [User: 16.470 s, System: 0.677 s]
  Range (min … max):   11.964 s … 12.319 s    10 runs
 
Benchmark 3: biome
  Time (mean ± σ):      1.256 s ±  0.003 s    [User: 4.310 s, System: 0.437 s]
  Range (min … max):    1.253 s …  1.260 s    10 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):     392.1 ms ±   1.4 ms    [User: 855.9 ms, System: 306.3 ms]
  Range (min … max):   389.5 ms … 394.1 ms    10 runs
 
Summary
  oxfmt ran
    3.20 ± 0.01 times faster than biome
   30.93 ± 0.31 times faster than prettier+oxc-parser
   37.03 ± 0.44 times faster than prettier

Memory Usage:
  prettier: 409.9 MB (min: 372.2 MB, max: 490.8 MB)
  prettier+oxc-parser: 319.7 MB (min: 311.5 MB, max: 324.1 MB)
  biome: 71.6 MB (min: 69.3 MB, max: 77.6 MB)
  oxfmt: 138.5 MB (min: 131.9 MB, max: 147.5 MB)

JS/TS (no embedded) benchmark complete!


=========================================
Benchmarking Mixed (embedded)
=========================================

Target: Storybook repository (mixed with embedded languages)
- 1 warmup runs, 3 benchmark runs
- Git reset before each run

Benchmark 1: prettier+oxc-parser
  Time (mean ± σ):     41.576 s ±  0.139 s    [User: 52.851 s, System: 2.523 s]
  Range (min … max):   41.464 s … 41.732 s    3 runs
 
Benchmark 2: oxfmt
  Time (mean ± σ):     13.075 s ±  0.107 s    [User: 46.563 s, System: 3.780 s]
  Range (min … max):   12.952 s … 13.140 s    3 runs
 
Summary
  oxfmt ran
    3.18 ± 0.03 times faster than prettier+oxc-parser

Memory Usage:
  prettier+oxc-parser: 1142.6 MB (min: 1137.1 MB, max: 1146.4 MB)
  oxfmt: 549.9 MB (min: 533.3 MB, max: 579.4 MB)

Mixed (embedded) benchmark complete!


=========================================
Benchmarking Full features
=========================================

Target: Continue repository (full features)
- 1 warmup runs, 3 benchmark runs
- Git reset before each run

Benchmark 1: prettier+oxc-parser
  Time (mean ± σ):     59.562 s ±  0.122 s    [User: 70.320 s, System: 3.074 s]
  Range (min … max):   59.442 s … 59.687 s    3 runs
 
Benchmark 2: oxfmt
  Time (mean ± σ):      6.266 s ±  0.017 s    [User: 22.277 s, System: 1.771 s]
  Range (min … max):    6.249 s …  6.283 s    3 runs
 
Summary
  oxfmt ran
    9.51 ± 0.03 times faster than prettier+oxc-parser

Memory Usage:
  prettier+oxc-parser: 656.8 MB (min: 649.7 MB, max: 661.8 MB)
  oxfmt: 336.0 MB (min: 330.9 MB, max: 339.8 MB)

Full features benchmark complete!

=========================================
All benchmarks complete!
=========================================
```
<!-- BENCHMARK_RESULTS_END -->
