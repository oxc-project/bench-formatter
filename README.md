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
- **Biome**: 2.5.6
- **Oxfmt**: 0.61.0

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
  Time (mean ± σ):      1.353 s ±  0.075 s    [User: 1.500 s, System: 0.669 s]
  Range (min … max):    1.281 s …  1.459 s    5 runs

Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):     753.2 ms ±   4.2 ms    [User: 816.8 ms, System: 315.4 ms]
  Range (min … max):   746.5 ms … 757.5 ms    5 runs

Benchmark 3: biome
  Time (mean ± σ):      94.3 ms ±   0.9 ms    [User: 78.4 ms, System: 19.7 ms]
  Range (min … max):    93.1 ms …  95.2 ms    5 runs

Benchmark 4: oxfmt
  Time (mean ± σ):     124.6 ms ±   5.8 ms    [User: 124.5 ms, System: 44.4 ms]
  Range (min … max):   118.3 ms … 132.1 ms    5 runs

Summary
  biome ran
    1.32 ± 0.06 times faster than oxfmt
    7.98 ± 0.09 times faster than prettier+oxc-parser
   14.34 ± 0.80 times faster than prettier

Memory Usage:
  prettier: 313.7 MB (min: 304.3 MB, max: 318.8 MB)
  prettier+oxc-parser: 202.7 MB (min: 198.8 MB, max: 205.2 MB)
  biome: 63.9 MB (min: 62.5 MB, max: 64.8 MB)
  oxfmt: 99.6 MB (min: 99.5 MB, max: 99.7 MB)

Large single file benchmark complete!


=========================================
Benchmarking JS/TS (no embedded)
=========================================

Target: Outline repository (js/ts/tsx only)
- 3 warmup runs, 10 benchmark runs
- Git reset before each run

Benchmark 1: prettier
  Time (mean ± σ):     11.907 s ±  0.156 s    [User: 20.021 s, System: 1.272 s]
  Range (min … max):   11.684 s … 12.127 s    10 runs

Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):      9.417 s ±  0.115 s    [User: 12.366 s, System: 0.767 s]
  Range (min … max):    9.226 s …  9.600 s    10 runs

Benchmark 3: biome
  Time (mean ± σ):     875.2 ms ±  91.2 ms    [User: 2538.4 ms, System: 235.9 ms]
  Range (min … max):   770.5 ms … 1062.5 ms    10 runs

Benchmark 4: oxfmt
  Time (mean ± σ):     492.8 ms ± 104.2 ms    [User: 616.3 ms, System: 150.0 ms]
  Range (min … max):   356.6 ms … 657.9 ms    10 runs

Summary
  oxfmt ran
    1.78 ± 0.42 times faster than biome
   19.11 ± 4.05 times faster than prettier+oxc-parser
   24.16 ± 5.12 times faster than prettier

Memory Usage:
  prettier: 413.9 MB (min: 389.4 MB, max: 472.1 MB)
  prettier+oxc-parser: 322.4 MB (min: 313.2 MB, max: 354.0 MB)
  biome: 159.5 MB (min: 156.8 MB, max: 161.8 MB)
  oxfmt: 142.5 MB (min: 132.6 MB, max: 148.7 MB)

JS/TS (no embedded) benchmark complete!


=========================================
Benchmarking Mixed (embedded)
=========================================

Target: Storybook repository (mixed with embedded languages)
- 1 warmup runs, 3 benchmark runs
- Git reset before each run

Benchmark 1: prettier+oxc-parser
  Time (mean ± σ):     53.352 s ±  0.786 s    [User: 58.480 s, System: 6.293 s]
  Range (min … max):   52.785 s … 54.249 s    3 runs

Benchmark 2: oxfmt
  Time (mean ± σ):     10.595 s ±  0.229 s    [User: 36.489 s, System: 2.096 s]
  Range (min … max):   10.345 s … 10.796 s    3 runs

Summary
  oxfmt ran
    5.04 ± 0.13 times faster than prettier+oxc-parser

Memory Usage:
  prettier+oxc-parser: 1651.4 MB (min: 1586.6 MB, max: 1737.6 MB)
  oxfmt: 573.7 MB (min: 531.1 MB, max: 622.1 MB)

Mixed (embedded) benchmark complete!


=========================================
Benchmarking Full features
=========================================

Target: Continue repository (full features)
- 1 warmup runs, 3 benchmark runs
- Git reset before each run

Benchmark 1: prettier+oxc-parser
  Time (mean ± σ):     25.875 s ±  0.191 s    [User: 32.215 s, System: 2.598 s]
  Range (min … max):   25.700 s … 26.079 s    3 runs

Benchmark 2: oxfmt
  Time (mean ± σ):      3.551 s ±  0.051 s    [User: 12.138 s, System: 0.961 s]
  Range (min … max):    3.520 s …  3.609 s    3 runs

Summary
  oxfmt ran
    7.29 ± 0.12 times faster than prettier+oxc-parser

Memory Usage:
  prettier+oxc-parser: 628.2 MB (min: 609.3 MB, max: 651.7 MB)
  oxfmt: 330.4 MB (min: 326.9 MB, max: 337.1 MB)

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
