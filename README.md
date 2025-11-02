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
  Time (mean ± σ):      1.185 s ±  0.084 s    [User: 2.216 s, System: 0.239 s]
  Range (min … max):    1.074 s …  1.338 s    10 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):     806.5 ms ±   7.1 ms    [User: 1386.0 ms, System: 146.1 ms]
  Range (min … max):   796.9 ms … 818.4 ms    10 runs
 
Benchmark 3: biome
  Time (mean ± σ):     133.4 ms ±   1.1 ms    [User: 104.2 ms, System: 27.8 ms]
  Range (min … max):   131.3 ms … 134.7 ms    10 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):      61.1 ms ±   0.2 ms    [User: 43.8 ms, System: 22.6 ms]
  Range (min … max):    60.7 ms …  61.2 ms    10 runs
 
Summary
  oxfmt ran
    2.18 ± 0.02 times faster than biome
   13.20 ± 0.12 times faster than prettier+oxc-parser
   19.39 ± 1.38 times faster than prettier

=========================================
Benchmarking Outline repository
=========================================
Benchmark 1: prettier
  Time (mean ± σ):      9.255 s ±  0.084 s    [User: 31.489 s, System: 2.535 s]
  Range (min … max):    9.129 s …  9.379 s    10 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):      6.356 s ±  0.042 s    [User: 20.092 s, System: 1.703 s]
  Range (min … max):    6.284 s …  6.428 s    10 runs
 
Benchmark 3: biome
  Time (mean ± σ):     796.9 ms ±   3.4 ms    [User: 2546.2 ms, System: 367.3 ms]
  Range (min … max):   789.0 ms … 802.0 ms    10 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):     240.5 ms ±   2.3 ms    [User: 663.8 ms, System: 160.4 ms]
  Range (min … max):   238.4 ms … 245.5 ms    10 runs
 
Summary
  oxfmt ran
    3.31 ± 0.03 times faster than biome
   26.43 ± 0.31 times faster than prettier+oxc-parser
   38.49 ± 0.51 times faster than prettier

Benchmark complete!
```
<!-- BENCHMARK_RESULTS_END -->

## Notes

- Each formatter runs on the exact same codebase state (git reset between runs)
- Times include both parsing and formatting of all matched files
