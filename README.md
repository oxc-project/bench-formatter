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

- **Prettier**: 3.9.1
- **Biome**: 2.5.1
- **Oxfmt**: 0.59.0

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
  Time (mean ± σ):      2.207 s ±  0.058 s    [User: 2.360 s, System: 1.119 s]
  Range (min … max):    2.161 s …  2.308 s    5 runs

Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):     723.3 ms ±   8.8 ms    [User: 1126.5 ms, System: 113.6 ms]
  Range (min … max):   714.0 ms … 737.6 ms    5 runs

Benchmark 3: biome
  Time (mean ± σ):     171.1 ms ±   2.6 ms    [User: 146.5 ms, System: 29.7 ms]
  Range (min … max):   167.2 ms … 174.5 ms    5 runs

Benchmark 4: oxfmt
  Time (mean ± σ):     163.0 ms ±  10.2 ms    [User: 186.0 ms, System: 75.6 ms]
  Range (min … max):   153.4 ms … 176.2 ms    5 runs

Summary
  oxfmt ran
    1.05 ± 0.07 times faster than biome
    4.44 ± 0.28 times faster than prettier+oxc-parser
   13.54 ± 0.92 times faster than prettier

Memory Usage:
  prettier: 311.1 MB (min: 297.0 MB, max: 324.7 MB)
  prettier+oxc-parser: 188.5 MB (min: 186.4 MB, max: 189.9 MB)
  biome: 70.1 MB (min: 69.9 MB, max: 70.2 MB)
  oxfmt: 105.1 MB (min: 105.1 MB, max: 105.2 MB)

Large single file benchmark complete!


=========================================
Benchmarking JS/TS (no embedded)
=========================================

Target: Outline repository (js/ts/tsx only)
- 3 warmup runs, 10 benchmark runs
- Git reset before each run

Benchmark 1: prettier
  Time (mean ± σ):     17.776 s ±  0.197 s    [User: 29.722 s, System: 1.407 s]
  Range (min … max):   17.554 s … 18.133 s    10 runs

Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):     14.621 s ±  0.206 s    [User: 19.562 s, System: 0.801 s]
  Range (min … max):   14.263 s … 15.013 s    10 runs

Benchmark 3: biome
  Time (mean ± σ):      1.520 s ±  0.105 s    [User: 5.031 s, System: 0.518 s]
  Range (min … max):    1.459 s …  1.720 s    10 runs

Benchmark 4: oxfmt
  Time (mean ± σ):     436.3 ms ±   5.7 ms    [User: 954.4 ms, System: 352.8 ms]
  Range (min … max):   428.8 ms … 444.4 ms    10 runs

Summary
  oxfmt ran
    3.48 ± 0.24 times faster than biome
   33.51 ± 0.64 times faster than prettier+oxc-parser
   40.74 ± 0.70 times faster than prettier

Memory Usage:
  prettier: 415.4 MB (min: 367.1 MB, max: 476.9 MB)
  prettier+oxc-parser: 331.4 MB (min: 328.0 MB, max: 339.9 MB)
  biome: 79.6 MB (min: 77.1 MB, max: 84.1 MB)
  oxfmt: 139.9 MB (min: 133.2 MB, max: 147.2 MB)

JS/TS (no embedded) benchmark complete!


=========================================
Benchmarking Mixed (embedded)
=========================================

Target: Storybook repository (mixed with embedded languages)
- 1 warmup runs, 3 benchmark runs
- Git reset before each run

Benchmark 1: prettier+oxc-parser
  Time (mean ± σ):     67.796 s ±  1.523 s    [User: 82.857 s, System: 2.343 s]
  Range (min … max):   66.118 s … 69.089 s    3 runs

Benchmark 2: oxfmt
  Time (mean ± σ):     16.276 s ±  0.088 s    [User: 58.471 s, System: 3.420 s]
  Range (min … max):   16.176 s … 16.344 s    3 runs

Summary
  oxfmt ran
    4.17 ± 0.10 times faster than prettier+oxc-parser

Memory Usage:
  prettier+oxc-parser: 1294.0 MB (min: 1224.9 MB, max: 1431.1 MB)
  oxfmt: 596.4 MB (min: 508.5 MB, max: 693.9 MB)

Mixed (embedded) benchmark complete!


=========================================
Benchmarking Full features
=========================================

Target: Continue repository (full features)
- 1 warmup runs, 3 benchmark runs
- Git reset before each run

Benchmark 1: prettier+oxc-parser
  Time (mean ± σ):     39.283 s ±  0.999 s    [User: 52.004 s, System: 1.747 s]
  Range (min … max):   38.153 s … 40.048 s    3 runs

Benchmark 2: oxfmt
  Time (mean ± σ):      5.827 s ±  0.099 s    [User: 20.382 s, System: 1.743 s]
  Range (min … max):    5.713 s …  5.898 s    3 runs

Summary
  oxfmt ran
    6.74 ± 0.21 times faster than prettier+oxc-parser

Memory Usage:
  prettier+oxc-parser: 682.3 MB (min: 675.9 MB, max: 691.2 MB)
  oxfmt: 363.8 MB (min: 356.8 MB, max: 374.2 MB)

Full features benchmark complete!

=========================================
All benchmarks complete!
=========================================
```

<!-- BENCHMARK_RESULTS_END -->

## ❤ Who's [Sponsoring Oxc](https://github.com/sponsors/Boshen)?

<p align="center">
  <a href="https://github.com/sponsors/Boshen">
    <img src="https://raw.githubusercontent.com/Boshen/sponsors/main/sponsors.svg" alt="Our sponsors" />
  </a>
</p>
