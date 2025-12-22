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
- **Oxfmt**: 0.19.0

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
  Time (mean ± σ):      1.173 s ±  0.063 s    [User: 2.293 s, System: 0.239 s]
  Range (min … max):    1.104 s …  1.286 s    10 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):     843.6 ms ±  11.3 ms    [User: 1401.1 ms, System: 153.8 ms]
  Range (min … max):   819.4 ms … 859.9 ms    10 runs
 
Benchmark 3: biome
  Time (mean ± σ):     140.6 ms ±   2.2 ms    [User: 109.3 ms, System: 30.3 ms]
  Range (min … max):   137.3 ms … 145.1 ms    10 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):     126.5 ms ±   3.1 ms    [User: 257.2 ms, System: 62.2 ms]
  Range (min … max):   122.6 ms … 131.6 ms    10 runs
 
Summary
  oxfmt ran
    1.11 ± 0.03 times faster than biome
    6.67 ± 0.19 times faster than prettier+oxc-parser
    9.27 ± 0.55 times faster than prettier

Memory Usage:
  prettier: 281.6 MB (min: 261.8 MB, max: 314.8 MB)
  prettier+oxc-parser: 236.7 MB (min: 234.3 MB, max: 239.8 MB)
  biome: 62.5 MB (min: 61.8 MB, max: 64.4 MB)
  oxfmt: 162.0 MB (min: 161.7 MB, max: 162.3 MB)

=========================================
Benchmarking Outline repository
=========================================
Benchmark 1: prettier
  Time (mean ± σ):     10.081 s ±  0.109 s    [User: 33.448 s, System: 3.112 s]
  Range (min … max):    9.908 s … 10.275 s    10 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):      7.377 s ±  0.101 s    [User: 21.161 s, System: 2.235 s]
  Range (min … max):    7.242 s …  7.556 s    10 runs
 
Benchmark 3: biome
  Time (mean ± σ):     850.6 ms ±   5.1 ms    [User: 2742.3 ms, System: 380.6 ms]
  Range (min … max):   841.5 ms … 857.5 ms    10 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):     373.7 ms ±   3.4 ms    [User: 980.4 ms, System: 303.2 ms]
  Range (min … max):   368.9 ms … 378.1 ms    10 runs
 
Summary
  oxfmt ran
    2.28 ± 0.02 times faster than biome
   19.74 ± 0.33 times faster than prettier+oxc-parser
   26.98 ± 0.38 times faster than prettier

Memory Usage:
  biome: 63.1 MB (min: 60.7 MB, max: 66.8 MB)
  oxfmt: 201.5 MB (min: 191.2 MB, max: 211.0 MB)

Benchmark complete!
```
<!-- BENCHMARK_RESULTS_END -->
