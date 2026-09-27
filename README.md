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
  Time (mean ± σ):      2.090 s ±  0.016 s    [User: 2.320 s, System: 1.060 s]
  Range (min … max):    2.066 s …  2.107 s    5 runs

Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):      1.254 s ±  0.005 s    [User: 1.284 s, System: 0.528 s]
  Range (min … max):    1.247 s …  1.262 s    5 runs

Benchmark 3: biome
  Time (mean ± σ):     128.8 ms ±   0.7 ms    [User: 104.9 ms, System: 28.5 ms]
  Range (min … max):   128.2 ms … 129.8 ms    5 runs

Benchmark 4: oxfmt
  Time (mean ± σ):      68.7 ms ±   3.6 ms    [User: 52.8 ms, System: 19.9 ms]
  Range (min … max):    65.7 ms …  74.7 ms    5 runs

Summary
  oxfmt ran
    1.87 ± 0.10 times faster than biome
   18.25 ± 0.95 times faster than prettier+oxc-parser
   30.40 ± 1.59 times faster than prettier

Memory Usage:
  prettier: 332.5 MB (min: 325.7 MB, max: 339.0 MB)
  prettier+oxc-parser: 202.8 MB (min: 200.9 MB, max: 204.4 MB)
  biome: 65.5 MB (min: 64.7 MB, max: 66.6 MB)
  oxfmt: 99.7 MB (min: 99.7 MB, max: 99.9 MB)

Large single file benchmark complete!


=========================================
Benchmarking JS/TS (no embedded)
=========================================

Target: Outline repository (js/ts/tsx only)
- 3 warmup runs, 10 benchmark runs
- Git reset before each run

Benchmark 1: prettier
  Time (mean ± σ):     19.213 s ±  0.218 s    [User: 32.590 s, System: 0.870 s]
  Range (min … max):   18.781 s … 19.562 s    10 runs

Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):     15.804 s ±  0.122 s    [User: 21.350 s, System: 0.829 s]
  Range (min … max):   15.623 s … 16.072 s    10 runs

Benchmark 3: biome
  Time (mean ± σ):      1.313 s ±  0.117 s    [User: 4.119 s, System: 0.377 s]
  Range (min … max):    1.253 s …  1.550 s    10 runs

Benchmark 4: oxfmt
  Time (mean ± σ):     373.7 ms ±   1.9 ms    [User: 958.8 ms, System: 327.4 ms]
  Range (min … max):   369.8 ms … 376.3 ms    10 runs

Summary
  oxfmt ran
    3.51 ± 0.31 times faster than biome
   42.29 ± 0.39 times faster than prettier+oxc-parser
   51.42 ± 0.64 times faster than prettier

Memory Usage:
  prettier: 489.5 MB (min: 464.1 MB, max: 581.4 MB)
  prettier+oxc-parser: 361.6 MB (min: 356.8 MB, max: 368.2 MB)
  biome: 173.8 MB (min: 171.4 MB, max: 176.3 MB)
  oxfmt: 142.9 MB (min: 135.3 MB, max: 150.0 MB)

JS/TS (no embedded) benchmark complete!


=========================================
Benchmarking Mixed (embedded)
=========================================

Target: Storybook repository (mixed with embedded languages)
- 1 warmup runs, 3 benchmark runs
- Git reset before each run

Benchmark 1: prettier+oxc-parser
  Time (mean ± σ):     88.661 s ±  0.797 s    [User: 101.387 s, System: 6.954 s]
  Range (min … max):   87.817 s … 89.401 s    3 runs

Benchmark 2: oxfmt
  Time (mean ± σ):     16.772 s ±  0.628 s    [User: 59.631 s, System: 3.357 s]
  Range (min … max):   16.170 s … 17.423 s    3 runs

Summary
  oxfmt ran
    5.29 ± 0.20 times faster than prettier+oxc-parser

Memory Usage:
  prettier+oxc-parser: 1720.2 MB (min: 1680.8 MB, max: 1741.8 MB)
  oxfmt: 668.9 MB (min: 609.8 MB, max: 714.3 MB)

Mixed (embedded) benchmark complete!


=========================================
Benchmarking Full features
=========================================

Target: Continue repository (full features)
- 1 warmup runs, 3 benchmark runs
- Git reset before each run

Benchmark 1: prettier+oxc-parser
  Time (mean ± σ):     37.158 s ±  0.864 s    [User: 48.897 s, System: 2.088 s]
  Range (min … max):   36.416 s … 38.106 s    3 runs

Benchmark 2: oxfmt
  Time (mean ± σ):      5.161 s ±  0.058 s    [User: 18.080 s, System: 1.557 s]
  Range (min … max):    5.123 s …  5.228 s    3 runs

Summary
  oxfmt ran
    7.20 ± 0.19 times faster than prettier+oxc-parser

Memory Usage:
  prettier+oxc-parser: 685.5 MB (min: 651.5 MB, max: 747.3 MB)
  oxfmt: 331.6 MB (min: 323.0 MB, max: 342.3 MB)

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
