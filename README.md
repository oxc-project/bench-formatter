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
- **Oxfmt**: 0.17.0

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
  Time (mean ± σ):      1.218 s ±  0.067 s    [User: 2.362 s, System: 0.238 s]
  Range (min … max):    1.124 s …  1.317 s    10 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):     858.9 ms ±  13.5 ms    [User: 1429.0 ms, System: 152.3 ms]
  Range (min … max):   834.9 ms … 871.9 ms    10 runs
 
Benchmark 3: biome
  Time (mean ± σ):     142.9 ms ±   3.7 ms    [User: 112.7 ms, System: 29.4 ms]
  Range (min … max):   139.0 ms … 151.4 ms    10 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):      55.3 ms ±   0.7 ms    [User: 39.2 ms, System: 22.1 ms]
  Range (min … max):    53.8 ms …  56.2 ms    10 runs
 
Summary
  oxfmt ran
    2.59 ± 0.07 times faster than biome
   15.54 ± 0.31 times faster than prettier+oxc-parser
   22.04 ± 1.24 times faster than prettier

Memory Usage:
  prettier: 275.3 MB (min: 259.3 MB, max: 319.5 MB)
  prettier+oxc-parser: 237.5 MB (min: 234.6 MB, max: 241.0 MB)
  biome: 62.9 MB (min: 62.2 MB, max: 66.4 MB)
  oxfmt: 102.3 MB (min: 102.2 MB, max: 102.4 MB)

=========================================
Benchmarking Outline repository
=========================================
Benchmark 1: prettier
  Time (mean ± σ):     10.393 s ±  0.111 s    [User: 34.150 s, System: 3.207 s]
  Range (min … max):   10.230 s … 10.550 s    10 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):      7.423 s ±  0.151 s    [User: 21.912 s, System: 2.321 s]
  Range (min … max):    7.235 s …  7.697 s    10 runs
 
Benchmark 3: biome
  Time (mean ± σ):     907.3 ms ±  83.7 ms    [User: 2753.5 ms, System: 387.3 ms]
  Range (min … max):   844.6 ms … 1079.5 ms    10 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):      39.4 ms ±   0.4 ms    [User: 28.0 ms, System: 24.8 ms]
  Range (min … max):    38.7 ms …  40.0 ms    10 runs
 
Summary
  oxfmt ran
   23.01 ± 2.14 times faster than biome
  188.27 ± 4.37 times faster than prettier+oxc-parser
  263.61 ± 4.06 times faster than prettier

Memory Usage:
  biome: 63.9 MB (min: 61.7 MB, max: 67.1 MB)
  oxfmt: 284.0 MB (min: 237.0 MB, max: 322.0 MB)

Benchmark complete!
```
<!-- BENCHMARK_RESULTS_END -->
