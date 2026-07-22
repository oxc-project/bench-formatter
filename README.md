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

- **Prettier**: 3.9.5
- **Biome**: 2.5.4
- **Oxfmt**: 0.60.0

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
  Time (mean ± σ):      1.543 s ±  0.039 s    [User: 1.790 s, System: 0.773 s]
  Range (min … max):    1.493 s …  1.585 s    5 runs

Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):     899.7 ms ±  16.7 ms    [User: 985.3 ms, System: 373.4 ms]
  Range (min … max):   884.1 ms … 921.3 ms    5 runs

Benchmark 3: biome
  Time (mean ± σ):     113.0 ms ±   1.9 ms    [User: 95.4 ms, System: 22.3 ms]
  Range (min … max):   110.0 ms … 115.1 ms    5 runs

Benchmark 4: oxfmt
  Time (mean ± σ):     142.7 ms ±   6.7 ms    [User: 160.5 ms, System: 57.4 ms]
  Range (min … max):   135.1 ms … 152.0 ms    5 runs

Summary
  biome ran
    1.26 ± 0.06 times faster than oxfmt
    7.96 ± 0.20 times faster than prettier+oxc-parser
   13.65 ± 0.41 times faster than prettier

Memory Usage:
  prettier: 310.1 MB (min: 306.3 MB, max: 319.7 MB)
  prettier+oxc-parser: 203.7 MB (min: 202.5 MB, max: 205.2 MB)
  biome: 66.5 MB (min: 65.9 MB, max: 67.1 MB)
  oxfmt: 105.2 MB (min: 105.1 MB, max: 105.2 MB)

Large single file benchmark complete!


=========================================
Benchmarking JS/TS (no embedded)
=========================================

Target: Outline repository (js/ts/tsx only)
- 3 warmup runs, 10 benchmark runs
- Git reset before each run

Benchmark 1: prettier
  Time (mean ± σ):     13.508 s ±  0.198 s    [User: 23.219 s, System: 1.329 s]
  Range (min … max):   13.308 s … 13.956 s    10 runs

Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):     10.622 s ±  0.168 s    [User: 13.868 s, System: 0.781 s]
  Range (min … max):   10.454 s … 10.916 s    10 runs

Benchmark 3: biome
  Time (mean ± σ):      1.062 s ±  0.095 s    [User: 3.260 s, System: 0.290 s]
  Range (min … max):    0.998 s …  1.289 s    10 runs

Benchmark 4: oxfmt
  Time (mean ± σ):     421.8 ms ± 116.4 ms    [User: 747.6 ms, System: 178.8 ms]
  Range (min … max):   331.6 ms … 618.8 ms    10 runs

Summary
  oxfmt ran
    2.52 ± 0.73 times faster than biome
   25.18 ± 6.96 times faster than prettier+oxc-parser
   32.03 ± 8.85 times faster than prettier

Memory Usage:
  prettier: 405.3 MB (min: 380.6 MB, max: 444.4 MB)
  prettier+oxc-parser: 312.2 MB (min: 306.7 MB, max: 316.3 MB)
  biome: 248.6 MB (min: 246.5 MB, max: 252.3 MB)
  oxfmt: 141.5 MB (min: 133.4 MB, max: 148.7 MB)

JS/TS (no embedded) benchmark complete!


=========================================
Benchmarking Mixed (embedded)
=========================================

Target: Storybook repository (mixed with embedded languages)
- 1 warmup runs, 3 benchmark runs
- Git reset before each run

Benchmark 1: prettier+oxc-parser
  Time (mean ± σ):     55.554 s ±  0.681 s    [User: 63.076 s, System: 6.138 s]
  Range (min … max):   54.777 s … 56.046 s    3 runs

Benchmark 2: oxfmt
  Time (mean ± σ):     11.583 s ±  0.184 s    [User: 42.341 s, System: 2.149 s]
  Range (min … max):   11.466 s … 11.795 s    3 runs

Summary
  oxfmt ran
    4.80 ± 0.10 times faster than prettier+oxc-parser

Memory Usage:
  prettier+oxc-parser: 1660.9 MB (min: 1642.4 MB, max: 1694.3 MB)
  oxfmt: 521.4 MB (min: 444.8 MB, max: 561.3 MB)

Mixed (embedded) benchmark complete!


=========================================
Benchmarking Full features
=========================================

Target: Continue repository (full features)
- 1 warmup runs, 3 benchmark runs
- Git reset before each run

Benchmark 1: prettier+oxc-parser
  Time (mean ± σ):     29.365 s ±  0.293 s    [User: 38.018 s, System: 2.567 s]
  Range (min … max):   29.132 s … 29.694 s    3 runs

Benchmark 2: oxfmt
  Time (mean ± σ):      4.214 s ±  0.058 s    [User: 14.660 s, System: 1.067 s]
  Range (min … max):    4.175 s …  4.280 s    3 runs

Summary
  oxfmt ran
    6.97 ± 0.12 times faster than prettier+oxc-parser

Memory Usage:
  prettier+oxc-parser: 729.2 MB (min: 628.0 MB, max: 802.9 MB)
  oxfmt: 343.8 MB (min: 335.1 MB, max: 352.9 MB)

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
