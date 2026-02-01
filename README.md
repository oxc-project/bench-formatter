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
- **Biome**: 2.3.13
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
  Time (mean ± σ):      1.102 s ±  0.020 s    [User: 2.057 s, System: 0.188 s]
  Range (min … max):    1.082 s …  1.130 s    5 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):     698.0 ms ±   4.5 ms    [User: 1123.7 ms, System: 99.0 ms]
  Range (min … max):   692.8 ms … 703.7 ms    5 runs
 
Benchmark 3: biome
  Time (mean ± σ):     135.7 ms ±   2.5 ms    [User: 106.6 ms, System: 27.5 ms]
  Range (min … max):   133.3 ms … 138.8 ms    5 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):     122.6 ms ±   1.3 ms    [User: 247.5 ms, System: 62.6 ms]
  Range (min … max):   121.4 ms … 124.5 ms    5 runs
 
Summary
  oxfmt ran
    1.11 ± 0.02 times faster than biome
    5.69 ± 0.07 times faster than prettier+oxc-parser
    8.99 ± 0.19 times faster than prettier

Memory Usage:
  prettier: 222.9 MB (min: 213.1 MB, max: 235.3 MB)
  prettier+oxc-parser: 170.0 MB (min: 168.7 MB, max: 170.9 MB)
  biome: 62.5 MB (min: 61.8 MB, max: 64.4 MB)
  oxfmt: 159.5 MB (min: 159.3 MB, max: 159.6 MB)

Large single file benchmark complete!


=========================================
Benchmarking JS/TS (no embedded)
=========================================

Target: Outline repository (js/ts/tsx only)
- 3 warmup runs, 10 benchmark runs
- Git reset before each run

Benchmark 1: prettier
  Time (mean ± σ):     13.372 s ±  0.217 s    [User: 22.733 s, System: 1.816 s]
  Range (min … max):   13.139 s … 13.794 s    10 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):     11.013 s ±  0.071 s    [User: 14.435 s, System: 1.021 s]
  Range (min … max):   10.890 s … 11.132 s    10 runs
 
Benchmark 3: biome
  Time (mean ± σ):     916.9 ms ±  78.2 ms    [User: 2892.2 ms, System: 410.1 ms]
  Range (min … max):   881.9 ms … 1138.1 ms    10 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):     329.1 ms ±   2.8 ms    [User: 824.2 ms, System: 288.2 ms]
  Range (min … max):   325.2 ms … 334.8 ms    10 runs
 
Summary
  oxfmt ran
    2.79 ± 0.24 times faster than biome
   33.47 ± 0.36 times faster than prettier+oxc-parser
   40.63 ± 0.74 times faster than prettier

Memory Usage:
  prettier: 390.1 MB (min: 359.7 MB, max: 438.2 MB)
  prettier+oxc-parser: 317.6 MB (min: 306.4 MB, max: 347.2 MB)
  biome: 64.3 MB (min: 61.7 MB, max: 67.9 MB)
  oxfmt: 187.9 MB (min: 182.2 MB, max: 192.6 MB)

JS/TS (no embedded) benchmark complete!


=========================================
Benchmarking Mixed (embedded)
=========================================

Target: Storybook repository (mixed with embedded languages)
- 1 warmup runs, 3 benchmark runs
- Git reset before each run

Benchmark 1: prettier+oxc-parser
  Time (mean ± σ):     39.849 s ±  0.248 s    [User: 49.227 s, System: 3.831 s]
  Range (min … max):   39.648 s … 40.126 s    3 runs
 
Benchmark 2: oxfmt
  Time (mean ± σ):     12.280 s ±  0.140 s    [User: 44.644 s, System: 3.321 s]
  Range (min … max):   12.126 s … 12.398 s    3 runs
 
Summary
  oxfmt ran
    3.24 ± 0.04 times faster than prettier+oxc-parser

Memory Usage:
  prettier+oxc-parser: 1149.8 MB (min: 1144.5 MB, max: 1156.0 MB)
  oxfmt: 1571.4 MB (min: 1451.8 MB, max: 1715.1 MB)

Mixed (embedded) benchmark complete!


=========================================
Benchmarking Full features
=========================================

Target: Continue repository (full features)
- 1 warmup runs, 3 benchmark runs
- Git reset before each run

Benchmark 1: prettier+oxc-parser
  Time (mean ± σ):     57.130 s ±  0.222 s    [User: 60.702 s, System: 10.886 s]
  Range (min … max):   56.891 s … 57.329 s    3 runs
 
Benchmark 2: oxfmt
  Time (mean ± σ):      7.536 s ±  0.011 s    [User: 25.454 s, System: 2.910 s]
  Range (min … max):    7.524 s …  7.544 s    3 runs
 
Summary
  oxfmt ran
    7.58 ± 0.03 times faster than prettier+oxc-parser

Memory Usage:
  prettier+oxc-parser: 664.2 MB (min: 636.0 MB, max: 689.6 MB)
  oxfmt: 1331.6 MB (min: 1306.3 MB, max: 1366.0 MB)

Full features benchmark complete!

=========================================
All benchmarks complete!
=========================================
```
<!-- BENCHMARK_RESULTS_END -->
