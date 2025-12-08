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
  Time (mean ± σ):      1.158 s ±  0.071 s    [User: 2.282 s, System: 0.231 s]
  Range (min … max):    1.076 s …  1.246 s    10 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):     818.7 ms ±  17.6 ms    [User: 1361.8 ms, System: 143.0 ms]
  Range (min … max):   790.2 ms … 836.0 ms    10 runs
 
Benchmark 3: biome
  Time (mean ± σ):     136.5 ms ±   2.1 ms    [User: 107.1 ms, System: 27.7 ms]
  Range (min … max):   133.0 ms … 139.5 ms    10 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):      52.4 ms ±   0.3 ms    [User: 36.2 ms, System: 21.9 ms]
  Range (min … max):    51.9 ms …  52.8 ms    10 runs
 
Summary
  oxfmt ran
    2.61 ± 0.04 times faster than biome
   15.63 ± 0.35 times faster than prettier+oxc-parser
   22.11 ± 1.37 times faster than prettier

Memory Usage:
  prettier: 277.9 MB (min: 259.3 MB, max: 291.9 MB)
  prettier+oxc-parser: 236.5 MB (min: 233.5 MB, max: 238.5 MB)
  biome: 62.5 MB (min: 62.0 MB, max: 64.4 MB)
  oxfmt: 102.3 MB (min: 102.2 MB, max: 102.4 MB)

=========================================
Benchmarking Outline repository
=========================================
Benchmark 1: prettier
  Time (mean ± σ):      9.618 s ±  0.204 s    [User: 31.977 s, System: 3.045 s]
  Range (min … max):    9.314 s …  9.935 s    10 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):      6.855 s ±  0.145 s    [User: 20.555 s, System: 2.217 s]
  Range (min … max):    6.678 s …  7.167 s    10 runs
 
Benchmark 3: biome
  Time (mean ± σ):     852.2 ms ±  34.2 ms    [User: 2687.9 ms, System: 379.3 ms]
  Range (min … max):   831.2 ms … 946.2 ms    10 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):      1.358 s ±  0.061 s    [User: 2.440 s, System: 0.408 s]
  Range (min … max):    1.287 s …  1.478 s    10 runs
 
Summary
  biome ran
    1.59 ± 0.10 times faster than oxfmt
    8.04 ± 0.36 times faster than prettier+oxc-parser
   11.29 ± 0.51 times faster than prettier

Memory Usage:
  biome: 63.9 MB (min: 61.8 MB, max: 65.5 MB)
  oxfmt: 279.7 MB (min: 235.1 MB, max: 329.5 MB)

Benchmark complete!
```
<!-- BENCHMARK_RESULTS_END -->
