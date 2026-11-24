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
- **Oxfmt**: 0.80.0

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
  Time (mean ± σ):     809.0 ms ±  11.1 ms    [User: 1547.3 ms, System: 176.5 ms]
  Range (min … max):   796.9 ms … 827.0 ms    5 runs

Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):     549.3 ms ±   3.7 ms    [User: 842.7 ms, System: 103.2 ms]
  Range (min … max):   542.9 ms … 552.7 ms    5 runs

Benchmark 3: biome
  Time (mean ± σ):      94.8 ms ±   1.0 ms    [User: 68.0 ms, System: 30.8 ms]
  Range (min … max):    93.7 ms …  96.0 ms    5 runs

Benchmark 4: oxfmt
  Time (mean ± σ):      56.4 ms ±   1.0 ms    [User: 37.0 ms, System: 21.2 ms]
  Range (min … max):    55.5 ms …  58.0 ms    5 runs

Summary
  oxfmt ran
    1.68 ± 0.04 times faster than biome
    9.75 ± 0.19 times faster than prettier+oxc-parser
   14.36 ± 0.33 times faster than prettier

Memory Usage:
  prettier: 247.9 MB (min: 238.3 MB, max: 256.6 MB)
  prettier+oxc-parser: 180.8 MB (min: 180.1 MB, max: 181.9 MB)
  biome: 48.0 MB (min: 47.9 MB, max: 48.2 MB)
  oxfmt: 91.6 MB (min: 91.5 MB, max: 91.6 MB)

Large single file benchmark complete!


=========================================
Benchmarking JS/TS (no embedded)
=========================================

Target: Outline repository (js/ts/tsx only)
- 3 warmup runs, 10 benchmark runs
- Git reset before each run

Benchmark 1: prettier
  Time (mean ± σ):     15.722 s ±  0.488 s    [User: 27.731 s, System: 0.915 s]
  Range (min … max):   14.913 s … 16.483 s    10 runs

Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):     11.005 s ±  0.169 s    [User: 15.062 s, System: 0.611 s]
  Range (min … max):   10.803 s … 11.306 s    10 runs

Benchmark 3: biome
  Time (mean ± σ):     768.1 ms ±  79.2 ms    [User: 2325.3 ms, System: 325.6 ms]
  Range (min … max):   722.1 ms … 950.3 ms    10 runs

Benchmark 4: oxfmt
  Time (mean ± σ):     258.6 ms ±  32.1 ms    [User: 637.6 ms, System: 181.8 ms]
  Range (min … max):   244.9 ms … 349.5 ms    10 runs

Summary
  oxfmt ran
    2.97 ± 0.48 times faster than biome
   42.55 ± 5.32 times faster than prettier+oxc-parser
   60.79 ± 7.77 times faster than prettier

Memory Usage:
  prettier: 459.9 MB (min: 395.0 MB, max: 579.7 MB)
  prettier+oxc-parser: 295.8 MB (min: 268.5 MB, max: 319.7 MB)
  biome: 186.4 MB (min: 185.9 MB, max: 186.8 MB)
  oxfmt: 131.9 MB (min: 128.4 MB, max: 135.0 MB)

JS/TS (no embedded) benchmark complete!


=========================================
Benchmarking Mixed (embedded)
=========================================

Target: Storybook repository (mixed with embedded languages)
- 1 warmup runs, 3 benchmark runs
- Git reset before each run

Benchmark 1: prettier+oxc-parser
  Time (mean ± σ):     42.828 s ±  0.185 s    [User: 54.520 s, System: 2.466 s]
  Range (min … max):   42.616 s … 42.955 s    3 runs

Benchmark 2: oxfmt
  Time (mean ± σ):      3.600 s ±  0.061 s    [User: 12.422 s, System: 1.122 s]
  Range (min … max):    3.543 s …  3.665 s    3 runs

Summary
  oxfmt ran
   11.90 ± 0.21 times faster than prettier+oxc-parser

Memory Usage:
  prettier+oxc-parser: 1310.9 MB (min: 1309.7 MB, max: 1312.6 MB)
  oxfmt: 815.4 MB (min: 794.5 MB, max: 828.2 MB)

Mixed (embedded) benchmark complete!


=========================================
Benchmarking Full features
=========================================

Target: Continue repository (full features)
- 1 warmup runs, 3 benchmark runs
- Git reset before each run

Benchmark 1: prettier+oxc-parser
  Time (mean ± σ):     25.202 s ±  0.365 s    [User: 33.569 s, System: 2.000 s]
  Range (min … max):   24.796 s … 25.502 s    3 runs

Benchmark 2: oxfmt
  Time (mean ± σ):      2.560 s ±  0.049 s    [User: 8.857 s, System: 0.777 s]
  Range (min … max):    2.528 s …  2.617 s    3 runs

Summary
  oxfmt ran
    9.84 ± 0.24 times faster than prettier+oxc-parser

Memory Usage:
  prettier+oxc-parser: 606.7 MB (min: 573.3 MB, max: 656.3 MB)
  oxfmt: 795.4 MB (min: 784.1 MB, max: 811.0 MB)

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
