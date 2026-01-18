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
  Time (mean ± σ):      1.115 s ±  0.049 s    [User: 2.229 s, System: 0.241 s]
  Range (min … max):    1.056 s …  1.226 s    10 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):     813.2 ms ±  18.1 ms    [User: 1366.6 ms, System: 131.1 ms]
  Range (min … max):   782.3 ms … 837.2 ms    10 runs
 
Benchmark 3: biome
  Time (mean ± σ):     136.9 ms ±   1.3 ms    [User: 108.8 ms, System: 26.3 ms]
  Range (min … max):   134.0 ms … 138.4 ms    10 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):     131.9 ms ±  30.0 ms    [User: 247.6 ms, System: 63.9 ms]
  Range (min … max):   119.4 ms … 216.1 ms    10 runs
 
Summary
  oxfmt ran
    1.04 ± 0.24 times faster than biome
    6.17 ± 1.41 times faster than prettier+oxc-parser
    8.45 ± 1.96 times faster than prettier

Memory Usage:
  prettier: 277.3 MB (min: 267.6 MB, max: 293.0 MB)
  prettier+oxc-parser: 237.9 MB (min: 235.9 MB, max: 241.4 MB)
  biome: 62.1 MB (min: 61.6 MB, max: 62.6 MB)
  oxfmt: 163.8 MB (min: 163.6 MB, max: 163.9 MB)

=========================================
Benchmarking Outline repository
=========================================
Benchmark 1: prettier
  Time (mean ± σ):     10.031 s ±  0.080 s    [User: 33.669 s, System: 2.913 s]
  Range (min … max):    9.871 s … 10.152 s    10 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):      7.125 s ±  0.104 s    [User: 21.502 s, System: 2.354 s]
  Range (min … max):    6.979 s …  7.343 s    10 runs
 
Benchmark 3: biome
  Time (mean ± σ):     902.4 ms ±  78.2 ms    [User: 2781.2 ms, System: 413.3 ms]
  Range (min … max):   857.1 ms … 1106.8 ms    10 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):     385.8 ms ±   7.7 ms    [User: 988.5 ms, System: 332.3 ms]
  Range (min … max):   375.8 ms … 400.8 ms    10 runs
 
Summary
  oxfmt ran
    2.34 ± 0.21 times faster than biome
   18.47 ± 0.46 times faster than prettier+oxc-parser
   26.00 ± 0.56 times faster than prettier

Memory Usage:
  biome: 63.2 MB (min: 60.7 MB, max: 65.8 MB)
  oxfmt: 203.7 MB (min: 196.9 MB, max: 222.2 MB)

Benchmark complete!
```
<!-- BENCHMARK_RESULTS_END -->
