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
- **Oxfmt**: 0.24.0

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
  Time (mean ± σ):      1.097 s ±  0.016 s    [User: 2.217 s, System: 0.225 s]
  Range (min … max):    1.072 s …  1.119 s    10 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):     852.3 ms ±  41.3 ms    [User: 1419.0 ms, System: 143.2 ms]
  Range (min … max):   800.5 ms … 906.4 ms    10 runs
 
Benchmark 3: biome
  Time (mean ± σ):     139.3 ms ±   3.5 ms    [User: 108.5 ms, System: 28.5 ms]
  Range (min … max):   136.0 ms … 148.1 ms    10 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):     125.7 ms ±   5.1 ms    [User: 248.5 ms, System: 65.6 ms]
  Range (min … max):   120.7 ms … 139.0 ms    10 runs
 
Summary
  oxfmt ran
    1.11 ± 0.05 times faster than biome
    6.78 ± 0.43 times faster than prettier+oxc-parser
    8.73 ± 0.38 times faster than prettier

Memory Usage:
  prettier: 274.3 MB (min: 262.0 MB, max: 292.0 MB)
  prettier+oxc-parser: 237.1 MB (min: 234.2 MB, max: 239.0 MB)
  biome: 61.9 MB (min: 61.4 MB, max: 62.5 MB)
  oxfmt: 163.7 MB (min: 163.6 MB, max: 163.9 MB)

=========================================
Benchmarking Outline repository
=========================================
Benchmark 1: prettier
  Time (mean ± σ):     10.031 s ±  0.145 s    [User: 33.422 s, System: 3.012 s]
  Range (min … max):    9.867 s … 10.247 s    10 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):      7.126 s ±  0.090 s    [User: 21.381 s, System: 2.331 s]
  Range (min … max):    6.984 s …  7.273 s    10 runs
 
Benchmark 3: biome
  Time (mean ± σ):     863.0 ms ±   6.3 ms    [User: 2763.6 ms, System: 408.8 ms]
  Range (min … max):   855.4 ms … 875.3 ms    10 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):     387.2 ms ±  10.4 ms    [User: 1005.8 ms, System: 313.2 ms]
  Range (min … max):   376.1 ms … 408.6 ms    10 runs
 
Summary
  oxfmt ran
    2.23 ± 0.06 times faster than biome
   18.40 ± 0.55 times faster than prettier+oxc-parser
   25.91 ± 0.79 times faster than prettier

Memory Usage:
  biome: 64.8 MB (min: 62.4 MB, max: 69.7 MB)
  oxfmt: 206.3 MB (min: 198.0 MB, max: 218.2 MB)

Benchmark complete!
```
<!-- BENCHMARK_RESULTS_END -->
