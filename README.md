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
- **Biome**: 2.4.8
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
  Time (mean ± σ):      1.087 s ±  0.070 s    [User: 2.046 s, System: 0.196 s]
  Range (min … max):    0.991 s …  1.150 s    5 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):     716.6 ms ±  19.0 ms    [User: 1152.4 ms, System: 104.2 ms]
  Range (min … max):   694.4 ms … 743.0 ms    5 runs
 
Benchmark 3: biome
  Time (mean ± σ):     167.7 ms ±   2.4 ms    [User: 139.8 ms, System: 26.8 ms]
  Range (min … max):   164.8 ms … 170.1 ms    5 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):     162.2 ms ±   4.8 ms    [User: 196.8 ms, System: 69.8 ms]
  Range (min … max):   156.8 ms … 167.5 ms    5 runs
 
Summary
  oxfmt ran
    1.03 ± 0.03 times faster than biome
    4.42 ± 0.18 times faster than prettier+oxc-parser
    6.70 ± 0.48 times faster than prettier

Memory Usage:
  prettier: 235.2 MB (min: 222.8 MB, max: 241.9 MB)
  prettier+oxc-parser: 170.2 MB (min: 168.8 MB, max: 170.9 MB)
  biome: 68.7 MB (min: 67.3 MB, max: 71.6 MB)
  oxfmt: 107.9 MB (min: 107.8 MB, max: 108.0 MB)

Large single file benchmark complete!


=========================================
Benchmarking JS/TS (no embedded)
=========================================

Target: Outline repository (js/ts/tsx only)
- 3 warmup runs, 10 benchmark runs
- Git reset before each run

Benchmark 1: prettier
  Time (mean ± σ):     14.022 s ±  0.135 s    [User: 23.844 s, System: 1.769 s]
  Range (min … max):   13.816 s … 14.178 s    10 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):     11.889 s ±  0.110 s    [User: 15.914 s, System: 1.055 s]
  Range (min … max):   11.754 s … 12.119 s    10 runs
 
Benchmark 3: biome
  Time (mean ± σ):      1.293 s ±  0.099 s    [User: 4.301 s, System: 0.429 s]
  Range (min … max):    1.251 s …  1.570 s    10 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):     400.7 ms ±   3.8 ms    [User: 850.1 ms, System: 323.5 ms]
  Range (min … max):   396.7 ms … 408.0 ms    10 runs
 
Summary
  oxfmt ran
    3.23 ± 0.25 times faster than biome
   29.67 ± 0.39 times faster than prettier+oxc-parser
   35.00 ± 0.47 times faster than prettier

Memory Usage:
  prettier: 440.9 MB (min: 398.7 MB, max: 520.5 MB)
  prettier+oxc-parser: 326.2 MB (min: 316.1 MB, max: 346.1 MB)
  biome: 70.8 MB (min: 68.6 MB, max: 75.8 MB)
  oxfmt: 135.0 MB (min: 129.1 MB, max: 140.3 MB)

JS/TS (no embedded) benchmark complete!


=========================================
Benchmarking Mixed (embedded)
=========================================

Target: Storybook repository (mixed with embedded languages)
- 1 warmup runs, 3 benchmark runs
- Git reset before each run

Benchmark 1: prettier+oxc-parser
  Time (mean ± σ):     40.849 s ±  0.064 s    [User: 50.799 s, System: 3.881 s]
  Range (min … max):   40.810 s … 40.923 s    3 runs
 
Benchmark 2: oxfmt
  Time (mean ± σ):     12.744 s ±  0.258 s    [User: 45.631 s, System: 3.924 s]
  Range (min … max):   12.466 s … 12.975 s    3 runs
 
Summary
  oxfmt ran
    3.21 ± 0.06 times faster than prettier+oxc-parser

Memory Usage:
  prettier+oxc-parser: 1143.5 MB (min: 1138.8 MB, max: 1148.5 MB)
  oxfmt: 630.9 MB (min: 588.2 MB, max: 662.8 MB)

Mixed (embedded) benchmark complete!


=========================================
Benchmarking Full features
=========================================

Target: Continue repository (full features)
- 1 warmup runs, 3 benchmark runs
- Git reset before each run

Benchmark 1: prettier+oxc-parser
  Time (mean ± σ):     59.260 s ±  0.195 s    [User: 62.740 s, System: 11.130 s]
  Range (min … max):   59.097 s … 59.475 s    3 runs
 
Benchmark 2: oxfmt
  Time (mean ± σ):      6.223 s ±  0.054 s    [User: 22.437 s, System: 1.797 s]
  Range (min … max):    6.169 s …  6.278 s    3 runs
 
Summary
  oxfmt ran
    9.52 ± 0.09 times faster than prettier+oxc-parser

Memory Usage:
  prettier+oxc-parser: 651.7 MB (min: 638.9 MB, max: 669.2 MB)
  oxfmt: 326.2 MB (min: 292.4 MB, max: 354.6 MB)

Full features benchmark complete!

=========================================
All benchmarks complete!
=========================================
```
<!-- BENCHMARK_RESULTS_END -->
