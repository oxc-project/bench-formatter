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
  Time (mean ± σ):      1.052 s ±  0.060 s    [User: 2.227 s, System: 0.170 s]
  Range (min … max):    0.981 s …  1.144 s    10 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):     744.5 ms ±  17.0 ms    [User: 1327.4 ms, System: 109.5 ms]
  Range (min … max):   713.3 ms … 774.6 ms    10 runs
 
Benchmark 3: biome
  Time (mean ± σ):     132.5 ms ±   1.5 ms    [User: 105.3 ms, System: 24.9 ms]
  Range (min … max):   129.9 ms … 134.3 ms    10 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):      52.6 ms ±   0.6 ms    [User: 39.3 ms, System: 19.9 ms]
  Range (min … max):    52.0 ms …  54.0 ms    10 runs
 
Summary
  oxfmt ran
    2.52 ± 0.04 times faster than biome
   14.15 ± 0.36 times faster than prettier+oxc-parser
   19.99 ± 1.17 times faster than prettier

Memory Usage:
  prettier: 270.7 MB (min: 253.2 MB, max: 286.0 MB)
  prettier+oxc-parser: 237.7 MB (min: 236.0 MB, max: 240.0 MB)
  biome: 63.0 MB (min: 62.4 MB, max: 66.4 MB)
  oxfmt: 102.3 MB (min: 102.2 MB, max: 102.4 MB)

=========================================
Benchmarking Outline repository
=========================================
Benchmark 1: prettier
  Time (mean ± σ):      8.340 s ±  0.069 s    [User: 29.243 s, System: 1.564 s]
  Range (min … max):    8.224 s …  8.452 s    10 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):      5.784 s ±  0.078 s    [User: 18.705 s, System: 1.187 s]
  Range (min … max):    5.707 s …  5.894 s    10 runs
 
Benchmark 3: biome
  Time (mean ± σ):     831.3 ms ±  79.0 ms    [User: 2632.0 ms, System: 247.6 ms]
  Range (min … max):   776.0 ms … 996.9 ms    10 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):     183.0 ms ±   1.8 ms    [User: 517.3 ms, System: 112.6 ms]
  Range (min … max):   180.7 ms … 185.9 ms    10 runs
 
Summary
  oxfmt ran
    4.54 ± 0.43 times faster than biome
   31.61 ± 0.53 times faster than prettier+oxc-parser
   45.58 ± 0.59 times faster than prettier

Memory Usage:
  prettier: 883.0 MB (min: 839.7 MB, max: 943.9 MB)
  prettier+oxc-parser: 675.4 MB (min: 656.3 MB, max: 700.5 MB)
  biome: 63.8 MB (min: 62.1 MB, max: 66.4 MB)
  oxfmt: 129.7 MB (min: 125.9 MB, max: 136.9 MB)

Benchmark complete!
```
<!-- BENCHMARK_RESULTS_END -->
