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
  Time (mean ± σ):      2.061 s ±  0.036 s    [User: 2.269 s, System: 1.047 s]
  Range (min … max):    2.025 s …  2.120 s    5 runs

Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):      1.231 s ±  0.012 s    [User: 1.246 s, System: 0.531 s]
  Range (min … max):    1.220 s …  1.249 s    5 runs

Benchmark 3: biome
  Time (mean ± σ):     128.7 ms ±   1.4 ms    [User: 107.2 ms, System: 26.1 ms]
  Range (min … max):   126.9 ms … 130.5 ms    5 runs

Benchmark 4: oxfmt
  Time (mean ± σ):     118.1 ms ±   2.1 ms    [User: 51.3 ms, System: 20.7 ms]
  Range (min … max):   115.6 ms … 120.6 ms    5 runs

Summary
  oxfmt ran
    1.09 ± 0.02 times faster than biome
   10.42 ± 0.21 times faster than prettier+oxc-parser
   17.45 ± 0.44 times faster than prettier

Memory Usage:
  prettier: 337.9 MB (min: 333.3 MB, max: 345.6 MB)
  prettier+oxc-parser: 203.4 MB (min: 201.7 MB, max: 205.8 MB)
  biome: 63.0 MB (min: 62.8 MB, max: 63.2 MB)
  oxfmt: 102.8 MB (min: 102.8 MB, max: 102.9 MB)

Large single file benchmark complete!


=========================================
Benchmarking JS/TS (no embedded)
=========================================

Target: Outline repository (js/ts/tsx only)
- 3 warmup runs, 10 benchmark runs
- Git reset before each run

Benchmark 1: prettier
  Time (mean ± σ):     18.011 s ±  0.177 s    [User: 30.723 s, System: 0.843 s]
  Range (min … max):   17.767 s … 18.278 s    10 runs

Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):     14.846 s ±  0.058 s    [User: 19.929 s, System: 0.772 s]
  Range (min … max):   14.757 s … 14.952 s    10 runs

Benchmark 3: biome
  Time (mean ± σ):      1.289 s ±  0.099 s    [User: 4.119 s, System: 0.359 s]
  Range (min … max):    1.236 s …  1.488 s    10 runs

Benchmark 4: oxfmt
  Time (mean ± σ):     404.9 ms ±   2.8 ms    [User: 910.3 ms, System: 307.3 ms]
  Range (min … max):   401.9 ms … 411.3 ms    10 runs

Summary
  oxfmt ran
    3.18 ± 0.25 times faster than biome
   36.67 ± 0.29 times faster than prettier+oxc-parser
   44.48 ± 0.54 times faster than prettier

Memory Usage:
  prettier: 502.3 MB (min: 469.4 MB, max: 689.2 MB)
  prettier+oxc-parser: 361.0 MB (min: 353.2 MB, max: 371.2 MB)
  biome: 168.5 MB (min: 166.1 MB, max: 171.4 MB)
  oxfmt: 144.2 MB (min: 139.2 MB, max: 155.2 MB)

JS/TS (no embedded) benchmark complete!


=========================================
Benchmarking Mixed (embedded)
=========================================

Target: Storybook repository (mixed with embedded languages)
- 1 warmup runs, 3 benchmark runs
- Git reset before each run

Benchmark 1: prettier+oxc-parser
  Time (mean ± σ):     77.695 s ±  0.089 s    [User: 88.831 s, System: 6.470 s]
  Range (min … max):   77.620 s … 77.794 s    3 runs

Benchmark 2: oxfmt
  Time (mean ± σ):     15.286 s ±  0.070 s    [User: 56.428 s, System: 3.242 s]
  Range (min … max):   15.239 s … 15.366 s    3 runs

Summary
  oxfmt ran
    5.08 ± 0.02 times faster than prettier+oxc-parser

Memory Usage:
  prettier+oxc-parser: 1670.2 MB (min: 1551.7 MB, max: 1796.8 MB)
  oxfmt: 485.8 MB (min: 479.2 MB, max: 498.3 MB)

Mixed (embedded) benchmark complete!


=========================================
Benchmarking Full features
=========================================

Target: Continue repository (full features)
- 1 warmup runs, 3 benchmark runs
- Git reset before each run

Benchmark 1: prettier+oxc-parser
  Time (mean ± σ):     35.619 s ±  0.201 s    [User: 47.017 s, System: 2.025 s]
  Range (min … max):   35.423 s … 35.825 s    3 runs

Benchmark 2: oxfmt
  Time (mean ± σ):      5.125 s ±  0.073 s    [User: 17.775 s, System: 1.554 s]
  Range (min … max):    5.044 s …  5.184 s    3 runs

Summary
  oxfmt ran
    6.95 ± 0.11 times faster than prettier+oxc-parser

Memory Usage:
  prettier+oxc-parser: 654.2 MB (min: 648.0 MB, max: 658.0 MB)
  oxfmt: 330.4 MB (min: 326.6 MB, max: 334.1 MB)

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
