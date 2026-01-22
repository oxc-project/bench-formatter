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

Benchmark 1: prettier
  Time (mean ± σ):     349.3 ms ±   3.0 ms    [User: 810.5 ms, System: 32.8 ms]
  Range (min … max):   346.3 ms … 353.9 ms    5 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):     278.4 ms ±   1.5 ms    [User: 484.4 ms, System: 22.7 ms]
  Range (min … max):   276.2 ms … 280.2 ms    5 runs
 
Benchmark 3: biome
  Time (mean ± σ):      72.1 ms ±   0.7 ms    [User: 60.0 ms, System: 8.8 ms]
  Range (min … max):    71.3 ms …  72.9 ms    5 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):      66.4 ms ±   1.2 ms    [User: 196.9 ms, System: 31.5 ms]
  Range (min … max):    65.2 ms …  68.1 ms    5 runs
 
Summary
  oxfmt ran
    1.08 ± 0.02 times faster than biome
    4.19 ± 0.08 times faster than prettier+oxc-parser
    5.26 ± 0.11 times faster than prettier

Memory Usage:
  prettier: 236.7 MB (min: 225.4 MB, max: 254.2 MB)
  prettier+oxc-parser: 160.7 MB (min: 158.1 MB, max: 162.5 MB)
  biome: 44.6 MB (min: 44.4 MB, max: 44.6 MB)
  oxfmt: 154.3 MB (min: 153.7 MB, max: 155.4 MB)

Large single file benchmark complete!


=========================================
Benchmarking JS/TS (no embedded)
=========================================

Target: Outline repository (js/ts/tsx only)
- 3 warmup runs, 10 benchmark runs
- Git reset before each run

Benchmark 1: prettier
  Time (mean ± σ):      5.078 s ±  0.093 s    [User: 9.525 s, System: 0.454 s]
  Range (min … max):    4.951 s …  5.281 s    10 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):      3.985 s ±  0.043 s    [User: 5.676 s, System: 0.397 s]
  Range (min … max):    3.923 s …  4.042 s    10 runs
 
Benchmark 3: biome
  Time (mean ± σ):     243.5 ms ±   2.1 ms    [User: 1130.6 ms, System: 344.1 ms]
  Range (min … max):   241.1 ms … 248.2 ms    10 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):     144.1 ms ±   2.9 ms    [User: 436.7 ms, System: 300.8 ms]
  Range (min … max):   141.0 ms … 149.3 ms    10 runs
 
Summary
  oxfmt ran
    1.69 ± 0.04 times faster than biome
   27.65 ± 0.63 times faster than prettier+oxc-parser
   35.23 ± 0.96 times faster than prettier

Memory Usage:
  prettier: 414.2 MB (min: 359.5 MB, max: 445.4 MB)
  prettier+oxc-parser: 326.8 MB (min: 317.1 MB, max: 341.2 MB)
  biome: 62.2 MB (min: 60.4 MB, max: 63.4 MB)
  oxfmt: 196.7 MB (min: 192.3 MB, max: 203.1 MB)

JS/TS (no embedded) benchmark complete!

=========================================
All benchmarks complete!
=========================================
```
<!-- BENCHMARK_RESULTS_END -->
