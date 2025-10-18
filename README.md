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
    - `./node_modules/.bin/prettier "$@" --write --experimental-cli --no-config --ignore-path=.prettierignore --no-cache`
  - prettier + oxc plugin:
    - `./node_modules/.bin/prettier "$@" --write --experimental-cli --no-config --ignore-path=.prettierignore --no-cache --plugin @prettier/plugin-oxc`
  - biome:
    - `./node_modules/.bin/biome format --write "$@"` + biome.json
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
  Time (mean ± σ):      1.405 s ±  0.094 s    [User: 3.111 s, System: 0.204 s]
  Range (min … max):    1.306 s …  1.553 s    10 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):     974.9 ms ±  15.2 ms    [User: 1834.9 ms, System: 139.5 ms]
  Range (min … max):   955.8 ms … 1003.5 ms    10 runs
 
Benchmark 3: biome
  Time (mean ± σ):     134.6 ms ±   1.3 ms    [User: 104.3 ms, System: 26.2 ms]
  Range (min … max):   132.9 ms … 136.7 ms    10 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):      60.6 ms ±   0.4 ms    [User: 44.6 ms, System: 18.3 ms]
  Range (min … max):    60.0 ms …  61.2 ms    10 runs
 
Summary
  oxfmt ran
    2.22 ± 0.03 times faster than biome
   16.09 ± 0.28 times faster than prettier+oxc-parser
   23.19 ± 1.57 times faster than prettier

=========================================
Benchmarking Outline repository
=========================================
Benchmark 1: prettier
  Time (mean ± σ):     13.008 s ±  0.171 s    [User: 47.832 s, System: 2.216 s]
  Range (min … max):   12.724 s … 13.310 s    10 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):      8.033 s ±  0.075 s    [User: 27.438 s, System: 1.719 s]
  Range (min … max):    7.940 s …  8.167 s    10 runs
 
Benchmark 3: biome
  Time (mean ± σ):     781.6 ms ±   4.0 ms    [User: 2488.1 ms, System: 372.6 ms]
  Range (min … max):   776.1 ms … 786.9 ms    10 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):     241.9 ms ±   2.2 ms    [User: 665.1 ms, System: 162.9 ms]
  Range (min … max):   240.0 ms … 246.5 ms    10 runs
 
Summary
  oxfmt ran
    3.23 ± 0.03 times faster than biome
   33.20 ± 0.43 times faster than prettier+oxc-parser
   53.77 ± 0.86 times faster than prettier

Benchmark complete!
```
<!-- BENCHMARK_RESULTS_END -->

## Notes

- Each formatter runs on the exact same codebase state (git reset between runs)
- Times include both parsing and formatting of all matched files
