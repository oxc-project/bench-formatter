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
- **Biome**: 2.4.15
- **Oxfmt**: 0.52.0

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
  Time (mean ± σ):     980.1 ms ±  11.7 ms    [User: 1916.8 ms, System: 201.7 ms]
  Range (min … max):   965.5 ms … 997.6 ms    5 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):     736.8 ms ±  42.8 ms    [User: 1151.4 ms, System: 119.2 ms]
  Range (min … max):   685.1 ms … 770.6 ms    5 runs
 
Benchmark 3: biome
  Time (mean ± σ):     175.1 ms ±   2.7 ms    [User: 148.2 ms, System: 26.9 ms]
  Range (min … max):   172.1 ms … 177.6 ms    5 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):     165.4 ms ±   3.8 ms    [User: 185.7 ms, System: 78.6 ms]
  Range (min … max):   159.0 ms … 168.4 ms    5 runs
 
Summary
  oxfmt ran
    1.06 ± 0.03 times faster than biome
    4.46 ± 0.28 times faster than prettier+oxc-parser
    5.93 ± 0.15 times faster than prettier

Memory Usage:
  prettier: 236.1 MB (min: 224.6 MB, max: 251.9 MB)
  prettier+oxc-parser: 172.4 MB (min: 169.4 MB, max: 174.4 MB)
  biome: 69.8 MB (min: 67.9 MB, max: 72.2 MB)
  oxfmt: 103.2 MB (min: 103.1 MB, max: 103.2 MB)

Large single file benchmark complete!


=========================================
Benchmarking JS/TS (no embedded)
=========================================

Target: Outline repository (js/ts/tsx only)
- 3 warmup runs, 10 benchmark runs
- Git reset before each run

Benchmark 1: prettier
  Time (mean ± σ):     14.937 s ±  0.095 s    [User: 25.330 s, System: 2.019 s]
  Range (min … max):   14.801 s … 15.084 s    10 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):     12.482 s ±  0.041 s    [User: 16.321 s, System: 1.202 s]
  Range (min … max):   12.431 s … 12.538 s    10 runs
 
Benchmark 3: biome
  Time (mean ± σ):      1.325 s ±  0.086 s    [User: 4.427 s, System: 0.382 s]
  Range (min … max):    1.275 s …  1.541 s    10 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):     408.7 ms ±   4.5 ms    [User: 859.9 ms, System: 321.5 ms]
  Range (min … max):   404.8 ms … 419.1 ms    10 runs
 
Summary
  oxfmt ran
    3.24 ± 0.21 times faster than biome
   30.54 ± 0.35 times faster than prettier+oxc-parser
   36.55 ± 0.47 times faster than prettier

Memory Usage:
  prettier: 410.6 MB (min: 381.3 MB, max: 450.6 MB)
  prettier+oxc-parser: 327.8 MB (min: 319.2 MB, max: 333.8 MB)
  biome: 74.4 MB (min: 72.5 MB, max: 76.3 MB)
  oxfmt: 138.8 MB (min: 130.2 MB, max: 147.9 MB)

JS/TS (no embedded) benchmark complete!


=========================================
Benchmarking Mixed (embedded)
=========================================

Target: Storybook repository (mixed with embedded languages)
- 1 warmup runs, 3 benchmark runs
- Git reset before each run

Benchmark 1: prettier+oxc-parser
  Time (mean ± σ):     43.596 s ±  0.055 s    [User: 53.536 s, System: 4.278 s]
  Range (min … max):   43.533 s … 43.634 s    3 runs
 
Benchmark 2: oxfmt
  Time (mean ± σ):     13.143 s ±  0.293 s    [User: 45.989 s, System: 4.109 s]
  Range (min … max):   12.856 s … 13.442 s    3 runs
 
Summary
  oxfmt ran
    3.32 ± 0.07 times faster than prettier+oxc-parser

Memory Usage:
  prettier+oxc-parser: 1166.5 MB (min: 1157.5 MB, max: 1182.1 MB)
  oxfmt: 457.6 MB (min: 440.8 MB, max: 476.9 MB)

Mixed (embedded) benchmark complete!


=========================================
Benchmarking Full features
=========================================

Target: Continue repository (full features)
- 1 warmup runs, 3 benchmark runs
- Git reset before each run

Benchmark 1: prettier+oxc-parser
  Time (mean ± σ):     35.802 s ±  0.182 s    [User: 46.336 s, System: 3.412 s]
  Range (min … max):   35.696 s … 36.012 s    3 runs
 
Benchmark 2: oxfmt
  Time (mean ± σ):      6.070 s ±  0.157 s    [User: 20.835 s, System: 1.812 s]
  Range (min … max):    5.906 s …  6.220 s    3 runs
 
Summary
  oxfmt ran
    5.90 ± 0.16 times faster than prettier+oxc-parser

Memory Usage:
  prettier+oxc-parser: 682.1 MB (min: 654.5 MB, max: 712.8 MB)
  oxfmt: 333.3 MB (min: 330.8 MB, max: 335.0 MB)

Full features benchmark complete!

=========================================
All benchmarks complete!
=========================================
```
<!-- BENCHMARK_RESULTS_END -->
