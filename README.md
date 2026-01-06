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
- **Oxfmt**: 0.22.0

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
  Time (mean ± σ):      1.158 s ±  0.062 s    [User: 2.311 s, System: 0.234 s]
  Range (min … max):    1.087 s …  1.296 s    10 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):     832.9 ms ±  12.1 ms    [User: 1400.4 ms, System: 146.5 ms]
  Range (min … max):   816.7 ms … 852.9 ms    10 runs
 
Benchmark 3: biome
  Time (mean ± σ):     140.3 ms ±   1.6 ms    [User: 110.3 ms, System: 28.5 ms]
  Range (min … max):   137.5 ms … 142.8 ms    10 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):     128.7 ms ±   3.3 ms    [User: 252.1 ms, System: 67.6 ms]
  Range (min … max):   124.0 ms … 135.2 ms    10 runs
 
Summary
  oxfmt ran
    1.09 ± 0.03 times faster than biome
    6.47 ± 0.19 times faster than prettier+oxc-parser
    9.00 ± 0.54 times faster than prettier

Memory Usage:
  prettier: 276.2 MB (min: 256.1 MB, max: 294.4 MB)
  prettier+oxc-parser: 237.6 MB (min: 236.1 MB, max: 238.8 MB)
  biome: 62.9 MB (min: 62.1 MB, max: 64.2 MB)
  oxfmt: 163.8 MB (min: 163.6 MB, max: 164.0 MB)

=========================================
Benchmarking Outline repository
=========================================
Benchmark 1: prettier
  Time (mean ± σ):     10.398 s ±  0.143 s    [User: 34.585 s, System: 3.121 s]
  Range (min … max):   10.125 s … 10.555 s    10 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):      7.438 s ±  0.078 s    [User: 22.314 s, System: 2.367 s]
  Range (min … max):    7.291 s …  7.548 s    10 runs
 
Benchmark 3: biome
  Time (mean ± σ):     881.1 ms ±   7.0 ms    [User: 2810.7 ms, System: 418.8 ms]
  Range (min … max):   870.3 ms … 893.1 ms    10 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):     401.6 ms ±  25.9 ms    [User: 1020.8 ms, System: 326.5 ms]
  Range (min … max):   387.7 ms … 474.1 ms    10 runs
 
Summary
  oxfmt ran
    2.19 ± 0.14 times faster than biome
   18.52 ± 1.21 times faster than prettier+oxc-parser
   25.89 ± 1.70 times faster than prettier

Memory Usage:
  biome: 63.0 MB (min: 60.4 MB, max: 68.2 MB)
  oxfmt: 204.1 MB (min: 193.5 MB, max: 217.6 MB)

Benchmark complete!
```
<!-- BENCHMARK_RESULTS_END -->
