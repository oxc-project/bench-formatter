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
  Time (mean ± σ):      1.197 s ±  0.077 s    [User: 2.281 s, System: 0.240 s]
  Range (min … max):    1.085 s …  1.281 s    10 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):     833.3 ms ±   9.3 ms    [User: 1433.8 ms, System: 150.0 ms]
  Range (min … max):   821.6 ms … 851.3 ms    10 runs
 
Benchmark 3: biome
  Time (mean ± σ):     142.4 ms ±  10.6 ms    [User: 109.7 ms, System: 30.0 ms]
  Range (min … max):   136.9 ms … 172.3 ms    10 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):      62.7 ms ±   0.4 ms    [User: 44.8 ms, System: 23.3 ms]
  Range (min … max):    62.1 ms …  63.6 ms    10 runs
 
Summary
  oxfmt ran
    2.27 ± 0.17 times faster than biome
   13.29 ± 0.17 times faster than prettier+oxc-parser
   19.09 ± 1.24 times faster than prettier

=========================================
Benchmarking Outline repository
=========================================
Benchmark 1: prettier
  Time (mean ± σ):      9.662 s ±  0.061 s    [User: 33.012 s, System: 2.397 s]
  Range (min … max):    9.556 s …  9.738 s    10 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):      6.599 s ±  0.053 s    [User: 20.725 s, System: 1.743 s]
  Range (min … max):    6.523 s …  6.669 s    10 runs
 
Benchmark 3: biome
  Time (mean ± σ):     843.6 ms ±  90.7 ms    [User: 2533.7 ms, System: 376.4 ms]
  Range (min … max):   795.2 ms … 1026.6 ms    10 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):     249.2 ms ±  12.7 ms    [User: 678.7 ms, System: 162.3 ms]
  Range (min … max):   242.4 ms … 284.8 ms    10 runs
 
Summary
  oxfmt ran
    3.39 ± 0.40 times faster than biome
   26.48 ± 1.37 times faster than prettier+oxc-parser
   38.78 ± 1.99 times faster than prettier

Benchmark complete!
```
<!-- BENCHMARK_RESULTS_END -->

## Notes

- Each formatter runs on the exact same codebase state (git reset between runs)
- Times include both parsing and formatting of all matched files
