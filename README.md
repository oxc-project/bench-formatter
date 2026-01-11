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
- **Oxfmt**: 0.23.0

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
  Time (mean ± σ):      1.226 s ±  0.066 s    [User: 2.409 s, System: 0.250 s]
  Range (min … max):    1.152 s …  1.341 s    10 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):     871.5 ms ±  15.4 ms    [User: 1458.5 ms, System: 154.7 ms]
  Range (min … max):   848.7 ms … 892.3 ms    10 runs
 
Benchmark 3: biome
  Time (mean ± σ):     144.4 ms ±   2.6 ms    [User: 114.5 ms, System: 28.6 ms]
  Range (min … max):   139.8 ms … 148.2 ms    10 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):     129.5 ms ±   1.9 ms    [User: 258.1 ms, System: 68.7 ms]
  Range (min … max):   126.0 ms … 132.8 ms    10 runs
 
Summary
  oxfmt ran
    1.11 ± 0.03 times faster than biome
    6.73 ± 0.15 times faster than prettier+oxc-parser
    9.46 ± 0.53 times faster than prettier

Memory Usage:
  prettier: 275.3 MB (min: 266.9 MB, max: 284.2 MB)
  prettier+oxc-parser: 237.4 MB (min: 233.3 MB, max: 241.2 MB)
  biome: 62.5 MB (min: 61.5 MB, max: 64.6 MB)
  oxfmt: 163.9 MB (min: 163.7 MB, max: 164.1 MB)

=========================================
Benchmarking Outline repository
=========================================
Benchmark 1: prettier
  Time (mean ± σ):     10.659 s ±  0.183 s    [User: 35.607 s, System: 3.108 s]
  Range (min … max):   10.360 s … 10.926 s    10 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):      7.330 s ±  0.222 s    [User: 21.758 s, System: 2.337 s]
  Range (min … max):    7.030 s …  7.612 s    10 runs
 
Benchmark 3: biome
  Time (mean ± σ):     869.2 ms ±  10.4 ms    [User: 2797.0 ms, System: 419.2 ms]
  Range (min … max):   856.0 ms … 886.0 ms    10 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):     396.0 ms ±   9.2 ms    [User: 1020.4 ms, System: 327.6 ms]
  Range (min … max):   377.3 ms … 406.1 ms    10 runs
 
Summary
  oxfmt ran
    2.19 ± 0.06 times faster than biome
   18.51 ± 0.71 times faster than prettier+oxc-parser
   26.92 ± 0.78 times faster than prettier

Memory Usage:
  biome: 64.5 MB (min: 61.9 MB, max: 69.9 MB)
  oxfmt: 208.0 MB (min: 200.7 MB, max: 214.1 MB)

Benchmark complete!
```
<!-- BENCHMARK_RESULTS_END -->
