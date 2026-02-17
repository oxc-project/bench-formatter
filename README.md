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
  Time (mean ± σ):     908.9 ms ±  40.5 ms    [User: 1861.5 ms, System: 138.3 ms]
  Range (min … max):   867.2 ms … 968.8 ms    5 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):     685.1 ms ±  51.4 ms    [User: 1137.2 ms, System: 81.8 ms]
  Range (min … max):   629.8 ms … 744.3 ms    5 runs
 
Benchmark 3: biome
  Time (mean ± σ):     124.7 ms ±   0.7 ms    [User: 101.0 ms, System: 24.5 ms]
  Range (min … max):   124.1 ms … 125.7 ms    5 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):     154.0 ms ±   5.5 ms    [User: 184.9 ms, System: 65.4 ms]
  Range (min … max):   148.2 ms … 160.7 ms    5 runs
 
Summary
  biome ran
    1.23 ± 0.04 times faster than oxfmt
    5.49 ± 0.41 times faster than prettier+oxc-parser
    7.29 ± 0.33 times faster than prettier

Memory Usage:
  prettier: 228.1 MB (min: 209.7 MB, max: 244.6 MB)
  prettier+oxc-parser: 171.3 MB (min: 169.1 MB, max: 172.8 MB)
  biome: 63.4 MB (min: 62.1 MB, max: 66.3 MB)
  oxfmt: 107.5 MB (min: 107.4 MB, max: 107.6 MB)

Large single file benchmark complete!


=========================================
Benchmarking JS/TS (no embedded)
=========================================

Target: Outline repository (js/ts/tsx only)
- 3 warmup runs, 10 benchmark runs
- Git reset before each run

Benchmark 1: prettier
  Time (mean ± σ):     13.080 s ±  0.131 s    [User: 22.561 s, System: 1.370 s]
  Range (min … max):   12.875 s … 13.268 s    10 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):     10.951 s ±  0.095 s    [User: 14.791 s, System: 0.809 s]
  Range (min … max):   10.789 s … 11.152 s    10 runs
 
Benchmark 3: biome
  Time (mean ± σ):     847.7 ms ±   8.4 ms    [User: 2902.0 ms, System: 266.4 ms]
  Range (min … max):   838.9 ms … 866.7 ms    10 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):     352.8 ms ±  15.4 ms    [User: 753.1 ms, System: 201.9 ms]
  Range (min … max):   329.6 ms … 384.3 ms    10 runs
 
Summary
  oxfmt ran
    2.40 ± 0.11 times faster than biome
   31.04 ± 1.38 times faster than prettier+oxc-parser
   37.08 ± 1.66 times faster than prettier

Memory Usage:
  prettier: 416.0 MB (min: 392.7 MB, max: 435.8 MB)
  prettier+oxc-parser: 324.1 MB (min: 317.6 MB, max: 339.7 MB)
  biome: 63.9 MB (min: 60.7 MB, max: 66.9 MB)
  oxfmt: 137.3 MB (min: 124.9 MB, max: 144.1 MB)

JS/TS (no embedded) benchmark complete!


=========================================
Benchmarking Mixed (embedded)
=========================================

Target: Storybook repository (mixed with embedded languages)
- 1 warmup runs, 3 benchmark runs
- Git reset before each run

Benchmark 1: prettier+oxc-parser
  Time (mean ± σ):     39.105 s ±  0.038 s    [User: 48.516 s, System: 3.062 s]
  Range (min … max):   39.062 s … 39.133 s    3 runs
 
Benchmark 2: oxfmt
  Time (mean ± σ):     11.637 s ±  0.110 s    [User: 42.742 s, System: 3.080 s]
  Range (min … max):   11.523 s … 11.741 s    3 runs
 
Summary
  oxfmt ran
    3.36 ± 0.03 times faster than prettier+oxc-parser

Memory Usage:
  prettier+oxc-parser: 1145.1 MB (min: 1143.1 MB, max: 1148.8 MB)
  oxfmt: 529.8 MB (min: 511.4 MB, max: 561.0 MB)

Mixed (embedded) benchmark complete!


=========================================
Benchmarking Full features
=========================================

Target: Continue repository (full features)
- 1 warmup runs, 3 benchmark runs
- Git reset before each run

Benchmark 1: prettier+oxc-parser
  Time (mean ± σ):     53.944 s ±  0.434 s    [User: 57.612 s, System: 8.376 s]
  Range (min … max):   53.448 s … 54.255 s    3 runs
 
Benchmark 2: oxfmt
  Time (mean ± σ):      5.884 s ±  0.134 s    [User: 21.255 s, System: 1.401 s]
  Range (min … max):    5.770 s …  6.032 s    3 runs
 
Summary
  oxfmt ran
    9.17 ± 0.22 times faster than prettier+oxc-parser

Memory Usage:
  prettier+oxc-parser: 652.8 MB (min: 650.1 MB, max: 656.3 MB)
  oxfmt: 346.4 MB (min: 339.4 MB, max: 350.2 MB)

Full features benchmark complete!

=========================================
All benchmarks complete!
=========================================
```
<!-- BENCHMARK_RESULTS_END -->
