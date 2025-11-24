# JavaScript/TypeScript Formatter Benchmark

Comparing execution time of **Prettier**, **Biome**, and **Oxfmt** on the Kibana repository (2M+ lines of code).

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
  Time (mean ± σ):      1.132 s ±  0.068 s    [User: 2.178 s, System: 0.226 s]
  Range (min … max):    1.050 s …  1.227 s    10 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):     781.5 ms ±  16.2 ms    [User: 1327.4 ms, System: 149.9 ms]
  Range (min … max):   764.3 ms … 819.2 ms    10 runs
 
Benchmark 3: biome
  Time (mean ± σ):     136.2 ms ±   2.5 ms    [User: 104.9 ms, System: 30.1 ms]
  Range (min … max):   133.2 ms … 139.9 ms    10 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):      54.3 ms ±   0.4 ms    [User: 38.3 ms, System: 21.9 ms]
  Range (min … max):    53.8 ms …  54.9 ms    10 runs
 
Summary
  oxfmt ran
    2.51 ± 0.05 times faster than biome
   14.39 ± 0.31 times faster than prettier+oxc-parser
   20.85 ± 1.26 times faster than prettier

=========================================
Benchmarking Outline repository
=========================================
Benchmark 1: prettier
  Time (mean ± σ):      8.611 s ±  0.053 s    [User: 29.301 s, System: 2.403 s]
  Range (min … max):    8.492 s …  8.674 s    10 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):      5.756 s ±  0.050 s    [User: 17.957 s, System: 1.671 s]
  Range (min … max):    5.663 s …  5.827 s    10 runs
 
Benchmark 3: biome
  Time (mean ± σ):     845.5 ms ±  82.3 ms    [User: 2551.0 ms, System: 375.0 ms]
  Range (min … max):   791.8 ms … 1001.8 ms    10 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):     210.7 ms ±   1.6 ms    [User: 566.0 ms, System: 158.2 ms]
  Range (min … max):   208.4 ms … 212.9 ms    10 runs
 
Summary
  oxfmt ran
    4.01 ± 0.39 times faster than biome
   27.31 ± 0.32 times faster than prettier+oxc-parser
   40.86 ± 0.40 times faster than prettier

Benchmark complete!
```
<!-- BENCHMARK_RESULTS_END -->
