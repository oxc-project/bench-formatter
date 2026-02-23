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
- **Oxfmt**: 0.34.0

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
  Time (mean ± σ):      1.044 s ±  0.022 s    [User: 2.028 s, System: 0.202 s]
  Range (min … max):    1.018 s …  1.073 s    5 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):     781.4 ms ±  41.6 ms    [User: 1233.7 ms, System: 116.5 ms]
  Range (min … max):   718.4 ms … 820.1 ms    5 runs
 
Benchmark 3: biome
  Time (mean ± σ):     139.5 ms ±   2.0 ms    [User: 107.9 ms, System: 30.7 ms]
  Range (min … max):   137.2 ms … 141.9 ms    5 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):     164.6 ms ±   6.5 ms    [User: 196.9 ms, System: 78.1 ms]
  Range (min … max):   155.6 ms … 173.5 ms    5 runs
 
Summary
  biome ran
    1.18 ± 0.05 times faster than oxfmt
    5.60 ± 0.31 times faster than prettier+oxc-parser
    7.48 ± 0.19 times faster than prettier

Memory Usage:
  prettier: 227.3 MB (min: 206.2 MB, max: 251.1 MB)
  prettier+oxc-parser: 170.4 MB (min: 168.1 MB, max: 172.4 MB)
  biome: 62.9 MB (min: 62.0 MB, max: 64.3 MB)
  oxfmt: 107.5 MB (min: 107.2 MB, max: 107.7 MB)

Large single file benchmark complete!


=========================================
Benchmarking JS/TS (no embedded)
=========================================

Target: Outline repository (js/ts/tsx only)
- 3 warmup runs, 10 benchmark runs
- Git reset before each run

Benchmark 1: prettier
  Time (mean ± σ):     14.552 s ±  0.211 s    [User: 24.460 s, System: 1.905 s]
  Range (min … max):   14.215 s … 14.808 s    10 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):     12.136 s ±  0.121 s    [User: 15.858 s, System: 1.110 s]
  Range (min … max):   11.944 s … 12.304 s    10 runs
 
Benchmark 3: biome
  Time (mean ± σ):      1.087 s ±  0.100 s    [User: 3.445 s, System: 0.487 s]
  Range (min … max):    1.037 s …  1.352 s    10 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):     391.6 ms ±  10.1 ms    [User: 817.3 ms, System: 315.5 ms]
  Range (min … max):   381.8 ms … 409.5 ms    10 runs
 
Summary
  oxfmt ran
    2.78 ± 0.26 times faster than biome
   30.99 ± 0.86 times faster than prettier+oxc-parser
   37.16 ± 1.10 times faster than prettier

Memory Usage:
  prettier: 400.6 MB (min: 374.4 MB, max: 445.9 MB)
  prettier+oxc-parser: 316.6 MB (min: 308.5 MB, max: 324.0 MB)
  biome: 66.7 MB (min: 64.2 MB, max: 71.0 MB)
  oxfmt: 136.6 MB (min: 132.4 MB, max: 145.6 MB)

JS/TS (no embedded) benchmark complete!


=========================================
Benchmarking Mixed (embedded)
=========================================

Target: Storybook repository (mixed with embedded languages)
- 1 warmup runs, 3 benchmark runs
- Git reset before each run

Benchmark 1: prettier+oxc-parser
  Time (mean ± σ):     42.318 s ±  0.179 s    [User: 51.989 s, System: 4.101 s]
  Range (min … max):   42.142 s … 42.499 s    3 runs
 
Benchmark 2: oxfmt
  Time (mean ± σ):     13.207 s ±  0.162 s    [User: 47.563 s, System: 4.044 s]
  Range (min … max):   13.047 s … 13.371 s    3 runs
 
Summary
  oxfmt ran
    3.20 ± 0.04 times faster than prettier+oxc-parser

Memory Usage:
  prettier+oxc-parser: 1140.4 MB (min: 1139.3 MB, max: 1141.2 MB)
  oxfmt: 576.3 MB (min: 558.9 MB, max: 604.7 MB)

Mixed (embedded) benchmark complete!


=========================================
Benchmarking Full features
=========================================

Target: Continue repository (full features)
- 1 warmup runs, 3 benchmark runs
- Git reset before each run

Benchmark 1: prettier+oxc-parser
  Time (mean ± σ):     59.386 s ±  0.107 s    [User: 62.816 s, System: 11.086 s]
  Range (min … max):   59.308 s … 59.508 s    3 runs
 
Benchmark 2: oxfmt
  Time (mean ± σ):      6.184 s ±  0.057 s    [User: 22.014 s, System: 1.844 s]
  Range (min … max):    6.137 s …  6.248 s    3 runs
 
Summary
  oxfmt ran
    9.60 ± 0.09 times faster than prettier+oxc-parser

Memory Usage:
  prettier+oxc-parser: 665.0 MB (min: 652.2 MB, max: 682.5 MB)
  oxfmt: 341.3 MB (min: 334.0 MB, max: 355.6 MB)

Full features benchmark complete!

=========================================
All benchmarks complete!
=========================================
```
<!-- BENCHMARK_RESULTS_END -->
