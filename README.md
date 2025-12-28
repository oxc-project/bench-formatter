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
- **Oxfmt**: 0.20.0

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
  Time (mean ± σ):      1.142 s ±  0.072 s    [User: 2.236 s, System: 0.237 s]
  Range (min … max):    1.054 s …  1.244 s    10 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):     825.9 ms ±  16.6 ms    [User: 1370.2 ms, System: 146.7 ms]
  Range (min … max):   799.1 ms … 843.5 ms    10 runs
 
Benchmark 3: biome
  Time (mean ± σ):     136.6 ms ±   2.6 ms    [User: 106.4 ms, System: 28.3 ms]
  Range (min … max):   133.5 ms … 140.3 ms    10 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):     111.1 ms ±   2.2 ms    [User: 212.7 ms, System: 60.1 ms]
  Range (min … max):   109.2 ms … 114.7 ms    10 runs
 
Summary
  oxfmt ran
    1.23 ± 0.03 times faster than biome
    7.43 ± 0.21 times faster than prettier+oxc-parser
   10.28 ± 0.67 times faster than prettier

Memory Usage:
  prettier: 277.9 MB (min: 262.6 MB, max: 317.3 MB)
  prettier+oxc-parser: 236.9 MB (min: 234.9 MB, max: 239.8 MB)
  biome: 63.5 MB (min: 62.0 MB, max: 65.9 MB)
  oxfmt: 125.1 MB (min: 124.8 MB, max: 125.3 MB)

=========================================
Benchmarking Outline repository
=========================================
Benchmark 1: prettier
  Time (mean ± σ):      9.723 s ±  0.094 s    [User: 32.361 s, System: 3.078 s]
  Range (min … max):    9.565 s …  9.859 s    10 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):      7.002 s ±  0.070 s    [User: 21.186 s, System: 2.322 s]
  Range (min … max):    6.916 s …  7.107 s    10 runs
 
Benchmark 3: biome
  Time (mean ± σ):     859.2 ms ±  10.1 ms    [User: 2750.7 ms, System: 404.2 ms]
  Range (min … max):   848.9 ms … 885.3 ms    10 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):     113.4 ms ±   2.1 ms    [User: 214.7 ms, System: 59.2 ms]
  Range (min … max):   110.4 ms … 117.1 ms    10 runs
 
Summary
  oxfmt ran
    7.58 ± 0.17 times faster than biome
   61.74 ± 1.31 times faster than prettier+oxc-parser
   85.73 ± 1.80 times faster than prettier

Memory Usage:
  biome: 62.6 MB (min: 60.4 MB, max: 65.5 MB)
  oxfmt: 125.2 MB (min: 125.0 MB, max: 125.4 MB)

Benchmark complete!
```
<!-- BENCHMARK_RESULTS_END -->
