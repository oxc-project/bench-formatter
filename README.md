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
- **Oxfmt**: 0.39.0

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
  Time (mean ± σ):      1.038 s ±  0.010 s    [User: 2.025 s, System: 0.202 s]
  Range (min … max):    1.027 s …  1.050 s    5 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):     727.5 ms ±   7.1 ms    [User: 1176.4 ms, System: 101.4 ms]
  Range (min … max):   719.8 ms … 737.1 ms    5 runs
 
Benchmark 3: biome
  Time (mean ± σ):     167.9 ms ±   0.9 ms    [User: 142.3 ms, System: 26.8 ms]
  Range (min … max):   167.1 ms … 169.2 ms    5 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):     160.3 ms ±   4.7 ms    [User: 189.2 ms, System: 78.1 ms]
  Range (min … max):   156.1 ms … 167.6 ms    5 runs
 
Summary
  oxfmt ran
    1.05 ± 0.03 times faster than biome
    4.54 ± 0.14 times faster than prettier+oxc-parser
    6.47 ± 0.20 times faster than prettier

Memory Usage:
  prettier: 236.7 MB (min: 216.1 MB, max: 253.0 MB)
  prettier+oxc-parser: 171.9 MB (min: 170.0 MB, max: 174.6 MB)
  biome: 68.0 MB (min: 67.0 MB, max: 69.4 MB)
  oxfmt: 107.2 MB (min: 107.2 MB, max: 107.3 MB)

Large single file benchmark complete!


=========================================
Benchmarking JS/TS (no embedded)
=========================================

Target: Outline repository (js/ts/tsx only)
- 3 warmup runs, 10 benchmark runs
- Git reset before each run

Benchmark 1: prettier
  Time (mean ± σ):     14.302 s ±  0.228 s    [User: 24.230 s, System: 1.786 s]
  Range (min … max):   13.827 s … 14.615 s    10 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):     12.336 s ±  0.237 s    [User: 16.336 s, System: 1.123 s]
  Range (min … max):   12.026 s … 12.869 s    10 runs
 
Benchmark 3: biome
  Time (mean ± σ):      1.271 s ±  0.004 s    [User: 4.319 s, System: 0.504 s]
  Range (min … max):    1.263 s …  1.276 s    10 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):     407.6 ms ±   6.0 ms    [User: 864.8 ms, System: 323.1 ms]
  Range (min … max):   402.2 ms … 419.0 ms    10 runs
 
Summary
  oxfmt ran
    3.12 ± 0.05 times faster than biome
   30.27 ± 0.73 times faster than prettier+oxc-parser
   35.09 ± 0.76 times faster than prettier

Memory Usage:
  prettier: 404.1 MB (min: 366.2 MB, max: 442.4 MB)
  prettier+oxc-parser: 328.9 MB (min: 314.7 MB, max: 340.8 MB)
  biome: 70.6 MB (min: 67.8 MB, max: 72.5 MB)
  oxfmt: 136.2 MB (min: 130.0 MB, max: 146.6 MB)

JS/TS (no embedded) benchmark complete!


=========================================
Benchmarking Mixed (embedded)
=========================================

Target: Storybook repository (mixed with embedded languages)
- 1 warmup runs, 3 benchmark runs
- Git reset before each run

Benchmark 1: prettier+oxc-parser
  Time (mean ± σ):     42.276 s ±  0.307 s    [User: 52.158 s, System: 3.955 s]
  Range (min … max):   42.082 s … 42.630 s    3 runs
 
Benchmark 2: oxfmt
  Time (mean ± σ):     13.409 s ±  0.087 s    [User: 48.153 s, System: 4.183 s]
  Range (min … max):   13.311 s … 13.475 s    3 runs
 
Summary
  oxfmt ran
    3.15 ± 0.03 times faster than prettier+oxc-parser

Memory Usage:
  prettier+oxc-parser: 1150.7 MB (min: 1143.0 MB, max: 1156.0 MB)
  oxfmt: 594.5 MB (min: 565.7 MB, max: 615.5 MB)

Mixed (embedded) benchmark complete!


=========================================
Benchmarking Full features
=========================================

Target: Continue repository (full features)
- 1 warmup runs, 3 benchmark runs
- Git reset before each run

Benchmark 1: prettier+oxc-parser
  Time (mean ± σ):     61.541 s ±  0.470 s    [User: 64.996 s, System: 11.244 s]
  Range (min … max):   61.040 s … 61.972 s    3 runs
 
Benchmark 2: oxfmt
  Time (mean ± σ):      6.411 s ±  0.164 s    [User: 22.631 s, System: 1.874 s]
  Range (min … max):    6.243 s …  6.571 s    3 runs
 
Summary
  oxfmt ran
    9.60 ± 0.26 times faster than prettier+oxc-parser

Memory Usage:
  prettier+oxc-parser: 646.4 MB (min: 644.5 MB, max: 649.1 MB)
  oxfmt: 325.5 MB (min: 291.2 MB, max: 364.8 MB)

Full features benchmark complete!

=========================================
All benchmarks complete!
=========================================
```
<!-- BENCHMARK_RESULTS_END -->
