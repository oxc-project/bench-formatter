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
  Time (mean ± σ):      1.148 s ±  0.068 s    [User: 2.251 s, System: 0.227 s]
  Range (min … max):    1.079 s …  1.246 s    10 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):     810.0 ms ±  19.1 ms    [User: 1349.7 ms, System: 141.9 ms]
  Range (min … max):   779.6 ms … 836.7 ms    10 runs
 
Benchmark 3: biome
  Time (mean ± σ):     170.7 ms ±  44.6 ms    [User: 109.6 ms, System: 27.5 ms]
  Range (min … max):   133.9 ms … 257.2 ms    10 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):      52.7 ms ±   0.3 ms    [User: 37.4 ms, System: 20.8 ms]
  Range (min … max):    52.3 ms …  53.4 ms    10 runs
 
Summary
  oxfmt ran
    3.24 ± 0.85 times faster than biome
   15.38 ± 0.37 times faster than prettier+oxc-parser
   21.80 ± 1.29 times faster than prettier

Memory Usage:
  prettier: 273.8 MB (min: 255.8 MB, max: 298.4 MB)
  prettier+oxc-parser: 235.3 MB (min: 233.4 MB, max: 237.8 MB)
  biome: 63.1 MB (min: 61.9 MB, max: 66.1 MB)
  oxfmt: 102.3 MB (min: 102.3 MB, max: 102.5 MB)

=========================================
Benchmarking Outline repository
=========================================
Benchmark 1: prettier
  Time (mean ± σ):      9.666 s ±  0.124 s    [User: 31.563 s, System: 2.989 s]
  Range (min … max):    9.456 s …  9.841 s    10 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):      6.876 s ±  0.081 s    [User: 20.137 s, System: 2.179 s]
  Range (min … max):    6.762 s …  7.007 s    10 runs
 
Benchmark 3: biome
  Time (mean ± σ):     835.4 ms ±   3.8 ms    [User: 2697.9 ms, System: 375.3 ms]
  Range (min … max):   826.5 ms … 838.4 ms    10 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):     219.3 ms ±   4.0 ms    [User: 557.2 ms, System: 189.2 ms]
  Range (min … max):   215.8 ms … 229.0 ms    10 runs
 
Summary
  oxfmt ran
    3.81 ± 0.07 times faster than biome
   31.36 ± 0.68 times faster than prettier+oxc-parser
   44.08 ± 0.99 times faster than prettier

Memory Usage:
  biome: 63.2 MB (min: 60.1 MB, max: 65.5 MB)
  oxfmt: 131.7 MB (min: 127.4 MB, max: 140.6 MB)

Benchmark complete!
```
<!-- BENCHMARK_RESULTS_END -->
