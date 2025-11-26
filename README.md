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
  Time (mean ± σ):      1.148 s ±  0.062 s    [User: 2.209 s, System: 0.233 s]
  Range (min … max):    1.082 s …  1.237 s    10 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):     789.8 ms ±  14.7 ms    [User: 1338.7 ms, System: 151.3 ms]
  Range (min … max):   775.1 ms … 826.1 ms    10 runs
 
Benchmark 3: biome
  Time (mean ± σ):     137.0 ms ±   3.2 ms    [User: 106.0 ms, System: 28.9 ms]
  Range (min … max):   133.6 ms … 142.5 ms    10 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):      54.5 ms ±   0.6 ms    [User: 39.2 ms, System: 21.0 ms]
  Range (min … max):    53.7 ms …  55.3 ms    10 runs
 
Summary
  oxfmt ran
    2.51 ± 0.06 times faster than biome
   14.49 ± 0.31 times faster than prettier+oxc-parser
   21.07 ± 1.17 times faster than prettier

Memory Usage:
  prettier: 276.1 MB (min: 264.9 MB, max: 287.8 MB)
  prettier+oxc-parser: 240.9 MB (min: 237.7 MB, max: 247.4 MB)
  biome: 63.4 MB (min: 62.0 MB, max: 65.8 MB)
  oxfmt: 102.5 MB (min: 102.5 MB, max: 102.7 MB)

=========================================
Benchmarking Outline repository
=========================================
Benchmark 1: prettier
  Time (mean ± σ):      8.889 s ±  0.114 s    [User: 30.299 s, System: 2.389 s]
  Range (min … max):    8.713 s …  9.072 s    10 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):      5.864 s ±  0.059 s    [User: 18.357 s, System: 1.719 s]
  Range (min … max):    5.791 s …  5.976 s    10 runs
 
Benchmark 3: biome
  Time (mean ± σ):     852.9 ms ±  75.7 ms    [User: 2565.3 ms, System: 372.3 ms]
  Range (min … max):   801.5 ms … 1006.5 ms    10 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):     213.8 ms ±   1.6 ms    [User: 565.9 ms, System: 163.6 ms]
  Range (min … max):   211.3 ms … 216.1 ms    10 runs
 
Summary
  oxfmt ran
    3.99 ± 0.36 times faster than biome
   27.43 ± 0.35 times faster than prettier+oxc-parser
   41.58 ± 0.62 times faster than prettier

Memory Usage:
  prettier: 848.0 MB (min: 816.1 MB, max: 890.7 MB)
  prettier+oxc-parser: 673.1 MB (min: 655.7 MB, max: 695.0 MB)
  biome: 63.1 MB (min: 60.0 MB, max: 66.3 MB)
  oxfmt: 129.3 MB (min: 120.1 MB, max: 135.5 MB)

Benchmark complete!
```
<!-- BENCHMARK_RESULTS_END -->
