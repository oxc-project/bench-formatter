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
- **Biome**: 2.4.10
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
  Time (mean ± σ):      1.003 s ±  0.012 s    [User: 1.969 s, System: 0.188 s]
  Range (min … max):    0.990 s …  1.021 s    5 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):     723.3 ms ±   9.2 ms    [User: 1166.6 ms, System: 102.4 ms]
  Range (min … max):   712.3 ms … 734.1 ms    5 runs
 
Benchmark 3: biome
  Time (mean ± σ):     164.3 ms ±   2.3 ms    [User: 140.9 ms, System: 24.2 ms]
  Range (min … max):   162.2 ms … 168.1 ms    5 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):     161.8 ms ±   5.7 ms    [User: 193.9 ms, System: 75.6 ms]
  Range (min … max):   155.6 ms … 168.6 ms    5 runs
 
Summary
  oxfmt ran
    1.02 ± 0.04 times faster than biome
    4.47 ± 0.17 times faster than prettier+oxc-parser
    6.20 ± 0.23 times faster than prettier

Memory Usage:
  prettier: 229.6 MB (min: 211.3 MB, max: 264.9 MB)
  prettier+oxc-parser: 176.3 MB (min: 170.1 MB, max: 187.7 MB)
  biome: 69.9 MB (min: 67.9 MB, max: 72.8 MB)
  oxfmt: 109.5 MB (min: 109.4 MB, max: 109.7 MB)

Large single file benchmark complete!


=========================================
Benchmarking JS/TS (no embedded)
=========================================

Target: Outline repository (js/ts/tsx only)
- 3 warmup runs, 10 benchmark runs
- Git reset before each run

Benchmark 1: prettier
  Time (mean ± σ):     14.511 s ±  0.180 s    [User: 24.886 s, System: 1.346 s]
  Range (min … max):   14.222 s … 14.769 s    10 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):     12.102 s ±  0.144 s    [User: 16.315 s, System: 0.676 s]
  Range (min … max):   11.920 s … 12.289 s    10 runs
 
Benchmark 3: biome
  Time (mean ± σ):      1.315 s ±  0.109 s    [User: 4.363 s, System: 0.435 s]
  Range (min … max):    1.260 s …  1.621 s    10 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):     405.8 ms ±   3.4 ms    [User: 880.0 ms, System: 320.0 ms]
  Range (min … max):   402.0 ms … 411.9 ms    10 runs
 
Summary
  oxfmt ran
    3.24 ± 0.27 times faster than biome
   29.82 ± 0.43 times faster than prettier+oxc-parser
   35.76 ± 0.54 times faster than prettier

Memory Usage:
  prettier: 414.7 MB (min: 381.7 MB, max: 472.2 MB)
  prettier+oxc-parser: 327.4 MB (min: 313.1 MB, max: 336.6 MB)
  biome: 70.8 MB (min: 68.8 MB, max: 74.3 MB)
  oxfmt: 141.5 MB (min: 134.9 MB, max: 151.0 MB)

JS/TS (no embedded) benchmark complete!


=========================================
Benchmarking Mixed (embedded)
=========================================

Target: Storybook repository (mixed with embedded languages)
- 1 warmup runs, 3 benchmark runs
- Git reset before each run

Benchmark 1: prettier+oxc-parser
  Time (mean ± σ):     41.837 s ±  0.654 s    [User: 52.835 s, System: 2.558 s]
  Range (min … max):   41.435 s … 42.591 s    3 runs
 
Benchmark 2: oxfmt
  Time (mean ± σ):     13.115 s ±  0.148 s    [User: 46.491 s, System: 3.769 s]
  Range (min … max):   13.000 s … 13.281 s    3 runs
 
Summary
  oxfmt ran
    3.19 ± 0.06 times faster than prettier+oxc-parser

Memory Usage:
  prettier+oxc-parser: 1140.7 MB (min: 1139.0 MB, max: 1143.5 MB)
  oxfmt: 504.4 MB (min: 462.7 MB, max: 525.8 MB)

Mixed (embedded) benchmark complete!


=========================================
Benchmarking Full features
=========================================

Target: Continue repository (full features)
- 1 warmup runs, 3 benchmark runs
- Git reset before each run

Benchmark 1: prettier+oxc-parser
  Time (mean ± σ):     60.192 s ±  0.091 s    [User: 70.739 s, System: 3.295 s]
  Range (min … max):   60.088 s … 60.255 s    3 runs
 
Benchmark 2: oxfmt
  Time (mean ± σ):      6.319 s ±  0.109 s    [User: 21.893 s, System: 1.748 s]
  Range (min … max):    6.194 s …  6.394 s    3 runs
 
Summary
  oxfmt ran
    9.53 ± 0.16 times faster than prettier+oxc-parser

Memory Usage:
  prettier+oxc-parser: 656.1 MB (min: 648.9 MB, max: 659.7 MB)
  oxfmt: 358.2 MB (min: 339.9 MB, max: 373.5 MB)

Full features benchmark complete!

=========================================
All benchmarks complete!
=========================================
```
<!-- BENCHMARK_RESULTS_END -->
