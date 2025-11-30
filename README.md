# JavaScript/TypeScript Formatter Benchmark

Comparing execution time and memory usage of **Prettier**, **Biome**, and **Oxfmt**.

## Formatters

- [Prettier](https://prettier.io/)
- [Prettier](https://prettier.io/) + @prettier/plugin-oxc
- [Biome](https://biomejs.dev/) Formatter
- [Oxfmt](https://oxc.rs)

## Versions

- **Prettier**: 3.7.1
- **Biome**: 2.3.8
- **Oxfmt**: 0.15.0

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
    - `./node_modules/.bin/prettier "$@" --write --experimental-cli --no-config --embedded-language-formatting=off --ignore-path=.prettierignore --no-cache --ignore-unknown`
  - prettier + oxc plugin:
    - `./node_modules/.bin/prettier "$@" --write --experimental-cli --no-config --embedded-language-formatting=off --ignore-path=.prettierignore --no-cache --ignore-unknown --plugin @prettier/plugin-oxc`
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
  Time (mean ± σ):      1.165 s ±  0.074 s    [User: 2.283 s, System: 0.233 s]
  Range (min … max):    1.081 s …  1.259 s    10 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):     813.2 ms ±  12.4 ms    [User: 1351.0 ms, System: 142.6 ms]
  Range (min … max):   791.8 ms … 834.6 ms    10 runs
 
Benchmark 3: biome
  Time (mean ± σ):     135.7 ms ±   1.8 ms    [User: 107.6 ms, System: 26.7 ms]
  Range (min … max):   133.6 ms … 139.2 ms    10 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):      54.3 ms ±   0.3 ms    [User: 38.4 ms, System: 21.5 ms]
  Range (min … max):    53.9 ms …  54.8 ms    10 runs
 
Summary
  oxfmt ran
    2.50 ± 0.04 times faster than biome
   14.98 ± 0.24 times faster than prettier+oxc-parser
   21.46 ± 1.36 times faster than prettier

Memory Usage:
  prettier: 278.8 MB (min: 263.8 MB, max: 296.2 MB)
  prettier+oxc-parser: 238.4 MB (min: 236.4 MB, max: 239.9 MB)
  biome: 62.6 MB (min: 62.1 MB, max: 64.3 MB)
  oxfmt: 102.5 MB (min: 102.3 MB, max: 102.6 MB)

=========================================
Benchmarking Outline repository
=========================================
Benchmark 1: prettier
  Time (mean ± σ):      9.196 s ±  0.145 s    [User: 31.436 s, System: 2.421 s]
  Range (min … max):    9.012 s …  9.498 s    10 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):      6.302 s ±  0.054 s    [User: 19.822 s, System: 1.735 s]
  Range (min … max):    6.217 s …  6.399 s    10 runs
 
Benchmark 3: biome
  Time (mean ± σ):     873.6 ms ±  83.6 ms    [User: 2627.3 ms, System: 398.8 ms]
  Range (min … max):   825.3 ms … 1040.6 ms    10 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):     215.4 ms ±   0.9 ms    [User: 575.6 ms, System: 164.5 ms]
  Range (min … max):   213.5 ms … 216.8 ms    10 runs
 
Summary
  oxfmt ran
    4.06 ± 0.39 times faster than biome
   29.26 ± 0.28 times faster than prettier+oxc-parser
   42.70 ± 0.70 times faster than prettier

Memory Usage:
  prettier: 860.0 MB (min: 823.3 MB, max: 906.4 MB)
  prettier+oxc-parser: 670.4 MB (min: 647.5 MB, max: 685.1 MB)
  biome: 63.1 MB (min: 59.0 MB, max: 65.6 MB)
  oxfmt: 129.8 MB (min: 125.0 MB, max: 136.1 MB)

Benchmark complete!
```
<!-- BENCHMARK_RESULTS_END -->
