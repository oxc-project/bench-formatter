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
  Time (mean ± σ):      1.101 s ±  0.014 s    [User: 2.175 s, System: 0.234 s]
  Range (min … max):    1.073 s …  1.118 s    10 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):     867.3 ms ±  44.5 ms    [User: 1470.9 ms, System: 152.3 ms]
  Range (min … max):   794.2 ms … 916.5 ms    10 runs
 
Benchmark 3: biome
  Time (mean ± σ):     135.8 ms ±   1.7 ms    [User: 105.4 ms, System: 28.7 ms]
  Range (min … max):   133.3 ms … 139.4 ms    10 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):     127.5 ms ±   1.2 ms    [User: 106.2 ms, System: 34.8 ms]
  Range (min … max):   126.1 ms … 130.1 ms    10 runs
 
Summary
  oxfmt ran
    1.07 ± 0.02 times faster than biome
    6.80 ± 0.35 times faster than prettier+oxc-parser
    8.64 ± 0.13 times faster than prettier

=========================================
Benchmarking Outline repository
=========================================
Benchmark 1: prettier
  Time (mean ± σ):      9.432 s ±  0.094 s    [User: 32.278 s, System: 2.447 s]
  Range (min … max):    9.267 s …  9.596 s    10 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):      6.521 s ±  0.058 s    [User: 20.704 s, System: 1.786 s]
  Range (min … max):    6.428 s …  6.619 s    10 runs
 
Benchmark 3: biome
  Time (mean ± σ):     856.2 ms ±  87.4 ms    [User: 2561.5 ms, System: 380.0 ms]
  Range (min … max):   794.6 ms … 1025.1 ms    10 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):     348.0 ms ±   1.6 ms    [User: 863.0 ms, System: 195.2 ms]
  Range (min … max):   345.6 ms … 350.2 ms    10 runs
 
Summary
  oxfmt ran
    2.46 ± 0.25 times faster than biome
   18.74 ± 0.19 times faster than prettier+oxc-parser
   27.10 ± 0.30 times faster than prettier

Benchmark complete!
```
<!-- BENCHMARK_RESULTS_END -->

## Notes

- Each formatter runs on the exact same codebase state (git reset between runs)
- Times include both parsing and formatting of all matched files
