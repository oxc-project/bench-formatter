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
  Time (mean ± σ):      1.162 s ±  0.072 s    [User: 2.234 s, System: 0.221 s]
  Range (min … max):    1.082 s …  1.263 s    10 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):     806.6 ms ±  11.5 ms    [User: 1388.5 ms, System: 151.6 ms]
  Range (min … max):   781.9 ms … 817.0 ms    10 runs
 
Benchmark 3: biome
  Time (mean ± σ):     136.4 ms ±   4.2 ms    [User: 105.4 ms, System: 28.5 ms]
  Range (min … max):   132.0 ms … 146.7 ms    10 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):     125.6 ms ±   1.1 ms    [User: 104.0 ms, System: 34.9 ms]
  Range (min … max):   124.0 ms … 127.2 ms    10 runs
 
Summary
  oxfmt ran
    1.09 ± 0.03 times faster than biome
    6.42 ± 0.11 times faster than prettier+oxc-parser
    9.25 ± 0.58 times faster than prettier

=========================================
Benchmarking Outline repository
=========================================
Benchmark 1: prettier
  Time (mean ± σ):      9.272 s ±  0.073 s    [User: 31.620 s, System: 2.443 s]
  Range (min … max):    9.188 s …  9.391 s    10 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):      6.366 s ±  0.069 s    [User: 20.137 s, System: 1.698 s]
  Range (min … max):    6.273 s …  6.519 s    10 runs
 
Benchmark 3: biome
  Time (mean ± σ):     847.5 ms ±  83.8 ms    [User: 2541.5 ms, System: 362.1 ms]
  Range (min … max):   789.0 ms … 995.9 ms    10 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):     340.1 ms ±   1.7 ms    [User: 845.2 ms, System: 190.6 ms]
  Range (min … max):   337.7 ms … 343.3 ms    10 runs
 
Summary
  oxfmt ran
    2.49 ± 0.25 times faster than biome
   18.72 ± 0.22 times faster than prettier+oxc-parser
   27.26 ± 0.26 times faster than prettier

Benchmark complete!
```
<!-- BENCHMARK_RESULTS_END -->

## Notes

- Each formatter runs on the exact same codebase state (git reset between runs)
- Times include both parsing and formatting of all matched files
