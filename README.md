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
- **Biome**: 2.5.15
- **Oxfmt**: 0.73.0

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
  Time (mean ± σ):      2.118 s ±  0.046 s    [User: 2.336 s, System: 1.061 s]
  Range (min … max):    2.082 s …  2.199 s    5 runs

Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):      1.252 s ±  0.015 s    [User: 1.272 s, System: 0.536 s]
  Range (min … max):    1.236 s …  1.272 s    5 runs

Benchmark 3: biome
  Time (mean ± σ):     129.2 ms ±   0.3 ms    [User: 103.1 ms, System: 30.7 ms]
  Range (min … max):   128.9 ms … 129.8 ms    5 runs

Benchmark 4: oxfmt
  Time (mean ± σ):      70.4 ms ±   2.0 ms    [User: 52.7 ms, System: 21.0 ms]
  Range (min … max):    67.5 ms …  72.4 ms    5 runs

Summary
  oxfmt ran
    1.84 ± 0.05 times faster than biome
   17.79 ± 0.54 times faster than prettier+oxc-parser
   30.08 ± 1.06 times faster than prettier

Memory Usage:
  prettier: 336.9 MB (min: 327.1 MB, max: 348.1 MB)
  prettier+oxc-parser: 203.1 MB (min: 201.3 MB, max: 203.8 MB)
  biome: 61.9 MB (min: 61.3 MB, max: 63.0 MB)
  oxfmt: 98.9 MB (min: 98.5 MB, max: 99.2 MB)

Large single file benchmark complete!


=========================================
Benchmarking JS/TS (no embedded)
=========================================

Target: Outline repository (js/ts/tsx only)
- 3 warmup runs, 10 benchmark runs
- Git reset before each run

Benchmark 1: prettier
  Time (mean ± σ):     19.371 s ±  0.484 s    [User: 33.040 s, System: 0.877 s]
  Range (min … max):   18.599 s … 19.984 s    10 runs

Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):     16.075 s ±  0.168 s    [User: 21.711 s, System: 0.848 s]
  Range (min … max):   15.791 s … 16.281 s    10 runs

Benchmark 3: biome
  Time (mean ± σ):      1.244 s ±  0.002 s    [User: 4.113 s, System: 0.366 s]
  Range (min … max):    1.240 s …  1.246 s    10 runs

Benchmark 4: oxfmt
  Time (mean ± σ):     371.2 ms ±   2.6 ms    [User: 973.6 ms, System: 307.0 ms]
  Range (min … max):   366.2 ms … 374.2 ms    10 runs

Summary
  oxfmt ran
    3.35 ± 0.02 times faster than biome
   43.30 ± 0.54 times faster than prettier+oxc-parser
   52.18 ± 1.35 times faster than prettier

Memory Usage:
  prettier: 532.1 MB (min: 479.3 MB, max: 718.0 MB)
  prettier+oxc-parser: 366.9 MB (min: 361.4 MB, max: 378.2 MB)
  biome: 173.5 MB (min: 171.9 MB, max: 175.7 MB)
  oxfmt: 149.0 MB (min: 143.9 MB, max: 157.4 MB)

JS/TS (no embedded) benchmark complete!


=========================================
Benchmarking Mixed (embedded)
=========================================

Target: Storybook repository (mixed with embedded languages)
- 1 warmup runs, 3 benchmark runs
- Git reset before each run

Benchmark 1: prettier+oxc-parser
  Time (mean ± σ):     85.258 s ±  0.540 s    [User: 97.499 s, System: 6.696 s]
  Range (min … max):   84.638 s … 85.629 s    3 runs

Benchmark 2: oxfmt
  Time (mean ± σ):      5.816 s ±  0.019 s    [User: 20.092 s, System: 1.967 s]
  Range (min … max):    5.794 s …  5.830 s    3 runs

Summary
  oxfmt ran
   14.66 ± 0.10 times faster than prettier+oxc-parser

Memory Usage:
  prettier+oxc-parser: 1722.0 MB (min: 1663.4 MB, max: 1837.8 MB)
  oxfmt: 275.2 MB (min: 257.8 MB, max: 287.0 MB)

Mixed (embedded) benchmark complete!


=========================================
Benchmarking Full features
=========================================

Target: Continue repository (full features)
- 1 warmup runs, 3 benchmark runs
- Git reset before each run

Benchmark 1: prettier+oxc-parser
  Time (mean ± σ):     35.182 s ±  0.019 s    [User: 46.366 s, System: 1.938 s]
  Range (min … max):   35.160 s … 35.193 s    3 runs

Benchmark 2: oxfmt
  Time (mean ± σ):      3.462 s ±  0.039 s    [User: 12.111 s, System: 1.115 s]
  Range (min … max):    3.417 s …  3.487 s    3 runs

Summary
  oxfmt ran
   10.16 ± 0.12 times faster than prettier+oxc-parser

Memory Usage:
  prettier+oxc-parser: 683.4 MB (min: 634.0 MB, max: 755.1 MB)
  oxfmt: 213.1 MB (min: 212.6 MB, max: 213.7 MB)

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
