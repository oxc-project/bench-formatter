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
  Time (mean ± σ):     910.9 ms ±  22.3 ms    [User: 1909.5 ms, System: 137.3 ms]
  Range (min … max):   876.3 ms … 933.9 ms    5 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):     656.8 ms ±   2.9 ms    [User: 1115.1 ms, System: 88.7 ms]
  Range (min … max):   652.8 ms … 659.7 ms    5 runs
 
Benchmark 3: biome
  Time (mean ± σ):     163.5 ms ±   2.4 ms    [User: 137.7 ms, System: 25.4 ms]
  Range (min … max):   160.5 ms … 166.8 ms    5 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):     155.8 ms ±   7.6 ms    [User: 192.6 ms, System: 65.4 ms]
  Range (min … max):   147.2 ms … 164.0 ms    5 runs
 
Summary
  oxfmt ran
    1.05 ± 0.05 times faster than biome
    4.22 ± 0.21 times faster than prettier+oxc-parser
    5.85 ± 0.32 times faster than prettier

Memory Usage:
  prettier: 233.3 MB (min: 223.3 MB, max: 253.9 MB)
  prettier+oxc-parser: 169.8 MB (min: 168.0 MB, max: 171.2 MB)
  biome: 67.9 MB (min: 67.0 MB, max: 69.3 MB)
  oxfmt: 107.2 MB (min: 107.1 MB, max: 107.4 MB)

Large single file benchmark complete!


=========================================
Benchmarking JS/TS (no embedded)
=========================================

Target: Outline repository (js/ts/tsx only)
- 3 warmup runs, 10 benchmark runs
- Git reset before each run

Benchmark 1: prettier
  Time (mean ± σ):     14.095 s ±  0.183 s    [User: 24.087 s, System: 1.451 s]
  Range (min … max):   13.831 s … 14.328 s    10 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):     11.657 s ±  0.186 s    [User: 15.619 s, System: 0.868 s]
  Range (min … max):   11.382 s … 11.906 s    10 runs
 
Benchmark 3: biome
  Time (mean ± σ):      1.228 s ±  0.107 s    [User: 4.190 s, System: 0.313 s]
  Range (min … max):    1.175 s …  1.521 s    10 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):     347.0 ms ±   5.9 ms    [User: 794.1 ms, System: 212.1 ms]
  Range (min … max):   341.7 ms … 362.6 ms    10 runs
 
Summary
  oxfmt ran
    3.54 ± 0.31 times faster than biome
   33.59 ± 0.79 times faster than prettier+oxc-parser
   40.62 ± 0.87 times faster than prettier

Memory Usage:
  prettier: 408.3 MB (min: 382.6 MB, max: 438.5 MB)
  prettier+oxc-parser: 325.5 MB (min: 316.5 MB, max: 342.5 MB)
  biome: 72.1 MB (min: 69.9 MB, max: 74.1 MB)
  oxfmt: 137.1 MB (min: 132.3 MB, max: 144.2 MB)

JS/TS (no embedded) benchmark complete!


=========================================
Benchmarking Mixed (embedded)
=========================================

Target: Storybook repository (mixed with embedded languages)
- 1 warmup runs, 3 benchmark runs
- Git reset before each run

Benchmark 1: prettier+oxc-parser
  Time (mean ± σ):     40.425 s ±  0.070 s    [User: 50.402 s, System: 3.226 s]
  Range (min … max):   40.382 s … 40.505 s    3 runs
 
Benchmark 2: oxfmt
  Time (mean ± σ):     11.987 s ±  0.117 s    [User: 44.156 s, System: 3.039 s]
  Range (min … max):   11.918 s … 12.122 s    3 runs
 
Summary
  oxfmt ran
    3.37 ± 0.03 times faster than prettier+oxc-parser

Memory Usage:
  prettier+oxc-parser: 1139.5 MB (min: 1137.3 MB, max: 1141.5 MB)
  oxfmt: 574.1 MB (min: 568.8 MB, max: 577.5 MB)

Mixed (embedded) benchmark complete!


=========================================
Benchmarking Full features
=========================================

Target: Continue repository (full features)
- 1 warmup runs, 3 benchmark runs
- Git reset before each run

Benchmark 1: prettier+oxc-parser
  Time (mean ± σ):     54.047 s ±  0.085 s    [User: 57.642 s, System: 8.466 s]
  Range (min … max):   53.983 s … 54.144 s    3 runs
 
Benchmark 2: oxfmt
  Time (mean ± σ):      5.817 s ±  0.114 s    [User: 21.194 s, System: 1.348 s]
  Range (min … max):    5.733 s …  5.946 s    3 runs
 
Summary
  oxfmt ran
    9.29 ± 0.18 times faster than prettier+oxc-parser

Memory Usage:
  prettier+oxc-parser: 647.2 MB (min: 643.5 MB, max: 650.7 MB)
  oxfmt: 314.0 MB (min: 299.2 MB, max: 321.7 MB)

Full features benchmark complete!

=========================================
All benchmarks complete!
=========================================
```
<!-- BENCHMARK_RESULTS_END -->
