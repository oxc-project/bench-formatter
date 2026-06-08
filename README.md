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

- **Prettier**: 3.8.3
- **Biome**: 2.4.16
- **Oxfmt**: 0.54.0

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
  Time (mean ± σ):      1.086 s ±  0.081 s    [User: 2.061 s, System: 0.183 s]
  Range (min … max):    1.011 s …  1.177 s    5 runs

Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):     711.5 ms ±   8.0 ms    [User: 1138.6 ms, System: 104.9 ms]
  Range (min … max):   697.2 ms … 715.6 ms    5 runs

Benchmark 3: biome
  Time (mean ± σ):     165.5 ms ±   1.5 ms    [User: 140.2 ms, System: 30.5 ms]
  Range (min … max):   164.3 ms … 167.8 ms    5 runs

Benchmark 4: oxfmt
  Time (mean ± σ):     157.3 ms ±   4.1 ms    [User: 187.4 ms, System: 68.5 ms]
  Range (min … max):   153.0 ms … 163.7 ms    5 runs

Summary
  oxfmt ran
    1.05 ± 0.03 times faster than biome
    4.52 ± 0.13 times faster than prettier+oxc-parser
    6.90 ± 0.55 times faster than prettier

Memory Usage:
  prettier: 239.2 MB (min: 224.7 MB, max: 255.6 MB)
  prettier+oxc-parser: 175.5 MB (min: 174.0 MB, max: 178.5 MB)
  biome: 67.5 MB (min: 65.9 MB, max: 69.0 MB)
  oxfmt: 104.5 MB (min: 104.5 MB, max: 104.6 MB)

Large single file benchmark complete!


=========================================
Benchmarking JS/TS (no embedded)
=========================================

Target: Outline repository (js/ts/tsx only)
- 3 warmup runs, 10 benchmark runs
- Git reset before each run

Benchmark 1: prettier
  Time (mean ± σ):     15.619 s ±  0.173 s    [User: 26.680 s, System: 1.345 s]
  Range (min … max):   15.363 s … 15.866 s    10 runs

Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):     13.390 s ±  0.242 s    [User: 17.958 s, System: 0.723 s]
  Range (min … max):   13.125 s … 13.710 s    10 runs

Benchmark 3: biome
  Time (mean ± σ):      1.365 s ±  0.004 s    [User: 4.812 s, System: 0.377 s]
  Range (min … max):    1.359 s …  1.369 s    10 runs

Benchmark 4: oxfmt
  Time (mean ± σ):     432.7 ms ±   3.2 ms    [User: 955.6 ms, System: 343.7 ms]
  Range (min … max):   428.2 ms … 439.1 ms    10 runs

Summary
  oxfmt ran
    3.15 ± 0.02 times faster than biome
   30.94 ± 0.60 times faster than prettier+oxc-parser
   36.09 ± 0.48 times faster than prettier

Memory Usage:
  prettier: 413.7 MB (min: 387.2 MB, max: 440.9 MB)
  prettier+oxc-parser: 336.4 MB (min: 322.8 MB, max: 355.7 MB)
  biome: 72.6 MB (min: 70.1 MB, max: 74.5 MB)
  oxfmt: 139.0 MB (min: 134.6 MB, max: 143.0 MB)

JS/TS (no embedded) benchmark complete!


=========================================
Benchmarking Mixed (embedded)
=========================================

Target: Storybook repository (mixed with embedded languages)
- 1 warmup runs, 3 benchmark runs
- Git reset before each run

Benchmark 1: prettier+oxc-parser
  Time (mean ± σ):     44.349 s ±  0.209 s    [User: 55.530 s, System: 2.622 s]
  Range (min … max):   44.201 s … 44.588 s    3 runs

Benchmark 2: oxfmt
  Time (mean ± σ):     13.782 s ±  0.087 s    [User: 47.788 s, System: 3.836 s]
  Range (min … max):   13.708 s … 13.878 s    3 runs

Summary
  oxfmt ran
    3.22 ± 0.03 times faster than prettier+oxc-parser

Memory Usage:
  prettier+oxc-parser: 1165.3 MB (min: 1162.1 MB, max: 1168.8 MB)
  oxfmt: 539.3 MB (min: 457.9 MB, max: 631.3 MB)

Mixed (embedded) benchmark complete!


=========================================
Benchmarking Full features
=========================================

Target: Continue repository (full features)
- 1 warmup runs, 3 benchmark runs
- Git reset before each run

Benchmark 1: prettier+oxc-parser
  Time (mean ± σ):     35.149 s ±  0.235 s    [User: 46.733 s, System: 1.623 s]
  Range (min … max):   34.905 s … 35.373 s    3 runs

Benchmark 2: oxfmt
  Time (mean ± σ):      5.178 s ±  0.164 s    [User: 17.665 s, System: 1.535 s]
  Range (min … max):    4.994 s …  5.310 s    3 runs

Summary
  oxfmt ran
    6.79 ± 0.22 times faster than prettier+oxc-parser

Memory Usage:
  prettier+oxc-parser: 666.9 MB (min: 656.2 MB, max: 674.9 MB)
  oxfmt: 308.0 MB (min: 286.7 MB, max: 330.8 MB)

Full features benchmark complete!

=========================================
All benchmarks complete!
=========================================
```

<!-- BENCHMARK_RESULTS_END -->
