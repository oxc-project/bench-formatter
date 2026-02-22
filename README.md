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
- **Biome**: 2.3.15
- **Oxfmt**: 0.34.0

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
  Time (mean ± σ):      1.015 s ±  0.017 s    [User: 1.953 s, System: 0.203 s]
  Range (min … max):    1.001 s …  1.043 s    5 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):     707.6 ms ±  14.5 ms    [User: 1122.7 ms, System: 108.1 ms]
  Range (min … max):   697.2 ms … 729.5 ms    5 runs
 
Benchmark 3: biome
  Time (mean ± σ):     135.5 ms ±   1.3 ms    [User: 108.5 ms, System: 26.4 ms]
  Range (min … max):   133.7 ms … 136.9 ms    5 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):     161.5 ms ±   7.1 ms    [User: 182.4 ms, System: 77.4 ms]
  Range (min … max):   149.5 ms … 167.0 ms    5 runs
 
Summary
  biome ran
    1.19 ± 0.05 times faster than oxfmt
    5.22 ± 0.12 times faster than prettier+oxc-parser
    7.49 ± 0.14 times faster than prettier

Memory Usage:
  prettier: 222.9 MB (min: 212.5 MB, max: 233.7 MB)
  prettier+oxc-parser: 170.2 MB (min: 168.9 MB, max: 171.8 MB)
  biome: 62.0 MB (min: 61.6 MB, max: 62.3 MB)
  oxfmt: 106.7 MB (min: 106.6 MB, max: 106.8 MB)

Large single file benchmark complete!


=========================================
Benchmarking JS/TS (no embedded)
=========================================

Target: Outline repository (js/ts/tsx only)
- 3 warmup runs, 10 benchmark runs
- Git reset before each run

Benchmark 1: prettier
  Time (mean ± σ):     13.768 s ±  0.143 s    [User: 23.341 s, System: 1.810 s]
  Range (min … max):   13.537 s … 13.975 s    10 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):     11.483 s ±  0.096 s    [User: 15.039 s, System: 1.054 s]
  Range (min … max):   11.358 s … 11.651 s    10 runs
 
Benchmark 3: biome
  Time (mean ± σ):     956.8 ms ±  86.0 ms    [User: 3011.3 ms, System: 420.8 ms]
  Range (min … max):   912.6 ms … 1180.7 ms    10 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):     380.6 ms ±   2.3 ms    [User: 800.7 ms, System: 310.8 ms]
  Range (min … max):   377.5 ms … 385.0 ms    10 runs
 
Summary
  oxfmt ran
    2.51 ± 0.23 times faster than biome
   30.17 ± 0.31 times faster than prettier+oxc-parser
   36.17 ± 0.44 times faster than prettier

Memory Usage:
  prettier: 415.4 MB (min: 363.7 MB, max: 482.0 MB)
  prettier+oxc-parser: 317.3 MB (min: 310.9 MB, max: 322.1 MB)
  biome: 63.4 MB (min: 61.1 MB, max: 65.9 MB)
  oxfmt: 135.5 MB (min: 126.9 MB, max: 144.1 MB)

JS/TS (no embedded) benchmark complete!


=========================================
Benchmarking Mixed (embedded)
=========================================

Target: Storybook repository (mixed with embedded languages)
- 1 warmup runs, 3 benchmark runs
- Git reset before each run

Benchmark 1: prettier+oxc-parser
  Time (mean ± σ):     40.056 s ±  0.232 s    [User: 49.245 s, System: 3.949 s]
  Range (min … max):   39.832 s … 40.296 s    3 runs
 
Benchmark 2: oxfmt
  Time (mean ± σ):     12.799 s ±  0.240 s    [User: 45.747 s, System: 4.237 s]
  Range (min … max):   12.628 s … 13.074 s    3 runs
 
Summary
  oxfmt ran
    3.13 ± 0.06 times faster than prettier+oxc-parser

Memory Usage:
  prettier+oxc-parser: 1145.5 MB (min: 1139.7 MB, max: 1153.5 MB)
  oxfmt: 483.2 MB (min: 394.8 MB, max: 529.3 MB)

Mixed (embedded) benchmark complete!


=========================================
Benchmarking Full features
=========================================

Target: Continue repository (full features)
- 1 warmup runs, 3 benchmark runs
- Git reset before each run

Benchmark 1: prettier+oxc-parser
  Time (mean ± σ):     57.910 s ±  0.131 s    [User: 61.084 s, System: 10.933 s]
  Range (min … max):   57.777 s … 58.039 s    3 runs
 
Benchmark 2: oxfmt
  Time (mean ± σ):      6.121 s ±  0.028 s    [User: 22.102 s, System: 1.770 s]
  Range (min … max):    6.095 s …  6.151 s    3 runs
 
Summary
  oxfmt ran
    9.46 ± 0.05 times faster than prettier+oxc-parser

Memory Usage:
  prettier+oxc-parser: 658.6 MB (min: 652.6 MB, max: 663.4 MB)
  oxfmt: 341.5 MB (min: 325.8 MB, max: 363.9 MB)

Full features benchmark complete!

=========================================
All benchmarks complete!
=========================================
```
<!-- BENCHMARK_RESULTS_END -->
