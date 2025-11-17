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
  Time (mean ± σ):      1.133 s ±  0.064 s    [User: 2.182 s, System: 0.227 s]
  Range (min … max):    1.067 s …  1.223 s    10 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):     791.7 ms ±   8.4 ms    [User: 1370.5 ms, System: 145.7 ms]
  Range (min … max):   778.3 ms … 805.2 ms    10 runs
 
Benchmark 3: biome
  Time (mean ± σ):     133.7 ms ±   2.2 ms    [User: 104.8 ms, System: 26.8 ms]
  Range (min … max):   130.3 ms … 137.7 ms    10 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):      85.4 ms ±   1.6 ms    [User: 66.5 ms, System: 25.0 ms]
  Range (min … max):    83.9 ms …  87.7 ms    10 runs
 
Summary
  oxfmt ran
    1.57 ± 0.04 times faster than biome
    9.27 ± 0.20 times faster than prettier+oxc-parser
   13.26 ± 0.78 times faster than prettier

=========================================
Benchmarking Outline repository
=========================================
Benchmark 1: prettier
  Time (mean ± σ):      9.274 s ±  0.152 s    [User: 31.468 s, System: 2.558 s]
  Range (min … max):    9.130 s …  9.679 s    10 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):      6.295 s ±  0.034 s    [User: 19.870 s, System: 1.670 s]
  Range (min … max):    6.233 s …  6.344 s    10 runs
 
Benchmark 3: biome
  Time (mean ± σ):      1.018 s ±  0.587 s    [User: 2.523 s, System: 0.372 s]
  Range (min … max):    0.784 s …  2.676 s    10 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):     258.1 ms ±   2.0 ms    [User: 648.0 ms, System: 167.2 ms]
  Range (min … max):   254.4 ms … 260.9 ms    10 runs
 
Summary
  oxfmt ran
    3.94 ± 2.28 times faster than biome
   24.39 ± 0.23 times faster than prettier+oxc-parser
   35.93 ± 0.65 times faster than prettier

Benchmark complete!
```
<!-- BENCHMARK_RESULTS_END -->
