# JavaScript/TypeScript Formatter Benchmark

Comparing execution time and memory usage of **Prettier**, **Biome**, and **Oxfmt**.

## Formatters

- [Prettier](https://prettier.io/)
- [Prettier](https://prettier.io/) + @prettier/plugin-oxc
- [Biome](https://biomejs.dev/) Formatter
- [Oxfmt](https://oxc.rs)

## Versions

- **Prettier**: 3.7.3
- **Biome**: 2.3.8
- **Oxfmt**: 0.16.0

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
  Time (mean ± σ):      1.156 s ±  0.062 s    [User: 2.316 s, System: 0.228 s]
  Range (min … max):    1.096 s …  1.260 s    10 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):     850.7 ms ±  27.7 ms    [User: 1418.7 ms, System: 143.6 ms]
  Range (min … max):   818.7 ms … 892.7 ms    10 runs
 
Benchmark 3: biome
  Time (mean ± σ):     157.7 ms ±  38.5 ms    [User: 111.3 ms, System: 27.9 ms]
  Range (min … max):   134.6 ms … 232.5 ms    10 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):      54.2 ms ±   0.4 ms    [User: 37.3 ms, System: 22.5 ms]
  Range (min … max):    53.5 ms …  54.9 ms    10 runs
 
Summary
  oxfmt ran
    2.91 ± 0.71 times faster than biome
   15.70 ± 0.53 times faster than prettier+oxc-parser
   21.33 ± 1.15 times faster than prettier

Memory Usage:
  prettier: 267.9 MB (min: 260.0 MB, max: 279.1 MB)
  prettier+oxc-parser: 237.6 MB (min: 234.7 MB, max: 240.0 MB)
  biome: 62.7 MB (min: 62.1 MB, max: 64.2 MB)
  oxfmt: 102.3 MB (min: 102.2 MB, max: 102.4 MB)

=========================================
Benchmarking Outline repository
=========================================
Benchmark 1: prettier
  Time (mean ± σ):      9.760 s ±  0.121 s    [User: 32.387 s, System: 3.135 s]
  Range (min … max):    9.505 s …  9.933 s    10 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):      6.939 s ±  0.139 s    [User: 20.917 s, System: 2.290 s]
  Range (min … max):    6.696 s …  7.107 s    10 runs
 
Benchmark 3: biome
  Time (mean ± σ):     858.7 ms ±  14.1 ms    [User: 2717.6 ms, System: 403.4 ms]
  Range (min … max):   836.9 ms … 885.3 ms    10 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):     225.8 ms ±   2.4 ms    [User: 556.0 ms, System: 216.3 ms]
  Range (min … max):   223.4 ms … 231.3 ms    10 runs
 
Summary
  oxfmt ran
    3.80 ± 0.07 times faster than biome
   30.74 ± 0.70 times faster than prettier+oxc-parser
   43.23 ± 0.70 times faster than prettier

Memory Usage:
  biome: 62.4 MB (min: 61.4 MB, max: 63.5 MB)
  oxfmt: 130.1 MB (min: 125.5 MB, max: 137.5 MB)

Benchmark complete!
```
<!-- BENCHMARK_RESULTS_END -->
