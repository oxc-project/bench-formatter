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
  Time (mean ± σ):      1.381 s ±  0.092 s    [User: 3.070 s, System: 0.210 s]
  Range (min … max):    1.300 s …  1.519 s    10 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):     959.6 ms ±  18.0 ms    [User: 1794.2 ms, System: 146.8 ms]
  Range (min … max):   934.6 ms … 985.3 ms    10 runs
 
Benchmark 3: biome
  Time (mean ± σ):     133.8 ms ±   1.6 ms    [User: 103.5 ms, System: 27.9 ms]
  Range (min … max):   131.9 ms … 137.3 ms    10 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):      60.2 ms ±   0.3 ms    [User: 43.2 ms, System: 20.6 ms]
  Range (min … max):    59.7 ms …  60.6 ms    10 runs
 
Summary
  oxfmt ran
    2.22 ± 0.03 times faster than biome
   15.95 ± 0.31 times faster than prettier+oxc-parser
   22.95 ± 1.53 times faster than prettier

=========================================
Benchmarking Outline repository
=========================================
Benchmark 1: prettier
  Time (mean ± σ):     13.488 s ±  0.255 s    [User: 49.012 s, System: 3.100 s]
  Range (min … max):   13.120 s … 13.886 s    10 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):      8.069 s ±  0.071 s    [User: 27.698 s, System: 1.917 s]
  Range (min … max):    7.965 s …  8.178 s    10 runs
 
Benchmark 3: biome
  Time (mean ± σ):     849.2 ms ±  79.8 ms    [User: 2524.3 ms, System: 389.1 ms]
  Range (min … max):   797.3 ms … 990.1 ms    10 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):     242.3 ms ±   0.7 ms    [User: 660.5 ms, System: 173.2 ms]
  Range (min … max):   241.2 ms … 243.3 ms    10 runs
 
Summary
  oxfmt ran
    3.50 ± 0.33 times faster than biome
   33.30 ± 0.31 times faster than prettier+oxc-parser
   55.67 ± 1.06 times faster than prettier

Benchmark complete!
```
<!-- BENCHMARK_RESULTS_END -->

## Notes

- Each formatter runs on the exact same codebase state (git reset between runs)
- Times include both parsing and formatting of all matched files
