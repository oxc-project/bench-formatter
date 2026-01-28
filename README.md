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
- **Biome**: 2.3.11
- **Oxfmt**: 0.27.0

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
  Time (mean ± σ):      1.064 s ±  0.027 s    [User: 2.035 s, System: 0.211 s]
  Range (min … max):    1.035 s …  1.107 s    5 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):     729.7 ms ±  14.6 ms    [User: 1171.9 ms, System: 103.5 ms]
  Range (min … max):   712.9 ms … 752.2 ms    5 runs
 
Benchmark 3: biome
  Time (mean ± σ):     136.3 ms ±   1.5 ms    [User: 107.5 ms, System: 28.7 ms]
  Range (min … max):   134.2 ms … 138.2 ms    5 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):     127.0 ms ±   1.4 ms    [User: 252.6 ms, System: 65.7 ms]
  Range (min … max):   125.6 ms … 129.1 ms    5 runs
 
Summary
  oxfmt ran
    1.07 ± 0.02 times faster than biome
    5.75 ± 0.13 times faster than prettier+oxc-parser
    8.38 ± 0.23 times faster than prettier

Memory Usage:
  prettier: 254.0 MB (min: 251.1 MB, max: 259.2 MB)
  prettier+oxc-parser: 169.2 MB (min: 167.4 MB, max: 171.3 MB)
  biome: 62.5 MB (min: 61.7 MB, max: 64.2 MB)
  oxfmt: 158.5 MB (min: 158.4 MB, max: 158.6 MB)

Large single file benchmark complete!


=========================================
Benchmarking JS/TS (no embedded)
=========================================

Target: Outline repository (js/ts/tsx only)
- 3 warmup runs, 10 benchmark runs
- Git reset before each run

Benchmark 1: prettier
  Time (mean ± σ):     13.493 s ±  0.193 s    [User: 22.750 s, System: 1.747 s]
  Range (min … max):   13.178 s … 13.761 s    10 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):     10.889 s ±  0.068 s    [User: 14.255 s, System: 1.011 s]
  Range (min … max):   10.802 s … 11.019 s    10 runs
 
Benchmark 3: biome
  Time (mean ± σ):     881.7 ms ±   4.6 ms    [User: 2878.9 ms, System: 402.6 ms]
  Range (min … max):   875.6 ms … 889.7 ms    10 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):     325.9 ms ±   2.8 ms    [User: 823.4 ms, System: 272.1 ms]
  Range (min … max):   322.3 ms … 331.0 ms    10 runs
 
Summary
  oxfmt ran
    2.71 ± 0.03 times faster than biome
   33.41 ± 0.35 times faster than prettier+oxc-parser
   41.40 ± 0.69 times faster than prettier

Memory Usage:
  prettier: 383.8 MB (min: 345.3 MB, max: 413.1 MB)
  prettier+oxc-parser: 314.9 MB (min: 311.1 MB, max: 320.6 MB)
  biome: 62.8 MB (min: 60.3 MB, max: 66.1 MB)
  oxfmt: 184.1 MB (min: 178.1 MB, max: 188.3 MB)

JS/TS (no embedded) benchmark complete!


=========================================
Benchmarking Mixed (embedded)
=========================================

Target: Storybook repository (mixed with embedded languages)
- 1 warmup runs, 3 benchmark runs
- Git reset before each run

Benchmark 1: prettier+oxc-parser
  Time (mean ± σ):     39.878 s ±  0.207 s    [User: 48.899 s, System: 3.894 s]
  Range (min … max):   39.642 s … 40.026 s    3 runs
 
Benchmark 2: oxfmt
  Time (mean ± σ):     12.357 s ±  0.179 s    [User: 44.446 s, System: 3.294 s]
  Range (min … max):   12.223 s … 12.560 s    3 runs
 
Summary
  oxfmt ran
    3.23 ± 0.05 times faster than prettier+oxc-parser

Memory Usage:
  prettier+oxc-parser: 1138.3 MB (min: 1134.9 MB, max: 1144.9 MB)
  oxfmt: 1607.6 MB (min: 1455.0 MB, max: 1744.5 MB)

Mixed (embedded) benchmark complete!


=========================================
Benchmarking Full features
=========================================

Target: Continue repository (full features)
- 1 warmup runs, 3 benchmark runs
- Git reset before each run

Benchmark 1: prettier+oxc-parser
  Time (mean ± σ):     56.807 s ±  0.704 s    [User: 61.005 s, System: 10.349 s]
  Range (min … max):   56.233 s … 57.592 s    3 runs
 
Benchmark 2: oxfmt
  Time (mean ± σ):      7.643 s ±  0.066 s    [User: 25.441 s, System: 3.016 s]
  Range (min … max):    7.589 s …  7.717 s    3 runs
 
Summary
  oxfmt ran
    7.43 ± 0.11 times faster than prettier+oxc-parser

Memory Usage:
  prettier+oxc-parser: 651.9 MB (min: 649.2 MB, max: 655.7 MB)
  oxfmt: 1272.4 MB (min: 1246.8 MB, max: 1287.4 MB)

Full features benchmark complete!

=========================================
All benchmarks complete!
=========================================
```
<!-- BENCHMARK_RESULTS_END -->
