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
- **Biome**: 2.4.13
- **Oxfmt**: 0.47.0

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
  Time (mean ± σ):      1.026 s ±  0.008 s    [User: 2.009 s, System: 0.183 s]
  Range (min … max):    1.015 s …  1.036 s    5 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):     735.5 ms ±   7.1 ms    [User: 1188.6 ms, System: 106.1 ms]
  Range (min … max):   729.0 ms … 747.1 ms    5 runs
 
Benchmark 3: biome
  Time (mean ± σ):     177.0 ms ±   6.6 ms    [User: 149.5 ms, System: 28.2 ms]
  Range (min … max):   173.3 ms … 188.6 ms    5 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):     163.2 ms ±   6.8 ms    [User: 193.2 ms, System: 76.5 ms]
  Range (min … max):   157.8 ms … 171.0 ms    5 runs
 
Summary
  oxfmt ran
    1.09 ± 0.06 times faster than biome
    4.51 ± 0.19 times faster than prettier+oxc-parser
    6.29 ± 0.27 times faster than prettier

Memory Usage:
  prettier: 231.2 MB (min: 215.7 MB, max: 249.2 MB)
  prettier+oxc-parser: 175.5 MB (min: 171.1 MB, max: 183.6 MB)
  biome: 69.6 MB (min: 68.1 MB, max: 71.2 MB)
  oxfmt: 104.6 MB (min: 104.4 MB, max: 104.6 MB)

Large single file benchmark complete!


=========================================
Benchmarking JS/TS (no embedded)
=========================================

Target: Outline repository (js/ts/tsx only)
- 3 warmup runs, 10 benchmark runs
- Git reset before each run

Benchmark 1: prettier
  Time (mean ± σ):     15.797 s ±  0.259 s    [User: 26.898 s, System: 1.327 s]
  Range (min … max):   15.320 s … 16.162 s    10 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):     13.288 s ±  0.175 s    [User: 17.852 s, System: 0.720 s]
  Range (min … max):   13.007 s … 13.648 s    10 runs
 
Benchmark 3: biome
  Time (mean ± σ):      1.380 s ±  0.101 s    [User: 4.677 s, System: 0.368 s]
  Range (min … max):    1.329 s …  1.656 s    10 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):     426.5 ms ±   4.4 ms    [User: 926.6 ms, System: 339.6 ms]
  Range (min … max):   419.8 ms … 433.2 ms    10 runs
 
Summary
  oxfmt ran
    3.24 ± 0.24 times faster than biome
   31.15 ± 0.52 times faster than prettier+oxc-parser
   37.03 ± 0.72 times faster than prettier

Memory Usage:
  prettier: 406.8 MB (min: 377.2 MB, max: 439.2 MB)
  prettier+oxc-parser: 334.4 MB (min: 322.4 MB, max: 347.1 MB)
  biome: 74.3 MB (min: 72.3 MB, max: 76.6 MB)
  oxfmt: 146.2 MB (min: 136.3 MB, max: 151.3 MB)

JS/TS (no embedded) benchmark complete!


=========================================
Benchmarking Mixed (embedded)
=========================================

Target: Storybook repository (mixed with embedded languages)
- 1 warmup runs, 3 benchmark runs
- Git reset before each run

Benchmark 1: prettier+oxc-parser
  Time (mean ± σ):     43.698 s ±  0.506 s    [User: 55.170 s, System: 2.707 s]
  Range (min … max):   43.125 s … 44.083 s    3 runs
 
Benchmark 2: oxfmt
  Time (mean ± σ):     13.527 s ±  0.243 s    [User: 49.056 s, System: 3.844 s]
  Range (min … max):   13.253 s … 13.716 s    3 runs
 
Summary
  oxfmt ran
    3.23 ± 0.07 times faster than prettier+oxc-parser

Memory Usage:
  prettier+oxc-parser: 1156.8 MB (min: 1149.6 MB, max: 1165.0 MB)
  oxfmt: 560.6 MB (min: 548.7 MB, max: 571.1 MB)

Mixed (embedded) benchmark complete!


=========================================
Benchmarking Full features
=========================================

Target: Continue repository (full features)
- 1 warmup runs, 3 benchmark runs
- Git reset before each run

Benchmark 1: prettier+oxc-parser
  Time (mean ± σ):     38.314 s ±  0.244 s    [User: 50.748 s, System: 1.663 s]
  Range (min … max):   38.133 s … 38.592 s    3 runs
 
Benchmark 2: oxfmt
  Time (mean ± σ):      6.542 s ±  0.157 s    [User: 22.959 s, System: 1.744 s]
  Range (min … max):    6.393 s …  6.705 s    3 runs
 
Summary
  oxfmt ran
    5.86 ± 0.15 times faster than prettier+oxc-parser

Memory Usage:
  prettier+oxc-parser: 672.6 MB (min: 667.7 MB, max: 679.8 MB)
  oxfmt: 326.4 MB (min: 311.1 MB, max: 338.3 MB)

Full features benchmark complete!

=========================================
All benchmarks complete!
=========================================
```
<!-- BENCHMARK_RESULTS_END -->
