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
- **Oxfmt**: 0.11.0

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
  Time (mean ± σ):      1.109 s ±  0.080 s    [User: 2.174 s, System: 0.225 s]
  Range (min … max):    1.065 s …  1.334 s    10 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):     805.0 ms ±  15.5 ms    [User: 1393.0 ms, System: 147.9 ms]
  Range (min … max):   785.2 ms … 832.1 ms    10 runs
 
Benchmark 3: biome
  Time (mean ± σ):     135.6 ms ±   1.3 ms    [User: 106.0 ms, System: 27.6 ms]
  Range (min … max):   132.9 ms … 137.5 ms    10 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):     125.4 ms ±   0.9 ms    [User: 104.2 ms, System: 34.5 ms]
  Range (min … max):   124.3 ms … 127.6 ms    10 runs
 
Summary
  oxfmt ran
    1.08 ± 0.01 times faster than biome
    6.42 ± 0.13 times faster than prettier+oxc-parser
    8.84 ± 0.64 times faster than prettier

=========================================
Benchmarking Outline repository
=========================================
Benchmark 1: prettier
  Time (mean ± σ):      9.236 s ±  0.144 s    [User: 31.407 s, System: 2.549 s]
  Range (min … max):    9.007 s …  9.496 s    10 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):      6.350 s ±  0.055 s    [User: 20.097 s, System: 1.699 s]
  Range (min … max):    6.245 s …  6.436 s    10 runs
 
Benchmark 3: biome
  Time (mean ± σ):     846.2 ms ±  82.3 ms    [User: 2524.9 ms, System: 376.0 ms]
  Range (min … max):   790.1 ms … 998.6 ms    10 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):     342.8 ms ±   4.1 ms    [User: 856.3 ms, System: 186.3 ms]
  Range (min … max):   337.9 ms … 352.3 ms    10 runs
 
Summary
  oxfmt ran
    2.47 ± 0.24 times faster than biome
   18.52 ± 0.27 times faster than prettier+oxc-parser
   26.94 ± 0.53 times faster than prettier

Benchmark complete!
```
<!-- BENCHMARK_RESULTS_END -->

## Notes

- Each formatter runs on the exact same codebase state (git reset between runs)
- Times include both parsing and formatting of all matched files
