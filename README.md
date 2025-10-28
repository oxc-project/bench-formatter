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
  Time (mean ± σ):      1.317 s ±  0.017 s    [User: 3.004 s, System: 0.217 s]
  Range (min … max):    1.280 s …  1.338 s    10 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):     963.5 ms ±  19.2 ms    [User: 1813.4 ms, System: 145.1 ms]
  Range (min … max):   935.5 ms … 1006.1 ms    10 runs
 
Benchmark 3: biome
  Time (mean ± σ):     134.3 ms ±   2.3 ms    [User: 105.8 ms, System: 25.6 ms]
  Range (min … max):   130.2 ms … 137.6 ms    10 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):      60.5 ms ±   0.5 ms    [User: 43.1 ms, System: 21.1 ms]
  Range (min … max):    59.7 ms …  61.5 ms    10 runs
 
Summary
  oxfmt ran
    2.22 ± 0.04 times faster than biome
   15.94 ± 0.35 times faster than prettier+oxc-parser
   21.78 ± 0.34 times faster than prettier

=========================================
Benchmarking Outline repository
=========================================
Benchmark 1: prettier
  Time (mean ± σ):     13.573 s ±  0.241 s    [User: 49.182 s, System: 3.071 s]
  Range (min … max):   13.199 s … 13.837 s    10 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):      8.139 s ±  0.116 s    [User: 27.941 s, System: 1.911 s]
  Range (min … max):    7.985 s …  8.335 s    10 runs
 
Benchmark 3: biome
  Time (mean ± σ):     849.2 ms ±  78.1 ms    [User: 2526.5 ms, System: 387.9 ms]
  Range (min … max):   794.1 ms … 1004.9 ms    10 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):     242.9 ms ±   1.6 ms    [User: 662.2 ms, System: 172.7 ms]
  Range (min … max):   240.7 ms … 246.0 ms    10 runs
 
Summary
  oxfmt ran
    3.50 ± 0.32 times faster than biome
   33.51 ± 0.53 times faster than prettier+oxc-parser
   55.88 ± 1.06 times faster than prettier

Benchmark complete!
```
<!-- BENCHMARK_RESULTS_END -->

## Notes

- Each formatter runs on the exact same codebase state (git reset between runs)
- Times include both parsing and formatting of all matched files
