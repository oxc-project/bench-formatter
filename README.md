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

- **Prettier**: 3.8.1
- **Biome**: 2.3.14
- **Oxfmt**: 0.32.0

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
  Time (mean ± σ):      1.048 s ±  0.018 s    [User: 2.014 s, System: 0.195 s]
  Range (min … max):    1.032 s …  1.077 s    5 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):     717.2 ms ±  18.9 ms    [User: 1154.4 ms, System: 101.7 ms]
  Range (min … max):   695.0 ms … 744.2 ms    5 runs
 
Benchmark 3: biome
  Time (mean ± σ):     138.0 ms ±   3.9 ms    [User: 109.4 ms, System: 28.5 ms]
  Range (min … max):   133.8 ms … 144.2 ms    5 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):     173.4 ms ±   5.7 ms    [User: 186.1 ms, System: 82.3 ms]
  Range (min … max):   166.7 ms … 179.3 ms    5 runs
 
Summary
  biome ran
    1.26 ± 0.05 times faster than oxfmt
    5.20 ± 0.20 times faster than prettier+oxc-parser
    7.59 ± 0.25 times faster than prettier

Memory Usage:
  prettier: 224.6 MB (min: 211.3 MB, max: 246.0 MB)
  prettier+oxc-parser: 171.0 MB (min: 169.1 MB, max: 173.4 MB)
  biome: 62.6 MB (min: 61.7 MB, max: 63.8 MB)
  oxfmt: 107.3 MB (min: 107.2 MB, max: 107.5 MB)

Large single file benchmark complete!


=========================================
Benchmarking JS/TS (no embedded)
=========================================

Target: Outline repository (js/ts/tsx only)
- 3 warmup runs, 10 benchmark runs
- Git reset before each run

Benchmark 1: prettier
  Time (mean ± σ):     13.708 s ±  0.168 s    [User: 23.331 s, System: 1.772 s]
  Range (min … max):   13.445 s … 14.050 s    10 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):     11.429 s ±  0.151 s    [User: 15.181 s, System: 1.030 s]
  Range (min … max):   11.229 s … 11.747 s    10 runs
 
Benchmark 3: biome
  Time (mean ± σ):     904.2 ms ±   5.1 ms    [User: 2936.0 ms, System: 423.9 ms]
  Range (min … max):   894.0 ms … 912.1 ms    10 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):     386.1 ms ±   6.8 ms    [User: 805.2 ms, System: 307.1 ms]
  Range (min … max):   377.4 ms … 397.0 ms    10 runs
 
Summary
  oxfmt ran
    2.34 ± 0.04 times faster than biome
   29.60 ± 0.65 times faster than prettier+oxc-parser
   35.50 ± 0.76 times faster than prettier

Memory Usage:
  prettier: 396.1 MB (min: 365.5 MB, max: 420.7 MB)
  prettier+oxc-parser: 322.7 MB (min: 310.3 MB, max: 327.6 MB)
  biome: 63.9 MB (min: 61.2 MB, max: 66.2 MB)
  oxfmt: 136.1 MB (min: 130.8 MB, max: 142.8 MB)

JS/TS (no embedded) benchmark complete!


=========================================
Benchmarking Mixed (embedded)
=========================================

Target: Storybook repository (mixed with embedded languages)
- 1 warmup runs, 3 benchmark runs
- Git reset before each run

Benchmark 1: prettier+oxc-parser
  Time (mean ± σ):     40.765 s ±  0.169 s    [User: 50.230 s, System: 3.834 s]
  Range (min … max):   40.605 s … 40.942 s    3 runs
 
Benchmark 2: oxfmt
  Time (mean ± σ):     12.721 s ±  0.097 s    [User: 45.709 s, System: 3.975 s]
  Range (min … max):   12.636 s … 12.827 s    3 runs
 
Summary
  oxfmt ran
    3.20 ± 0.03 times faster than prettier+oxc-parser

Memory Usage:
  prettier+oxc-parser: 1149.3 MB (min: 1143.2 MB, max: 1152.8 MB)
  oxfmt: 549.0 MB (min: 511.8 MB, max: 580.9 MB)

Mixed (embedded) benchmark complete!


=========================================
Benchmarking Full features
=========================================

Target: Continue repository (full features)
- 1 warmup runs, 3 benchmark runs
- Git reset before each run

Benchmark 1: prettier+oxc-parser
  Time (mean ± σ):     59.939 s ±  0.135 s    [User: 63.450 s, System: 11.158 s]
  Range (min … max):   59.821 s … 60.087 s    3 runs
 
Benchmark 2: oxfmt
  Time (mean ± σ):      6.035 s ±  0.146 s    [User: 21.255 s, System: 1.746 s]
  Range (min … max):    5.900 s …  6.190 s    3 runs
 
Summary
  oxfmt ran
    9.93 ± 0.24 times faster than prettier+oxc-parser

Memory Usage:
  prettier+oxc-parser: 652.9 MB (min: 648.3 MB, max: 656.8 MB)
  oxfmt: 337.0 MB (min: 324.7 MB, max: 358.5 MB)

Full features benchmark complete!

=========================================
All benchmarks complete!
=========================================
```
<!-- BENCHMARK_RESULTS_END -->
