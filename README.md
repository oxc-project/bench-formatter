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
- **Oxfmt**: 0.14.0

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
  Time (mean ± σ):      1.150 s ±  0.082 s    [User: 2.197 s, System: 0.237 s]
  Range (min … max):    1.034 s …  1.252 s    10 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):     804.5 ms ±  20.3 ms    [User: 1373.3 ms, System: 150.8 ms]
  Range (min … max):   763.6 ms … 828.1 ms    10 runs
 
Benchmark 3: biome
  Time (mean ± σ):     137.0 ms ±   3.5 ms    [User: 107.4 ms, System: 28.9 ms]
  Range (min … max):   132.6 ms … 142.9 ms    10 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):      88.3 ms ±   1.8 ms    [User: 67.7 ms, System: 26.5 ms]
  Range (min … max):    86.3 ms …  90.7 ms    10 runs
 
Summary
  oxfmt ran
    1.55 ± 0.05 times faster than biome
    9.11 ± 0.30 times faster than prettier+oxc-parser
   13.03 ± 0.97 times faster than prettier

=========================================
Benchmarking Outline repository
=========================================
Benchmark 1: prettier
  Time (mean ± σ):      9.022 s ±  0.174 s    [User: 30.639 s, System: 2.347 s]
  Range (min … max):    8.795 s …  9.412 s    10 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):      6.211 s ±  0.124 s    [User: 19.367 s, System: 1.766 s]
  Range (min … max):    5.938 s …  6.411 s    10 runs
 
Benchmark 3: biome
  Time (mean ± σ):     874.8 ms ±  86.4 ms    [User: 2610.6 ms, System: 388.1 ms]
  Range (min … max):   809.5 ms … 1031.2 ms    10 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):     248.3 ms ±   2.9 ms    [User: 640.2 ms, System: 138.9 ms]
  Range (min … max):   245.7 ms … 254.5 ms    10 runs
 
Summary
  oxfmt ran
    3.52 ± 0.35 times faster than biome
   25.01 ± 0.58 times faster than prettier+oxc-parser
   36.33 ± 0.82 times faster than prettier

Benchmark complete!
```
<!-- BENCHMARK_RESULTS_END -->
