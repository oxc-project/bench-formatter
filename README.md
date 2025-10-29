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
  Time (mean ± σ):      1.199 s ±  0.080 s    [User: 2.320 s, System: 0.237 s]
  Range (min … max):    1.133 s …  1.324 s    10 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):     845.1 ms ±  12.0 ms    [User: 1472.7 ms, System: 149.3 ms]
  Range (min … max):   829.2 ms … 865.5 ms    10 runs
 
Benchmark 3: biome
  Time (mean ± σ):     140.5 ms ±   1.7 ms    [User: 109.5 ms, System: 28.8 ms]
  Range (min … max):   137.2 ms … 143.2 ms    10 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):      63.3 ms ±   0.6 ms    [User: 47.4 ms, System: 21.7 ms]
  Range (min … max):    62.5 ms …  64.6 ms    10 runs
 
Summary
  oxfmt ran
    2.22 ± 0.03 times faster than biome
   13.34 ± 0.23 times faster than prettier+oxc-parser
   18.92 ± 1.28 times faster than prettier

=========================================
Benchmarking Outline repository
=========================================
Benchmark 1: prettier
  Time (mean ± σ):      9.994 s ±  0.139 s    [User: 34.257 s, System: 2.538 s]
  Range (min … max):    9.779 s … 10.242 s    10 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):      6.809 s ±  0.057 s    [User: 21.565 s, System: 1.812 s]
  Range (min … max):    6.734 s …  6.915 s    10 runs
 
Benchmark 3: biome
  Time (mean ± σ):     864.7 ms ±  79.4 ms    [User: 2569.7 ms, System: 397.4 ms]
  Range (min … max):   807.4 ms … 1008.2 ms    10 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):     247.3 ms ±   1.1 ms    [User: 664.0 ms, System: 181.6 ms]
  Range (min … max):   245.0 ms … 248.7 ms    10 runs
 
Summary
  oxfmt ran
    3.50 ± 0.32 times faster than biome
   27.53 ± 0.26 times faster than prettier+oxc-parser
   40.41 ± 0.59 times faster than prettier

Benchmark complete!
```
<!-- BENCHMARK_RESULTS_END -->

## Notes

- Each formatter runs on the exact same codebase state (git reset between runs)
- Times include both parsing and formatting of all matched files
