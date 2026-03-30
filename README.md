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
- **Biome**: 2.4.9
- **Oxfmt**: 0.42.0

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
  Time (mean ± σ):      1.038 s ±  0.081 s    [User: 1.944 s, System: 0.201 s]
  Range (min … max):    0.942 s …  1.108 s    5 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):     681.5 ms ±   7.4 ms    [User: 1103.0 ms, System: 102.1 ms]
  Range (min … max):   672.9 ms … 692.6 ms    5 runs
 
Benchmark 3: biome
  Time (mean ± σ):     166.8 ms ±   1.7 ms    [User: 139.7 ms, System: 28.3 ms]
  Range (min … max):   165.2 ms … 169.1 ms    5 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):     158.6 ms ±   5.9 ms    [User: 179.5 ms, System: 76.8 ms]
  Range (min … max):   148.8 ms … 163.0 ms    5 runs
 
Summary
  oxfmt ran
    1.05 ± 0.04 times faster than biome
    4.30 ± 0.17 times faster than prettier+oxc-parser
    6.54 ± 0.56 times faster than prettier

Memory Usage:
  prettier: 231.2 MB (min: 213.5 MB, max: 256.9 MB)
  prettier+oxc-parser: 171.0 MB (min: 169.0 MB, max: 172.4 MB)
  biome: 68.8 MB (min: 67.8 MB, max: 70.1 MB)
  oxfmt: 108.4 MB (min: 108.3 MB, max: 108.5 MB)

Large single file benchmark complete!


=========================================
Benchmarking JS/TS (no embedded)
=========================================

Target: Outline repository (js/ts/tsx only)
- 3 warmup runs, 10 benchmark runs
- Git reset before each run

Benchmark 1: prettier
  Time (mean ± σ):     13.698 s ±  0.059 s    [User: 23.251 s, System: 1.798 s]
  Range (min … max):   13.604 s … 13.811 s    10 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):     11.614 s ±  0.122 s    [User: 15.397 s, System: 1.134 s]
  Range (min … max):   11.367 s … 11.753 s    10 runs
 
Benchmark 3: biome
  Time (mean ± σ):      1.249 s ±  0.107 s    [User: 4.048 s, System: 0.459 s]
  Range (min … max):    1.195 s …  1.487 s    10 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):     379.5 ms ±   2.0 ms    [User: 792.5 ms, System: 311.2 ms]
  Range (min … max):   377.0 ms … 382.2 ms    10 runs
 
Summary
  oxfmt ran
    3.29 ± 0.28 times faster than biome
   30.60 ± 0.36 times faster than prettier+oxc-parser
   36.10 ± 0.24 times faster than prettier

Memory Usage:
  prettier: 402.4 MB (min: 366.1 MB, max: 502.5 MB)
  prettier+oxc-parser: 327.3 MB (min: 319.6 MB, max: 333.6 MB)
  biome: 70.3 MB (min: 68.5 MB, max: 74.4 MB)
  oxfmt: 139.4 MB (min: 132.0 MB, max: 144.8 MB)

JS/TS (no embedded) benchmark complete!


=========================================
Benchmarking Mixed (embedded)
=========================================

Target: Storybook repository (mixed with embedded languages)
- 1 warmup runs, 3 benchmark runs
- Git reset before each run

Benchmark 1: prettier+oxc-parser
  Time (mean ± σ):     39.963 s ±  0.065 s    [User: 49.370 s, System: 4.087 s]
  Range (min … max):   39.890 s … 40.014 s    3 runs
 
Benchmark 2: oxfmt
  Time (mean ± σ):     12.290 s ±  0.112 s    [User: 43.814 s, System: 4.034 s]
  Range (min … max):   12.181 s … 12.405 s    3 runs
 
Summary
  oxfmt ran
    3.25 ± 0.03 times faster than prettier+oxc-parser

Memory Usage:
  prettier+oxc-parser: 1148.6 MB (min: 1143.7 MB, max: 1153.2 MB)
  oxfmt: 537.8 MB (min: 495.9 MB, max: 588.8 MB)

Mixed (embedded) benchmark complete!


=========================================
Benchmarking Full features
=========================================

Target: Continue repository (full features)
- 1 warmup runs, 3 benchmark runs
- Git reset before each run

Benchmark 1: prettier+oxc-parser
  Time (mean ± σ):     53.453 s ±  0.319 s    [User: 56.742 s, System: 11.090 s]
  Range (min … max):   53.110 s … 53.741 s    3 runs
 
Benchmark 2: oxfmt
  Time (mean ± σ):      5.819 s ±  0.043 s    [User: 20.463 s, System: 1.837 s]
  Range (min … max):    5.770 s …  5.850 s    3 runs
 
Summary
  oxfmt ran
    9.19 ± 0.09 times faster than prettier+oxc-parser

Memory Usage:
  prettier+oxc-parser: 637.1 MB (min: 626.4 MB, max: 644.3 MB)
  oxfmt: 338.2 MB (min: 320.7 MB, max: 347.2 MB)

Full features benchmark complete!

=========================================
All benchmarks complete!
=========================================
```
<!-- BENCHMARK_RESULTS_END -->
