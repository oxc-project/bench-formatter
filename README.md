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
  Time (mean ± σ):      1.097 s ±  0.021 s    [User: 2.225 s, System: 0.218 s]
  Range (min … max):    1.072 s …  1.132 s    10 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):     841.0 ms ±  42.6 ms    [User: 1399.4 ms, System: 141.9 ms]
  Range (min … max):   793.7 ms … 899.3 ms    10 runs
 
Benchmark 3: biome
  Time (mean ± σ):     136.4 ms ±   3.6 ms    [User: 106.8 ms, System: 27.7 ms]
  Range (min … max):   133.4 ms … 145.3 ms    10 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):     122.1 ms ±   5.3 ms    [User: 249.7 ms, System: 57.6 ms]
  Range (min … max):   116.9 ms … 135.6 ms    10 runs
 
Summary
  oxfmt ran
    1.12 ± 0.06 times faster than biome
    6.89 ± 0.46 times faster than prettier+oxc-parser
    8.98 ± 0.43 times faster than prettier

Memory Usage:
  prettier: 284.6 MB (min: 265.8 MB, max: 337.2 MB)
  prettier+oxc-parser: 237.3 MB (min: 234.9 MB, max: 239.6 MB)
  biome: 62.3 MB (min: 61.8 MB, max: 64.1 MB)
  oxfmt: 163.6 MB (min: 163.3 MB, max: 163.8 MB)

=========================================
Benchmarking Outline repository
=========================================
Benchmark 1: prettier
  Time (mean ± σ):      9.768 s ±  0.093 s    [User: 32.349 s, System: 3.011 s]
  Range (min … max):    9.671 s …  9.933 s    10 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):      6.957 s ±  0.091 s    [User: 20.838 s, System: 2.204 s]
  Range (min … max):    6.763 s …  7.128 s    10 runs
 
Benchmark 3: biome
  Time (mean ± σ):     883.7 ms ±  81.6 ms    [User: 2721.6 ms, System: 387.2 ms]
  Range (min … max):   838.3 ms … 1087.1 ms    10 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):     372.7 ms ±   8.1 ms    [User: 979.7 ms, System: 296.2 ms]
  Range (min … max):   358.7 ms … 388.6 ms    10 runs
 
Summary
  oxfmt ran
    2.37 ± 0.22 times faster than biome
   18.67 ± 0.47 times faster than prettier+oxc-parser
   26.21 ± 0.62 times faster than prettier

Memory Usage:
  biome: 61.8 MB (min: 58.7 MB, max: 65.0 MB)
  oxfmt: 202.3 MB (min: 189.5 MB, max: 212.6 MB)

Benchmark complete!
```
<!-- BENCHMARK_RESULTS_END -->
