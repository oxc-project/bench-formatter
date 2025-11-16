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
  Time (mean ± σ):      1.205 s ±  0.070 s    [User: 2.312 s, System: 0.243 s]
  Range (min … max):    1.127 s …  1.294 s    10 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):     844.9 ms ±   9.2 ms    [User: 1455.1 ms, System: 155.1 ms]
  Range (min … max):   831.9 ms … 862.3 ms    10 runs
 
Benchmark 3: biome
  Time (mean ± σ):     138.2 ms ±   1.1 ms    [User: 108.2 ms, System: 28.9 ms]
  Range (min … max):   136.4 ms … 140.7 ms    10 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):      89.4 ms ±   2.0 ms    [User: 72.2 ms, System: 24.0 ms]
  Range (min … max):    87.7 ms …  93.1 ms    10 runs
 
Summary
  oxfmt ran
    1.55 ± 0.04 times faster than biome
    9.45 ± 0.24 times faster than prettier+oxc-parser
   13.48 ± 0.84 times faster than prettier

=========================================
Benchmarking Outline repository
=========================================
Benchmark 1: prettier
  Time (mean ± σ):      9.931 s ±  0.124 s    [User: 33.958 s, System: 2.614 s]
  Range (min … max):    9.758 s … 10.203 s    10 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):      6.765 s ±  0.071 s    [User: 21.473 s, System: 1.823 s]
  Range (min … max):    6.629 s …  6.866 s    10 runs
 
Benchmark 3: biome
  Time (mean ± σ):     880.5 ms ±  88.7 ms    [User: 2611.9 ms, System: 388.5 ms]
  Range (min … max):   811.5 ms … 1036.4 ms    10 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):     268.7 ms ±   2.8 ms    [User: 662.2 ms, System: 181.8 ms]
  Range (min … max):   265.5 ms … 273.8 ms    10 runs
 
Summary
  oxfmt ran
    3.28 ± 0.33 times faster than biome
   25.18 ± 0.37 times faster than prettier+oxc-parser
   36.96 ± 0.60 times faster than prettier

Benchmark complete!
```
<!-- BENCHMARK_RESULTS_END -->
