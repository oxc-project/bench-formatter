# JavaScript/TypeScript Formatter Benchmark

Comparing execution time and memory usage of **Prettier**, **Biome**, and **Oxfmt**.

## Formatters

- [Prettier](https://prettier.io/)
- [Prettier](https://prettier.io/) + @prettier/plugin-oxc
- [Biome](https://biomejs.dev/) Formatter
- [Oxfmt](https://oxc.rs)

## Versions

- **Prettier**: 3.7.4
- **Biome**: 2.3.11
- **Oxfmt**: 0.26.0

## Setup

```bash
# Install dependencies and clone fixtures
pnpm run setup

# Run the benchmark
pnpm run bench
```

## Notes

- Each formatter runs on the exact same codebase state (git reset between runs)
- Times include both parsing and formatting of all matched files
- Memory measurements track peak resident set size (RSS) during execution
- I intended to bench checker.ts, but it appears to be running for a very long time or stuck with 100% CPU.

## Benchmark Details

- **Test Data**:
  - [Outline](https://github.com/outline/outline) repository (1925 files, ~198K lines of JS/JSX/TS/TSX code)
  - TypeScript compiler's [parser.ts](https://github.com/microsoft/TypeScript/blob/v5.9.2/src/compiler/parser.ts) (~13.7K lines, single large file)
- **Methodology**:
  - 3 warmup runs before measurement
  - 10 benchmark runs for statistical accuracy
  - Git reset before each run to ensure identical starting conditions
  - Memory usage measured using GNU time (peak RSS)
  - Local binaries via `./node_modules/.bin/`
  - prettier:
    - `./node_modules/.bin/prettier "$@" --write --experimental-cli --embedded-language-formatting=off --ignore-path=.prettierignore --no-cache --ignore-unknown`
  - prettier + oxc plugin:
    - `./node_modules/.bin/prettier "$@" --write --experimental-cli --embedded-language-formatting=off --ignore-path=.prettierignore --no-cache --ignore-unknown --plugin @prettier/plugin-oxc`
  - biome:
    - `./node_modules/.bin/biome format --write --files-ignore-unknown=true "$@"`
  - oxfmt:
    - `./node_modules/.bin/oxfmt "$@"`

## Results

<!-- BENCHMARK_RESULTS_START -->
```
=========================================
Benchmarking parser.ts (single large file)
=========================================
Benchmark 1: prettier
  Time (mean ± σ):      1.145 s ±  0.068 s    [User: 2.261 s, System: 0.224 s]
  Range (min … max):    1.070 s …  1.250 s    10 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):     808.8 ms ±  14.5 ms    [User: 1355.3 ms, System: 143.0 ms]
  Range (min … max):   791.3 ms … 829.1 ms    10 runs
 
Benchmark 3: biome
  Time (mean ± σ):     136.3 ms ±   1.3 ms    [User: 106.3 ms, System: 27.6 ms]
  Range (min … max):   133.5 ms … 137.8 ms    10 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):     151.7 ms ±  62.8 ms    [User: 249.8 ms, System: 63.8 ms]
  Range (min … max):   120.1 ms … 312.5 ms    10 runs
 
Summary
  biome ran
    1.11 ± 0.46 times faster than oxfmt
    5.93 ± 0.12 times faster than prettier+oxc-parser
    8.39 ± 0.51 times faster than prettier

Memory Usage:
  prettier: 281.8 MB (min: 265.6 MB, max: 326.8 MB)
  prettier+oxc-parser: 237.1 MB (min: 234.5 MB, max: 240.9 MB)
  biome: 62.6 MB (min: 61.7 MB, max: 64.5 MB)
  oxfmt: 162.0 MB (min: 161.9 MB, max: 162.2 MB)

=========================================
Benchmarking Outline repository
=========================================
Benchmark 1: prettier
  Time (mean ± σ):     10.333 s ±  0.117 s    [User: 34.326 s, System: 3.197 s]
  Range (min … max):   10.146 s … 10.581 s    10 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):      7.225 s ±  0.090 s    [User: 21.724 s, System: 2.342 s]
  Range (min … max):    7.070 s …  7.374 s    10 runs
 
Benchmark 3: biome
  Time (mean ± σ):     868.1 ms ±   5.7 ms    [User: 2811.3 ms, System: 413.0 ms]
  Range (min … max):   859.1 ms … 874.5 ms    10 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):     387.2 ms ±   3.7 ms    [User: 1004.2 ms, System: 328.7 ms]
  Range (min … max):   380.3 ms … 392.1 ms    10 runs
 
Summary
  oxfmt ran
    2.24 ± 0.03 times faster than biome
   18.66 ± 0.29 times faster than prettier+oxc-parser
   26.69 ± 0.40 times faster than prettier

Memory Usage:
  biome: 65.1 MB (min: 61.8 MB, max: 68.3 MB)
  oxfmt: 205.5 MB (min: 191.2 MB, max: 215.3 MB)

Benchmark complete!
```
<!-- BENCHMARK_RESULTS_END -->
