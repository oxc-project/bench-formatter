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
- **Biome**: 2.3.14
- **Oxfmt**: 0.31.0

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
  Time (mean ± σ):     981.8 ms ±  32.4 ms    [User: 1919.8 ms, System: 204.6 ms]
  Range (min … max):   956.0 ms … 1020.7 ms    5 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):     694.3 ms ±   4.3 ms    [User: 1105.0 ms, System: 117.8 ms]
  Range (min … max):   688.6 ms … 698.4 ms    5 runs
 
Benchmark 3: biome
  Time (mean ± σ):     137.1 ms ±   1.7 ms    [User: 107.4 ms, System: 28.8 ms]
  Range (min … max):   135.5 ms … 140.0 ms    5 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):     153.0 ms ±   3.9 ms    [User: 160.6 ms, System: 85.9 ms]
  Range (min … max):   149.5 ms … 159.2 ms    5 runs
 
Summary
  biome ran
    1.12 ± 0.03 times faster than oxfmt
    5.06 ± 0.07 times faster than prettier+oxc-parser
    7.16 ± 0.25 times faster than prettier

Memory Usage:
  prettier: 234.1 MB (min: 220.2 MB, max: 249.1 MB)
  prettier+oxc-parser: 169.9 MB (min: 169.1 MB, max: 171.3 MB)
  biome: 61.9 MB (min: 61.7 MB, max: 62.2 MB)
  oxfmt: 106.5 MB (min: 106.4 MB, max: 106.6 MB)

Large single file benchmark complete!


=========================================
Benchmarking JS/TS (no embedded)
=========================================

Target: Outline repository (js/ts/tsx only)
- 3 warmup runs, 10 benchmark runs
- Git reset before each run

Benchmark 1: prettier
  Time (mean ± σ):     13.045 s ±  0.175 s    [User: 22.344 s, System: 2.070 s]
  Range (min … max):   12.829 s … 13.356 s    10 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):     10.876 s ±  0.124 s    [User: 14.510 s, System: 1.090 s]
  Range (min … max):   10.721 s … 11.101 s    10 runs
 
Benchmark 3: biome
  Time (mean ± σ):     887.4 ms ±  89.0 ms    [User: 2725.6 ms, System: 428.9 ms]
  Range (min … max):   846.9 ms … 1119.2 ms    10 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):     359.9 ms ±   5.0 ms    [User: 717.6 ms, System: 294.7 ms]
  Range (min … max):   354.0 ms … 368.7 ms    10 runs
 
Summary
  oxfmt ran
    2.47 ± 0.25 times faster than biome
   30.22 ± 0.54 times faster than prettier+oxc-parser
   36.24 ± 0.70 times faster than prettier

Memory Usage:
  prettier: 385.9 MB (min: 356.0 MB, max: 414.6 MB)
  prettier+oxc-parser: 317.6 MB (min: 309.6 MB, max: 324.1 MB)
  biome: 63.6 MB (min: 60.8 MB, max: 69.0 MB)
  oxfmt: 136.3 MB (min: 129.3 MB, max: 140.1 MB)

JS/TS (no embedded) benchmark complete!


=========================================
Benchmarking Mixed (embedded)
=========================================

Target: Storybook repository (mixed with embedded languages)
- 1 warmup runs, 3 benchmark runs
- Git reset before each run

Benchmark 1: prettier+oxc-parser
  Time (mean ± σ):     41.444 s ±  0.244 s    [User: 51.053 s, System: 4.152 s]
  Range (min … max):   41.162 s … 41.586 s    3 runs
 
Benchmark 2: oxfmt
  Time (mean ± σ):     12.537 s ±  0.218 s    [User: 44.573 s, System: 4.272 s]
  Range (min … max):   12.377 s … 12.786 s    3 runs
 
Summary
  oxfmt ran
    3.31 ± 0.06 times faster than prettier+oxc-parser

Memory Usage:
  prettier+oxc-parser: 1150.1 MB (min: 1147.9 MB, max: 1151.9 MB)
  oxfmt: 530.3 MB (min: 494.7 MB, max: 567.0 MB)

Mixed (embedded) benchmark complete!


=========================================
Benchmarking Full features
=========================================

Target: Continue repository (full features)
- 1 warmup runs, 3 benchmark runs
- Git reset before each run

Benchmark 1: prettier+oxc-parser
  Time (mean ± σ):     55.263 s ±  0.193 s    [User: 59.170 s, System: 10.608 s]
  Range (min … max):   55.051 s … 55.430 s    3 runs
 
Benchmark 2: oxfmt
  Time (mean ± σ):      5.864 s ±  0.074 s    [User: 20.992 s, System: 1.879 s]
  Range (min … max):    5.785 s …  5.933 s    3 runs
 
Summary
  oxfmt ran
    9.42 ± 0.12 times faster than prettier+oxc-parser

Memory Usage:
  prettier+oxc-parser: 667.2 MB (min: 657.7 MB, max: 676.3 MB)
  oxfmt: 321.7 MB (min: 316.7 MB, max: 328.2 MB)

Full features benchmark complete!

=========================================
All benchmarks complete!
=========================================
```
<!-- BENCHMARK_RESULTS_END -->
