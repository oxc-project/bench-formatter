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
- **Biome**: 2.5.11
- **Oxfmt**: 0.66.0

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
  Time (mean ± σ):      2.215 s ±  0.060 s    [User: 2.274 s, System: 1.193 s]
  Range (min … max):    2.153 s …  2.287 s    5 runs

Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):      1.273 s ±  0.005 s    [User: 1.230 s, System: 0.586 s]
  Range (min … max):    1.266 s …  1.280 s    5 runs

Benchmark 3: biome
  Time (mean ± σ):     132.3 ms ±   1.5 ms    [User: 105.6 ms, System: 31.3 ms]
  Range (min … max):   130.8 ms … 134.7 ms    5 runs

Benchmark 4: oxfmt
  Time (mean ± σ):     117.5 ms ±   1.9 ms    [User: 49.4 ms, System: 21.9 ms]
  Range (min … max):   115.3 ms … 119.7 ms    5 runs

Summary
  oxfmt ran
    1.13 ± 0.02 times faster than biome
   10.84 ± 0.18 times faster than prettier+oxc-parser
   18.85 ± 0.59 times faster than prettier

Memory Usage:
  prettier: 337.4 MB (min: 332.9 MB, max: 345.3 MB)
  prettier+oxc-parser: 202.0 MB (min: 201.6 MB, max: 203.0 MB)
  biome: 63.9 MB (min: 62.9 MB, max: 65.5 MB)
  oxfmt: 100.2 MB (min: 100.1 MB, max: 100.2 MB)

Large single file benchmark complete!


=========================================
Benchmarking JS/TS (no embedded)
=========================================

Target: Outline repository (js/ts/tsx only)
- 3 warmup runs, 10 benchmark runs
- Git reset before each run

Benchmark 1: prettier
  Time (mean ± σ):     17.074 s ±  0.119 s    [User: 29.045 s, System: 1.356 s]
  Range (min … max):   16.902 s … 17.277 s    10 runs

Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):     14.600 s ±  0.290 s    [User: 19.419 s, System: 1.250 s]
  Range (min … max):   14.119 s … 15.032 s    10 runs

Benchmark 3: biome
  Time (mean ± σ):      1.182 s ±  0.004 s    [User: 3.849 s, System: 0.366 s]
  Range (min … max):    1.176 s …  1.188 s    10 runs

Benchmark 4: oxfmt
  Time (mean ± σ):     374.8 ms ±   3.2 ms    [User: 813.4 ms, System: 285.4 ms]
  Range (min … max):   371.0 ms … 382.8 ms    10 runs

Summary
  oxfmt ran
    3.15 ± 0.03 times faster than biome
   38.95 ± 0.84 times faster than prettier+oxc-parser
   45.55 ± 0.51 times faster than prettier

Memory Usage:
  prettier: 500.9 MB (min: 468.0 MB, max: 535.3 MB)
  prettier+oxc-parser: 360.1 MB (min: 357.0 MB, max: 365.6 MB)
  biome: 171.4 MB (min: 167.3 MB, max: 175.8 MB)
  oxfmt: 145.7 MB (min: 140.6 MB, max: 152.0 MB)

JS/TS (no embedded) benchmark complete!


=========================================
Benchmarking Mixed (embedded)
=========================================

Target: Storybook repository (mixed with embedded languages)
- 1 warmup runs, 3 benchmark runs
- Git reset before each run

Benchmark 1: prettier+oxc-parser
  Time (mean ± σ):     77.932 s ±  0.686 s    [User: 87.214 s, System: 8.648 s]
  Range (min … max):   77.248 s … 78.621 s    3 runs

Benchmark 2: oxfmt
  Time (mean ± σ):     15.024 s ±  0.177 s    [User: 53.789 s, System: 3.361 s]
  Range (min … max):   14.819 s … 15.135 s    3 runs

Summary
  oxfmt ran
    5.19 ± 0.08 times faster than prettier+oxc-parser

Memory Usage:
  prettier+oxc-parser: 1625.9 MB (min: 1569.7 MB, max: 1703.8 MB)
  oxfmt: 565.5 MB (min: 530.5 MB, max: 603.6 MB)

Mixed (embedded) benchmark complete!


=========================================
Benchmarking Full features
=========================================

Target: Continue repository (full features)
- 1 warmup runs, 3 benchmark runs
- Git reset before each run

Benchmark 1: prettier+oxc-parser
  Time (mean ± σ):     34.399 s ±  0.211 s    [User: 44.377 s, System: 3.601 s]
  Range (min … max):   34.251 s … 34.641 s    3 runs

Benchmark 2: oxfmt
  Time (mean ± σ):      4.949 s ±  0.063 s    [User: 16.658 s, System: 1.617 s]
  Range (min … max):    4.877 s …  4.994 s    3 runs

Summary
  oxfmt ran
    6.95 ± 0.10 times faster than prettier+oxc-parser

Memory Usage:
  prettier+oxc-parser: 655.4 MB (min: 642.0 MB, max: 664.3 MB)
  oxfmt: 353.8 MB (min: 349.7 MB, max: 357.9 MB)

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
