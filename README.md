# JavaScript/TypeScript Formatter Benchmark

Comparing execution time and memory usage of **Prettier**, **Biome**, and **Oxfmt**.

## Formatters

- [Prettier](https://prettier.io/)
- [Prettier](https://prettier.io/) + @prettier/plugin-oxc
- [Biome](https://biomejs.dev/) Formatter
- [Oxfmt](https://oxc.rs)

## Versions

- **Prettier**: 3.7.1
- **Biome**: 2.3.8
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
  Time (mean ± σ):      1.160 s ±  0.065 s    [User: 2.280 s, System: 0.225 s]
  Range (min … max):    1.088 s …  1.249 s    10 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):     808.1 ms ±  15.6 ms    [User: 1347.6 ms, System: 141.5 ms]
  Range (min … max):   790.6 ms … 840.0 ms    10 runs
 
Benchmark 3: biome
  Time (mean ± σ):     135.6 ms ±   1.5 ms    [User: 106.5 ms, System: 27.5 ms]
  Range (min … max):   132.9 ms … 137.5 ms    10 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):      54.0 ms ±   0.4 ms    [User: 36.7 ms, System: 22.8 ms]
  Range (min … max):    53.4 ms …  54.8 ms    10 runs
 
Summary
  oxfmt ran
    2.51 ± 0.03 times faster than biome
   14.97 ± 0.31 times faster than prettier+oxc-parser
   21.49 ± 1.22 times faster than prettier

Memory Usage:
  prettier: 283.8 MB (min: 255.3 MB, max: 324.6 MB)
  prettier+oxc-parser: 237.6 MB (min: 234.7 MB, max: 240.5 MB)
  biome: 63.4 MB (min: 62.2 MB, max: 66.4 MB)
  oxfmt: 102.5 MB (min: 102.5 MB, max: 102.6 MB)

=========================================
Benchmarking Outline repository
=========================================
Benchmark 1: prettier
  Time (mean ± σ):      9.365 s ±  0.123 s    [User: 31.998 s, System: 2.419 s]
  Range (min … max):    9.187 s …  9.605 s    10 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):      6.370 s ±  0.080 s    [User: 19.897 s, System: 1.728 s]
  Range (min … max):    6.211 s …  6.451 s    10 runs
 
Benchmark 3: biome
  Time (mean ± σ):     837.0 ms ±   5.8 ms    [User: 2676.0 ms, System: 388.1 ms]
  Range (min … max):   827.0 ms … 846.0 ms    10 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):     217.7 ms ±   3.1 ms    [User: 579.9 ms, System: 161.7 ms]
  Range (min … max):   212.3 ms … 222.6 ms    10 runs
 
Summary
  oxfmt ran
    3.84 ± 0.06 times faster than biome
   29.26 ± 0.55 times faster than prettier+oxc-parser
   43.02 ± 0.83 times faster than prettier

Memory Usage:
  prettier: 849.4 MB (min: 811.9 MB, max: 953.6 MB)
  prettier+oxc-parser: 666.0 MB (min: 653.0 MB, max: 679.4 MB)
  biome: 62.6 MB (min: 59.3 MB, max: 65.1 MB)
  oxfmt: 130.5 MB (min: 121.9 MB, max: 142.6 MB)

Benchmark complete!
```
<!-- BENCHMARK_RESULTS_END -->
