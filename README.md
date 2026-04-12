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
- **Biome**: 2.4.11
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
  Time (mean ± σ):      1.070 s ±  0.065 s    [User: 2.021 s, System: 0.218 s]
  Range (min … max):    0.998 s …  1.130 s    5 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):     709.2 ms ±  12.9 ms    [User: 1141.4 ms, System: 111.1 ms]
  Range (min … max):   689.2 ms … 722.4 ms    5 runs
 
Benchmark 3: biome
  Time (mean ± σ):     178.5 ms ±   3.0 ms    [User: 150.5 ms, System: 28.6 ms]
  Range (min … max):   176.1 ms … 183.8 ms    5 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):     169.7 ms ±   6.6 ms    [User: 200.3 ms, System: 85.5 ms]
  Range (min … max):   158.2 ms … 174.5 ms    5 runs
 
Summary
  oxfmt ran
    1.05 ± 0.04 times faster than biome
    4.18 ± 0.18 times faster than prettier+oxc-parser
    6.30 ± 0.46 times faster than prettier

Memory Usage:
  prettier: 232.0 MB (min: 210.1 MB, max: 246.4 MB)
  prettier+oxc-parser: 171.9 MB (min: 170.8 MB, max: 173.3 MB)
  biome: 69.0 MB (min: 68.2 MB, max: 71.9 MB)
  oxfmt: 109.6 MB (min: 109.4 MB, max: 109.7 MB)

Large single file benchmark complete!


=========================================
Benchmarking JS/TS (no embedded)
=========================================

Target: Outline repository (js/ts/tsx only)
- 3 warmup runs, 10 benchmark runs
- Git reset before each run

Benchmark 1: prettier
  Time (mean ± σ):     15.135 s ±  0.243 s    [User: 25.435 s, System: 1.937 s]
  Range (min … max):   14.638 s … 15.368 s    10 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):     12.734 s ±  0.294 s    [User: 16.697 s, System: 1.197 s]
  Range (min … max):   12.255 s … 13.124 s    10 runs
 
Benchmark 3: biome
  Time (mean ± σ):      1.247 s ±  0.104 s    [User: 4.201 s, System: 0.374 s]
  Range (min … max):    1.204 s …  1.542 s    10 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):     398.2 ms ±   6.6 ms    [User: 833.5 ms, System: 317.8 ms]
  Range (min … max):   392.2 ms … 411.8 ms    10 runs
 
Summary
  oxfmt ran
    3.13 ± 0.27 times faster than biome
   31.98 ± 0.91 times faster than prettier+oxc-parser
   38.01 ± 0.88 times faster than prettier

Memory Usage:
  prettier: 401.3 MB (min: 374.7 MB, max: 443.3 MB)
  prettier+oxc-parser: 324.0 MB (min: 315.0 MB, max: 335.7 MB)
  biome: 73.1 MB (min: 69.3 MB, max: 78.2 MB)
  oxfmt: 140.3 MB (min: 133.7 MB, max: 150.5 MB)

JS/TS (no embedded) benchmark complete!


=========================================
Benchmarking Mixed (embedded)
=========================================

Target: Storybook repository (mixed with embedded languages)
- 1 warmup runs, 3 benchmark runs
- Git reset before each run

Benchmark 1: prettier+oxc-parser
  Time (mean ± σ):     43.320 s ±  0.153 s    [User: 53.544 s, System: 4.246 s]
  Range (min … max):   43.189 s … 43.489 s    3 runs
 
Benchmark 2: oxfmt
  Time (mean ± σ):     12.884 s ±  0.111 s    [User: 45.963 s, System: 4.209 s]
  Range (min … max):   12.756 s … 12.955 s    3 runs
 
Summary
  oxfmt ran
    3.36 ± 0.03 times faster than prettier+oxc-parser

Memory Usage:
  prettier+oxc-parser: 1140.2 MB (min: 1138.2 MB, max: 1143.5 MB)
  oxfmt: 505.0 MB (min: 442.2 MB, max: 554.8 MB)

Mixed (embedded) benchmark complete!


=========================================
Benchmarking Full features
=========================================

Target: Continue repository (full features)
- 1 warmup runs, 3 benchmark runs
- Git reset before each run

Benchmark 1: prettier+oxc-parser
  Time (mean ± σ):     56.772 s ±  0.384 s    [User: 60.727 s, System: 11.211 s]
  Range (min … max):   56.358 s … 57.117 s    3 runs
 
Benchmark 2: oxfmt
  Time (mean ± σ):      6.374 s ±  0.110 s    [User: 22.088 s, System: 1.910 s]
  Range (min … max):    6.262 s …  6.483 s    3 runs
 
Summary
  oxfmt ran
    8.91 ± 0.17 times faster than prettier+oxc-parser

Memory Usage:
  prettier+oxc-parser: 646.3 MB (min: 640.6 MB, max: 654.0 MB)
  oxfmt: 336.2 MB (min: 334.1 MB, max: 338.6 MB)

Full features benchmark complete!

=========================================
All benchmarks complete!
=========================================
```
<!-- BENCHMARK_RESULTS_END -->
