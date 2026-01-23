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
  Time (mean ± σ):      1.011 s ±  0.019 s    [User: 1.980 s, System: 0.189 s]
  Range (min … max):    0.987 s …  1.029 s    5 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):     697.3 ms ±   9.4 ms    [User: 1122.2 ms, System: 98.3 ms]
  Range (min … max):   687.8 ms … 713.0 ms    5 runs
 
Benchmark 3: biome
  Time (mean ± σ):     134.0 ms ±   1.2 ms    [User: 102.7 ms, System: 30.0 ms]
  Range (min … max):   132.6 ms … 135.7 ms    5 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):     120.4 ms ±   1.4 ms    [User: 245.5 ms, System: 63.1 ms]
  Range (min … max):   118.2 ms … 121.8 ms    5 runs
 
Summary
  oxfmt ran
    1.11 ± 0.02 times faster than biome
    5.79 ± 0.10 times faster than prettier+oxc-parser
    8.40 ± 0.19 times faster than prettier

Memory Usage:
  prettier: 227.4 MB (min: 214.5 MB, max: 247.1 MB)
  prettier+oxc-parser: 172.9 MB (min: 168.7 MB, max: 179.0 MB)
  biome: 61.8 MB (min: 61.5 MB, max: 62.3 MB)
  oxfmt: 161.6 MB (min: 161.4 MB, max: 161.8 MB)

Large single file benchmark complete!


=========================================
Benchmarking JS/TS (no embedded)
=========================================

Target: Outline repository (js/ts/tsx only)
- 3 warmup runs, 10 benchmark runs
- Git reset before each run

Benchmark 1: prettier
  Time (mean ± σ):     12.937 s ±  0.066 s    [User: 21.944 s, System: 1.684 s]
  Range (min … max):   12.880 s … 13.073 s    10 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):     10.462 s ±  0.086 s    [User: 13.700 s, System: 1.029 s]
  Range (min … max):   10.338 s … 10.612 s    10 runs
 
Benchmark 3: biome
  Time (mean ± σ):     906.3 ms ±  84.0 ms    [User: 2803.4 ms, System: 409.6 ms]
  Range (min … max):   863.4 ms … 1094.2 ms    10 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):     326.0 ms ±   3.4 ms    [User: 816.8 ms, System: 289.5 ms]
  Range (min … max):   321.0 ms … 333.9 ms    10 runs
 
Summary
  oxfmt ran
    2.78 ± 0.26 times faster than biome
   32.09 ± 0.42 times faster than prettier+oxc-parser
   39.69 ± 0.46 times faster than prettier

Memory Usage:
  prettier: 391.1 MB (min: 366.1 MB, max: 433.2 MB)
  prettier+oxc-parser: 316.2 MB (min: 308.9 MB, max: 321.8 MB)
  biome: 62.8 MB (min: 61.0 MB, max: 64.3 MB)
  oxfmt: 189.6 MB (min: 181.0 MB, max: 195.9 MB)

JS/TS (no embedded) benchmark complete!

=========================================
All benchmarks complete!
=========================================
```
<!-- BENCHMARK_RESULTS_END -->
