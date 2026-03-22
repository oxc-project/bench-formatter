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
- **Biome**: 2.4.8
- **Oxfmt**: 0.41.0

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
  Time (mean ± σ):      1.047 s ±  0.013 s    [User: 2.043 s, System: 0.203 s]
  Range (min … max):    1.033 s …  1.064 s    5 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):     751.2 ms ±  18.1 ms    [User: 1208.0 ms, System: 107.9 ms]
  Range (min … max):   734.1 ms … 774.5 ms    5 runs
 
Benchmark 3: biome
  Time (mean ± σ):     184.3 ms ±   6.3 ms    [User: 150.1 ms, System: 34.2 ms]
  Range (min … max):   174.8 ms … 191.7 ms    5 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):     179.9 ms ±   9.7 ms    [User: 196.4 ms, System: 86.4 ms]
  Range (min … max):   167.9 ms … 189.9 ms    5 runs
 
Summary
  oxfmt ran
    1.02 ± 0.07 times faster than biome
    4.18 ± 0.25 times faster than prettier+oxc-parser
    5.82 ± 0.32 times faster than prettier

Memory Usage:
  prettier: 236.3 MB (min: 220.6 MB, max: 250.4 MB)
  prettier+oxc-parser: 172.8 MB (min: 169.5 MB, max: 178.4 MB)
  biome: 68.0 MB (min: 67.2 MB, max: 69.6 MB)
  oxfmt: 107.9 MB (min: 107.7 MB, max: 107.9 MB)

Large single file benchmark complete!


=========================================
Benchmarking JS/TS (no embedded)
=========================================

Target: Outline repository (js/ts/tsx only)
- 3 warmup runs, 10 benchmark runs
- Git reset before each run

Benchmark 1: prettier
  Time (mean ± σ):     14.882 s ±  0.212 s    [User: 25.179 s, System: 1.770 s]
  Range (min … max):   14.537 s … 15.190 s    10 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):     12.578 s ±  0.196 s    [User: 16.728 s, System: 1.118 s]
  Range (min … max):   12.341 s … 12.812 s    10 runs
 
Benchmark 3: biome
  Time (mean ± σ):      1.286 s ±  0.008 s    [User: 4.398 s, System: 0.450 s]
  Range (min … max):    1.277 s …  1.306 s    10 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):     408.4 ms ±   4.9 ms    [User: 867.0 ms, System: 330.6 ms]
  Range (min … max):   401.5 ms … 419.9 ms    10 runs
 
Summary
  oxfmt ran
    3.15 ± 0.04 times faster than biome
   30.80 ± 0.61 times faster than prettier+oxc-parser
   36.44 ± 0.68 times faster than prettier

Memory Usage:
  prettier: 395.9 MB (min: 373.2 MB, max: 425.9 MB)
  prettier+oxc-parser: 327.3 MB (min: 319.8 MB, max: 344.1 MB)
  biome: 70.2 MB (min: 68.1 MB, max: 73.6 MB)
  oxfmt: 133.7 MB (min: 129.1 MB, max: 141.3 MB)

JS/TS (no embedded) benchmark complete!


=========================================
Benchmarking Mixed (embedded)
=========================================

Target: Storybook repository (mixed with embedded languages)
- 1 warmup runs, 3 benchmark runs
- Git reset before each run

Benchmark 1: prettier+oxc-parser
  Time (mean ± σ):     42.551 s ±  0.247 s    [User: 52.895 s, System: 4.034 s]
  Range (min … max):   42.330 s … 42.817 s    3 runs
 
Benchmark 2: oxfmt
  Time (mean ± σ):     13.441 s ±  0.049 s    [User: 48.789 s, System: 4.106 s]
  Range (min … max):   13.399 s … 13.495 s    3 runs
 
Summary
  oxfmt ran
    3.17 ± 0.02 times faster than prettier+oxc-parser

Memory Usage:
  prettier+oxc-parser: 1143.3 MB (min: 1138.9 MB, max: 1146.5 MB)
  oxfmt: 598.2 MB (min: 561.0 MB, max: 654.5 MB)

Mixed (embedded) benchmark complete!


=========================================
Benchmarking Full features
=========================================

Target: Continue repository (full features)
- 1 warmup runs, 3 benchmark runs
- Git reset before each run

Benchmark 1: prettier+oxc-parser
  Time (mean ± σ):     62.314 s ±  0.184 s    [User: 66.079 s, System: 11.522 s]
  Range (min … max):   62.132 s … 62.500 s    3 runs
 
Benchmark 2: oxfmt
  Time (mean ± σ):      6.545 s ±  0.031 s    [User: 23.261 s, System: 1.888 s]
  Range (min … max):    6.516 s …  6.578 s    3 runs
 
Summary
  oxfmt ran
    9.52 ± 0.05 times faster than prettier+oxc-parser

Memory Usage:
  prettier+oxc-parser: 644.0 MB (min: 638.2 MB, max: 647.6 MB)
  oxfmt: 353.8 MB (min: 330.4 MB, max: 370.4 MB)

Full features benchmark complete!

=========================================
All benchmarks complete!
=========================================
```
<!-- BENCHMARK_RESULTS_END -->
