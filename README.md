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
- **Oxfmt**: 0.21.0

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
  Time (mean ± σ):      1.115 s ±  0.070 s    [User: 2.224 s, System: 0.228 s]
  Range (min … max):    1.084 s …  1.314 s    10 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):     813.3 ms ±  16.1 ms    [User: 1366.3 ms, System: 141.6 ms]
  Range (min … max):   798.7 ms … 853.4 ms    10 runs
 
Benchmark 3: biome
  Time (mean ± σ):     136.7 ms ±   2.0 ms    [User: 109.2 ms, System: 26.5 ms]
  Range (min … max):   134.0 ms … 139.5 ms    10 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):     121.6 ms ±   2.2 ms    [User: 248.7 ms, System: 60.5 ms]
  Range (min … max):   118.3 ms … 124.1 ms    10 runs
 
Summary
  oxfmt ran
    1.12 ± 0.03 times faster than biome
    6.69 ± 0.18 times faster than prettier+oxc-parser
    9.17 ± 0.60 times faster than prettier

Memory Usage:
  prettier: 276.2 MB (min: 264.0 MB, max: 304.7 MB)
  prettier+oxc-parser: 235.7 MB (min: 233.5 MB, max: 237.6 MB)
  biome: 62.6 MB (min: 61.7 MB, max: 64.6 MB)
  oxfmt: 162.7 MB (min: 162.4 MB, max: 162.9 MB)

=========================================
Benchmarking Outline repository
=========================================
Benchmark 1: prettier
  Time (mean ± σ):      9.996 s ±  0.120 s    [User: 33.119 s, System: 2.937 s]
  Range (min … max):    9.825 s … 10.222 s    10 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):      7.089 s ±  0.143 s    [User: 21.233 s, System: 2.311 s]
  Range (min … max):    6.915 s …  7.342 s    10 runs
 
Benchmark 3: biome
  Time (mean ± σ):     852.7 ms ±   5.2 ms    [User: 2733.7 ms, System: 400.8 ms]
  Range (min … max):   844.8 ms … 859.1 ms    10 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):     381.2 ms ±   5.5 ms    [User: 974.8 ms, System: 322.2 ms]
  Range (min … max):   372.8 ms … 390.4 ms    10 runs
 
Summary
  oxfmt ran
    2.24 ± 0.03 times faster than biome
   18.60 ± 0.46 times faster than prettier+oxc-parser
   26.22 ± 0.49 times faster than prettier

Memory Usage:
  biome: 63.3 MB (min: 60.0 MB, max: 65.2 MB)
  oxfmt: 204.5 MB (min: 199.0 MB, max: 216.5 MB)

Benchmark complete!
```
<!-- BENCHMARK_RESULTS_END -->
