# JavaScript/TypeScript Formatter Benchmark

Comparing execution time and memory usage of **Prettier**, **Biome**, and **Oxfmt**.

## Formatters

- [Prettier](https://prettier.io/)
- [Prettier](https://prettier.io/) + @prettier/plugin-oxc
- [Biome](https://biomejs.dev/) Formatter
- [Oxfmt](https://oxc.rs)

## Versions

- **Prettier**: 3.7.3
- **Biome**: 2.3.8
- **Oxfmt**: 0.16.0

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
  Time (mean ± σ):      1.145 s ±  0.011 s    [User: 2.317 s, System: 0.233 s]
  Range (min … max):    1.127 s …  1.163 s    10 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):     842.7 ms ±  15.4 ms    [User: 1407.6 ms, System: 146.5 ms]
  Range (min … max):   823.0 ms … 872.4 ms    10 runs
 
Benchmark 3: biome
  Time (mean ± σ):     142.2 ms ±   3.9 ms    [User: 112.5 ms, System: 27.5 ms]
  Range (min … max):   136.5 ms … 151.1 ms    10 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):      55.3 ms ±   0.6 ms    [User: 38.8 ms, System: 22.5 ms]
  Range (min … max):    54.4 ms …  56.2 ms    10 runs
 
Summary
  oxfmt ran
    2.57 ± 0.08 times faster than biome
   15.24 ± 0.32 times faster than prettier+oxc-parser
   20.72 ± 0.29 times faster than prettier

Memory Usage:
  prettier: 282.3 MB (min: 261.9 MB, max: 317.8 MB)
  prettier+oxc-parser: 236.7 MB (min: 233.1 MB, max: 238.1 MB)
  biome: 62.3 MB (min: 62.1 MB, max: 62.6 MB)
  oxfmt: 101.6 MB (min: 101.5 MB, max: 101.7 MB)

=========================================
Benchmarking Outline repository
=========================================
Benchmark 1: prettier
  Time (mean ± σ):      9.999 s ±  0.095 s    [User: 33.227 s, System: 3.052 s]
  Range (min … max):    9.869 s … 10.205 s    10 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):      7.165 s ±  0.114 s    [User: 21.564 s, System: 2.284 s]
  Range (min … max):    7.025 s …  7.374 s    10 runs
 
Benchmark 3: biome
  Time (mean ± σ):     850.1 ms ±   5.1 ms    [User: 2707.2 ms, System: 392.8 ms]
  Range (min … max):   840.9 ms … 860.9 ms    10 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):     231.2 ms ±  18.3 ms    [User: 557.5 ms, System: 197.5 ms]
  Range (min … max):   219.8 ms … 281.5 ms    10 runs
 
Summary
  oxfmt ran
    3.68 ± 0.29 times faster than biome
   30.99 ± 2.51 times faster than prettier+oxc-parser
   43.25 ± 3.45 times faster than prettier

Memory Usage:
  biome: 64.3 MB (min: 60.5 MB, max: 67.3 MB)
  oxfmt: 126.7 MB (min: 120.6 MB, max: 135.8 MB)

Benchmark complete!
```
<!-- BENCHMARK_RESULTS_END -->
