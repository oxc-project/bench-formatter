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
  Time (mean ± σ):      1.176 s ±  0.085 s    [User: 2.319 s, System: 0.230 s]
  Range (min … max):    1.088 s …  1.290 s    10 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):     819.5 ms ±  14.1 ms    [User: 1372.4 ms, System: 138.3 ms]
  Range (min … max):   803.1 ms … 842.4 ms    10 runs
 
Benchmark 3: biome
  Time (mean ± σ):     137.0 ms ±   2.3 ms    [User: 106.9 ms, System: 28.5 ms]
  Range (min … max):   133.9 ms … 140.1 ms    10 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):      53.3 ms ±   0.4 ms    [User: 37.3 ms, System: 22.0 ms]
  Range (min … max):    52.9 ms …  53.9 ms    10 runs
 
Summary
  oxfmt ran
    2.57 ± 0.05 times faster than biome
   15.37 ± 0.28 times faster than prettier+oxc-parser
   22.06 ± 1.60 times faster than prettier

Memory Usage:
  prettier: 275.4 MB (min: 255.4 MB, max: 308.9 MB)
  prettier+oxc-parser: 237.3 MB (min: 233.8 MB, max: 240.6 MB)
  biome: 62.9 MB (min: 61.7 MB, max: 65.9 MB)
  oxfmt: 102.4 MB (min: 102.2 MB, max: 102.5 MB)

=========================================
Benchmarking Outline repository
=========================================
Benchmark 1: prettier
  Time (mean ± σ):     10.097 s ±  0.199 s    [User: 33.592 s, System: 3.115 s]
  Range (min … max):    9.660 s … 10.329 s    10 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):      6.969 s ±  0.055 s    [User: 20.941 s, System: 2.261 s]
  Range (min … max):    6.865 s …  7.046 s    10 runs
 
Benchmark 3: biome
  Time (mean ± σ):     903.7 ms ±  88.5 ms    [User: 2687.5 ms, System: 403.5 ms]
  Range (min … max):   842.1 ms … 1078.0 ms    10 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):     285.0 ms ±   7.2 ms    [User: 680.1 ms, System: 255.4 ms]
  Range (min … max):   274.4 ms … 294.4 ms    10 runs
 
Summary
  oxfmt ran
    3.17 ± 0.32 times faster than biome
   24.45 ± 0.65 times faster than prettier+oxc-parser
   35.42 ± 1.14 times faster than prettier

Memory Usage:
  biome: 63.9 MB (min: 62.3 MB, max: 65.4 MB)
  oxfmt: 143.3 MB (min: 130.7 MB, max: 153.4 MB)

Benchmark complete!
```
<!-- BENCHMARK_RESULTS_END -->
