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
- **Oxfmt**: 0.23.0

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
  Time (mean ± σ):      1.104 s ±  0.028 s    [User: 2.220 s, System: 0.229 s]
  Range (min … max):    1.064 s …  1.147 s    10 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):     875.1 ms ±  57.3 ms    [User: 1431.1 ms, System: 150.6 ms]
  Range (min … max):   812.1 ms … 958.2 ms    10 runs
 
Benchmark 3: biome
  Time (mean ± σ):     137.9 ms ±   2.1 ms    [User: 108.4 ms, System: 27.2 ms]
  Range (min … max):   133.9 ms … 141.0 ms    10 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):     126.3 ms ±   2.1 ms    [User: 259.0 ms, System: 63.2 ms]
  Range (min … max):   123.7 ms … 129.3 ms    10 runs
 
Summary
  oxfmt ran
    1.09 ± 0.02 times faster than biome
    6.93 ± 0.47 times faster than prettier+oxc-parser
    8.74 ± 0.27 times faster than prettier

Memory Usage:
  prettier: 272.0 MB (min: 259.2 MB, max: 305.5 MB)
  prettier+oxc-parser: 235.8 MB (min: 232.7 MB, max: 239.7 MB)
  biome: 62.8 MB (min: 61.7 MB, max: 66.1 MB)
  oxfmt: 163.8 MB (min: 163.4 MB, max: 164.2 MB)

=========================================
Benchmarking Outline repository
=========================================
Benchmark 1: prettier
  Time (mean ± σ):     10.549 s ±  0.359 s    [User: 35.200 s, System: 3.132 s]
  Range (min … max):   10.060 s … 11.217 s    10 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):      7.505 s ±  0.161 s    [User: 22.646 s, System: 2.428 s]
  Range (min … max):    7.150 s …  7.682 s    10 runs
 
Benchmark 3: biome
  Time (mean ± σ):     898.6 ms ±  64.6 ms    [User: 2782.4 ms, System: 407.7 ms]
  Range (min … max):   861.5 ms … 1069.9 ms    10 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):     388.9 ms ±   5.9 ms    [User: 1013.0 ms, System: 321.4 ms]
  Range (min … max):   382.4 ms … 398.4 ms    10 runs
 
Summary
  oxfmt ran
    2.31 ± 0.17 times faster than biome
   19.30 ± 0.51 times faster than prettier+oxc-parser
   27.12 ± 1.01 times faster than prettier

Memory Usage:
  biome: 65.2 MB (min: 61.5 MB, max: 68.3 MB)
  oxfmt: 204.2 MB (min: 195.7 MB, max: 214.4 MB)

Benchmark complete!
```
<!-- BENCHMARK_RESULTS_END -->
