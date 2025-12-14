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
  Time (mean ± σ):      1.119 s ±  0.022 s    [User: 2.255 s, System: 0.224 s]
  Range (min … max):    1.099 s …  1.169 s    10 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):     842.2 ms ±  17.6 ms    [User: 1406.5 ms, System: 147.3 ms]
  Range (min … max):   806.1 ms … 861.5 ms    10 runs
 
Benchmark 3: biome
  Time (mean ± σ):     139.2 ms ±   2.4 ms    [User: 110.2 ms, System: 27.5 ms]
  Range (min … max):   135.1 ms … 142.9 ms    10 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):      54.2 ms ±   0.5 ms    [User: 39.3 ms, System: 20.9 ms]
  Range (min … max):    53.4 ms …  55.0 ms    10 runs
 
Summary
  oxfmt ran
    2.57 ± 0.05 times faster than biome
   15.54 ± 0.36 times faster than prettier+oxc-parser
   20.64 ± 0.45 times faster than prettier

Memory Usage:
  prettier: 269.6 MB (min: 254.0 MB, max: 281.5 MB)
  prettier+oxc-parser: 236.5 MB (min: 233.2 MB, max: 240.4 MB)
  biome: 62.8 MB (min: 61.8 MB, max: 64.3 MB)
  oxfmt: 102.4 MB (min: 102.3 MB, max: 102.6 MB)

=========================================
Benchmarking Outline repository
=========================================
Benchmark 1: prettier
  Time (mean ± σ):     10.081 s ±  0.100 s    [User: 33.353 s, System: 3.071 s]
  Range (min … max):    9.899 s … 10.249 s    10 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):      7.057 s ±  0.108 s    [User: 21.174 s, System: 2.319 s]
  Range (min … max):    6.866 s …  7.235 s    10 runs
 
Benchmark 3: biome
  Time (mean ± σ):     850.5 ms ±   8.2 ms    [User: 2718.6 ms, System: 392.5 ms]
  Range (min … max):   841.3 ms … 867.3 ms    10 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):     289.9 ms ±   3.1 ms    [User: 673.5 ms, System: 257.1 ms]
  Range (min … max):   284.1 ms … 292.5 ms    10 runs
 
Summary
  oxfmt ran
    2.93 ± 0.04 times faster than biome
   24.35 ± 0.45 times faster than prettier+oxc-parser
   34.78 ± 0.51 times faster than prettier

Memory Usage:
  biome: 63.5 MB (min: 61.0 MB, max: 65.5 MB)
  oxfmt: 145.5 MB (min: 137.2 MB, max: 150.8 MB)

Benchmark complete!
```
<!-- BENCHMARK_RESULTS_END -->
