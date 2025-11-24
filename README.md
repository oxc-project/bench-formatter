# JavaScript/TypeScript Formatter Benchmark

Comparing execution time and memory usage of **Prettier**, **Biome**, and **Oxfmt** on the Kibana repository (2M+ lines of code).

## Formatters

- [Prettier](https://prettier.io/)
- [Prettier](https://prettier.io/) + @prettier/plugin-oxc
- [Biome](https://biomejs.dev/) Formatter
- [Oxfmt](https://oxc.rs):

## Versions

- **Prettier**: 3.6.2
- **Biome**: 2.3.7
- **Oxfmt**: 0.15.0

## Setup

```bash
# Install dependencies and clone Kibana repository
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

- **Test Data**: [Outline](https://github.com/outline/outline) repository (1915 js,jsx,ts,tsx files)
- **File Patterns**: `**/*.{js,jsx,ts,tsx}`
- **Methodology**:
  - 3 warmup runs before measurement
  - 10 benchmark runs for statistical accuracy
  - Git reset before each run to ensure identical starting conditions
  - Memory usage measured using GNU time (peak RSS)
  - Local binaries via `./node_modules/.bin/`
  - prettier:
    - `./node_modules/.bin/prettier "$@" --write --experimental-cli --no-config --ignore-path=.prettierignore --no-cache --ignore-unknown`
  - prettier + oxc plugin:
    - `./node_modules/.bin/prettier "$@" --write --experimental-cli --no-config --ignore-path=.prettierignore --no-cache --ignore-unknown --plugin @prettier/plugin-oxc`
  - biome:
    - `./node_modules/.bin/biome format --write --files-ignore-unknown=true "$@"`
  - oxc:
    - `./node_modules/.bin/oxfmt "$@"`
`

## Results

<!-- BENCHMARK_RESULTS_START -->
```
=========================================
Benchmarking parser.ts (single large file)
=========================================
Benchmark 1: prettier
  Time (mean ± σ):      1.147 s ±  0.024 s    [User: 2.188 s, System: 0.233 s]
  Range (min … max):    1.090 s …  1.176 s    10 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):     792.7 ms ±  12.6 ms    [User: 1340.5 ms, System: 153.5 ms]
  Range (min … max):   775.9 ms … 811.0 ms    10 runs
 
Benchmark 3: biome
  Time (mean ± σ):     163.4 ms ±  56.3 ms    [User: 107.9 ms, System: 28.1 ms]
  Range (min … max):   134.4 ms … 311.3 ms    10 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):      54.8 ms ±   0.8 ms    [User: 40.0 ms, System: 20.5 ms]
  Range (min … max):    53.9 ms …  56.6 ms    10 runs
 
Summary
  oxfmt ran
    2.98 ± 1.03 times faster than biome
   14.48 ± 0.31 times faster than prettier+oxc-parser
   20.94 ± 0.53 times faster than prettier

Memory Usage:
  prettier: 277.8 MB (min: 268.4 MB, max: 288.6 MB)
  prettier+oxc-parser: 242.8 MB (min: 238.4 MB, max: 249.4 MB)
  biome: 62.3 MB (min: 61.8 MB, max: 64.2 MB)
  oxfmt: 102.5 MB (min: 102.5 MB, max: 102.6 MB)

=========================================
Benchmarking Outline repository
=========================================
Benchmark 1: prettier
  Time (mean ± σ):      8.844 s ±  0.121 s    [User: 30.304 s, System: 2.262 s]
  Range (min … max):    8.699 s …  9.067 s    10 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):      5.895 s ±  0.063 s    [User: 18.373 s, System: 1.701 s]
  Range (min … max):    5.775 s …  6.007 s    10 runs
 
Benchmark 3: biome
  Time (mean ± σ):     808.6 ms ±   7.8 ms    [User: 2552.6 ms, System: 390.5 ms]
  Range (min … max):   802.1 ms … 829.1 ms    10 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):     223.4 ms ±  20.8 ms    [User: 567.7 ms, System: 157.6 ms]
  Range (min … max):   211.0 ms … 263.3 ms    10 runs
 
Summary
  oxfmt ran
    3.62 ± 0.34 times faster than biome
   26.39 ± 2.47 times faster than prettier+oxc-parser
   39.60 ± 3.72 times faster than prettier

Memory Usage:
  prettier: 853.8 MB (min: 791.2 MB, max: 893.2 MB)
  prettier+oxc-parser: 679.7 MB (min: 658.0 MB, max: 695.7 MB)
  biome: 61.9 MB (min: 58.6 MB, max: 65.6 MB)
  oxfmt: 130.4 MB (min: 122.0 MB, max: 138.1 MB)

Benchmark complete!
```
<!-- BENCHMARK_RESULTS_END -->
