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
- **Biome**: 2.5.13
- **Oxfmt**: 0.68.0

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
  Time (mean ± σ):      2.149 s ±  0.028 s    [User: 2.406 s, System: 1.080 s]
  Range (min … max):    2.107 s …  2.185 s    5 runs

Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):      1.302 s ±  0.009 s    [User: 1.329 s, System: 0.557 s]
  Range (min … max):    1.288 s …  1.313 s    5 runs

Benchmark 3: biome
  Time (mean ± σ):     137.0 ms ±   2.1 ms    [User: 112.2 ms, System: 30.1 ms]
  Range (min … max):   134.8 ms … 140.4 ms    5 runs

Benchmark 4: oxfmt
  Time (mean ± σ):      73.4 ms ±   2.7 ms    [User: 57.5 ms, System: 20.7 ms]
  Range (min … max):    70.6 ms …  76.7 ms    5 runs

Summary
  oxfmt ran
    1.87 ± 0.07 times faster than biome
   17.73 ± 0.66 times faster than prettier+oxc-parser
   29.28 ± 1.14 times faster than prettier

Memory Usage:
  prettier: 329.3 MB (min: 320.7 MB, max: 341.8 MB)
  prettier+oxc-parser: 201.2 MB (min: 199.9 MB, max: 202.8 MB)
  biome: 62.4 MB (min: 60.4 MB, max: 63.6 MB)
  oxfmt: 102.4 MB (min: 102.4 MB, max: 102.5 MB)

Large single file benchmark complete!


=========================================
Benchmarking JS/TS (no embedded)
=========================================

Target: Outline repository (js/ts/tsx only)
- 3 warmup runs, 10 benchmark runs
- Git reset before each run

Benchmark 1: prettier
  Time (mean ± σ):     19.853 s ±  0.372 s    [User: 33.618 s, System: 0.899 s]
  Range (min … max):   19.295 s … 20.497 s    10 runs

Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):     16.492 s ±  0.143 s    [User: 22.142 s, System: 0.855 s]
  Range (min … max):   16.190 s … 16.647 s    10 runs

Benchmark 3: biome
  Time (mean ± σ):      1.311 s ±  0.118 s    [User: 4.133 s, System: 0.384 s]
  Range (min … max):    1.246 s …  1.602 s    10 runs

Benchmark 4: oxfmt
  Time (mean ± σ):     366.4 ms ±   5.5 ms    [User: 929.1 ms, System: 316.2 ms]
  Range (min … max):   358.7 ms … 375.2 ms    10 runs

Summary
  oxfmt ran
    3.58 ± 0.33 times faster than biome
   45.01 ± 0.78 times faster than prettier+oxc-parser
   54.18 ± 1.30 times faster than prettier

Memory Usage:
  prettier: 496.0 MB (min: 467.3 MB, max: 583.9 MB)
  prettier+oxc-parser: 360.6 MB (min: 358.0 MB, max: 362.9 MB)
  biome: 168.3 MB (min: 165.3 MB, max: 173.3 MB)
  oxfmt: 144.9 MB (min: 136.1 MB, max: 150.1 MB)

JS/TS (no embedded) benchmark complete!


=========================================
Benchmarking Mixed (embedded)
=========================================

Target: Storybook repository (mixed with embedded languages)
- 1 warmup runs, 3 benchmark runs
- Git reset before each run

Benchmark 1: prettier+oxc-parser
  Time (mean ± σ):     86.446 s ±  0.781 s    [User: 99.209 s, System: 6.755 s]
  Range (min … max):   85.684 s … 87.245 s    3 runs

Benchmark 2: oxfmt
  Time (mean ± σ):     16.128 s ±  0.093 s    [User: 59.500 s, System: 3.421 s]
  Range (min … max):   16.021 s … 16.190 s    3 runs

Summary
  oxfmt ran
    5.36 ± 0.06 times faster than prettier+oxc-parser

Memory Usage:
  prettier+oxc-parser: 1672.5 MB (min: 1540.6 MB, max: 1912.0 MB)
  oxfmt: 482.5 MB (min: 460.6 MB, max: 512.9 MB)

Mixed (embedded) benchmark complete!


=========================================
Benchmarking Full features
=========================================

Target: Continue repository (full features)
- 1 warmup runs, 3 benchmark runs
- Git reset before each run

Benchmark 1: prettier+oxc-parser
  Time (mean ± σ):     38.661 s ±  0.353 s    [User: 51.219 s, System: 2.063 s]
  Range (min … max):   38.255 s … 38.893 s    3 runs

Benchmark 2: oxfmt
  Time (mean ± σ):      5.335 s ±  0.153 s    [User: 18.648 s, System: 1.616 s]
  Range (min … max):    5.182 s …  5.489 s    3 runs

Summary
  oxfmt ran
    7.25 ± 0.22 times faster than prettier+oxc-parser

Memory Usage:
  prettier+oxc-parser: 658.1 MB (min: 620.8 MB, max: 695.4 MB)
  oxfmt: 333.4 MB (min: 324.2 MB, max: 349.6 MB)

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
