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
- **Biome**: 2.4.6
- **Oxfmt**: 0.40.0

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
  Time (mean ± σ):      1.036 s ±  0.019 s    [User: 2.006 s, System: 0.197 s]
  Range (min … max):    1.018 s …  1.066 s    5 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):     801.0 ms ±  23.5 ms    [User: 1254.9 ms, System: 107.3 ms]
  Range (min … max):   783.8 ms … 841.3 ms    5 runs
 
Benchmark 3: biome
  Time (mean ± σ):     169.2 ms ±   2.7 ms    [User: 143.6 ms, System: 24.8 ms]
  Range (min … max):   166.9 ms … 173.8 ms    5 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):     163.6 ms ±   6.5 ms    [User: 185.2 ms, System: 82.3 ms]
  Range (min … max):   158.3 ms … 171.6 ms    5 runs
 
Summary
  oxfmt ran
    1.03 ± 0.04 times faster than biome
    4.90 ± 0.24 times faster than prettier+oxc-parser
    6.33 ± 0.28 times faster than prettier

Memory Usage:
  prettier: 234.6 MB (min: 217.4 MB, max: 255.4 MB)
  prettier+oxc-parser: 170.8 MB (min: 169.4 MB, max: 172.4 MB)
  biome: 68.5 MB (min: 67.0 MB, max: 71.1 MB)
  oxfmt: 108.0 MB (min: 107.9 MB, max: 108.1 MB)

Large single file benchmark complete!


=========================================
Benchmarking JS/TS (no embedded)
=========================================

Target: Outline repository (js/ts/tsx only)
- 3 warmup runs, 10 benchmark runs
- Git reset before each run

Benchmark 1: prettier
  Time (mean ± σ):     14.200 s ±  0.158 s    [User: 24.089 s, System: 1.658 s]
  Range (min … max):   14.037 s … 14.477 s    10 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):     11.918 s ±  0.154 s    [User: 15.678 s, System: 1.088 s]
  Range (min … max):   11.668 s … 12.197 s    10 runs
 
Benchmark 3: biome
  Time (mean ± σ):      1.299 s ±  0.105 s    [User: 4.246 s, System: 0.484 s]
  Range (min … max):    1.240 s …  1.522 s    10 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):     403.8 ms ±   6.4 ms    [User: 855.2 ms, System: 314.4 ms]
  Range (min … max):   395.9 ms … 415.1 ms    10 runs
 
Summary
  oxfmt ran
    3.22 ± 0.27 times faster than biome
   29.51 ± 0.60 times faster than prettier+oxc-parser
   35.17 ± 0.68 times faster than prettier

Memory Usage:
  prettier: 410.9 MB (min: 384.6 MB, max: 440.4 MB)
  prettier+oxc-parser: 327.3 MB (min: 315.3 MB, max: 339.1 MB)
  biome: 70.7 MB (min: 67.0 MB, max: 72.8 MB)
  oxfmt: 139.1 MB (min: 126.8 MB, max: 147.2 MB)

JS/TS (no embedded) benchmark complete!


=========================================
Benchmarking Mixed (embedded)
=========================================

Target: Storybook repository (mixed with embedded languages)
- 1 warmup runs, 3 benchmark runs
- Git reset before each run

Benchmark 1: prettier+oxc-parser
  Time (mean ± σ):     41.282 s ±  0.241 s    [User: 50.997 s, System: 3.928 s]
  Range (min … max):   41.132 s … 41.560 s    3 runs
 
Benchmark 2: oxfmt
  Time (mean ± σ):     12.922 s ±  0.193 s    [User: 46.407 s, System: 3.985 s]
  Range (min … max):   12.778 s … 13.142 s    3 runs
 
Summary
  oxfmt ran
    3.19 ± 0.05 times faster than prettier+oxc-parser

Memory Usage:
  prettier+oxc-parser: 1146.1 MB (min: 1138.8 MB, max: 1158.3 MB)
  oxfmt: 589.2 MB (min: 556.3 MB, max: 633.6 MB)

Mixed (embedded) benchmark complete!


=========================================
Benchmarking Full features
=========================================

Target: Continue repository (full features)
- 1 warmup runs, 3 benchmark runs
- Git reset before each run

Benchmark 1: prettier+oxc-parser
  Time (mean ± σ):     60.406 s ±  0.116 s    [User: 63.832 s, System: 11.493 s]
  Range (min … max):   60.306 s … 60.533 s    3 runs
 
Benchmark 2: oxfmt
  Time (mean ± σ):      6.408 s ±  0.147 s    [User: 22.594 s, System: 1.848 s]
  Range (min … max):    6.239 s …  6.513 s    3 runs
 
Summary
  oxfmt ran
    9.43 ± 0.22 times faster than prettier+oxc-parser

Memory Usage:
  prettier+oxc-parser: 682.8 MB (min: 644.6 MB, max: 752.0 MB)
  oxfmt: 311.6 MB (min: 290.2 MB, max: 340.5 MB)

Full features benchmark complete!

=========================================
All benchmarks complete!
=========================================
```
<!-- BENCHMARK_RESULTS_END -->
