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
  Time (mean ± σ):      1.118 s ±  0.056 s    [User: 2.235 s, System: 0.219 s]
  Range (min … max):    1.073 s …  1.267 s    10 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):     827.7 ms ±  14.9 ms    [User: 1370.8 ms, System: 140.5 ms]
  Range (min … max):   796.8 ms … 850.0 ms    10 runs
 
Benchmark 3: biome
  Time (mean ± σ):     156.2 ms ±  55.7 ms    [User: 107.9 ms, System: 28.8 ms]
  Range (min … max):   133.0 ms … 313.4 ms    10 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):      53.3 ms ±   0.5 ms    [User: 37.7 ms, System: 21.6 ms]
  Range (min … max):    52.7 ms …  54.1 ms    10 runs
 
Summary
  oxfmt ran
    2.93 ± 1.04 times faster than biome
   15.52 ± 0.31 times faster than prettier+oxc-parser
   20.96 ± 1.06 times faster than prettier

Memory Usage:
  prettier: 278.8 MB (min: 252.3 MB, max: 310.5 MB)
  prettier+oxc-parser: 237.6 MB (min: 233.9 MB, max: 241.9 MB)
  biome: 63.1 MB (min: 61.7 MB, max: 64.5 MB)
  oxfmt: 102.4 MB (min: 102.2 MB, max: 102.5 MB)

=========================================
Benchmarking Outline repository
=========================================
Benchmark 1: prettier
  Time (mean ± σ):      9.734 s ±  0.126 s    [User: 32.042 s, System: 3.017 s]
  Range (min … max):    9.553 s …  9.901 s    10 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):      6.868 s ±  0.078 s    [User: 20.435 s, System: 2.192 s]
  Range (min … max):    6.769 s …  7.051 s    10 runs
 
Benchmark 3: biome
  Time (mean ± σ):     886.9 ms ±  91.0 ms    [User: 2706.3 ms, System: 377.8 ms]
  Range (min … max):   830.4 ms … 1060.1 ms    10 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):     280.6 ms ±   5.1 ms    [User: 678.6 ms, System: 235.9 ms]
  Range (min … max):   272.7 ms … 286.4 ms    10 runs
 
Summary
  oxfmt ran
    3.16 ± 0.33 times faster than biome
   24.47 ± 0.52 times faster than prettier+oxc-parser
   34.69 ± 0.77 times faster than prettier

Memory Usage:
  biome: 63.2 MB (min: 59.8 MB, max: 66.2 MB)
  oxfmt: 144.9 MB (min: 134.8 MB, max: 151.6 MB)

Benchmark complete!
```
<!-- BENCHMARK_RESULTS_END -->
