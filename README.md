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
pnpm run benchmark
```

## Benchmark Details

- **Test Data**: [Outline](https://github.com/outline/outline) repository (1915 js,jsx,ts,tsx files)
- **File Patterns**: `**/*.{js,jsx,ts,tsx}`
- **Methodology**:
  - 3 warmup runs before measurement
  - 10 benchmark runs for statistical accuracy
  - Git reset before each run to ensure identical starting conditions
  - Local binaries via `./node_modules/.bin/`

## Results

<!-- BENCHMARK_RESULTS_START -->
```
=========================================
Benchmarking parser.ts (single large file)
=========================================
Benchmark 1: prettier
  Time (mean ± σ):      1.378 s ±  0.096 s    [User: 3.013 s, System: 0.206 s]
  Range (min … max):    1.274 s …  1.519 s    10 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):     971.2 ms ±  14.3 ms    [User: 1826.9 ms, System: 140.9 ms]
  Range (min … max):   946.4 ms … 988.2 ms    10 runs
 
Benchmark 3: biome
  Time (mean ± σ):     137.8 ms ±   4.2 ms    [User: 106.0 ms, System: 26.7 ms]
  Range (min … max):   133.5 ms … 148.2 ms    10 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):      60.9 ms ±   0.6 ms    [User: 43.0 ms, System: 20.3 ms]
  Range (min … max):    59.8 ms …  61.7 ms    10 runs
 
Summary
  oxfmt ran
    2.26 ± 0.07 times faster than biome
   15.95 ± 0.28 times faster than prettier+oxc-parser
   22.64 ± 1.59 times faster than prettier

=========================================
Benchmarking Outline repository
=========================================
Benchmark 1: prettier
  Time (mean ± σ):     10.556 s ±  0.133 s    [User: 39.442 s, System: 1.748 s]
  Range (min … max):   10.370 s … 10.755 s    10 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):      6.494 s ±  0.075 s    [User: 23.420 s, System: 1.358 s]
  Range (min … max):    6.385 s …  6.621 s    10 runs
 
Benchmark 3: biome
  Time (mean ± σ):     780.6 ms ±   5.5 ms    [User: 2495.5 ms, System: 370.8 ms]
  Range (min … max):   775.0 ms … 790.3 ms    10 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):     240.1 ms ±   1.6 ms    [User: 663.7 ms, System: 160.0 ms]
  Range (min … max):   238.4 ms … 243.2 ms    10 runs
 
Summary
  oxfmt ran
    3.25 ± 0.03 times faster than biome
   27.05 ± 0.36 times faster than prettier+oxc-parser
   43.97 ± 0.62 times faster than prettier

Benchmark complete!
```
<!-- BENCHMARK_RESULTS_END -->

## Notes

- Each formatter runs on the exact same codebase state (git reset between runs)
- Times include both parsing and formatting of all matched files
