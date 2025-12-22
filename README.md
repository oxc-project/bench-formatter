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
  Time (mean ± σ):      1.107 s ±  0.057 s    [User: 2.198 s, System: 0.223 s]
  Range (min … max):    1.058 s …  1.264 s    10 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):     850.0 ms ±  41.8 ms    [User: 1398.6 ms, System: 150.6 ms]
  Range (min … max):   795.4 ms … 918.6 ms    10 runs
 
Benchmark 3: biome
  Time (mean ± σ):     135.1 ms ±   1.7 ms    [User: 107.9 ms, System: 25.5 ms]
  Range (min … max):   131.5 ms … 137.6 ms    10 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):     110.4 ms ±   2.2 ms    [User: 211.8 ms, System: 58.9 ms]
  Range (min … max):   107.5 ms … 113.4 ms    10 runs
 
Summary
  oxfmt ran
    1.22 ± 0.03 times faster than biome
    7.70 ± 0.41 times faster than prettier+oxc-parser
   10.03 ± 0.55 times faster than prettier

Memory Usage:
  prettier: 273.8 MB (min: 253.4 MB, max: 298.1 MB)
  prettier+oxc-parser: 238.3 MB (min: 235.6 MB, max: 241.8 MB)
  biome: 62.2 MB (min: 61.8 MB, max: 63.9 MB)
  oxfmt: 125.2 MB (min: 125.0 MB, max: 125.5 MB)

=========================================
Benchmarking Outline repository
=========================================
Benchmark 1: prettier
  Time (mean ± σ):      9.627 s ±  0.123 s    [User: 31.948 s, System: 3.095 s]
  Range (min … max):    9.467 s …  9.918 s    10 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):      6.832 s ±  0.084 s    [User: 20.611 s, System: 2.289 s]
  Range (min … max):    6.688 s …  6.949 s    10 runs
 
Benchmark 3: biome
  Time (mean ± σ):     882.5 ms ±  66.1 ms    [User: 2698.1 ms, System: 392.1 ms]
  Range (min … max):   836.2 ms … 1024.1 ms    10 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):     112.4 ms ±   3.6 ms    [User: 215.3 ms, System: 56.2 ms]
  Range (min … max):   108.6 ms … 119.6 ms    10 runs
 
Summary
  oxfmt ran
    7.85 ± 0.64 times faster than biome
   60.79 ± 2.07 times faster than prettier+oxc-parser
   85.66 ± 2.94 times faster than prettier

Memory Usage:
  biome: 63.2 MB (min: 60.9 MB, max: 65.2 MB)
  oxfmt: 125.1 MB (min: 124.8 MB, max: 125.2 MB)

Benchmark complete!
```
<!-- BENCHMARK_RESULTS_END -->
