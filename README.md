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
  Time (mean ± σ):      1.026 s ±  0.011 s    [User: 1.991 s, System: 0.203 s]
  Range (min … max):    1.011 s …  1.041 s    5 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):     722.1 ms ±  13.0 ms    [User: 1163.6 ms, System: 105.8 ms]
  Range (min … max):   709.0 ms … 743.7 ms    5 runs
 
Benchmark 3: biome
  Time (mean ± σ):     136.0 ms ±   1.7 ms    [User: 105.4 ms, System: 30.4 ms]
  Range (min … max):   133.4 ms … 138.0 ms    5 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):     163.2 ms ±   3.2 ms    [User: 188.8 ms, System: 83.9 ms]
  Range (min … max):   158.2 ms … 166.0 ms    5 runs
 
Summary
  biome ran
    1.20 ± 0.03 times faster than oxfmt
    5.31 ± 0.12 times faster than prettier+oxc-parser
    7.55 ± 0.13 times faster than prettier

Memory Usage:
  prettier: 221.1 MB (min: 205.6 MB, max: 227.3 MB)
  prettier+oxc-parser: 170.8 MB (min: 170.0 MB, max: 171.9 MB)
  biome: 62.9 MB (min: 61.4 MB, max: 66.6 MB)
  oxfmt: 107.5 MB (min: 107.5 MB, max: 107.5 MB)

Large single file benchmark complete!


=========================================
Benchmarking JS/TS (no embedded)
=========================================

Target: Outline repository (js/ts/tsx only)
- 3 warmup runs, 10 benchmark runs
- Git reset before each run

Benchmark 1: prettier
  Time (mean ± σ):     14.211 s ±  0.401 s    [User: 23.767 s, System: 1.858 s]
  Range (min … max):   13.657 s … 14.915 s    10 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):     11.852 s ±  0.137 s    [User: 15.659 s, System: 1.103 s]
  Range (min … max):   11.579 s … 12.005 s    10 runs
 
Benchmark 3: biome
  Time (mean ± σ):     911.6 ms ±   7.4 ms    [User: 2993.1 ms, System: 414.7 ms]
  Range (min … max):   904.5 ms … 927.4 ms    10 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):     383.2 ms ±   8.3 ms    [User: 803.6 ms, System: 307.3 ms]
  Range (min … max):   378.2 ms … 406.3 ms    10 runs
 
Summary
  oxfmt ran
    2.38 ± 0.06 times faster than biome
   30.93 ± 0.76 times faster than prettier+oxc-parser
   37.09 ± 1.32 times faster than prettier

Memory Usage:
  prettier: 398.6 MB (min: 383.3 MB, max: 416.2 MB)
  prettier+oxc-parser: 321.6 MB (min: 315.3 MB, max: 328.6 MB)
  biome: 63.6 MB (min: 61.5 MB, max: 64.9 MB)
  oxfmt: 137.2 MB (min: 131.5 MB, max: 140.5 MB)

JS/TS (no embedded) benchmark complete!


=========================================
Benchmarking Mixed (embedded)
=========================================

Target: Storybook repository (mixed with embedded languages)
- 1 warmup runs, 3 benchmark runs
- Git reset before each run

Benchmark 1: prettier+oxc-parser
  Time (mean ± σ):     40.970 s ±  0.320 s    [User: 50.412 s, System: 3.957 s]
  Range (min … max):   40.630 s … 41.266 s    3 runs
 
Benchmark 2: oxfmt
  Time (mean ± σ):     12.890 s ±  0.156 s    [User: 46.556 s, System: 4.177 s]
  Range (min … max):   12.757 s … 13.061 s    3 runs
 
Summary
  oxfmt ran
    3.18 ± 0.05 times faster than prettier+oxc-parser

Memory Usage:
  prettier+oxc-parser: 1143.5 MB (min: 1139.4 MB, max: 1151.6 MB)
  oxfmt: 520.6 MB (min: 482.5 MB, max: 543.0 MB)

Mixed (embedded) benchmark complete!


=========================================
Benchmarking Full features
=========================================

Target: Continue repository (full features)
- 1 warmup runs, 3 benchmark runs
- Git reset before each run

Benchmark 1: prettier+oxc-parser
  Time (mean ± σ):     59.984 s ±  0.534 s    [User: 63.151 s, System: 11.175 s]
  Range (min … max):   59.452 s … 60.519 s    3 runs
 
Benchmark 2: oxfmt
  Time (mean ± σ):      6.301 s ±  0.109 s    [User: 22.479 s, System: 1.795 s]
  Range (min … max):    6.208 s …  6.421 s    3 runs
 
Summary
  oxfmt ran
    9.52 ± 0.18 times faster than prettier+oxc-parser

Memory Usage:
  prettier+oxc-parser: 665.8 MB (min: 657.3 MB, max: 678.8 MB)
  oxfmt: 340.4 MB (min: 326.2 MB, max: 352.4 MB)

Full features benchmark complete!

=========================================
All benchmarks complete!
=========================================
```
<!-- BENCHMARK_RESULTS_END -->
