# JavaScript/TypeScript Formatter Benchmark

Comparing execution time and memory usage of **Prettier**, **Biome**, and **Oxfmt**.

## Formatters

- [Prettier](https://prettier.io/)
- [Prettier](https://prettier.io/) + @prettier/plugin-oxc
- [Biome](https://biomejs.dev/) Formatter
- [Oxfmt](https://oxc.rs)

## Versions

- **Prettier**: 3.6.2
- **Biome**: 2.3.7
- **Oxfmt**: 0.15.0

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
    - `./node_modules/.bin/prettier "$@" --write --experimental-cli --no-config --embedded-language-formatting=off --ignore-path=.prettierignore --no-cache --ignore-unknown`
  - prettier + oxc plugin:
    - `./node_modules/.bin/prettier "$@" --write --experimental-cli --no-config --embedded-language-formatting=off --ignore-path=.prettierignore --no-cache --ignore-unknown --plugin @prettier/plugin-oxc`
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
  Time (mean ± σ):      1.099 s ±  0.100 s    [User: 2.097 s, System: 0.231 s]
  Range (min … max):    1.049 s …  1.381 s    10 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):     776.0 ms ±   8.8 ms    [User: 1329.2 ms, System: 141.0 ms]
  Range (min … max):   765.5 ms … 795.2 ms    10 runs
 
Benchmark 3: biome
  Time (mean ± σ):     134.9 ms ±   1.6 ms    [User: 106.9 ms, System: 26.5 ms]
  Range (min … max):   132.3 ms … 136.5 ms    10 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):      53.5 ms ±   0.3 ms    [User: 38.2 ms, System: 20.7 ms]
  Range (min … max):    53.1 ms …  53.9 ms    10 runs
 
Summary
  oxfmt ran
    2.52 ± 0.03 times faster than biome
   14.51 ± 0.18 times faster than prettier+oxc-parser
   20.56 ± 1.87 times faster than prettier

Memory Usage:
  prettier: 280.3 MB (min: 268.6 MB, max: 295.8 MB)
  prettier+oxc-parser: 240.0 MB (min: 237.4 MB, max: 242.0 MB)
  biome: 62.2 MB (min: 61.6 MB, max: 64.9 MB)
  oxfmt: 101.8 MB (min: 101.6 MB, max: 102.0 MB)

=========================================
Benchmarking Outline repository
=========================================
Benchmark 1: prettier
  Time (mean ± σ):      8.786 s ±  0.087 s    [User: 29.800 s, System: 2.446 s]
  Range (min … max):    8.631 s …  8.901 s    10 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):      5.816 s ±  0.057 s    [User: 18.058 s, System: 1.674 s]
  Range (min … max):    5.721 s …  5.909 s    10 runs
 
Benchmark 3: biome
  Time (mean ± σ):     860.6 ms ±  85.1 ms    [User: 2574.9 ms, System: 373.4 ms]
  Range (min … max):   802.7 ms … 1027.8 ms    10 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):     212.8 ms ±   5.5 ms    [User: 568.5 ms, System: 155.0 ms]
  Range (min … max):   208.7 ms … 227.4 ms    10 runs
 
Summary
  oxfmt ran
    4.04 ± 0.41 times faster than biome
   27.32 ± 0.76 times faster than prettier+oxc-parser
   41.28 ± 1.15 times faster than prettier

Memory Usage:
  prettier: 855.9 MB (min: 805.3 MB, max: 943.9 MB)
  prettier+oxc-parser: 667.3 MB (min: 640.5 MB, max: 686.6 MB)
  biome: 61.7 MB (min: 59.1 MB, max: 64.9 MB)
  oxfmt: 129.4 MB (min: 124.5 MB, max: 136.2 MB)

Benchmark complete!
```
<!-- BENCHMARK_RESULTS_END -->
