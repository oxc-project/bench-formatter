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
- **Biome**: 2.4.9
- **Oxfmt**: 0.42.0

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
  Time (mean ± σ):      1.130 s ±  0.057 s    [User: 2.111 s, System: 0.188 s]
  Range (min … max):    1.028 s …  1.170 s    5 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):     714.9 ms ±  11.4 ms    [User: 1163.7 ms, System: 90.7 ms]
  Range (min … max):   704.8 ms … 733.1 ms    5 runs
 
Benchmark 3: biome
  Time (mean ± σ):     164.6 ms ±   1.9 ms    [User: 138.8 ms, System: 27.5 ms]
  Range (min … max):   162.5 ms … 167.6 ms    5 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):     156.2 ms ±   2.9 ms    [User: 178.4 ms, System: 77.8 ms]
  Range (min … max):   153.7 ms … 160.8 ms    5 runs
 
Summary
  oxfmt ran
    1.05 ± 0.02 times faster than biome
    4.58 ± 0.11 times faster than prettier+oxc-parser
    7.23 ± 0.39 times faster than prettier

Memory Usage:
  prettier: 236.3 MB (min: 207.5 MB, max: 255.8 MB)
  prettier+oxc-parser: 171.9 MB (min: 168.8 MB, max: 173.2 MB)
  biome: 68.7 MB (min: 67.5 MB, max: 70.2 MB)
  oxfmt: 108.3 MB (min: 108.2 MB, max: 108.4 MB)

Large single file benchmark complete!


=========================================
Benchmarking JS/TS (no embedded)
=========================================

Target: Outline repository (js/ts/tsx only)
- 3 warmup runs, 10 benchmark runs
- Git reset before each run

Benchmark 1: prettier
  Time (mean ± σ):     14.757 s ±  0.257 s    [User: 25.188 s, System: 1.269 s]
  Range (min … max):   14.385 s … 15.218 s    10 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):     12.152 s ±  0.134 s    [User: 16.454 s, System: 0.677 s]
  Range (min … max):   11.986 s … 12.343 s    10 runs
 
Benchmark 3: biome
  Time (mean ± σ):      1.257 s ±  0.004 s    [User: 4.299 s, System: 0.442 s]
  Range (min … max):    1.250 s …  1.264 s    10 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):     397.9 ms ±   4.3 ms    [User: 854.0 ms, System: 316.4 ms]
  Range (min … max):   391.8 ms … 405.5 ms    10 runs
 
Summary
  oxfmt ran
    3.16 ± 0.04 times faster than biome
   30.54 ± 0.47 times faster than prettier+oxc-parser
   37.08 ± 0.76 times faster than prettier

Memory Usage:
  prettier: 414.0 MB (min: 380.4 MB, max: 477.9 MB)
  prettier+oxc-parser: 323.9 MB (min: 315.5 MB, max: 332.2 MB)
  biome: 71.2 MB (min: 69.0 MB, max: 72.9 MB)
  oxfmt: 136.7 MB (min: 129.6 MB, max: 143.2 MB)

JS/TS (no embedded) benchmark complete!


=========================================
Benchmarking Mixed (embedded)
=========================================

Target: Storybook repository (mixed with embedded languages)
- 1 warmup runs, 3 benchmark runs
- Git reset before each run

Benchmark 1: prettier+oxc-parser
  Time (mean ± σ):     41.426 s ±  0.422 s    [User: 52.362 s, System: 2.493 s]
  Range (min … max):   41.087 s … 41.898 s    3 runs
 
Benchmark 2: oxfmt
  Time (mean ± σ):     13.271 s ±  0.096 s    [User: 47.596 s, System: 3.882 s]
  Range (min … max):   13.163 s … 13.348 s    3 runs
 
Summary
  oxfmt ran
    3.12 ± 0.04 times faster than prettier+oxc-parser

Memory Usage:
  prettier+oxc-parser: 1103.6 MB (min: 1013.1 MB, max: 1149.3 MB)
  oxfmt: 512.6 MB (min: 507.9 MB, max: 516.8 MB)

Mixed (embedded) benchmark complete!


=========================================
Benchmarking Full features
=========================================

Target: Continue repository (full features)
- 1 warmup runs, 3 benchmark runs
- Git reset before each run

Benchmark 1: prettier+oxc-parser
  Time (mean ± σ):     62.624 s ±  0.633 s    [User: 73.714 s, System: 3.185 s]
  Range (min … max):   61.899 s … 63.067 s    3 runs
 
Benchmark 2: oxfmt
  Time (mean ± σ):      6.486 s ±  0.115 s    [User: 22.896 s, System: 1.793 s]
  Range (min … max):    6.381 s …  6.610 s    3 runs
 
Summary
  oxfmt ran
    9.66 ± 0.20 times faster than prettier+oxc-parser

Memory Usage:
  prettier+oxc-parser: 653.1 MB (min: 650.1 MB, max: 657.8 MB)
  oxfmt: 342.9 MB (min: 323.1 MB, max: 355.6 MB)

Full features benchmark complete!

=========================================
All benchmarks complete!
=========================================
```
<!-- BENCHMARK_RESULTS_END -->
