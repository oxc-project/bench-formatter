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
  Time (mean ± σ):      1.113 s ±  0.069 s    [User: 2.167 s, System: 0.230 s]
  Range (min … max):    1.062 s …  1.236 s    10 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):     791.9 ms ±  17.5 ms    [User: 1344.9 ms, System: 150.9 ms]
  Range (min … max):   767.2 ms … 824.0 ms    10 runs
 
Benchmark 3: biome
  Time (mean ± σ):     135.1 ms ±   1.6 ms    [User: 106.9 ms, System: 27.0 ms]
  Range (min … max):   133.2 ms … 137.6 ms    10 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):      88.4 ms ±   1.7 ms    [User: 66.7 ms, System: 27.8 ms]
  Range (min … max):    86.4 ms …  90.9 ms    10 runs
 
Summary
  oxfmt ran
    1.53 ± 0.03 times faster than biome
    8.96 ± 0.26 times faster than prettier+oxc-parser
   12.59 ± 0.82 times faster than prettier

=========================================
Benchmarking Outline repository
=========================================
Benchmark 1: prettier
  Time (mean ± σ):      8.836 s ±  0.117 s    [User: 30.033 s, System: 2.446 s]
  Range (min … max):    8.638 s …  8.973 s    10 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):      5.956 s ±  0.082 s    [User: 18.573 s, System: 1.729 s]
  Range (min … max):    5.821 s …  6.080 s    10 runs
 
Benchmark 3: biome
  Time (mean ± σ):     852.2 ms ±  86.3 ms    [User: 2567.6 ms, System: 368.0 ms]
  Range (min … max):   792.6 ms … 1032.8 ms    10 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):     248.6 ms ±   2.0 ms    [User: 640.3 ms, System: 139.4 ms]
  Range (min … max):   246.6 ms … 253.0 ms    10 runs
 
Summary
  oxfmt ran
    3.43 ± 0.35 times faster than biome
   23.96 ± 0.38 times faster than prettier+oxc-parser
   35.55 ± 0.55 times faster than prettier

Benchmark complete!
```
<!-- BENCHMARK_RESULTS_END -->
