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

- **Prettier**: 3.9.9
- **Biome**: 2.5.14
- **Oxfmt**: 0.71.0

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
  Time (mean ± σ):      1.731 s ±  0.132 s    [User: 2.064 s, System: 0.817 s]
  Range (min … max):    1.564 s …  1.900 s    5 runs

Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):     941.1 ms ±  17.8 ms    [User: 1079.1 ms, System: 370.6 ms]
  Range (min … max):   917.8 ms … 967.3 ms    5 runs

Benchmark 3: biome
  Time (mean ± σ):     117.2 ms ±   3.3 ms    [User: 100.2 ms, System: 21.6 ms]
  Range (min … max):   113.6 ms … 120.9 ms    5 runs

Benchmark 4: oxfmt
  Time (mean ± σ):      61.1 ms ±   2.6 ms    [User: 47.4 ms, System: 18.5 ms]
  Range (min … max):    57.8 ms …  64.8 ms    5 runs

Summary
  oxfmt ran
    1.92 ± 0.10 times faster than biome
   15.41 ± 0.71 times faster than prettier+oxc-parser
   28.35 ± 2.47 times faster than prettier

Memory Usage:
  prettier: 338.9 MB (min: 330.1 MB, max: 348.8 MB)
  prettier+oxc-parser: 205.0 MB (min: 204.2 MB, max: 206.2 MB)
  biome: 65.0 MB (min: 64.7 MB, max: 65.8 MB)
  oxfmt: 102.1 MB (min: 102.0 MB, max: 102.2 MB)

Large single file benchmark complete!


=========================================
Benchmarking JS/TS (no embedded)
=========================================

Target: Outline repository (js/ts/tsx only)
- 3 warmup runs, 10 benchmark runs
- Git reset before each run

Benchmark 1: prettier
  Time (mean ± σ):     15.723 s ±  0.228 s    [User: 27.261 s, System: 0.988 s]
  Range (min … max):   15.395 s … 16.043 s    10 runs

Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):     12.649 s ±  0.101 s    [User: 17.387 s, System: 0.877 s]
  Range (min … max):   12.518 s … 12.821 s    10 runs

Benchmark 3: biome
  Time (mean ± σ):      1.095 s ±  0.104 s    [User: 3.560 s, System: 0.224 s]
  Range (min … max):    1.046 s …  1.388 s    10 runs

Benchmark 4: oxfmt
  Time (mean ± σ):     279.3 ms ±   7.3 ms    [User: 793.1 ms, System: 157.4 ms]
  Range (min … max):   270.0 ms … 289.3 ms    10 runs

Summary
  oxfmt ran
    3.92 ± 0.39 times faster than biome
   45.29 ± 1.23 times faster than prettier+oxc-parser
   56.30 ± 1.68 times faster than prettier

Memory Usage:
  prettier: 522.1 MB (min: 473.9 MB, max: 670.1 MB)
  prettier+oxc-parser: 361.5 MB (min: 355.8 MB, max: 366.9 MB)
  biome: 173.9 MB (min: 169.8 MB, max: 177.7 MB)
  oxfmt: 146.9 MB (min: 133.4 MB, max: 155.5 MB)

JS/TS (no embedded) benchmark complete!


=========================================
Benchmarking Mixed (embedded)
=========================================

Target: Storybook repository (mixed with embedded languages)
- 1 warmup runs, 3 benchmark runs
- Git reset before each run

Benchmark 1: prettier+oxc-parser
  Time (mean ± σ):     72.051 s ±  2.478 s    [User: 80.824 s, System: 7.228 s]
  Range (min … max):   70.206 s … 74.868 s    3 runs

Benchmark 2: oxfmt
  Time (mean ± σ):     12.382 s ±  0.255 s    [User: 45.571 s, System: 2.176 s]
  Range (min … max):   12.192 s … 12.672 s    3 runs

Summary
  oxfmt ran
    5.82 ± 0.23 times faster than prettier+oxc-parser

Memory Usage:
  prettier+oxc-parser: 1744.5 MB (min: 1608.9 MB, max: 1890.4 MB)
  oxfmt: 549.6 MB (min: 473.0 MB, max: 588.7 MB)

Mixed (embedded) benchmark complete!


=========================================
Benchmarking Full features
=========================================

Target: Continue repository (full features)
- 1 warmup runs, 3 benchmark runs
- Git reset before each run

Benchmark 1: prettier+oxc-parser
  Time (mean ± σ):     31.624 s ±  0.791 s    [User: 41.333 s, System: 2.688 s]
  Range (min … max):   30.748 s … 32.288 s    3 runs

Benchmark 2: oxfmt
  Time (mean ± σ):      4.382 s ±  0.081 s    [User: 15.570 s, System: 1.096 s]
  Range (min … max):    4.328 s …  4.475 s    3 runs

Summary
  oxfmt ran
    7.22 ± 0.22 times faster than prettier+oxc-parser

Memory Usage:
  prettier+oxc-parser: 650.3 MB (min: 620.0 MB, max: 680.9 MB)
  oxfmt: 313.6 MB (min: 309.2 MB, max: 320.6 MB)

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
