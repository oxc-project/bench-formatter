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
- **Oxfmt**: 0.41.0

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
  Time (mean ± σ):      1.025 s ±  0.032 s    [User: 1.985 s, System: 0.190 s]
  Range (min … max):    0.988 s …  1.076 s    5 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):     715.1 ms ±   7.1 ms    [User: 1149.0 ms, System: 100.0 ms]
  Range (min … max):   707.3 ms … 726.3 ms    5 runs
 
Benchmark 3: biome
  Time (mean ± σ):     165.6 ms ±   1.5 ms    [User: 142.2 ms, System: 24.4 ms]
  Range (min … max):   163.0 ms … 167.2 ms    5 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):     161.0 ms ±   6.2 ms    [User: 186.6 ms, System: 81.5 ms]
  Range (min … max):   155.1 ms … 171.4 ms    5 runs
 
Summary
  oxfmt ran
    1.03 ± 0.04 times faster than biome
    4.44 ± 0.18 times faster than prettier+oxc-parser
    6.37 ± 0.32 times faster than prettier

Memory Usage:
  prettier: 236.6 MB (min: 217.9 MB, max: 248.6 MB)
  prettier+oxc-parser: 168.8 MB (min: 168.4 MB, max: 169.5 MB)
  biome: 68.2 MB (min: 67.1 MB, max: 70.2 MB)
  oxfmt: 107.2 MB (min: 107.0 MB, max: 107.2 MB)

Large single file benchmark complete!


=========================================
Benchmarking JS/TS (no embedded)
=========================================

Target: Outline repository (js/ts/tsx only)
- 3 warmup runs, 10 benchmark runs
- Git reset before each run

Benchmark 1: prettier
  Time (mean ± σ):     14.221 s ±  0.083 s    [User: 24.180 s, System: 1.752 s]
  Range (min … max):   14.108 s … 14.403 s    10 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):     11.953 s ±  0.179 s    [User: 15.859 s, System: 1.039 s]
  Range (min … max):   11.696 s … 12.227 s    10 runs
 
Benchmark 3: biome
  Time (mean ± σ):      1.274 s ±  0.062 s    [User: 4.268 s, System: 0.476 s]
  Range (min … max):    1.247 s …  1.450 s    10 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):     402.7 ms ±   8.4 ms    [User: 860.0 ms, System: 304.7 ms]
  Range (min … max):   394.1 ms … 422.0 ms    10 runs
 
Summary
  oxfmt ran
    3.16 ± 0.17 times faster than biome
   29.68 ± 0.76 times faster than prettier+oxc-parser
   35.31 ± 0.76 times faster than prettier

Memory Usage:
  prettier: 422.1 MB (min: 388.5 MB, max: 489.5 MB)
  prettier+oxc-parser: 324.6 MB (min: 320.4 MB, max: 329.6 MB)
  biome: 69.7 MB (min: 67.2 MB, max: 73.3 MB)
  oxfmt: 139.7 MB (min: 134.7 MB, max: 147.9 MB)

JS/TS (no embedded) benchmark complete!


=========================================
Benchmarking Mixed (embedded)
=========================================

Target: Storybook repository (mixed with embedded languages)
- 1 warmup runs, 3 benchmark runs
- Git reset before each run

Benchmark 1: prettier+oxc-parser
  Time (mean ± σ):     40.931 s ±  0.191 s    [User: 50.783 s, System: 3.777 s]
  Range (min … max):   40.744 s … 41.126 s    3 runs
 
Benchmark 2: oxfmt
  Time (mean ± σ):     12.859 s ±  0.076 s    [User: 46.191 s, System: 3.955 s]
  Range (min … max):   12.780 s … 12.931 s    3 runs
 
Summary
  oxfmt ran
    3.18 ± 0.02 times faster than prettier+oxc-parser

Memory Usage:
  prettier+oxc-parser: 1143.4 MB (min: 1140.0 MB, max: 1146.5 MB)
  oxfmt: 537.0 MB (min: 520.9 MB, max: 553.9 MB)

Mixed (embedded) benchmark complete!


=========================================
Benchmarking Full features
=========================================

Target: Continue repository (full features)
- 1 warmup runs, 3 benchmark runs
- Git reset before each run

Benchmark 1: prettier+oxc-parser
  Time (mean ± σ):     58.874 s ±  0.146 s    [User: 62.078 s, System: 10.889 s]
  Range (min … max):   58.706 s … 58.972 s    3 runs
 
Benchmark 2: oxfmt
  Time (mean ± σ):      6.303 s ±  0.074 s    [User: 22.838 s, System: 1.733 s]
  Range (min … max):    6.223 s …  6.368 s    3 runs
 
Summary
  oxfmt ran
    9.34 ± 0.11 times faster than prettier+oxc-parser

Memory Usage:
  prettier+oxc-parser: 657.3 MB (min: 650.8 MB, max: 662.8 MB)
  oxfmt: 337.5 MB (min: 325.8 MB, max: 345.7 MB)

Full features benchmark complete!

=========================================
All benchmarks complete!
=========================================
```
<!-- BENCHMARK_RESULTS_END -->
