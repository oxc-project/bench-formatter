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
  - [Headplane](https://github.com/tale/headplane) repository (full features: sort imports + Tailwind CSS)
- **Methodology**:
  - Multiple warmup runs before measurement
  - Multiple benchmark runs for statistical accuracy
  - Git reset before each run to ensure identical starting conditions
  - Memory usage measured using GNU time (peak RSS)
  - Local binaries via `./node_modules/.bin/`

## Versions

- **Prettier**: 3.8.1
- **Biome**: 2.3.11
- **Oxfmt**: 0.27.0

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
  Time (mean ± σ):     913.7 ms ±  14.9 ms    [User: 1915.8 ms, System: 142.1 ms]
  Range (min … max):   889.3 ms … 928.6 ms    5 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):     663.8 ms ±  19.4 ms    [User: 1111.3 ms, System: 88.2 ms]
  Range (min … max):   646.0 ms … 695.3 ms    5 runs
 
Benchmark 3: biome
  Time (mean ± σ):     136.7 ms ±   1.6 ms    [User: 106.7 ms, System: 26.3 ms]
  Range (min … max):   134.2 ms … 138.4 ms    5 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):     118.2 ms ±   2.9 ms    [User: 257.8 ms, System: 52.6 ms]
  Range (min … max):   115.4 ms … 122.7 ms    5 runs
 
Summary
  oxfmt ran
    1.16 ± 0.03 times faster than biome
    5.62 ± 0.21 times faster than prettier+oxc-parser
    7.73 ± 0.23 times faster than prettier

Memory Usage:
  prettier: 221.5 MB (min: 210.0 MB, max: 239.4 MB)
  prettier+oxc-parser: 174.5 MB (min: 169.1 MB, max: 183.1 MB)
  biome: 62.1 MB (min: 61.6 MB, max: 62.5 MB)
  oxfmt: 159.6 MB (min: 159.4 MB, max: 159.8 MB)

Large single file benchmark complete!


=========================================
Benchmarking JS/TS (no embedded)
=========================================

Target: Outline repository (js/ts/tsx only)
- 3 warmup runs, 10 benchmark runs
- Git reset before each run

Benchmark 1: prettier
  Time (mean ± σ):     12.962 s ±  0.167 s    [User: 22.250 s, System: 1.349 s]
  Range (min … max):   12.726 s … 13.202 s    10 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):     10.408 s ±  0.105 s    [User: 13.838 s, System: 0.828 s]
  Range (min … max):   10.217 s … 10.521 s    10 runs
 
Benchmark 3: biome
  Time (mean ± σ):     837.0 ms ±   4.1 ms    [User: 2858.6 ms, System: 265.3 ms]
  Range (min … max):   829.3 ms … 844.8 ms    10 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):     294.4 ms ±   5.7 ms    [User: 795.3 ms, System: 188.3 ms]
  Range (min … max):   286.0 ms … 301.9 ms    10 runs
 
Summary
  oxfmt ran
    2.84 ± 0.06 times faster than biome
   35.35 ± 0.77 times faster than prettier+oxc-parser
   44.03 ± 1.02 times faster than prettier

Memory Usage:
  prettier: 402.9 MB (min: 375.6 MB, max: 459.0 MB)
  prettier+oxc-parser: 319.4 MB (min: 312.4 MB, max: 339.4 MB)
  biome: 64.0 MB (min: 61.7 MB, max: 67.8 MB)
  oxfmt: 188.8 MB (min: 181.3 MB, max: 197.3 MB)

JS/TS (no embedded) benchmark complete!


=========================================
Benchmarking Mixed (embedded)
=========================================

Target: Storybook repository (mixed with embedded languages)
- 2 warmup runs, 6 benchmark runs
- Git reset before each run

Benchmark 1: prettier+oxc-parser
  Time (mean ± σ):     12.859 s ±  0.090 s    [User: 17.756 s, System: 0.838 s]
  Range (min … max):   12.692 s … 12.960 s    6 runs
 
Benchmark 2: oxfmt
  Time (mean ± σ):      1.799 s ±  0.023 s    [User: 6.371 s, System: 0.474 s]
  Range (min … max):    1.774 s …  1.842 s    6 runs
 
Summary
  oxfmt ran
    7.15 ± 0.10 times faster than prettier+oxc-parser

Memory Usage:
  prettier+oxc-parser: 353.3 MB (min: 347.9 MB, max: 366.1 MB)
  oxfmt: 545.2 MB (min: 500.8 MB, max: 584.4 MB)

Mixed (embedded) benchmark complete!

=========================================
All benchmarks complete!
=========================================
```
<!-- BENCHMARK_RESULTS_END -->
