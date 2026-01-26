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
pnpm run bench:large-single-file
pnpm run bench:js-no-embedded
```

## Notes

- Each formatter runs on the exact same codebase state (git reset between runs)
- Times include both parsing and formatting of all matched files
- Memory measurements track peak resident set size (RSS) during execution
- I intended to bench checker.ts, but it appears to be running for a very long time or stuck with 100% CPU.

## Benchmark Details

- **Test Data**:
  - [Outline](https://github.com/outline/outline) repository (1925 files, ~198K lines of JS/JSX/TS/TSX code)
  - TypeScript compiler's [parser.ts](https://github.com/microsoft/TypeScript/blob/v5.9.2/src/compiler/parser.ts) (~13.7K lines, single large file)
- **Methodology**:
  - 3 warmup runs before measurement
  - 10 benchmark runs for statistical accuracy
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
  Time (mean ± σ):      1.081 s ±  0.061 s    [User: 2.024 s, System: 0.205 s]
  Range (min … max):    1.000 s …  1.147 s    5 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):     697.6 ms ±   9.4 ms    [User: 1122.3 ms, System: 102.4 ms]
  Range (min … max):   682.3 ms … 705.8 ms    5 runs
 
Benchmark 3: biome
  Time (mean ± σ):     135.0 ms ±   3.0 ms    [User: 106.6 ms, System: 25.9 ms]
  Range (min … max):   131.8 ms … 138.6 ms    5 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):     120.9 ms ±   2.3 ms    [User: 246.6 ms, System: 62.7 ms]
  Range (min … max):   119.0 ms … 124.9 ms    5 runs
 
Summary
  oxfmt ran
    1.12 ± 0.03 times faster than biome
    5.77 ± 0.14 times faster than prettier+oxc-parser
    8.94 ± 0.54 times faster than prettier

Memory Usage:
  prettier: 231.0 MB (min: 207.0 MB, max: 248.1 MB)
  prettier+oxc-parser: 171.9 MB (min: 169.9 MB, max: 174.5 MB)
  biome: 62.4 MB (min: 61.2 MB, max: 64.1 MB)
  oxfmt: 159.6 MB (min: 159.5 MB, max: 159.7 MB)

Large single file benchmark complete!


=========================================
Benchmarking JS/TS (no embedded)
=========================================

Target: Outline repository (js/ts/tsx only)
- 3 warmup runs, 10 benchmark runs
- Git reset before each run

Benchmark 1: prettier
  Time (mean ± σ):     13.039 s ±  0.127 s    [User: 22.039 s, System: 1.724 s]
  Range (min … max):   12.846 s … 13.235 s    10 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):     10.512 s ±  0.105 s    [User: 13.773 s, System: 1.024 s]
  Range (min … max):   10.359 s … 10.679 s    10 runs
 
Benchmark 3: biome
  Time (mean ± σ):     874.5 ms ±   5.7 ms    [User: 2837.2 ms, System: 405.0 ms]
  Range (min … max):   865.9 ms … 886.8 ms    10 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):     326.1 ms ±   3.2 ms    [User: 813.8 ms, System: 284.5 ms]
  Range (min … max):   321.2 ms … 331.4 ms    10 runs
 
Summary
  oxfmt ran
    2.68 ± 0.03 times faster than biome
   32.23 ± 0.45 times faster than prettier+oxc-parser
   39.98 ± 0.55 times faster than prettier

Memory Usage:
  prettier: 391.3 MB (min: 364.4 MB, max: 433.6 MB)
  prettier+oxc-parser: 316.6 MB (min: 312.8 MB, max: 323.8 MB)
  biome: 64.5 MB (min: 61.8 MB, max: 66.9 MB)
  oxfmt: 186.2 MB (min: 181.6 MB, max: 194.2 MB)

JS/TS (no embedded) benchmark complete!

=========================================
All benchmarks complete!
=========================================
```
<!-- BENCHMARK_RESULTS_END -->
