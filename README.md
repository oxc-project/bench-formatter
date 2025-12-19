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
  Time (mean ± σ):      1.102 s ±  0.013 s    [User: 2.200 s, System: 0.237 s]
  Range (min … max):    1.087 s …  1.123 s    10 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):     852.6 ms ±  45.9 ms    [User: 1415.0 ms, System: 144.6 ms]
  Range (min … max):   788.3 ms … 921.6 ms    10 runs
 
Benchmark 3: biome
  Time (mean ± σ):     137.8 ms ±   1.7 ms    [User: 107.8 ms, System: 28.1 ms]
  Range (min … max):   135.2 ms … 140.7 ms    10 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):     120.2 ms ±   2.7 ms    [User: 243.7 ms, System: 63.2 ms]
  Range (min … max):   117.0 ms … 125.0 ms    10 runs
 
Summary
  oxfmt ran
    1.15 ± 0.03 times faster than biome
    7.09 ± 0.41 times faster than prettier+oxc-parser
    9.17 ± 0.23 times faster than prettier

Memory Usage:
  prettier: 282.4 MB (min: 261.6 MB, max: 320.2 MB)
  prettier+oxc-parser: 237.3 MB (min: 232.4 MB, max: 241.0 MB)
  biome: 63.4 MB (min: 62.2 MB, max: 66.3 MB)
  oxfmt: 161.9 MB (min: 161.7 MB, max: 162.2 MB)

=========================================
Benchmarking Outline repository
=========================================
Benchmark 1: prettier
  Time (mean ± σ):      9.657 s ±  0.124 s    [User: 31.949 s, System: 3.043 s]
  Range (min … max):    9.512 s …  9.878 s    10 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):      6.987 s ±  0.192 s    [User: 20.870 s, System: 2.276 s]
  Range (min … max):    6.749 s …  7.421 s    10 runs
 
Benchmark 3: biome
  Time (mean ± σ):     887.2 ms ±  79.9 ms    [User: 2723.9 ms, System: 396.9 ms]
  Range (min … max):   840.2 ms … 1047.8 ms    10 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):     370.2 ms ±   4.2 ms    [User: 964.4 ms, System: 306.4 ms]
  Range (min … max):   363.7 ms … 378.3 ms    10 runs
 
Summary
  oxfmt ran
    2.40 ± 0.22 times faster than biome
   18.87 ± 0.56 times faster than prettier+oxc-parser
   26.09 ± 0.45 times faster than prettier

Memory Usage:
  biome: 63.5 MB (min: 61.3 MB, max: 66.2 MB)
  oxfmt: 204.6 MB (min: 197.3 MB, max: 212.3 MB)

Benchmark complete!
```
<!-- BENCHMARK_RESULTS_END -->
