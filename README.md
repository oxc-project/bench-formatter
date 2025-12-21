# JavaScript/TypeScript Formatter Benchmark

Comparing execution time and memory usage of **Prettier**, **Biome**, and **Oxfmt**.

## Formatters

- [Prettier](https://prettier.io/)
- [Prettier](https://prettier.io/) + @prettier/plugin-oxc
- [Biome](https://biomejs.dev/) Formatter
- [Oxfmt](https://oxc.rs)

## Versions

- **Prettier**: 3.7.4
- **Biome**: 2.3.10
- **Oxfmt**: 0.19.0

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
  Time (mean ± σ):      1.183 s ±  0.051 s    [User: 2.351 s, System: 0.230 s]
  Range (min … max):    1.130 s …  1.264 s    10 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):     829.9 ms ±  12.5 ms    [User: 1387.0 ms, System: 145.0 ms]
  Range (min … max):   807.8 ms … 852.3 ms    10 runs
 
Benchmark 3: biome
  Time (mean ± σ):     139.3 ms ±   2.3 ms    [User: 108.0 ms, System: 29.2 ms]
  Range (min … max):   136.9 ms … 145.5 ms    10 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):     126.4 ms ±   2.9 ms    [User: 253.5 ms, System: 64.4 ms]
  Range (min … max):   122.4 ms … 132.5 ms    10 runs
 
Summary
  oxfmt ran
    1.10 ± 0.03 times faster than biome
    6.57 ± 0.18 times faster than prettier+oxc-parser
    9.36 ± 0.45 times faster than prettier

Memory Usage:
  prettier: 272.9 MB (min: 259.8 MB, max: 292.3 MB)
  prettier+oxc-parser: 237.4 MB (min: 234.9 MB, max: 239.6 MB)
  biome: 62.7 MB (min: 61.6 MB, max: 64.2 MB)
  oxfmt: 162.0 MB (min: 161.6 MB, max: 162.1 MB)

=========================================
Benchmarking Outline repository
=========================================
Benchmark 1: prettier
  Time (mean ± σ):     10.054 s ±  0.134 s    [User: 33.475 s, System: 3.089 s]
  Range (min … max):    9.841 s … 10.265 s    10 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):      7.121 s ±  0.023 s    [User: 21.392 s, System: 2.340 s]
  Range (min … max):    7.097 s …  7.167 s    10 runs
 
Benchmark 3: biome
  Time (mean ± σ):     883.1 ms ±  66.6 ms    [User: 2730.3 ms, System: 392.2 ms]
  Range (min … max):   843.2 ms … 1057.3 ms    10 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):     378.3 ms ±   5.8 ms    [User: 968.4 ms, System: 322.3 ms]
  Range (min … max):   364.7 ms … 385.3 ms    10 runs
 
Summary
  oxfmt ran
    2.33 ± 0.18 times faster than biome
   18.83 ± 0.30 times faster than prettier+oxc-parser
   26.58 ± 0.54 times faster than prettier

Memory Usage:
  biome: 62.4 MB (min: 58.4 MB, max: 65.7 MB)
  oxfmt: 203.5 MB (min: 195.9 MB, max: 216.1 MB)

Benchmark complete!
```
<!-- BENCHMARK_RESULTS_END -->
