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
- **Oxfmt**: 0.18.0

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
  Time (mean ± σ):      1.105 s ±  0.066 s    [User: 2.194 s, System: 0.225 s]
  Range (min … max):    1.056 s …  1.262 s    10 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):     805.5 ms ±  14.8 ms    [User: 1342.4 ms, System: 136.8 ms]
  Range (min … max):   786.6 ms … 828.1 ms    10 runs
 
Benchmark 3: biome
  Time (mean ± σ):     135.9 ms ±   2.2 ms    [User: 106.4 ms, System: 27.6 ms]
  Range (min … max):   133.0 ms … 139.3 ms    10 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):     118.6 ms ±   2.0 ms    [User: 238.4 ms, System: 63.0 ms]
  Range (min … max):   115.2 ms … 122.5 ms    10 runs
 
Summary
  oxfmt ran
    1.15 ± 0.03 times faster than biome
    6.79 ± 0.17 times faster than prettier+oxc-parser
    9.32 ± 0.58 times faster than prettier

Memory Usage:
  prettier: 274.0 MB (min: 262.3 MB, max: 291.3 MB)
  prettier+oxc-parser: 236.0 MB (min: 232.9 MB, max: 238.1 MB)
  biome: 63.1 MB (min: 62.1 MB, max: 66.2 MB)
  oxfmt: 162.3 MB (min: 162.2 MB, max: 162.5 MB)

=========================================
Benchmarking Outline repository
=========================================
Benchmark 1: prettier
  Time (mean ± σ):      9.564 s ±  0.116 s    [User: 31.790 s, System: 2.998 s]
  Range (min … max):    9.393 s …  9.757 s    10 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):      6.691 s ±  0.065 s    [User: 20.264 s, System: 2.193 s]
  Range (min … max):    6.592 s …  6.776 s    10 runs
 
Benchmark 3: biome
  Time (mean ± σ):     887.8 ms ±  87.7 ms    [User: 2696.8 ms, System: 370.0 ms]
  Range (min … max):   838.1 ms … 1076.4 ms    10 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):     361.3 ms ±   5.7 ms    [User: 937.0 ms, System: 298.6 ms]
  Range (min … max):   353.5 ms … 372.7 ms    10 runs
 
Summary
  oxfmt ran
    2.46 ± 0.25 times faster than biome
   18.52 ± 0.34 times faster than prettier+oxc-parser
   26.47 ± 0.53 times faster than prettier

Memory Usage:
  biome: 63.6 MB (min: 62.5 MB, max: 65.7 MB)
  oxfmt: 204.5 MB (min: 191.8 MB, max: 217.4 MB)

Benchmark complete!
```
<!-- BENCHMARK_RESULTS_END -->
