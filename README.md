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
  Time (mean ± σ):      1.100 s ±  0.018 s    [User: 2.039 s, System: 0.193 s]
  Range (min … max):    1.070 s …  1.115 s    5 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):     690.0 ms ±   8.2 ms    [User: 1117.4 ms, System: 95.2 ms]
  Range (min … max):   676.6 ms … 697.9 ms    5 runs
 
Benchmark 3: biome
  Time (mean ± σ):     133.9 ms ±   1.6 ms    [User: 106.5 ms, System: 25.3 ms]
  Range (min … max):   131.7 ms … 135.4 ms    5 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):     123.1 ms ±   6.0 ms    [User: 242.3 ms, System: 67.2 ms]
  Range (min … max):   118.0 ms … 133.4 ms    5 runs
 
Summary
  oxfmt ran
    1.09 ± 0.05 times faster than biome
    5.60 ± 0.28 times faster than prettier+oxc-parser
    8.94 ± 0.46 times faster than prettier

Memory Usage:
  prettier: 230.9 MB (min: 220.9 MB, max: 250.2 MB)
  prettier+oxc-parser: 170.7 MB (min: 169.3 MB, max: 172.0 MB)
  biome: 62.1 MB (min: 61.6 MB, max: 63.4 MB)
  oxfmt: 159.5 MB (min: 159.3 MB, max: 159.7 MB)

Large single file benchmark complete!


=========================================
Benchmarking JS/TS (no embedded)
=========================================

Target: Outline repository (js/ts/tsx only)
- 3 warmup runs, 10 benchmark runs
- Git reset before each run

Benchmark 1: prettier
  Time (mean ± σ):     13.063 s ±  0.162 s    [User: 22.202 s, System: 1.721 s]
  Range (min … max):   12.796 s … 13.308 s    10 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):     10.428 s ±  0.070 s    [User: 13.703 s, System: 0.991 s]
  Range (min … max):   10.345 s … 10.586 s    10 runs
 
Benchmark 3: biome
  Time (mean ± σ):     905.7 ms ±  67.6 ms    [User: 2861.8 ms, System: 379.3 ms]
  Range (min … max):   867.4 ms … 1071.0 ms    10 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):     324.8 ms ±   5.1 ms    [User: 809.6 ms, System: 280.0 ms]
  Range (min … max):   318.0 ms … 334.3 ms    10 runs
 
Summary
  oxfmt ran
    2.79 ± 0.21 times faster than biome
   32.11 ± 0.55 times faster than prettier+oxc-parser
   40.22 ± 0.80 times faster than prettier

Memory Usage:
  prettier: 383.0 MB (min: 353.0 MB, max: 421.2 MB)
  prettier+oxc-parser: 321.0 MB (min: 310.2 MB, max: 348.2 MB)
  biome: 62.5 MB (min: 60.5 MB, max: 65.9 MB)
  oxfmt: 186.0 MB (min: 182.1 MB, max: 190.9 MB)

JS/TS (no embedded) benchmark complete!

=========================================
All benchmarks complete!
=========================================
```
<!-- BENCHMARK_RESULTS_END -->
