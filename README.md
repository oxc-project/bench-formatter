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
- **Oxfmt**: dev

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
  Time (mean ± σ):      1.188 s ±  0.062 s    [User: 2.299 s, System: 0.232 s]
  Range (min … max):    1.116 s …  1.260 s    10 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):     820.0 ms ±  17.4 ms    [User: 1423.8 ms, System: 147.1 ms]
  Range (min … max):   797.5 ms … 852.7 ms    10 runs
 
Benchmark 3: biome
  Time (mean ± σ):     136.7 ms ±   1.7 ms    [User: 107.7 ms, System: 27.6 ms]
  Range (min … max):   133.2 ms … 138.8 ms    10 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):      87.9 ms ±   3.5 ms    [User: 69.3 ms, System: 25.5 ms]
  Range (min … max):    85.6 ms …  97.1 ms    10 runs
 
Summary
  oxfmt ran
    1.55 ± 0.07 times faster than biome
    9.33 ± 0.43 times faster than prettier+oxc-parser
   13.52 ± 0.89 times faster than prettier

=========================================
Benchmarking Outline repository
=========================================
Benchmark 1: prettier
  Time (mean ± σ):      9.727 s ±  0.201 s    [User: 33.152 s, System: 2.542 s]
  Range (min … max):    9.411 s … 10.124 s    10 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):      6.682 s ±  0.092 s    [User: 21.040 s, System: 1.782 s]
  Range (min … max):    6.553 s …  6.802 s    10 runs
 
Benchmark 3: biome
  Time (mean ± σ):     860.1 ms ±  85.1 ms    [User: 2568.1 ms, System: 372.4 ms]
  Range (min … max):   798.9 ms … 1016.4 ms    10 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):     266.9 ms ±   2.8 ms    [User: 657.6 ms, System: 175.4 ms]
  Range (min … max):   262.5 ms … 270.4 ms    10 runs
 
Summary
  oxfmt ran
    3.22 ± 0.32 times faster than biome
   25.04 ± 0.43 times faster than prettier+oxc-parser
   36.45 ± 0.84 times faster than prettier

Benchmark complete!
```
<!-- BENCHMARK_RESULTS_END -->

## Notes

- Each formatter runs on the exact same codebase state (git reset between runs)
- Times include both parsing and formatting of all matched files
