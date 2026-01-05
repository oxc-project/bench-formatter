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
  Time (mean ± σ):      1.164 s ±  0.082 s    [User: 2.252 s, System: 0.246 s]
  Range (min … max):    1.062 s …  1.290 s    10 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):     814.8 ms ±  16.7 ms    [User: 1357.4 ms, System: 142.0 ms]
  Range (min … max):   787.7 ms … 839.1 ms    10 runs
 
Benchmark 3: biome
  Time (mean ± σ):     136.3 ms ±   2.2 ms    [User: 105.4 ms, System: 28.5 ms]
  Range (min … max):   132.9 ms … 138.5 ms    10 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):     529.5 ms ±   5.3 ms    [User: 676.5 ms, System: 116.5 ms]
  Range (min … max):   525.1 ms … 542.9 ms    10 runs
 
Summary
  biome ran
    3.89 ± 0.07 times faster than oxfmt
    5.98 ± 0.16 times faster than prettier+oxc-parser
    8.54 ± 0.62 times faster than prettier

Memory Usage:
  prettier: 281.4 MB (min: 266.1 MB, max: 316.0 MB)
  prettier+oxc-parser: 237.5 MB (min: 235.7 MB, max: 240.4 MB)
  biome: 62.3 MB (min: 61.8 MB, max: 63.9 MB)
  oxfmt: 237.4 MB (min: 236.6 MB, max: 240.2 MB)

=========================================
Benchmarking Outline repository
=========================================
Benchmark 1: prettier
  Time (mean ± σ):      9.768 s ±  0.151 s    [User: 32.515 s, System: 2.991 s]
  Range (min … max):    9.604 s … 10.103 s    10 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):      6.870 s ±  0.068 s    [User: 20.750 s, System: 2.270 s]
  Range (min … max):    6.742 s …  6.941 s    10 runs
 
Benchmark 3: biome
  Time (mean ± σ):     850.1 ms ±   5.5 ms    [User: 2734.8 ms, System: 400.5 ms]
  Range (min … max):   842.9 ms … 860.8 ms    10 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):      4.776 s ±  0.042 s    [User: 10.680 s, System: 4.891 s]
  Range (min … max):    4.721 s …  4.840 s    10 runs
 
Summary
  biome ran
    5.62 ± 0.06 times faster than oxfmt
    8.08 ± 0.10 times faster than prettier+oxc-parser
   11.49 ± 0.19 times faster than prettier

Memory Usage:
  biome: 63.3 MB (min: 60.6 MB, max: 69.0 MB)
  oxfmt: 526.4 MB (min: 513.2 MB, max: 534.3 MB)

Benchmark complete!
```
<!-- BENCHMARK_RESULTS_END -->
