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

- **Prettier**: 3.9.6
- **Biome**: 2.5.12
- **Oxfmt**: 0.67.0

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
  Time (mean ± σ):      2.200 s ±  0.013 s    [User: 2.225 s, System: 1.228 s]
  Range (min … max):    2.186 s …  2.212 s    5 runs

Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):      1.299 s ±  0.010 s    [User: 1.240 s, System: 0.606 s]
  Range (min … max):    1.290 s …  1.315 s    5 runs

Benchmark 3: biome
  Time (mean ± σ):     134.3 ms ±   1.3 ms    [User: 108.8 ms, System: 30.3 ms]
  Range (min … max):   132.2 ms … 135.9 ms    5 runs

Benchmark 4: oxfmt
  Time (mean ± σ):     118.9 ms ±   3.2 ms    [User: 50.4 ms, System: 22.3 ms]
  Range (min … max):   115.4 ms … 121.8 ms    5 runs

Summary
  oxfmt ran
    1.13 ± 0.03 times faster than biome
   10.93 ± 0.31 times faster than prettier+oxc-parser
   18.50 ± 0.51 times faster than prettier

Memory Usage:
  prettier: 335.7 MB (min: 322.7 MB, max: 347.9 MB)
  prettier+oxc-parser: 201.1 MB (min: 200.1 MB, max: 202.4 MB)
  biome: 63.4 MB (min: 63.0 MB, max: 64.1 MB)
  oxfmt: 99.9 MB (min: 99.7 MB, max: 100.0 MB)

Large single file benchmark complete!


=========================================
Benchmarking JS/TS (no embedded)
=========================================

Target: Outline repository (js/ts/tsx only)
- 3 warmup runs, 10 benchmark runs
- Git reset before each run

Benchmark 1: prettier
  Time (mean ± σ):     17.604 s ±  0.202 s    [User: 30.149 s, System: 1.400 s]
  Range (min … max):   17.332 s … 17.948 s    10 runs

Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):     14.419 s ±  0.132 s    [User: 19.338 s, System: 1.248 s]
  Range (min … max):   14.194 s … 14.665 s    10 runs

Benchmark 3: biome
  Time (mean ± σ):      1.189 s ±  0.007 s    [User: 3.850 s, System: 0.373 s]
  Range (min … max):    1.183 s …  1.207 s    10 runs

Benchmark 4: oxfmt
  Time (mean ± σ):     382.3 ms ±   4.0 ms    [User: 840.8 ms, System: 284.5 ms]
  Range (min … max):   378.0 ms … 387.8 ms    10 runs

Summary
  oxfmt ran
    3.11 ± 0.04 times faster than biome
   37.71 ± 0.53 times faster than prettier+oxc-parser
   46.04 ± 0.72 times faster than prettier

Memory Usage:
  prettier: 511.9 MB (min: 468.7 MB, max: 609.3 MB)
  prettier+oxc-parser: 359.5 MB (min: 355.2 MB, max: 363.9 MB)
  biome: 168.3 MB (min: 165.4 MB, max: 170.5 MB)
  oxfmt: 141.9 MB (min: 136.4 MB, max: 150.0 MB)

JS/TS (no embedded) benchmark complete!


=========================================
Benchmarking Mixed (embedded)
=========================================

Target: Storybook repository (mixed with embedded languages)
- 1 warmup runs, 3 benchmark runs
- Git reset before each run

Benchmark 1: prettier+oxc-parser
  Time (mean ± σ):     78.734 s ±  0.658 s    [User: 88.165 s, System: 8.877 s]
  Range (min … max):   78.163 s … 79.454 s    3 runs

Benchmark 2: oxfmt
  Time (mean ± σ):     14.720 s ±  0.068 s    [User: 53.847 s, System: 3.308 s]
  Range (min … max):   14.644 s … 14.777 s    3 runs

Summary
  oxfmt ran
    5.35 ± 0.05 times faster than prettier+oxc-parser

Memory Usage:
  prettier+oxc-parser: 1775.3 MB (min: 1600.5 MB, max: 1905.8 MB)
  oxfmt: 551.7 MB (min: 493.4 MB, max: 614.5 MB)

Mixed (embedded) benchmark complete!


=========================================
Benchmarking Full features
=========================================

Target: Continue repository (full features)
- 1 warmup runs, 3 benchmark runs
- Git reset before each run

Benchmark 1: prettier+oxc-parser
  Time (mean ± σ):     34.461 s ±  0.291 s    [User: 44.498 s, System: 3.690 s]
  Range (min … max):   34.148 s … 34.723 s    3 runs

Benchmark 2: oxfmt
  Time (mean ± σ):      4.920 s ±  0.105 s    [User: 17.025 s, System: 1.633 s]
  Range (min … max):    4.825 s …  5.033 s    3 runs

Summary
  oxfmt ran
    7.00 ± 0.16 times faster than prettier+oxc-parser

Memory Usage:
  prettier+oxc-parser: 707.4 MB (min: 624.2 MB, max: 751.4 MB)
  oxfmt: 331.6 MB (min: 311.9 MB, max: 342.3 MB)

Full features benchmark complete!

=========================================
All benchmarks complete!
=========================================
```

<!-- BENCHMARK_RESULTS_END -->

# [Sponsored By](https://oxc.rs/sponsor)

<p align="center">
  <a href="https://oxc.rs/sponsor">
    <img src="https://raw.githubusercontent.com/oxc-project/sponsors/main/sponsors.svg" alt="Our sponsors" />
  </a>
</p>
