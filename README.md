# JavaScript/TypeScript Formatter Benchmark

Comparing execution time of **Prettier**, **Biome**, and **Oxfmt** on the Kibana repository (2M+ lines of code).

## Formatters

- [Prettier](https://prettier.io/)
- [Prettier](https://prettier.io/) + @prettier/plugin-oxc
- [Biome](https://biomejs.dev/) Formatter
- [Oxfmt](https://oxc.rs):

## Versions

- **Prettier**: 3.6.2
- **Biome**: 2.3.4
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
  Time (mean ± σ):      1.111 s ±  0.015 s    [User: 2.198 s, System: 0.219 s]
  Range (min … max):    1.086 s …  1.134 s    10 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):     841.0 ms ±  35.2 ms    [User: 1446.0 ms, System: 147.3 ms]
  Range (min … max):   803.3 ms … 905.0 ms    10 runs
 
Benchmark 3: biome
  Time (mean ± σ):     145.1 ms ±   5.1 ms    [User: 112.3 ms, System: 29.7 ms]
  Range (min … max):   138.0 ms … 153.9 ms    10 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):      92.4 ms ±   4.1 ms    [User: 72.8 ms, System: 25.9 ms]
  Range (min … max):    87.8 ms … 100.1 ms    10 runs
 
Summary
  oxfmt ran
    1.57 ± 0.09 times faster than biome
    9.10 ± 0.56 times faster than prettier+oxc-parser
   12.03 ± 0.56 times faster than prettier

=========================================
Benchmarking Outline repository
=========================================
Benchmark 1: prettier
  Time (mean ± σ):      9.433 s ±  0.128 s    [User: 32.142 s, System: 2.558 s]
  Range (min … max):    9.312 s …  9.725 s    10 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):      6.461 s ±  0.046 s    [User: 20.485 s, System: 1.744 s]
  Range (min … max):    6.407 s …  6.557 s    10 runs
 
Benchmark 3: biome
  Time (mean ± σ):     812.9 ms ±  19.6 ms    [User: 2563.6 ms, System: 383.8 ms]
  Range (min … max):   793.9 ms … 865.8 ms    10 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):     268.4 ms ±  18.2 ms    [User: 654.0 ms, System: 174.3 ms]
  Range (min … max):   259.0 ms … 319.9 ms    10 runs
 
Summary
  oxfmt ran
    3.03 ± 0.22 times faster than biome
   24.07 ± 1.64 times faster than prettier+oxc-parser
   35.15 ± 2.43 times faster than prettier

Benchmark complete!
```
<!-- BENCHMARK_RESULTS_END -->
