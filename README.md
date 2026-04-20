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

- **Prettier**: 3.8.3
- **Biome**: 2.4.12
- **Oxfmt**: 0.46.0

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
  Time (mean ± σ):      1.084 s ±  0.075 s    [User: 2.007 s, System: 0.207 s]
  Range (min … max):    0.978 s …  1.151 s    5 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):     682.7 ms ±   8.1 ms    [User: 1098.0 ms, System: 111.8 ms]
  Range (min … max):   671.5 ms … 693.6 ms    5 runs
 
Benchmark 3: biome
  Time (mean ± σ):     171.6 ms ±   2.0 ms    [User: 143.5 ms, System: 29.3 ms]
  Range (min … max):   169.2 ms … 174.0 ms    5 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):     156.3 ms ±   5.1 ms    [User: 169.5 ms, System: 80.4 ms]
  Range (min … max):   150.9 ms … 163.1 ms    5 runs
 
Summary
  oxfmt ran
    1.10 ± 0.04 times faster than biome
    4.37 ± 0.15 times faster than prettier+oxc-parser
    6.93 ± 0.53 times faster than prettier

Memory Usage:
  prettier: 222.7 MB (min: 220.8 MB, max: 225.8 MB)
  prettier+oxc-parser: 174.4 MB (min: 170.9 MB, max: 177.8 MB)
  biome: 68.5 MB (min: 67.7 MB, max: 70.5 MB)
  oxfmt: 106.6 MB (min: 106.5 MB, max: 106.7 MB)

Large single file benchmark complete!


=========================================
Benchmarking JS/TS (no embedded)
=========================================

Target: Outline repository (js/ts/tsx only)
- 3 warmup runs, 10 benchmark runs
- Git reset before each run

Benchmark 1: prettier
  Time (mean ± σ):     14.315 s ±  0.228 s    [User: 24.434 s, System: 2.002 s]
  Range (min … max):   13.994 s … 14.850 s    10 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):     12.091 s ±  0.170 s    [User: 16.194 s, System: 1.163 s]
  Range (min … max):   11.877 s … 12.383 s    10 runs
 
Benchmark 3: biome
  Time (mean ± σ):      1.268 s ±  0.126 s    [User: 4.254 s, System: 0.366 s]
  Range (min … max):    1.225 s …  1.626 s    10 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):     396.6 ms ±   3.3 ms    [User: 828.4 ms, System: 324.2 ms]
  Range (min … max):   391.5 ms … 401.8 ms    10 runs
 
Summary
  oxfmt ran
    3.20 ± 0.32 times faster than biome
   30.48 ± 0.50 times faster than prettier+oxc-parser
   36.09 ± 0.65 times faster than prettier

Memory Usage:
  prettier: 410.0 MB (min: 375.7 MB, max: 486.4 MB)
  prettier+oxc-parser: 333.1 MB (min: 325.6 MB, max: 344.5 MB)
  biome: 71.2 MB (min: 69.3 MB, max: 75.1 MB)
  oxfmt: 144.5 MB (min: 138.8 MB, max: 149.8 MB)

JS/TS (no embedded) benchmark complete!


=========================================
Benchmarking Mixed (embedded)
=========================================

Target: Storybook repository (mixed with embedded languages)
- 1 warmup runs, 3 benchmark runs
- Git reset before each run

Benchmark 1: prettier+oxc-parser
  Time (mean ± σ):     41.027 s ±  0.077 s    [User: 50.791 s, System: 4.091 s]
  Range (min … max):   40.968 s … 41.113 s    3 runs
 
Benchmark 2: oxfmt
  Time (mean ± σ):     12.670 s ±  0.192 s    [User: 44.783 s, System: 4.015 s]
  Range (min … max):   12.555 s … 12.892 s    3 runs
 
Summary
  oxfmt ran
    3.24 ± 0.05 times faster than prettier+oxc-parser

Memory Usage:
  prettier+oxc-parser: 1149.2 MB (min: 1146.9 MB, max: 1152.4 MB)
  oxfmt: 561.1 MB (min: 535.7 MB, max: 582.4 MB)

Mixed (embedded) benchmark complete!


=========================================
Benchmarking Full features
=========================================

Target: Continue repository (full features)
- 1 warmup runs, 3 benchmark runs
- Git reset before each run

Benchmark 1: prettier+oxc-parser
  Time (mean ± σ):     52.786 s ±  0.426 s    [User: 55.662 s, System: 11.065 s]
  Range (min … max):   52.457 s … 53.268 s    3 runs
 
Benchmark 2: oxfmt
  Time (mean ± σ):      5.920 s ±  0.050 s    [User: 20.847 s, System: 1.838 s]
  Range (min … max):    5.874 s …  5.972 s    3 runs
 
Summary
  oxfmt ran
    8.92 ± 0.10 times faster than prettier+oxc-parser

Memory Usage:
  prettier+oxc-parser: 661.3 MB (min: 658.2 MB, max: 663.9 MB)
  oxfmt: 338.6 MB (min: 319.7 MB, max: 352.2 MB)

Full features benchmark complete!

=========================================
All benchmarks complete!
=========================================
```
<!-- BENCHMARK_RESULTS_END -->
