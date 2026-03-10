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
- **Oxfmt**: 0.37.0

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
  Time (mean ± σ):      1.013 s ±  0.010 s    [User: 1.972 s, System: 0.194 s]
  Range (min … max):    1.003 s …  1.029 s    5 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):     704.2 ms ±   8.2 ms    [User: 1130.0 ms, System: 102.3 ms]
  Range (min … max):   691.0 ms … 710.7 ms    5 runs
 
Benchmark 3: biome
  Time (mean ± σ):     164.6 ms ±   1.3 ms    [User: 136.5 ms, System: 28.5 ms]
  Range (min … max):   163.6 ms … 166.9 ms    5 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):     158.8 ms ±   4.3 ms    [User: 183.7 ms, System: 79.0 ms]
  Range (min … max):   155.3 ms … 165.3 ms    5 runs
 
Summary
  oxfmt ran
    1.04 ± 0.03 times faster than biome
    4.43 ± 0.13 times faster than prettier+oxc-parser
    6.38 ± 0.18 times faster than prettier

Memory Usage:
  prettier: 241.3 MB (min: 223.4 MB, max: 251.6 MB)
  prettier+oxc-parser: 168.8 MB (min: 168.0 MB, max: 169.5 MB)
  biome: 67.4 MB (min: 66.7 MB, max: 68.8 MB)
  oxfmt: 107.0 MB (min: 106.9 MB, max: 107.1 MB)

Large single file benchmark complete!


=========================================
Benchmarking JS/TS (no embedded)
=========================================

Target: Outline repository (js/ts/tsx only)
- 3 warmup runs, 10 benchmark runs
- Git reset before each run

Benchmark 1: prettier
  Time (mean ± σ):     13.797 s ±  0.171 s    [User: 23.362 s, System: 1.729 s]
  Range (min … max):   13.468 s … 14.029 s    10 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):     11.598 s ±  0.178 s    [User: 15.295 s, System: 1.023 s]
  Range (min … max):   11.416 s … 11.977 s    10 runs
 
Benchmark 3: biome
  Time (mean ± σ):      1.269 s ±  0.108 s    [User: 4.209 s, System: 0.459 s]
  Range (min … max):    1.230 s …  1.576 s    10 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):     392.0 ms ±   1.8 ms    [User: 846.6 ms, System: 301.9 ms]
  Range (min … max):   389.6 ms … 395.1 ms    10 runs
 
Summary
  oxfmt ran
    3.24 ± 0.28 times faster than biome
   29.59 ± 0.47 times faster than prettier+oxc-parser
   35.20 ± 0.47 times faster than prettier

Memory Usage:
  prettier: 400.2 MB (min: 381.8 MB, max: 421.3 MB)
  prettier+oxc-parser: 325.4 MB (min: 317.4 MB, max: 331.9 MB)
  biome: 71.8 MB (min: 68.5 MB, max: 76.5 MB)
  oxfmt: 136.3 MB (min: 130.5 MB, max: 143.6 MB)

JS/TS (no embedded) benchmark complete!


=========================================
Benchmarking Mixed (embedded)
=========================================

Target: Storybook repository (mixed with embedded languages)
- 1 warmup runs, 3 benchmark runs
- Git reset before each run

Benchmark 1: prettier+oxc-parser
  Time (mean ± σ):     39.643 s ±  0.059 s    [User: 49.145 s, System: 3.706 s]
  Range (min … max):   39.576 s … 39.688 s    3 runs
 
Benchmark 2: oxfmt
  Time (mean ± σ):     12.649 s ±  0.089 s    [User: 45.595 s, System: 3.996 s]
  Range (min … max):   12.596 s … 12.752 s    3 runs
 
Summary
  oxfmt ran
    3.13 ± 0.02 times faster than prettier+oxc-parser

Memory Usage:
  prettier+oxc-parser: 1150.7 MB (min: 1146.1 MB, max: 1154.2 MB)
  oxfmt: 582.0 MB (min: 559.5 MB, max: 619.3 MB)

Mixed (embedded) benchmark complete!


=========================================
Benchmarking Full features
=========================================

Target: Continue repository (full features)
- 1 warmup runs, 3 benchmark runs
- Git reset before each run

Benchmark 1: prettier+oxc-parser
  Time (mean ± σ):     57.542 s ±  1.016 s    [User: 60.609 s, System: 10.693 s]
  Range (min … max):   56.607 s … 58.623 s    3 runs
 
Benchmark 2: oxfmt
  Time (mean ± σ):      6.301 s ±  0.160 s    [User: 22.732 s, System: 1.776 s]
  Range (min … max):    6.122 s …  6.431 s    3 runs
 
Summary
  oxfmt ran
    9.13 ± 0.28 times faster than prettier+oxc-parser

Memory Usage:
  prettier+oxc-parser: 640.5 MB (min: 635.9 MB, max: 643.7 MB)
  oxfmt: 341.0 MB (min: 331.4 MB, max: 354.5 MB)

Full features benchmark complete!

=========================================
All benchmarks complete!
=========================================
```
<!-- BENCHMARK_RESULTS_END -->
