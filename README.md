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
- **Oxfmt**: 0.26.0

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
  Time (mean ± σ):      1.066 s ±  0.070 s    [User: 1.994 s, System: 0.204 s]
  Range (min … max):    0.989 s …  1.131 s    5 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):     695.6 ms ±   9.6 ms    [User: 1114.1 ms, System: 103.8 ms]
  Range (min … max):   681.7 ms … 704.3 ms    5 runs
 
Benchmark 3: biome
  Time (mean ± σ):     134.9 ms ±   0.8 ms    [User: 105.4 ms, System: 27.2 ms]
  Range (min … max):   133.9 ms … 136.0 ms    5 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):     122.3 ms ±   1.0 ms    [User: 248.9 ms, System: 61.8 ms]
  Range (min … max):   121.1 ms … 123.9 ms    5 runs
 
Summary
  oxfmt ran
    1.10 ± 0.01 times faster than biome
    5.69 ± 0.09 times faster than prettier+oxc-parser
    8.71 ± 0.58 times faster than prettier

Memory Usage:
  prettier: 233.3 MB (min: 222.0 MB, max: 247.4 MB)
  prettier+oxc-parser: 170.9 MB (min: 169.0 MB, max: 173.6 MB)
  biome: 62.2 MB (min: 61.3 MB, max: 63.6 MB)
  oxfmt: 161.6 MB (min: 161.5 MB, max: 161.7 MB)

Large single file benchmark complete!


=========================================
Benchmarking JS/TS (no embedded)
=========================================

Target: Outline repository (js/ts/tsx only)
- 3 warmup runs, 10 benchmark runs
- Git reset before each run

Benchmark 1: prettier
  Time (mean ± σ):     13.191 s ±  0.148 s    [User: 22.399 s, System: 1.712 s]
  Range (min … max):   12.890 s … 13.429 s    10 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):     10.544 s ±  0.059 s    [User: 13.843 s, System: 1.032 s]
  Range (min … max):   10.458 s … 10.625 s    10 runs
 
Benchmark 3: biome
  Time (mean ± σ):     908.0 ms ±  74.8 ms    [User: 2820.1 ms, System: 407.0 ms]
  Range (min … max):   869.3 ms … 1106.2 ms    10 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):     329.1 ms ±   3.0 ms    [User: 822.8 ms, System: 286.6 ms]
  Range (min … max):   325.3 ms … 335.0 ms    10 runs
 
Summary
  oxfmt ran
    2.76 ± 0.23 times faster than biome
   32.04 ± 0.34 times faster than prettier+oxc-parser
   40.08 ± 0.58 times faster than prettier

Memory Usage:
  prettier: 399.2 MB (min: 368.9 MB, max: 442.2 MB)
  prettier+oxc-parser: 316.9 MB (min: 305.3 MB, max: 321.9 MB)
  biome: 63.7 MB (min: 60.8 MB, max: 66.8 MB)
  oxfmt: 187.7 MB (min: 178.9 MB, max: 198.3 MB)

JS/TS (no embedded) benchmark complete!

=========================================
All benchmarks complete!
=========================================
```
<!-- BENCHMARK_RESULTS_END -->
