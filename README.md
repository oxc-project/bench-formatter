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
- **Biome**: 2.5.15
- **Oxfmt**: 0.74.0

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
  Time (mean ± σ):      2.218 s ±  0.012 s    [User: 2.313 s, System: 1.191 s]
  Range (min … max):    2.200 s …  2.229 s    5 runs

Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):      1.311 s ±  0.008 s    [User: 1.278 s, System: 0.598 s]
  Range (min … max):    1.303 s …  1.320 s    5 runs

Benchmark 3: biome
  Time (mean ± σ):     140.7 ms ±   2.2 ms    [User: 111.2 ms, System: 34.4 ms]
  Range (min … max):   138.4 ms … 144.3 ms    5 runs

Benchmark 4: oxfmt
  Time (mean ± σ):      71.5 ms ±   1.5 ms    [User: 51.1 ms, System: 23.3 ms]
  Range (min … max):    69.8 ms …  73.9 ms    5 runs

Summary
  oxfmt ran
    1.97 ± 0.05 times faster than biome
   18.34 ± 0.40 times faster than prettier+oxc-parser
   31.01 ± 0.68 times faster than prettier

Memory Usage:
  prettier: 333.5 MB (min: 327.3 MB, max: 337.8 MB)
  prettier+oxc-parser: 198.4 MB (min: 196.7 MB, max: 199.4 MB)
  biome: 47.8 MB (min: 47.7 MB, max: 47.9 MB)
  oxfmt: 99.5 MB (min: 99.4 MB, max: 99.6 MB)

Large single file benchmark complete!


=========================================
Benchmarking JS/TS (no embedded)
=========================================

Target: Outline repository (js/ts/tsx only)
- 3 warmup runs, 10 benchmark runs
- Git reset before each run

Benchmark 1: prettier
  Time (mean ± σ):     19.644 s ±  0.370 s    [User: 32.910 s, System: 1.398 s]
  Range (min … max):   19.084 s … 20.266 s    10 runs

Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):     15.715 s ±  0.121 s    [User: 20.965 s, System: 1.204 s]
  Range (min … max):   15.511 s … 15.932 s    10 runs

Benchmark 3: biome
  Time (mean ± σ):      1.331 s ±  0.094 s    [User: 4.200 s, System: 0.422 s]
  Range (min … max):    1.282 s …  1.541 s    10 runs

Benchmark 4: oxfmt
  Time (mean ± σ):     346.0 ms ±   8.0 ms    [User: 901.2 ms, System: 270.7 ms]
  Range (min … max):   339.8 ms … 367.5 ms    10 runs

Summary
  oxfmt ran
    3.85 ± 0.28 times faster than biome
   45.41 ± 1.10 times faster than prettier+oxc-parser
   56.77 ± 1.69 times faster than prettier

Memory Usage:
  prettier: 502.4 MB (min: 473.8 MB, max: 587.4 MB)
  prettier+oxc-parser: 361.5 MB (min: 356.6 MB, max: 368.4 MB)
  biome: 154.7 MB (min: 153.6 MB, max: 155.9 MB)
  oxfmt: 143.0 MB (min: 137.6 MB, max: 148.6 MB)

JS/TS (no embedded) benchmark complete!


=========================================
Benchmarking Mixed (embedded)
=========================================

Target: Storybook repository (mixed with embedded languages)
- 1 warmup runs, 3 benchmark runs
- Git reset before each run

Benchmark 1: prettier+oxc-parser
  Time (mean ± σ):     97.208 s ±  0.264 s    [User: 103.584 s, System: 13.693 s]
  Range (min … max):   96.905 s … 97.386 s    3 runs

Benchmark 2: oxfmt
  Time (mean ± σ):      6.093 s ±  0.078 s    [User: 21.057 s, System: 2.034 s]
  Range (min … max):    6.036 s …  6.182 s    3 runs

Summary
  oxfmt ran
   15.95 ± 0.21 times faster than prettier+oxc-parser

Memory Usage:
  prettier+oxc-parser: 1894.8 MB (min: 1716.4 MB, max: 2018.4 MB)
  oxfmt: 287.2 MB (min: 277.1 MB, max: 293.6 MB)

Mixed (embedded) benchmark complete!


=========================================
Benchmarking Full features
=========================================

Target: Continue repository (full features)
- 1 warmup runs, 3 benchmark runs
- Git reset before each run

Benchmark 1: prettier+oxc-parser
  Time (mean ± σ):     36.560 s ±  0.178 s    [User: 46.973 s, System: 3.607 s]
  Range (min … max):   36.397 s … 36.749 s    3 runs

Benchmark 2: oxfmt
  Time (mean ± σ):      3.652 s ±  0.043 s    [User: 12.664 s, System: 1.239 s]
  Range (min … max):    3.605 s …  3.686 s    3 runs

Summary
  oxfmt ran
   10.01 ± 0.13 times faster than prettier+oxc-parser

Memory Usage:
  prettier+oxc-parser: 672.8 MB (min: 670.5 MB, max: 674.9 MB)
  oxfmt: 226.3 MB (min: 223.7 MB, max: 228.5 MB)

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
