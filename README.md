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
  Time (mean ± σ):      1.029 s ±  0.057 s    [User: 2.043 s, System: 0.158 s]
  Range (min … max):    0.937 s …  1.094 s    5 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):     669.3 ms ±   6.1 ms    [User: 1134.0 ms, System: 86.6 ms]
  Range (min … max):   664.3 ms … 676.5 ms    5 runs
 
Benchmark 3: biome
  Time (mean ± σ):     137.9 ms ±   2.6 ms    [User: 110.4 ms, System: 25.8 ms]
  Range (min … max):   135.2 ms … 141.2 ms    5 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):     122.9 ms ±   2.2 ms    [User: 263.9 ms, System: 56.0 ms]
  Range (min … max):   119.3 ms … 124.8 ms    5 runs
 
Summary
  oxfmt ran
    1.12 ± 0.03 times faster than biome
    5.45 ± 0.11 times faster than prettier+oxc-parser
    8.37 ± 0.49 times faster than prettier

Memory Usage:
  prettier: 221.4 MB (min: 212.3 MB, max: 227.4 MB)
  prettier+oxc-parser: 171.3 MB (min: 170.0 MB, max: 172.9 MB)
  biome: 61.7 MB (min: 61.2 MB, max: 62.3 MB)
  oxfmt: 159.6 MB (min: 159.5 MB, max: 159.7 MB)

Large single file benchmark complete!


=========================================
Benchmarking JS/TS (no embedded)
=========================================

Target: Outline repository (js/ts/tsx only)
- 3 warmup runs, 10 benchmark runs
- Git reset before each run

Benchmark 1: prettier
  Time (mean ± σ):     13.685 s ±  0.165 s    [User: 23.252 s, System: 1.423 s]
  Range (min … max):   13.492 s … 14.005 s    10 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):     10.925 s ±  0.099 s    [User: 14.431 s, System: 0.905 s]
  Range (min … max):   10.778 s … 11.077 s    10 runs
 
Benchmark 3: biome
  Time (mean ± σ):     878.8 ms ±  81.1 ms    [User: 2892.0 ms, System: 269.9 ms]
  Range (min … max):   844.4 ms … 1104.9 ms    10 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):     299.6 ms ±   7.1 ms    [User: 807.7 ms, System: 202.3 ms]
  Range (min … max):   292.1 ms … 312.0 ms    10 runs
 
Summary
  oxfmt ran
    2.93 ± 0.28 times faster than biome
   36.47 ± 0.92 times faster than prettier+oxc-parser
   45.68 ± 1.21 times faster than prettier

Memory Usage:
  prettier: 389.9 MB (min: 355.9 MB, max: 436.4 MB)
  prettier+oxc-parser: 318.7 MB (min: 308.9 MB, max: 324.3 MB)
  biome: 63.8 MB (min: 61.8 MB, max: 66.2 MB)
  oxfmt: 184.6 MB (min: 181.2 MB, max: 191.8 MB)

JS/TS (no embedded) benchmark complete!


=========================================
Benchmarking Mixed (embedded)
=========================================

Target: Storybook repository (mixed with embedded languages)
- 1 warmup runs, 3 benchmark runs
- Git reset before each run

Benchmark 1: prettier+oxc-parser
  Time (mean ± σ):     40.381 s ±  0.381 s    [User: 50.053 s, System: 3.299 s]
  Range (min … max):   40.097 s … 40.815 s    3 runs
 
Benchmark 2: oxfmt
  Time (mean ± σ):     11.911 s ±  0.100 s    [User: 43.565 s, System: 2.733 s]
  Range (min … max):   11.805 s … 12.004 s    3 runs
 
Summary
  oxfmt ran
    3.39 ± 0.04 times faster than prettier+oxc-parser

Memory Usage:
  prettier+oxc-parser: 1137.7 MB (min: 1133.5 MB, max: 1141.1 MB)
  oxfmt: 1694.5 MB (min: 1656.9 MB, max: 1723.4 MB)

Mixed (embedded) benchmark complete!

=========================================
All benchmarks complete!
=========================================
```
<!-- BENCHMARK_RESULTS_END -->
