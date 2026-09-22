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

- **Prettier**: 3.9.8
- **Biome**: 2.5.14
- **Oxfmt**: 0.70.0

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
  Time (mean ± σ):      2.060 s ±  0.028 s    [User: 2.272 s, System: 1.055 s]
  Range (min … max):    2.032 s …  2.098 s    5 runs

Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):      1.238 s ±  0.014 s    [User: 1.259 s, System: 0.533 s]
  Range (min … max):    1.220 s …  1.254 s    5 runs

Benchmark 3: biome
  Time (mean ± σ):     129.6 ms ±   0.8 ms    [User: 105.7 ms, System: 28.8 ms]
  Range (min … max):   128.7 ms … 130.7 ms    5 runs

Benchmark 4: oxfmt
  Time (mean ± σ):      67.6 ms ±   1.6 ms    [User: 51.7 ms, System: 20.7 ms]
  Range (min … max):    65.4 ms …  69.3 ms    5 runs

Summary
  oxfmt ran
    1.92 ± 0.05 times faster than biome
   18.31 ± 0.47 times faster than prettier+oxc-parser
   30.47 ± 0.82 times faster than prettier

Memory Usage:
  prettier: 331.8 MB (min: 324.6 MB, max: 336.1 MB)
  prettier+oxc-parser: 202.2 MB (min: 201.5 MB, max: 203.1 MB)
  biome: 65.0 MB (min: 64.4 MB, max: 66.8 MB)
  oxfmt: 102.4 MB (min: 102.3 MB, max: 102.5 MB)

Large single file benchmark complete!


=========================================
Benchmarking JS/TS (no embedded)
=========================================

Target: Outline repository (js/ts/tsx only)
- 3 warmup runs, 10 benchmark runs
- Git reset before each run

Benchmark 1: prettier
  Time (mean ± σ):     18.749 s ±  0.157 s    [User: 31.815 s, System: 0.854 s]
  Range (min … max):   18.399 s … 18.969 s    10 runs

Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):     15.375 s ±  0.101 s    [User: 20.686 s, System: 0.802 s]
  Range (min … max):   15.165 s … 15.489 s    10 runs

Benchmark 3: biome
  Time (mean ± σ):      1.233 s ±  0.010 s    [User: 4.075 s, System: 0.362 s]
  Range (min … max):    1.220 s …  1.260 s    10 runs

Benchmark 4: oxfmt
  Time (mean ± σ):     367.5 ms ±   3.6 ms    [User: 944.2 ms, System: 312.3 ms]
  Range (min … max):   363.1 ms … 374.2 ms    10 runs

Summary
  oxfmt ran
    3.35 ± 0.04 times faster than biome
   41.84 ± 0.49 times faster than prettier+oxc-parser
   51.02 ± 0.65 times faster than prettier

Memory Usage:
  prettier: 488.6 MB (min: 473.9 MB, max: 548.3 MB)
  prettier+oxc-parser: 362.9 MB (min: 357.1 MB, max: 367.5 MB)
  biome: 173.4 MB (min: 170.9 MB, max: 175.9 MB)
  oxfmt: 145.2 MB (min: 138.8 MB, max: 151.1 MB)

JS/TS (no embedded) benchmark complete!


=========================================
Benchmarking Mixed (embedded)
=========================================

Target: Storybook repository (mixed with embedded languages)
- 1 warmup runs, 3 benchmark runs
- Git reset before each run

Benchmark 1: prettier+oxc-parser
  Time (mean ± σ):     80.541 s ±  0.726 s    [User: 91.772 s, System: 6.579 s]
  Range (min … max):   79.744 s … 81.163 s    3 runs

Benchmark 2: oxfmt
  Time (mean ± σ):     15.636 s ±  0.085 s    [User: 58.065 s, System: 3.338 s]
  Range (min … max):   15.569 s … 15.731 s    3 runs

Summary
  oxfmt ran
    5.15 ± 0.05 times faster than prettier+oxc-parser

Memory Usage:
  prettier+oxc-parser: 1848.9 MB (min: 1746.0 MB, max: 1903.0 MB)
  oxfmt: 537.4 MB (min: 452.0 MB, max: 643.8 MB)

Mixed (embedded) benchmark complete!


=========================================
Benchmarking Full features
=========================================

Target: Continue repository (full features)
- 1 warmup runs, 3 benchmark runs
- Git reset before each run

Benchmark 1: prettier+oxc-parser
  Time (mean ± σ):     36.064 s ±  0.260 s    [User: 47.670 s, System: 2.011 s]
  Range (min … max):   35.878 s … 36.361 s    3 runs

Benchmark 2: oxfmt
  Time (mean ± σ):      5.095 s ±  0.058 s    [User: 17.808 s, System: 1.558 s]
  Range (min … max):    5.048 s …  5.160 s    3 runs

Summary
  oxfmt ran
    7.08 ± 0.10 times faster than prettier+oxc-parser

Memory Usage:
  prettier+oxc-parser: 680.0 MB (min: 640.6 MB, max: 754.0 MB)
  oxfmt: 346.9 MB (min: 339.9 MB, max: 357.0 MB)

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
