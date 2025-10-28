# JavaScript/TypeScript Formatter Benchmark

Comparing execution time of **Prettier**, **Biome**, and **Oxfmt** on the Kibana repository (2M+ lines of code).

## Formatters

- [Prettier](https://prettier.io/)
- [Prettier](https://prettier.io/) + @prettier/plugin-oxc
- [Biome](https://biomejs.dev/) Formatter
- [Oxfmt](https://oxc.rs):

## Setup

```bash
# Install dependencies and clone Kibana repository
pnpm run setup

# Run the benchmark
pnpm run bench
```

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
  Time (mean ± σ):      1.195 s ±  0.030 s    [User: 2.861 s, System: 0.155 s]
  Range (min … max):    1.152 s …  1.233 s    10 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):     893.8 ms ±  14.3 ms    [User: 1752.7 ms, System: 113.7 ms]
  Range (min … max):   869.0 ms … 907.8 ms    10 runs
 
Benchmark 3: biome
  Time (mean ± σ):      31.9 ms ±   0.6 ms    [User: 17.9 ms, System: 14.7 ms]
  Range (min … max):    31.1 ms …  32.8 ms    10 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):      60.4 ms ±   0.5 ms    [User: 42.3 ms, System: 22.9 ms]
  Range (min … max):    59.6 ms …  61.0 ms    10 runs
 
Summary
  biome ran
    1.89 ± 0.04 times faster than oxfmt
   27.99 ± 0.70 times faster than prettier+oxc-parser
   37.42 ± 1.17 times faster than prettier

=========================================
Benchmarking Outline repository
=========================================
Benchmark 1: prettier
  Time (mean ± σ):     12.713 s ±  0.203 s    [User: 46.959 s, System: 2.256 s]
  Range (min … max):   12.380 s … 13.045 s    10 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):      7.527 s ±  0.080 s    [User: 26.410 s, System: 1.351 s]
  Range (min … max):    7.385 s …  7.644 s    10 runs
 
Benchmark 3: biome
  Time (mean ± σ):      32.5 ms ±   0.5 ms    [User: 19.8 ms, System: 13.5 ms]
  Range (min … max):    31.9 ms …  33.4 ms    10 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):     216.9 ms ±   2.3 ms    [User: 616.8 ms, System: 125.8 ms]
  Range (min … max):   214.0 ms … 221.8 ms    10 runs
 
Summary
  biome ran
    6.66 ± 0.13 times faster than oxfmt
  231.27 ± 4.52 times faster than prettier+oxc-parser
  390.62 ± 8.94 times faster than prettier

Benchmark complete!
```
<!-- BENCHMARK_RESULTS_END -->

## Notes

- Each formatter runs on the exact same codebase state (git reset between runs)
- Times include both parsing and formatting of all matched files
