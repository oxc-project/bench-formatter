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

- **Prettier**: 3.9.10
- **Biome**: 2.6.6
- **Oxfmt**: 0.78.0

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
  Time (mean ± σ):      1.242 s ±  0.010 s    [User: 2.178 s, System: 0.242 s]
  Range (min … max):    1.230 s …  1.258 s    5 runs

Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):     868.0 ms ±  11.4 ms    [User: 1212.1 ms, System: 164.3 ms]
  Range (min … max):   857.9 ms … 886.0 ms    5 runs

Benchmark 3: biome
  Time (mean ± σ):     112.7 ms ±   1.0 ms    [User: 86.6 ms, System: 31.1 ms]
  Range (min … max):   111.6 ms … 113.5 ms    5 runs

Benchmark 4: oxfmt
  Time (mean ± σ):      67.9 ms ±   1.2 ms    [User: 50.8 ms, System: 20.6 ms]
  Range (min … max):    66.4 ms …  68.8 ms    5 runs

Summary
  oxfmt ran
    1.66 ± 0.03 times faster than biome
   12.79 ± 0.28 times faster than prettier+oxc-parser
   18.30 ± 0.35 times faster than prettier

Memory Usage:
  prettier: 301.8 MB (min: 291.2 MB, max: 309.2 MB)
  prettier+oxc-parser: 240.9 MB (min: 240.4 MB, max: 241.8 MB)
  biome: 48.3 MB (min: 48.3 MB, max: 48.4 MB)
  oxfmt: 89.6 MB (min: 89.5 MB, max: 89.6 MB)

Large single file benchmark complete!


=========================================
Benchmarking JS/TS (no embedded)
=========================================

Target: Outline repository (js/ts/tsx only)
- 3 warmup runs, 10 benchmark runs
- Git reset before each run

Benchmark 1: prettier
  Time (mean ± σ):     19.896 s ±  0.452 s    [User: 33.840 s, System: 1.238 s]
  Range (min … max):   19.201 s … 20.782 s    10 runs

Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):     15.891 s ±  0.319 s    [User: 20.897 s, System: 0.933 s]
  Range (min … max):   15.663 s … 16.357 s    10 runs

Benchmark 3: biome
  Time (mean ± σ):     984.0 ms ±   5.4 ms    [User: 3164.4 ms, System: 471.0 ms]
  Range (min … max):   975.2 ms … 994.9 ms    10 runs

Benchmark 4: oxfmt
  Time (mean ± σ):     345.4 ms ±   2.6 ms    [User: 898.1 ms, System: 276.2 ms]
  Range (min … max):   340.9 ms … 350.9 ms    10 runs

Summary
  oxfmt ran
    2.85 ± 0.03 times faster than biome
   46.00 ± 0.99 times faster than prettier+oxc-parser
   57.60 ± 1.38 times faster than prettier

Memory Usage:
  prettier: 477.7 MB (min: 420.5 MB, max: 523.9 MB)
  prettier+oxc-parser: 291.0 MB (min: 288.3 MB, max: 294.1 MB)
  biome: 181.4 MB (min: 180.4 MB, max: 182.5 MB)
  oxfmt: 129.8 MB (min: 121.8 MB, max: 134.6 MB)

JS/TS (no embedded) benchmark complete!


=========================================
Benchmarking Mixed (embedded)
=========================================

Target: Storybook repository (mixed with embedded languages)
- 1 warmup runs, 3 benchmark runs
- Git reset before each run

Benchmark 1: prettier+oxc-parser
  Time (mean ± σ):     82.925 s ±  1.308 s    [User: 97.560 s, System: 4.624 s]
  Range (min … max):   81.462 s … 83.982 s    3 runs

Benchmark 2: oxfmt
  Time (mean ± σ):      4.887 s ±  0.030 s    [User: 16.744 s, System: 1.565 s]
  Range (min … max):    4.857 s …  4.917 s    3 runs

Summary
  oxfmt ran
   16.97 ± 0.29 times faster than prettier+oxc-parser

Memory Usage:
  prettier+oxc-parser: 1362.3 MB (min: 1361.5 MB, max: 1363.1 MB)
  oxfmt: 811.8 MB (min: 800.6 MB, max: 822.9 MB)

Mixed (embedded) benchmark complete!


=========================================
Benchmarking Full features
=========================================

Target: Continue repository (full features)
- 1 warmup runs, 3 benchmark runs
- Git reset before each run

Benchmark 1: prettier+oxc-parser
  Time (mean ± σ):     35.213 s ±  0.579 s    [User: 45.428 s, System: 3.043 s]
  Range (min … max):   34.617 s … 35.774 s    3 runs

Benchmark 2: oxfmt
  Time (mean ± σ):      3.364 s ±  0.035 s    [User: 11.420 s, System: 1.003 s]
  Range (min … max):    3.324 s …  3.389 s    3 runs

Summary
  oxfmt ran
   10.47 ± 0.20 times faster than prettier+oxc-parser

Memory Usage:
  prettier+oxc-parser: 626.8 MB (min: 580.8 MB, max: 717.5 MB)
  oxfmt: 750.9 MB (min: 744.8 MB, max: 759.3 MB)

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
