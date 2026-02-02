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
- **Biome**: 2.3.13
- **Oxfmt**: 0.28.0

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
  Time (mean ± σ):      1.043 s ±  0.037 s    [User: 2.003 s, System: 0.188 s]
  Range (min … max):    1.006 s …  1.097 s    5 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):     710.1 ms ±  18.0 ms    [User: 1137.2 ms, System: 102.4 ms]
  Range (min … max):   693.5 ms … 739.7 ms    5 runs
 
Benchmark 3: biome
  Time (mean ± σ):     136.5 ms ±   0.5 ms    [User: 107.1 ms, System: 27.1 ms]
  Range (min … max):   135.8 ms … 137.2 ms    5 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):     104.7 ms ±   3.0 ms    [User: 197.2 ms, System: 54.8 ms]
  Range (min … max):   101.6 ms … 107.9 ms    5 runs
 
Summary
  oxfmt ran
    1.30 ± 0.04 times faster than biome
    6.79 ± 0.26 times faster than prettier+oxc-parser
    9.97 ± 0.46 times faster than prettier

Memory Usage:
  prettier: 223.9 MB (min: 207.9 MB, max: 259.7 MB)
  prettier+oxc-parser: 176.2 MB (min: 169.9 MB, max: 181.3 MB)
  biome: 62.2 MB (min: 61.9 MB, max: 62.3 MB)
  oxfmt: 152.9 MB (min: 151.5 MB, max: 154.9 MB)

Large single file benchmark complete!


=========================================
Benchmarking JS/TS (no embedded)
=========================================

Target: Outline repository (js/ts/tsx only)
- 3 warmup runs, 10 benchmark runs
- Git reset before each run

Benchmark 1: prettier
  Time (mean ± σ):     13.629 s ±  0.239 s    [User: 23.072 s, System: 1.808 s]
  Range (min … max):   13.280 s … 14.043 s    10 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):     11.162 s ±  0.140 s    [User: 14.673 s, System: 1.018 s]
  Range (min … max):   10.997 s … 11.436 s    10 runs
 
Benchmark 3: biome
  Time (mean ± σ):     888.7 ms ±   6.6 ms    [User: 2904.7 ms, System: 404.8 ms]
  Range (min … max):   879.4 ms … 900.3 ms    10 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):     334.0 ms ±   2.8 ms    [User: 844.3 ms, System: 281.2 ms]
  Range (min … max):   330.0 ms … 338.7 ms    10 runs
 
Summary
  oxfmt ran
    2.66 ± 0.03 times faster than biome
   33.42 ± 0.50 times faster than prettier+oxc-parser
   40.80 ± 0.79 times faster than prettier

Memory Usage:
  prettier: 405.4 MB (min: 375.7 MB, max: 431.0 MB)
  prettier+oxc-parser: 313.8 MB (min: 306.7 MB, max: 320.2 MB)
  biome: 63.0 MB (min: 60.1 MB, max: 67.2 MB)
  oxfmt: 185.5 MB (min: 177.9 MB, max: 191.2 MB)

JS/TS (no embedded) benchmark complete!


=========================================
Benchmarking Mixed (embedded)
=========================================

Target: Storybook repository (mixed with embedded languages)
- 1 warmup runs, 3 benchmark runs
- Git reset before each run

Benchmark 1: prettier+oxc-parser
  Time (mean ± σ):     40.174 s ±  0.197 s    [User: 49.694 s, System: 3.779 s]
  Range (min … max):   40.007 s … 40.391 s    3 runs
 
Benchmark 2: oxfmt
  Time (mean ± σ):     16.627 s ±  0.165 s    [User: 24.671 s, System: 2.176 s]
  Range (min … max):   16.505 s … 16.815 s    3 runs
 
Summary
  oxfmt ran
    2.42 ± 0.03 times faster than prettier+oxc-parser

Memory Usage:
  prettier+oxc-parser: 1150.3 MB (min: 1148.4 MB, max: 1151.7 MB)
  oxfmt: 894.4 MB (min: 741.6 MB, max: 1101.2 MB)

Mixed (embedded) benchmark complete!


=========================================
Benchmarking Full features
=========================================

Target: Continue repository (full features)
- 1 warmup runs, 3 benchmark runs
- Git reset before each run

Benchmark 1: prettier+oxc-parser
  Time (mean ± σ):     56.847 s ±  0.538 s    [User: 60.933 s, System: 10.386 s]
  Range (min … max):   56.240 s … 57.267 s    3 runs
 
Benchmark 2: oxfmt
  Time (mean ± σ):      9.235 s ±  0.664 s    [User: 15.360 s, System: 1.835 s]
  Range (min … max):    8.627 s …  9.944 s    3 runs
 
Summary
  oxfmt ran
    6.16 ± 0.45 times faster than prettier+oxc-parser

Memory Usage:
  prettier+oxc-parser: 669.6 MB (min: 657.6 MB, max: 677.7 MB)
  oxfmt: 883.7 MB (min: 796.9 MB, max: 948.4 MB)

Full features benchmark complete!

=========================================
All benchmarks complete!
=========================================
```
<!-- BENCHMARK_RESULTS_END -->
