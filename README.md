# JavaScript/TypeScript Formatter Benchmark

Comparing execution time and memory usage of **Prettier**, **Biome**, and **Oxfmt** on the Kibana repository (2M+ lines of code).

## Formatters

- [Prettier](https://prettier.io/)
- [Prettier](https://prettier.io/) + @prettier/plugin-oxc
- [Biome](https://biomejs.dev/) Formatter
- [Oxfmt](https://oxc.rs):

## Versions

- **Prettier**: 3.6.2
- **Biome**: 2.3.7
- **Oxfmt**: 0.15.0

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
- Memory measurements track peak resident set size (RSS) during execution
- I intended to bench checker.ts, but it appears to be running for a very long time or stuck with 100% CPU.

## Benchmark Details

- **Test Data**: [Outline](https://github.com/outline/outline) repository (1915 js,jsx,ts,tsx files)
- **File Patterns**: `**/*.{js,jsx,ts,tsx}`
- **Methodology**:
  - 3 warmup runs before measurement
  - 10 benchmark runs for statistical accuracy
  - Git reset before each run to ensure identical starting conditions
  - Memory usage measured using GNU time (peak RSS)
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
  Time (mean ± σ):      1.316 s ±  0.061 s    [User: 2.634 s, System: 0.161 s]
  Range (min … max):    1.259 s …  1.429 s    10 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):     961.2 ms ±  13.9 ms    [User: 1717.6 ms, System: 140.0 ms]
  Range (min … max):   940.2 ms … 983.4 ms    10 runs
 
Benchmark 3: biome
  Time (mean ± σ):     155.6 ms ±   1.8 ms    [User: 125.6 ms, System: 27.4 ms]
  Range (min … max):   153.5 ms … 159.7 ms    10 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):      77.9 ms ±   0.2 ms    [User: 62.8 ms, System: 19.1 ms]
  Range (min … max):    77.6 ms …  78.2 ms    10 runs
 
Summary
  oxfmt ran
    2.00 ± 0.02 times faster than biome
   12.33 ± 0.18 times faster than prettier+oxc-parser
   16.89 ± 0.78 times faster than prettier

Memory Usage:
  prettier: 210.4 MB (min: 208.3 MB, max: 215.5 MB)
  prettier+oxc-parser: 190.7 MB (min: 189.4 MB, max: 192.0 MB)
  biome: 62.3 MB (min: 61.6 MB, max: 64.3 MB)
  oxfmt: 98.8 MB (min: 98.3 MB, max: 98.9 MB)

=========================================
Benchmarking Outline repository
=========================================
Benchmark 1: prettier
  Time (mean ± σ):     10.987 s ±  0.130 s    [User: 39.076 s, System: 1.959 s]
  Range (min … max):   10.771 s … 11.202 s    10 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):      7.867 s ±  0.114 s    [User: 27.038 s, System: 1.805 s]
  Range (min … max):    7.657 s …  8.024 s    10 runs
 
Benchmark 3: biome
  Time (mean ± σ):     880.6 ms ±  87.9 ms    [User: 2583.6 ms, System: 382.6 ms]
  Range (min … max):   825.0 ms … 1045.1 ms    10 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):     238.8 ms ±   2.2 ms    [User: 587.2 ms, System: 167.6 ms]
  Range (min … max):   235.2 ms … 242.9 ms    10 runs
 
Summary
  oxfmt ran
    3.69 ± 0.37 times faster than biome
   32.95 ± 0.56 times faster than prettier+oxc-parser
   46.02 ± 0.69 times faster than prettier

Memory Usage:
  prettier: 473.1 MB (min: 447.5 MB, max: 502.4 MB)
  prettier+oxc-parser: 393.6 MB (min: 372.0 MB, max: 408.6 MB)
  biome: 61.7 MB (min: 58.9 MB, max: 64.9 MB)
  oxfmt: 127.6 MB (min: 119.3 MB, max: 135.8 MB)

Benchmark complete!
```
<!-- BENCHMARK_RESULTS_END -->
