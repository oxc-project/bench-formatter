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
  Time (mean ± σ):      1.153 s ±  0.070 s    [User: 2.230 s, System: 0.228 s]
  Range (min … max):    1.084 s …  1.257 s    10 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):     815.9 ms ±   7.3 ms    [User: 1400.4 ms, System: 150.6 ms]
  Range (min … max):   803.9 ms … 825.3 ms    10 runs
 
Benchmark 3: biome
  Time (mean ± σ):     138.1 ms ±   2.2 ms    [User: 109.5 ms, System: 26.3 ms]
  Range (min … max):   133.8 ms … 140.9 ms    10 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):     127.5 ms ±   1.6 ms    [User: 106.7 ms, System: 33.9 ms]
  Range (min … max):   126.0 ms … 130.7 ms    10 runs
 
Summary
  oxfmt ran
    1.08 ± 0.02 times faster than biome
    6.40 ± 0.10 times faster than prettier+oxc-parser
    9.05 ± 0.56 times faster than prettier

=========================================
Benchmarking Outline repository
=========================================
Benchmark 1: prettier
  Time (mean ± σ):      9.428 s ±  0.149 s    [User: 32.036 s, System: 2.431 s]
  Range (min … max):    9.148 s …  9.589 s    10 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):      6.531 s ±  0.087 s    [User: 20.571 s, System: 1.726 s]
  Range (min … max):    6.421 s …  6.668 s    10 runs
 
Benchmark 3: biome
  Time (mean ± σ):     844.1 ms ±  89.7 ms    [User: 2561.1 ms, System: 358.6 ms]
  Range (min … max):   794.4 ms … 1018.6 ms    10 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):     345.8 ms ±   3.1 ms    [User: 864.9 ms, System: 176.7 ms]
  Range (min … max):   341.0 ms … 350.8 ms    10 runs
 
Summary
  oxfmt ran
    2.44 ± 0.26 times faster than biome
   18.89 ± 0.30 times faster than prettier+oxc-parser
   27.27 ± 0.50 times faster than prettier

Benchmark complete!
```
<!-- BENCHMARK_RESULTS_END -->

## Notes

- Each formatter runs on the exact same codebase state (git reset between runs)
- Times include both parsing and formatting of all matched files
