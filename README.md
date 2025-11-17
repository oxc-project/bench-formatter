# JavaScript/TypeScript Formatter Benchmark

Comparing execution time of **Prettier**, **Biome**, and **Oxfmt** on the Kibana repository (2M+ lines of code).

## Formatters

- [Prettier](https://prettier.io/)
- [Prettier](https://prettier.io/) + @prettier/plugin-oxc
- [Biome](https://biomejs.dev/) Formatter
- [Oxfmt](https://oxc.rs):

## Versions

- **Prettier**: 3.6.2
- **Biome**: 2.3.5
- **Oxfmt**: 0.14.0

## Setup

```bash
# Install dependencies and clone Kibana repository
pnpm run setup

# Run the benchmark
pnpm run bench
```
## Notes

- Each formatter runs on the exact same codebase state (git reset between runs)
- Times include both parsing and formatting of all matched files
- I intended to bench checker.ts, but it appears to be running for a very long time or stuck with 100% CPU.

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
  Time (mean ± σ):      1.153 s ±  0.076 s    [User: 2.185 s, System: 0.230 s]
  Range (min … max):    1.066 s …  1.248 s    10 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):     789.7 ms ±   7.1 ms    [User: 1336.4 ms, System: 149.0 ms]
  Range (min … max):   779.0 ms … 800.6 ms    10 runs
 
Benchmark 3: biome
  Time (mean ± σ):     138.5 ms ±   3.5 ms    [User: 106.8 ms, System: 28.9 ms]
  Range (min … max):   134.8 ms … 144.4 ms    10 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):      89.1 ms ±   1.7 ms    [User: 69.3 ms, System: 26.1 ms]
  Range (min … max):    87.2 ms …  91.2 ms    10 runs
 
Summary
  oxfmt ran
    1.55 ± 0.05 times faster than biome
    8.86 ± 0.19 times faster than prettier+oxc-parser
   12.94 ± 0.89 times faster than prettier

=========================================
Benchmarking Outline repository
=========================================
Benchmark 1: prettier
  Time (mean ± σ):      9.000 s ±  0.138 s    [User: 30.392 s, System: 2.622 s]
  Range (min … max):    8.760 s …  9.207 s    10 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):      5.977 s ±  0.062 s    [User: 18.521 s, System: 1.714 s]
  Range (min … max):    5.845 s …  6.070 s    10 runs
 
Benchmark 3: biome
  Time (mean ± σ):     860.4 ms ±  82.7 ms    [User: 2573.0 ms, System: 373.2 ms]
  Range (min … max):   800.1 ms … 1006.3 ms    10 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):     249.2 ms ±   3.0 ms    [User: 643.8 ms, System: 135.4 ms]
  Range (min … max):   246.2 ms … 255.5 ms    10 runs
 
Summary
  oxfmt ran
    3.45 ± 0.33 times faster than biome
   23.98 ± 0.38 times faster than prettier+oxc-parser
   36.11 ± 0.70 times faster than prettier

Benchmark complete!
```
<!-- BENCHMARK_RESULTS_END -->
