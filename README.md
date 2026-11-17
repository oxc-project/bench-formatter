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

- **Prettier**: 3.10.1
- **Biome**: 2.6.7
- **Oxfmt**: 0.79.0

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
  Time (mean ± σ):     695.9 ms ±   7.0 ms    [User: 1445.1 ms, System: 111.3 ms]
  Range (min … max):   686.3 ms … 704.4 ms    5 runs

Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):     468.6 ms ±   2.5 ms    [User: 782.2 ms, System: 73.5 ms]
  Range (min … max):   465.2 ms … 470.7 ms    5 runs

Benchmark 3: biome
  Time (mean ± σ):      85.1 ms ±   1.7 ms    [User: 63.7 ms, System: 24.7 ms]
  Range (min … max):    83.3 ms …  87.3 ms    5 runs

Benchmark 4: oxfmt
  Time (mean ± σ):      51.3 ms ±   3.3 ms    [User: 40.7 ms, System: 14.7 ms]
  Range (min … max):    48.3 ms …  56.3 ms    5 runs

Summary
  oxfmt ran
    1.66 ± 0.11 times faster than biome
    9.14 ± 0.59 times faster than prettier+oxc-parser
   13.57 ± 0.88 times faster than prettier

Memory Usage:
  prettier: 240.9 MB (min: 227.9 MB, max: 247.2 MB)
  prettier+oxc-parser: 182.8 MB (min: 180.0 MB, max: 185.2 MB)
  biome: 47.9 MB (min: 47.8 MB, max: 48.1 MB)
  oxfmt: 89.2 MB (min: 89.2 MB, max: 89.4 MB)

Large single file benchmark complete!


=========================================
Benchmarking JS/TS (no embedded)
=========================================

Target: Outline repository (js/ts/tsx only)
- 3 warmup runs, 10 benchmark runs
- Git reset before each run

Benchmark 1: prettier
  Time (mean ± σ):     13.156 s ±  0.262 s    [User: 24.001 s, System: 0.608 s]
  Range (min … max):   12.663 s … 13.520 s    10 runs

Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):      9.800 s ±  0.055 s    [User: 13.720 s, System: 0.452 s]
  Range (min … max):    9.699 s …  9.883 s    10 runs

Benchmark 3: biome
  Time (mean ± σ):     653.4 ms ±   4.5 ms    [User: 2165.9 ms, System: 245.5 ms]
  Range (min … max):   647.2 ms … 664.0 ms    10 runs

Benchmark 4: oxfmt
  Time (mean ± σ):     204.1 ms ±   2.0 ms    [User: 576.7 ms, System: 103.9 ms]
  Range (min … max):   199.7 ms … 206.5 ms    10 runs

Summary
  oxfmt ran
    3.20 ± 0.04 times faster than biome
   48.03 ± 0.54 times faster than prettier+oxc-parser
   64.47 ± 1.43 times faster than prettier

Memory Usage:
  prettier: 439.9 MB (min: 408.2 MB, max: 473.9 MB)
  prettier+oxc-parser: 303.7 MB (min: 271.7 MB, max: 351.1 MB)
  biome: 183.5 MB (min: 181.0 MB, max: 185.6 MB)
  oxfmt: 129.8 MB (min: 124.0 MB, max: 134.7 MB)

JS/TS (no embedded) benchmark complete!


=========================================
Benchmarking Mixed (embedded)
=========================================

Target: Storybook repository (mixed with embedded languages)
- 1 warmup runs, 3 benchmark runs
- Git reset before each run

Benchmark 1: prettier+oxc-parser
  Time (mean ± σ):     38.877 s ±  0.468 s    [User: 50.472 s, System: 1.851 s]
  Range (min … max):   38.394 s … 39.330 s    3 runs

Benchmark 2: oxfmt
  Time (mean ± σ):      3.148 s ±  0.029 s    [User: 11.198 s, System: 0.753 s]
  Range (min … max):    3.117 s …  3.175 s    3 runs

Summary
  oxfmt ran
   12.35 ± 0.19 times faster than prettier+oxc-parser

Memory Usage:
  prettier+oxc-parser: 1093.9 MB (min: 728.9 MB, max: 1310.4 MB)
  oxfmt: 752.1 MB (min: 743.1 MB, max: 765.8 MB)

Mixed (embedded) benchmark complete!


=========================================
Benchmarking Full features
=========================================

Target: Continue repository (full features)
- 1 warmup runs, 3 benchmark runs
- Git reset before each run

Benchmark 1: prettier+oxc-parser
  Time (mean ± σ):     23.458 s ±  0.051 s    [User: 32.153 s, System: 1.383 s]
  Range (min … max):   23.412 s … 23.513 s    3 runs

Benchmark 2: oxfmt
  Time (mean ± σ):      2.235 s ±  0.024 s    [User: 7.887 s, System: 0.524 s]
  Range (min … max):    2.214 s …  2.262 s    3 runs

Summary
  oxfmt ran
   10.49 ± 0.12 times faster than prettier+oxc-parser

Memory Usage:
  prettier+oxc-parser: 593.7 MB (min: 590.0 MB, max: 595.8 MB)
  oxfmt: 770.8 MB (min: 765.9 MB, max: 777.9 MB)

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
