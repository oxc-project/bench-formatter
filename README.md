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
  Time (mean ± σ):      2.101 s ±  0.019 s    [User: 2.314 s, System: 1.081 s]
  Range (min … max):    2.089 s …  2.135 s    5 runs

Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):      1.268 s ±  0.004 s    [User: 1.284 s, System: 0.549 s]
  Range (min … max):    1.262 s …  1.272 s    5 runs

Benchmark 3: biome
  Time (mean ± σ):     130.6 ms ±   2.4 ms    [User: 110.5 ms, System: 24.9 ms]
  Range (min … max):   128.2 ms … 134.4 ms    5 runs

Benchmark 4: oxfmt
  Time (mean ± σ):     117.8 ms ±   2.0 ms    [User: 52.6 ms, System: 20.3 ms]
  Range (min … max):   115.2 ms … 120.2 ms    5 runs

Summary
  oxfmt ran
    1.11 ± 0.03 times faster than biome
   10.76 ± 0.19 times faster than prettier+oxc-parser
   17.84 ± 0.35 times faster than prettier

Memory Usage:
  prettier: 330.3 MB (min: 324.0 MB, max: 337.3 MB)
  prettier+oxc-parser: 202.6 MB (min: 200.5 MB, max: 204.1 MB)
  biome: 63.2 MB (min: 62.6 MB, max: 63.8 MB)
  oxfmt: 102.7 MB (min: 102.6 MB, max: 102.7 MB)

Large single file benchmark complete!


=========================================
Benchmarking JS/TS (no embedded)
=========================================

Target: Outline repository (js/ts/tsx only)
- 3 warmup runs, 10 benchmark runs
- Git reset before each run

Benchmark 1: prettier
  Time (mean ± σ):     18.769 s ±  0.191 s    [User: 31.790 s, System: 0.881 s]
  Range (min … max):   18.609 s … 19.266 s    10 runs

Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):     15.679 s ±  0.149 s    [User: 20.975 s, System: 0.820 s]
  Range (min … max):   15.434 s … 15.956 s    10 runs

Benchmark 3: biome
  Time (mean ± σ):      1.310 s ±  0.119 s    [User: 4.163 s, System: 0.358 s]
  Range (min … max):    1.247 s …  1.603 s    10 runs

Benchmark 4: oxfmt
  Time (mean ± σ):     402.7 ms ±   2.9 ms    [User: 893.7 ms, System: 320.2 ms]
  Range (min … max):   399.7 ms … 409.6 ms    10 runs

Summary
  oxfmt ran
    3.25 ± 0.30 times faster than biome
   38.94 ± 0.47 times faster than prettier+oxc-parser
   46.61 ± 0.58 times faster than prettier

Memory Usage:
  prettier: 483.5 MB (min: 471.0 MB, max: 501.0 MB)
  prettier+oxc-parser: 363.1 MB (min: 356.9 MB, max: 389.4 MB)
  biome: 168.9 MB (min: 167.4 MB, max: 170.5 MB)
  oxfmt: 145.9 MB (min: 136.6 MB, max: 153.2 MB)

JS/TS (no embedded) benchmark complete!


=========================================
Benchmarking Mixed (embedded)
=========================================

Target: Storybook repository (mixed with embedded languages)
- 1 warmup runs, 3 benchmark runs
- Git reset before each run

Benchmark 1: prettier+oxc-parser
  Time (mean ± σ):     81.501 s ±  0.394 s    [User: 93.103 s, System: 6.641 s]
  Range (min … max):   81.123 s … 81.908 s    3 runs

Benchmark 2: oxfmt
  Time (mean ± σ):     16.294 s ±  0.834 s    [User: 59.070 s, System: 3.324 s]
  Range (min … max):   15.804 s … 17.257 s    3 runs

Summary
  oxfmt ran
    5.00 ± 0.26 times faster than prettier+oxc-parser

Memory Usage:
  prettier+oxc-parser: 1599.4 MB (min: 1559.0 MB, max: 1646.3 MB)
  oxfmt: 623.3 MB (min: 575.9 MB, max: 684.8 MB)

Mixed (embedded) benchmark complete!


=========================================
Benchmarking Full features
=========================================

Target: Continue repository (full features)
- 1 warmup runs, 3 benchmark runs
- Git reset before each run

Benchmark 1: prettier+oxc-parser
  Time (mean ± σ):     37.231 s ±  0.156 s    [User: 48.907 s, System: 2.028 s]
  Range (min … max):   37.116 s … 37.409 s    3 runs

Benchmark 2: oxfmt
  Time (mean ± σ):      5.391 s ±  0.095 s    [User: 18.071 s, System: 1.609 s]
  Range (min … max):    5.316 s …  5.498 s    3 runs

Summary
  oxfmt ran
    6.91 ± 0.13 times faster than prettier+oxc-parser

Memory Usage:
  prettier+oxc-parser: 649.8 MB (min: 622.5 MB, max: 664.3 MB)
  oxfmt: 333.5 MB (min: 315.5 MB, max: 359.8 MB)

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
