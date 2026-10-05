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
- **Biome**: 2.5.15
- **Oxfmt**: 0.72.0

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
  Time (mean ± σ):      2.191 s ±  0.009 s    [User: 2.221 s, System: 1.220 s]
  Range (min … max):    2.181 s …  2.202 s    5 runs

Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):      1.303 s ±  0.011 s    [User: 1.231 s, System: 0.618 s]
  Range (min … max):    1.291 s …  1.315 s    5 runs

Benchmark 3: biome
  Time (mean ± σ):     131.4 ms ±   1.7 ms    [User: 105.1 ms, System: 31.3 ms]
  Range (min … max):   129.7 ms … 133.7 ms    5 runs

Benchmark 4: oxfmt
  Time (mean ± σ):      68.9 ms ±   3.1 ms    [User: 50.6 ms, System: 22.2 ms]
  Range (min … max):    65.1 ms …  72.7 ms    5 runs

Summary
  oxfmt ran
    1.91 ± 0.09 times faster than biome
   18.91 ± 0.86 times faster than prettier+oxc-parser
   31.80 ± 1.43 times faster than prettier

Memory Usage:
  prettier: 332.5 MB (min: 326.5 MB, max: 343.4 MB)
  prettier+oxc-parser: 201.3 MB (min: 200.6 MB, max: 202.3 MB)
  biome: 62.1 MB (min: 61.6 MB, max: 63.1 MB)
  oxfmt: 100.3 MB (min: 100.2 MB, max: 100.3 MB)

Large single file benchmark complete!


=========================================
Benchmarking JS/TS (no embedded)
=========================================

Target: Outline repository (js/ts/tsx only)
- 3 warmup runs, 10 benchmark runs
- Git reset before each run

Benchmark 1: prettier
  Time (mean ± σ):     18.200 s ±  0.455 s    [User: 30.916 s, System: 1.418 s]
  Range (min … max):   17.613 s … 19.031 s    10 runs

Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):     14.652 s ±  0.118 s    [User: 19.647 s, System: 1.269 s]
  Range (min … max):   14.456 s … 14.810 s    10 runs

Benchmark 3: biome
  Time (mean ± σ):      1.198 s ±  0.062 s    [User: 3.777 s, System: 0.362 s]
  Range (min … max):    1.166 s …  1.373 s    10 runs

Benchmark 4: oxfmt
  Time (mean ± σ):     339.2 ms ±   2.7 ms    [User: 857.6 ms, System: 297.2 ms]
  Range (min … max):   335.0 ms … 341.5 ms    10 runs

Summary
  oxfmt ran
    3.53 ± 0.19 times faster than biome
   43.20 ± 0.49 times faster than prettier+oxc-parser
   53.66 ± 1.41 times faster than prettier

Memory Usage:
  prettier: 492.6 MB (min: 475.6 MB, max: 506.2 MB)
  prettier+oxc-parser: 364.7 MB (min: 353.4 MB, max: 387.1 MB)
  biome: 171.9 MB (min: 169.2 MB, max: 175.1 MB)
  oxfmt: 144.2 MB (min: 135.2 MB, max: 150.0 MB)

JS/TS (no embedded) benchmark complete!


=========================================
Benchmarking Mixed (embedded)
=========================================

Target: Storybook repository (mixed with embedded languages)
- 1 warmup runs, 3 benchmark runs
- Git reset before each run

Benchmark 1: prettier+oxc-parser
  Time (mean ± σ):     85.768 s ±  2.023 s    [User: 96.102 s, System: 9.255 s]
  Range (min … max):   84.439 s … 88.096 s    3 runs

Benchmark 2: oxfmt
  Time (mean ± σ):      5.688 s ±  0.044 s    [User: 19.690 s, System: 1.960 s]
  Range (min … max):    5.642 s …  5.731 s    3 runs

Summary
  oxfmt ran
   15.08 ± 0.37 times faster than prettier+oxc-parser

Memory Usage:
  prettier+oxc-parser: 1709.5 MB (min: 1680.9 MB, max: 1746.5 MB)
  oxfmt: 279.6 MB (min: 275.5 MB, max: 284.4 MB)

Mixed (embedded) benchmark complete!


=========================================
Benchmarking Full features
=========================================

Target: Continue repository (full features)
- 1 warmup runs, 3 benchmark runs
- Git reset before each run

Benchmark 1: prettier+oxc-parser
  Time (mean ± σ):     38.564 s ±  3.186 s    [User: 50.111 s, System: 3.750 s]
  Range (min … max):   34.897 s … 40.655 s    3 runs

Benchmark 2: oxfmt
  Time (mean ± σ):      3.814 s ±  0.036 s    [User: 13.196 s, System: 1.274 s]
  Range (min … max):    3.791 s …  3.856 s    3 runs

Summary
  oxfmt ran
   10.11 ± 0.84 times faster than prettier+oxc-parser

Memory Usage:
  prettier+oxc-parser: 678.6 MB (min: 652.9 MB, max: 699.4 MB)
  oxfmt: 214.7 MB (min: 209.6 MB, max: 219.9 MB)

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
