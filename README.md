# JavaScript/TypeScript Formatter Benchmark

Comparing execution time and memory usage of **Prettier**, **Biome**, and **Oxfmt**.

## Formatters

- [Prettier](https://prettier.io/)
- [Prettier](https://prettier.io/) + @prettier/plugin-oxc
- [Biome](https://biomejs.dev/) Formatter
- [Oxfmt](https://oxc.rs)

## Versions

- **Prettier**: 3.7.4
- **Biome**: 2.3.11
- **Oxfmt**: 0.24.0

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
  Time (mean ± σ):      1.156 s ±  0.072 s    [User: 2.301 s, System: 0.228 s]
  Range (min … max):    1.069 s …  1.264 s    10 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):     817.3 ms ±  13.0 ms    [User: 1366.9 ms, System: 146.1 ms]
  Range (min … max):   797.8 ms … 838.5 ms    10 runs
 
Benchmark 3: biome
  Time (mean ± σ):     137.9 ms ±   2.4 ms    [User: 106.9 ms, System: 29.5 ms]
  Range (min … max):   133.7 ms … 140.9 ms    10 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):     123.6 ms ±   2.6 ms    [User: 249.1 ms, System: 63.6 ms]
  Range (min … max):   119.5 ms … 126.9 ms    10 runs
 
Summary
  oxfmt ran
    1.12 ± 0.03 times faster than biome
    6.61 ± 0.17 times faster than prettier+oxc-parser
    9.36 ± 0.61 times faster than prettier

Memory Usage:
  prettier: 280.5 MB (min: 256.3 MB, max: 308.6 MB)
  prettier+oxc-parser: 237.4 MB (min: 234.6 MB, max: 239.5 MB)
  biome: 62.7 MB (min: 61.6 MB, max: 66.2 MB)
  oxfmt: 163.7 MB (min: 163.6 MB, max: 163.9 MB)

=========================================
Benchmarking Outline repository
=========================================
Benchmark 1: prettier
  Time (mean ± σ):     10.018 s ±  0.087 s    [User: 33.392 s, System: 2.988 s]
  Range (min … max):    9.887 s … 10.120 s    10 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):      7.080 s ±  0.103 s    [User: 21.274 s, System: 2.329 s]
  Range (min … max):    6.975 s …  7.300 s    10 runs
 
Benchmark 3: biome
  Time (mean ± σ):     892.6 ms ±  69.0 ms    [User: 2759.7 ms, System: 397.8 ms]
  Range (min … max):   854.7 ms … 1065.7 ms    10 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):     382.6 ms ±   4.4 ms    [User: 992.3 ms, System: 322.2 ms]
  Range (min … max):   377.3 ms … 388.6 ms    10 runs
 
Summary
  oxfmt ran
    2.33 ± 0.18 times faster than biome
   18.51 ± 0.34 times faster than prettier+oxc-parser
   26.19 ± 0.38 times faster than prettier

Memory Usage:
  biome: 64.4 MB (min: 61.4 MB, max: 66.9 MB)
  oxfmt: 203.9 MB (min: 194.6 MB, max: 212.7 MB)

Benchmark complete!
```
<!-- BENCHMARK_RESULTS_END -->
