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
  Time (mean ± σ):      1.140 s ±  0.077 s    [User: 2.195 s, System: 0.227 s]
  Range (min … max):    1.070 s …  1.248 s    10 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):     783.3 ms ±   9.7 ms    [User: 1337.4 ms, System: 145.4 ms]
  Range (min … max):   770.3 ms … 802.3 ms    10 runs
 
Benchmark 3: biome
  Time (mean ± σ):     135.3 ms ±   1.7 ms    [User: 105.8 ms, System: 27.9 ms]
  Range (min … max):   132.8 ms … 137.9 ms    10 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):      54.2 ms ±   0.5 ms    [User: 38.2 ms, System: 21.6 ms]
  Range (min … max):    53.5 ms …  55.2 ms    10 runs
 
Summary
  oxfmt ran
    2.50 ± 0.04 times faster than biome
   14.45 ± 0.23 times faster than prettier+oxc-parser
   21.02 ± 1.43 times faster than prettier

=========================================
Benchmarking Outline repository
=========================================
Benchmark 1: prettier
  Time (mean ± σ):      8.685 s ±  0.106 s    [User: 29.631 s, System: 2.350 s]
  Range (min … max):    8.515 s …  8.834 s    10 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):      5.893 s ±  0.091 s    [User: 18.400 s, System: 1.700 s]
  Range (min … max):    5.728 s …  6.080 s    10 runs
 
Benchmark 3: biome
  Time (mean ± σ):     846.3 ms ±  79.3 ms    [User: 2558.5 ms, System: 365.0 ms]
  Range (min … max):   800.7 ms … 1013.9 ms    10 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):     213.2 ms ±   2.9 ms    [User: 569.9 ms, System: 156.3 ms]
  Range (min … max):   209.8 ms … 219.6 ms    10 runs
 
Summary
  oxfmt ran
    3.97 ± 0.38 times faster than biome
   27.64 ± 0.56 times faster than prettier+oxc-parser
   40.74 ± 0.74 times faster than prettier

Benchmark complete!
```
<!-- BENCHMARK_RESULTS_END -->
