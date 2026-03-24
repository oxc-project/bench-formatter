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
- **Biome**: 2.4.8
- **Oxfmt**: 0.42.0

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
  Time (mean ± σ):      1.083 s ±  0.015 s    [User: 2.096 s, System: 0.203 s]
  Range (min … max):    1.073 s …  1.109 s    5 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):     755.4 ms ±   7.0 ms    [User: 1217.5 ms, System: 111.1 ms]
  Range (min … max):   750.1 ms … 767.6 ms    5 runs
 
Benchmark 3: biome
  Time (mean ± σ):     181.9 ms ±   1.3 ms    [User: 150.9 ms, System: 31.0 ms]
  Range (min … max):   179.9 ms … 183.2 ms    5 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):     175.3 ms ±   5.6 ms    [User: 207.0 ms, System: 88.2 ms]
  Range (min … max):   166.1 ms … 181.1 ms    5 runs
 
Summary
  oxfmt ran
    1.04 ± 0.03 times faster than biome
    4.31 ± 0.14 times faster than prettier+oxc-parser
    6.18 ± 0.21 times faster than prettier

Memory Usage:
  prettier: 240.9 MB (min: 220.1 MB, max: 265.9 MB)
  prettier+oxc-parser: 170.1 MB (min: 168.3 MB, max: 173.3 MB)
  biome: 68.3 MB (min: 67.1 MB, max: 71.6 MB)
  oxfmt: 107.6 MB (min: 107.4 MB, max: 107.7 MB)

Large single file benchmark complete!


=========================================
Benchmarking JS/TS (no embedded)
=========================================

Target: Outline repository (js/ts/tsx only)
- 3 warmup runs, 10 benchmark runs
- Git reset before each run

Benchmark 1: prettier
  Time (mean ± σ):     16.119 s ±  0.211 s    [User: 27.005 s, System: 1.915 s]
  Range (min … max):   15.738 s … 16.355 s    10 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):     13.621 s ±  0.345 s    [User: 18.142 s, System: 1.222 s]
  Range (min … max):   12.912 s … 13.930 s    10 runs
 
Benchmark 3: biome
  Time (mean ± σ):      1.348 s ±  0.110 s    [User: 4.435 s, System: 0.441 s]
  Range (min … max):    1.286 s …  1.593 s    10 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):     416.9 ms ±   8.1 ms    [User: 899.9 ms, System: 318.8 ms]
  Range (min … max):   410.4 ms … 436.9 ms    10 runs
 
Summary
  oxfmt ran
    3.23 ± 0.27 times faster than biome
   32.68 ± 1.04 times faster than prettier+oxc-parser
   38.67 ± 0.91 times faster than prettier

Memory Usage:
  prettier: 404.9 MB (min: 379.7 MB, max: 416.7 MB)
  prettier+oxc-parser: 323.2 MB (min: 313.6 MB, max: 330.6 MB)
  biome: 70.4 MB (min: 68.7 MB, max: 73.9 MB)
  oxfmt: 135.8 MB (min: 130.0 MB, max: 140.1 MB)

JS/TS (no embedded) benchmark complete!


=========================================
Benchmarking Mixed (embedded)
=========================================

Target: Storybook repository (mixed with embedded languages)
- 1 warmup runs, 3 benchmark runs
- Git reset before each run

Benchmark 1: prettier+oxc-parser
  Time (mean ± σ):     44.886 s ±  0.702 s    [User: 55.624 s, System: 4.118 s]
  Range (min … max):   44.154 s … 45.554 s    3 runs
 
Benchmark 2: oxfmt
  Time (mean ± σ):     14.070 s ±  0.264 s    [User: 50.201 s, System: 4.196 s]
  Range (min … max):   13.783 s … 14.302 s    3 runs
 
Summary
  oxfmt ran
    3.19 ± 0.08 times faster than prettier+oxc-parser

Memory Usage:
  prettier+oxc-parser: 1144.3 MB (min: 1138.9 MB, max: 1147.1 MB)
  oxfmt: 583.8 MB (min: 514.8 MB, max: 639.4 MB)

Mixed (embedded) benchmark complete!


=========================================
Benchmarking Full features
=========================================

Target: Continue repository (full features)
- 1 warmup runs, 3 benchmark runs
- Git reset before each run

Benchmark 1: prettier+oxc-parser
  Time (mean ± σ):     62.823 s ±  0.903 s    [User: 67.349 s, System: 11.085 s]
  Range (min … max):   62.018 s … 63.799 s    3 runs
 
Benchmark 2: oxfmt
  Time (mean ± σ):      6.635 s ±  0.112 s    [User: 23.758 s, System: 1.916 s]
  Range (min … max):    6.561 s …  6.764 s    3 runs
 
Summary
  oxfmt ran
    9.47 ± 0.21 times faster than prettier+oxc-parser

Memory Usage:
  prettier+oxc-parser: 636.2 MB (min: 625.0 MB, max: 645.0 MB)
  oxfmt: 331.4 MB (min: 319.4 MB, max: 338.0 MB)

Full features benchmark complete!

=========================================
All benchmarks complete!
=========================================
```
<!-- BENCHMARK_RESULTS_END -->
