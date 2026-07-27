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
- **Biome**: 2.5.5
- **Oxfmt**: 0.60.0

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
  Time (mean ± σ):      2.152 s ±  0.014 s    [User: 2.127 s, System: 1.207 s]
  Range (min … max):    2.130 s …  2.164 s    5 runs

Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):      1.271 s ±  0.007 s    [User: 1.187 s, System: 0.597 s]
  Range (min … max):    1.265 s …  1.282 s    5 runs

Benchmark 3: biome
  Time (mean ± σ):     135.8 ms ±   1.8 ms    [User: 112.4 ms, System: 28.1 ms]
  Range (min … max):   133.9 ms … 138.1 ms    5 runs

Benchmark 4: oxfmt
  Time (mean ± σ):     152.1 ms ±   8.3 ms    [User: 157.8 ms, System: 71.0 ms]
  Range (min … max):   146.2 ms … 166.7 ms    5 runs

Summary
  biome ran
    1.12 ± 0.06 times faster than oxfmt
    9.36 ± 0.13 times faster than prettier+oxc-parser
   15.85 ± 0.23 times faster than prettier

Memory Usage:
  prettier: 310.4 MB (min: 298.4 MB, max: 319.4 MB)
  prettier+oxc-parser: 199.3 MB (min: 196.6 MB, max: 200.8 MB)
  biome: 63.0 MB (min: 61.7 MB, max: 64.0 MB)
  oxfmt: 103.4 MB (min: 103.2 MB, max: 103.4 MB)

Large single file benchmark complete!


=========================================
Benchmarking JS/TS (no embedded)
=========================================

Target: Outline repository (js/ts/tsx only)
- 3 warmup runs, 10 benchmark runs
- Git reset before each run

Benchmark 1: prettier
  Time (mean ± σ):     15.542 s ±  0.095 s    [User: 26.193 s, System: 2.000 s]
  Range (min … max):   15.393 s … 15.704 s    10 runs

Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):     12.689 s ±  0.074 s    [User: 16.652 s, System: 1.110 s]
  Range (min … max):   12.577 s … 12.777 s    10 runs

Benchmark 3: biome
  Time (mean ± σ):      1.203 s ±  0.090 s    [User: 3.658 s, System: 0.461 s]
  Range (min … max):    1.147 s …  1.393 s    10 runs

Benchmark 4: oxfmt
  Time (mean ± σ):     407.9 ms ±   3.5 ms    [User: 866.4 ms, System: 332.2 ms]
  Range (min … max):   403.4 ms … 415.5 ms    10 runs

Summary
  oxfmt ran
    2.95 ± 0.22 times faster than biome
   31.11 ± 0.32 times faster than prettier+oxc-parser
   38.10 ± 0.40 times faster than prettier

Memory Usage:
  prettier: 413.1 MB (min: 377.6 MB, max: 510.1 MB)
  prettier+oxc-parser: 315.6 MB (min: 309.7 MB, max: 318.1 MB)
  biome: 156.2 MB (min: 152.7 MB, max: 160.1 MB)
  oxfmt: 139.0 MB (min: 130.0 MB, max: 143.4 MB)

JS/TS (no embedded) benchmark complete!


=========================================
Benchmarking Mixed (embedded)
=========================================

Target: Storybook repository (mixed with embedded languages)
- 1 warmup runs, 3 benchmark runs
- Git reset before each run

Benchmark 1: prettier+oxc-parser
  Time (mean ± σ):     66.193 s ±  0.411 s    [User: 74.876 s, System: 7.915 s]
  Range (min … max):   65.870 s … 66.656 s    3 runs

Benchmark 2: oxfmt
  Time (mean ± σ):     13.995 s ±  0.271 s    [User: 50.537 s, System: 3.374 s]
  Range (min … max):   13.809 s … 14.306 s    3 runs

Summary
  oxfmt ran
    4.73 ± 0.10 times faster than prettier+oxc-parser

Memory Usage:
  prettier+oxc-parser: 1632.1 MB (min: 1465.7 MB, max: 1728.1 MB)
  oxfmt: 483.5 MB (min: 436.8 MB, max: 544.0 MB)

Mixed (embedded) benchmark complete!


=========================================
Benchmarking Full features
=========================================

Target: Continue repository (full features)
- 1 warmup runs, 3 benchmark runs
- Git reset before each run

Benchmark 1: prettier+oxc-parser
  Time (mean ± σ):     33.908 s ±  0.108 s    [User: 43.420 s, System: 3.606 s]
  Range (min … max):   33.788 s … 33.997 s    3 runs

Benchmark 2: oxfmt
  Time (mean ± σ):      5.175 s ±  0.408 s    [User: 17.344 s, System: 1.607 s]
  Range (min … max):    4.852 s …  5.634 s    3 runs

Summary
  oxfmt ran
    6.55 ± 0.52 times faster than prettier+oxc-parser

Memory Usage:
  prettier+oxc-parser: 641.0 MB (min: 631.1 MB, max: 651.6 MB)
  oxfmt: 327.4 MB (min: 294.1 MB, max: 355.5 MB)

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
