# JavaScript/TypeScript Formatter Benchmark

Comparing execution time and memory usage of **Prettier**, **Biome**, and **Oxfmt**.

## Formatters

- [Prettier](https://prettier.io/)
- [Prettier](https://prettier.io/) + @prettier/plugin-oxc
- [Biome](https://biomejs.dev/) Formatter
- [Oxfmt](https://oxc.rs)

## Versions

- **Prettier**: 3.7.4
- **Biome**: 2.3.8
- **Oxfmt**: 0.18.0

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
  Time (mean ± σ):      1.092 s ±  0.019 s    [User: 2.212 s, System: 0.221 s]
  Range (min … max):    1.055 s …  1.127 s    10 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):     856.5 ms ±  33.3 ms    [User: 1404.8 ms, System: 152.1 ms]
  Range (min … max):   804.0 ms … 893.6 ms    10 runs
 
Benchmark 3: biome
  Time (mean ± σ):     135.6 ms ±   2.0 ms    [User: 106.2 ms, System: 27.7 ms]
  Range (min … max):   132.4 ms … 139.1 ms    10 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):     111.2 ms ±   6.0 ms    [User: 214.1 ms, System: 54.6 ms]
  Range (min … max):   106.7 ms … 126.6 ms    10 runs
 
Summary
  oxfmt ran
    1.22 ± 0.07 times faster than biome
    7.70 ± 0.51 times faster than prettier+oxc-parser
    9.82 ± 0.55 times faster than prettier

Memory Usage:
  prettier: 267.2 MB (min: 259.3 MB, max: 279.3 MB)
  prettier+oxc-parser: 236.5 MB (min: 233.6 MB, max: 239.1 MB)
  biome: 62.4 MB (min: 61.7 MB, max: 64.3 MB)
  oxfmt: 125.3 MB (min: 125.2 MB, max: 125.6 MB)

=========================================
Benchmarking Outline repository
=========================================
Benchmark 1: prettier
  Time (mean ± σ):      9.892 s ±  0.173 s    [User: 32.651 s, System: 3.008 s]
  Range (min … max):    9.652 s … 10.159 s    10 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):      6.867 s ±  0.072 s    [User: 20.446 s, System: 2.182 s]
  Range (min … max):    6.766 s …  7.007 s    10 runs
 
Benchmark 3: biome
  Time (mean ± σ):     867.8 ms ±  67.1 ms    [User: 2711.0 ms, System: 387.4 ms]
  Range (min … max):   833.9 ms … 1057.2 ms    10 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):     108.8 ms ±   1.6 ms    [User: 214.2 ms, System: 56.0 ms]
  Range (min … max):   107.2 ms … 112.7 ms    10 runs
 
Summary
  oxfmt ran
    7.97 ± 0.63 times faster than biome
   63.09 ± 1.13 times faster than prettier+oxc-parser
   90.88 ± 2.07 times faster than prettier

Memory Usage:
  biome: 65.0 MB (min: 62.7 MB, max: 67.4 MB)
  oxfmt: 125.3 MB (min: 125.0 MB, max: 125.7 MB)

Benchmark complete!
```
<!-- BENCHMARK_RESULTS_END -->
