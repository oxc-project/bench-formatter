# JavaScript/TypeScript Formatter Benchmark

Comparing execution time of **Prettier**, **Biome**, and **Oxfmt** on the Kibana repository (2M+ lines of code).

## Formatters

- [Prettier](https://prettier.io/)
- [Prettier](https://prettier.io/) + @prettier/plugin-oxc
- [Biome](https://biomejs.dev/) Formatter
- [Oxfmt](https://oxc.rs):

## Versions

- **Prettier**: 3.6.2
- **Biome**: 2.3.5
- **Oxfmt**: 0.13.0

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
- I intended to bench checker.ts, but it appears to be running for a very long time or stuck with 100% CPU.

## Benchmark Details

- **Test Data**: [Outline](https://github.com/outline/outline) repository (1915 js,jsx,ts,tsx files)
- **File Patterns**: `**/*.{js,jsx,ts,tsx}`
- **Methodology**:
  - 3 warmup runs before measurement
  - 10 benchmark runs for statistical accuracy
  - Git reset before each run to ensure identical starting conditions
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
  Time (mean ± σ):      1.113 s ±  0.054 s    [User: 2.176 s, System: 0.226 s]
  Range (min … max):    1.049 s …  1.228 s    10 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):     791.4 ms ±  22.7 ms    [User: 1349.6 ms, System: 152.8 ms]
  Range (min … max):   765.6 ms … 845.7 ms    10 runs
 
Benchmark 3: biome
  Time (mean ± σ):     137.1 ms ±   1.9 ms    [User: 106.6 ms, System: 28.5 ms]
  Range (min … max):   134.1 ms … 139.3 ms    10 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):      87.8 ms ±   1.4 ms    [User: 70.1 ms, System: 24.6 ms]
  Range (min … max):    85.7 ms …  90.3 ms    10 runs
 
Summary
  oxfmt ran
    1.56 ± 0.03 times faster than biome
    9.01 ± 0.30 times faster than prettier+oxc-parser
   12.68 ± 0.65 times faster than prettier

=========================================
Benchmarking Outline repository
=========================================
Benchmark 1: prettier
  Time (mean ± σ):      8.877 s ±  0.118 s    [User: 30.213 s, System: 2.458 s]
  Range (min … max):    8.698 s …  9.028 s    10 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):      5.865 s ±  0.046 s    [User: 18.267 s, System: 1.721 s]
  Range (min … max):    5.789 s …  5.917 s    10 runs
 
Benchmark 3: biome
  Time (mean ± σ):     811.2 ms ±   6.7 ms    [User: 2574.3 ms, System: 376.4 ms]
  Range (min … max):   800.1 ms … 822.2 ms    10 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):     262.5 ms ±   2.1 ms    [User: 658.0 ms, System: 172.3 ms]
  Range (min … max):   260.0 ms … 267.1 ms    10 runs
 
Summary
  oxfmt ran
    3.09 ± 0.04 times faster than biome
   22.34 ± 0.25 times faster than prettier+oxc-parser
   33.82 ± 0.53 times faster than prettier

Benchmark complete!
```
<!-- BENCHMARK_RESULTS_END -->
