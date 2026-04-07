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
- **Oxfmt**: 0.44.0

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
  Time (mean ± σ):      1.087 s ±  0.080 s    [User: 2.026 s, System: 0.196 s]
  Range (min … max):    0.992 s …  1.183 s    5 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):     711.1 ms ±  14.1 ms    [User: 1148.1 ms, System: 95.6 ms]
  Range (min … max):   694.0 ms … 732.4 ms    5 runs
 
Benchmark 3: biome
  Time (mean ± σ):     166.5 ms ±   1.9 ms    [User: 141.8 ms, System: 25.7 ms]
  Range (min … max):   164.6 ms … 169.0 ms    5 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):     160.2 ms ±   4.2 ms    [User: 195.6 ms, System: 69.3 ms]
  Range (min … max):   155.8 ms … 165.2 ms    5 runs
 
Summary
  oxfmt ran
    1.04 ± 0.03 times faster than biome
    4.44 ± 0.15 times faster than prettier+oxc-parser
    6.79 ± 0.53 times faster than prettier

Memory Usage:
  prettier: 230.2 MB (min: 215.0 MB, max: 252.2 MB)
  prettier+oxc-parser: 172.6 MB (min: 171.0 MB, max: 174.8 MB)
  biome: 68.1 MB (min: 67.6 MB, max: 69.6 MB)
  oxfmt: 111.1 MB (min: 111.0 MB, max: 111.2 MB)

Large single file benchmark complete!


=========================================
Benchmarking JS/TS (no embedded)
=========================================

Target: Outline repository (js/ts/tsx only)
- 3 warmup runs, 10 benchmark runs
- Git reset before each run

Benchmark 1: prettier
  Time (mean ± σ):     14.646 s ±  0.162 s    [User: 24.920 s, System: 1.379 s]
  Range (min … max):   14.400 s … 14.931 s    10 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):     12.253 s ±  0.141 s    [User: 16.521 s, System: 0.666 s]
  Range (min … max):   12.009 s … 12.405 s    10 runs
 
Benchmark 3: biome
  Time (mean ± σ):      1.331 s ±  0.101 s    [User: 4.367 s, System: 0.441 s]
  Range (min … max):    1.277 s …  1.523 s    10 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):     405.0 ms ±   4.3 ms    [User: 884.7 ms, System: 310.1 ms]
  Range (min … max):   400.8 ms … 413.3 ms    10 runs
 
Summary
  oxfmt ran
    3.29 ± 0.25 times faster than biome
   30.26 ± 0.47 times faster than prettier+oxc-parser
   36.17 ± 0.55 times faster than prettier

Memory Usage:
  prettier: 413.5 MB (min: 369.1 MB, max: 511.1 MB)
  prettier+oxc-parser: 322.7 MB (min: 313.8 MB, max: 334.4 MB)
  biome: 71.1 MB (min: 69.2 MB, max: 73.4 MB)
  oxfmt: 140.9 MB (min: 134.3 MB, max: 147.0 MB)

JS/TS (no embedded) benchmark complete!


=========================================
Benchmarking Mixed (embedded)
=========================================

Target: Storybook repository (mixed with embedded languages)
- 1 warmup runs, 3 benchmark runs
- Git reset before each run

Benchmark 1: prettier+oxc-parser
  Time (mean ± σ):     41.660 s ±  0.097 s    [User: 52.572 s, System: 2.557 s]
  Range (min … max):   41.550 s … 41.735 s    3 runs
 
Benchmark 2: oxfmt
  Time (mean ± σ):     13.160 s ±  0.139 s    [User: 46.548 s, System: 3.746 s]
  Range (min … max):   13.001 s … 13.245 s    3 runs
 
Summary
  oxfmt ran
    3.17 ± 0.03 times faster than prettier+oxc-parser

Memory Usage:
  prettier+oxc-parser: 1145.3 MB (min: 1141.8 MB, max: 1148.4 MB)
  oxfmt: 515.3 MB (min: 467.1 MB, max: 575.7 MB)

Mixed (embedded) benchmark complete!


=========================================
Benchmarking Full features
=========================================

Target: Continue repository (full features)
- 1 warmup runs, 3 benchmark runs
- Git reset before each run

Benchmark 1: prettier+oxc-parser
  Time (mean ± σ):     60.643 s ±  0.217 s    [User: 71.282 s, System: 3.185 s]
  Range (min … max):   60.450 s … 60.877 s    3 runs
 
Benchmark 2: oxfmt
  Time (mean ± σ):      6.243 s ±  0.069 s    [User: 22.238 s, System: 1.735 s]
  Range (min … max):    6.196 s …  6.323 s    3 runs
 
Summary
  oxfmt ran
    9.71 ± 0.11 times faster than prettier+oxc-parser

Memory Usage:
  prettier+oxc-parser: 653.6 MB (min: 636.6 MB, max: 663.1 MB)
  oxfmt: 344.2 MB (min: 333.7 MB, max: 357.1 MB)

Full features benchmark complete!

=========================================
All benchmarks complete!
=========================================
```
<!-- BENCHMARK_RESULTS_END -->
