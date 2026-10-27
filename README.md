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
- **Biome**: 2.6.2
- **Oxfmt**: 0.75.0

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
  Time (mean ± σ):      1.715 s ±  0.042 s    [User: 2.029 s, System: 0.852 s]
  Range (min … max):    1.676 s …  1.769 s    5 runs

Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):     996.8 ms ±  19.4 ms    [User: 1093.7 ms, System: 423.0 ms]
  Range (min … max):   978.3 ms … 1020.4 ms    5 runs

Benchmark 3: biome
  Time (mean ± σ):      95.6 ms ±   2.0 ms    [User: 70.7 ms, System: 28.1 ms]
  Range (min … max):    93.7 ms …  98.9 ms    5 runs

Benchmark 4: oxfmt
  Time (mean ± σ):      59.3 ms ±   3.7 ms    [User: 43.6 ms, System: 19.6 ms]
  Range (min … max):    55.8 ms …  65.3 ms    5 runs

Summary
  oxfmt ran
    1.61 ± 0.11 times faster than biome
   16.81 ± 1.09 times faster than prettier+oxc-parser
   28.92 ± 1.93 times faster than prettier

Memory Usage:
  prettier: 334.7 MB (min: 330.9 MB, max: 340.3 MB)
  prettier+oxc-parser: 201.2 MB (min: 200.4 MB, max: 201.7 MB)
  biome: 47.4 MB (min: 47.4 MB, max: 47.5 MB)
  oxfmt: 91.7 MB (min: 91.3 MB, max: 91.8 MB)

Large single file benchmark complete!


=========================================
Benchmarking JS/TS (no embedded)
=========================================

Target: Outline repository (js/ts/tsx only)
- 3 warmup runs, 10 benchmark runs
- Git reset before each run

Benchmark 1: prettier
  Time (mean ± σ):     17.064 s ±  0.251 s    [User: 29.825 s, System: 1.016 s]
  Range (min … max):   16.709 s … 17.494 s    10 runs

Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):     13.621 s ±  0.175 s    [User: 18.670 s, System: 0.975 s]
  Range (min … max):   13.284 s … 13.820 s    10 runs

Benchmark 3: biome
  Time (mean ± σ):     801.0 ms ±  10.9 ms    [User: 2704.1 ms, System: 260.2 ms]
  Range (min … max):   785.5 ms … 816.3 ms    10 runs

Benchmark 4: oxfmt
  Time (mean ± σ):     253.3 ms ±   5.0 ms    [User: 724.5 ms, System: 124.0 ms]
  Range (min … max):   244.1 ms … 262.2 ms    10 runs

Summary
  oxfmt ran
    3.16 ± 0.08 times faster than biome
   53.78 ± 1.26 times faster than prettier+oxc-parser
   67.37 ± 1.65 times faster than prettier

Memory Usage:
  prettier: 494.3 MB (min: 480.0 MB, max: 521.1 MB)
  prettier+oxc-parser: 362.6 MB (min: 358.1 MB, max: 370.2 MB)
  biome: 161.4 MB (min: 159.7 MB, max: 163.1 MB)
  oxfmt: 130.3 MB (min: 127.9 MB, max: 131.9 MB)

JS/TS (no embedded) benchmark complete!


=========================================
Benchmarking Mixed (embedded)
=========================================

Target: Storybook repository (mixed with embedded languages)
- 1 warmup runs, 3 benchmark runs
- Git reset before each run

Benchmark 1: prettier+oxc-parser
  Time (mean ± σ):     77.198 s ±  2.299 s    [User: 90.196 s, System: 4.123 s]
  Range (min … max):   75.356 s … 79.775 s    3 runs

Benchmark 2: oxfmt
  Time (mean ± σ):      5.129 s ±  0.054 s    [User: 18.307 s, System: 1.261 s]
  Range (min … max):    5.089 s …  5.190 s    3 runs

Summary
  oxfmt ran
   15.05 ± 0.47 times faster than prettier+oxc-parser

Memory Usage:
  prettier+oxc-parser: 1340.6 MB (min: 1267.9 MB, max: 1404.8 MB)
  oxfmt: 271.9 MB (min: 261.8 MB, max: 280.7 MB)

Mixed (embedded) benchmark complete!


=========================================
Benchmarking Full features
=========================================

Target: Continue repository (full features)
- 1 warmup runs, 3 benchmark runs
- Git reset before each run

Benchmark 1: prettier+oxc-parser
  Time (mean ± σ):     31.570 s ±  0.217 s    [User: 41.406 s, System: 2.621 s]
  Range (min … max):   31.334 s … 31.761 s    3 runs

Benchmark 2: oxfmt
  Time (mean ± σ):      2.998 s ±  0.034 s    [User: 10.591 s, System: 0.811 s]
  Range (min … max):    2.962 s …  3.030 s    3 runs

Summary
  oxfmt ran
   10.53 ± 0.14 times faster than prettier+oxc-parser

Memory Usage:
  prettier+oxc-parser: 671.7 MB (min: 613.6 MB, max: 702.7 MB)
  oxfmt: 221.1 MB (min: 209.9 MB, max: 235.4 MB)

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
