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
- **Oxfmt**: 0.13.0

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
  Time (mean ± σ):      1.169 s ±  0.076 s    [User: 2.243 s, System: 0.245 s]
  Range (min … max):    1.082 s …  1.255 s    10 runs

Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):     808.8 ms ±   7.9 ms    [User: 1395.0 ms, System: 145.6 ms]
  Range (min … max):   797.0 ms … 822.7 ms    10 runs

Benchmark 3: biome
  Time (mean ± σ):     134.7 ms ±   1.7 ms    [User: 105.5 ms, System: 28.0 ms]
  Range (min … max):   133.0 ms … 137.7 ms    10 runs

Benchmark 4: oxfmt
  Time (mean ± σ):      86.2 ms ±   1.0 ms    [User: 66.9 ms, System: 26.3 ms]
  Range (min … max):    85.2 ms …  88.9 ms    10 runs

Summary
  oxfmt ran
    1.56 ± 0.03 times faster than biome
    9.38 ± 0.15 times faster than prettier+oxc-parser
   13.57 ± 0.89 times faster than prettier

=========================================
Benchmarking Outline repository
=========================================
Benchmark 1: prettier
  Time (mean ± σ):      9.394 s ±  0.111 s    [User: 32.143 s, System: 2.472 s]
  Range (min … max):    9.235 s …  9.569 s    10 runs

Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):      6.538 s ±  0.104 s    [User: 20.768 s, System: 1.796 s]
  Range (min … max):    6.416 s …  6.714 s    10 runs

Benchmark 3: biome
  Time (mean ± σ):     804.8 ms ±   5.4 ms    [User: 2555.4 ms, System: 389.2 ms]
  Range (min … max):   796.7 ms … 813.3 ms    10 runs

Benchmark 4: oxfmt
  Time (mean ± σ):     262.6 ms ±   1.9 ms    [User: 654.7 ms, System: 178.4 ms]
  Range (min … max):   260.3 ms … 265.8 ms    10 runs

Summary
  oxfmt ran
    3.06 ± 0.03 times faster than biome
   24.89 ± 0.43 times faster than prettier+oxc-parser
   35.77 ± 0.49 times faster than prettier

Benchmark complete!
```
<!-- BENCHMARK_RESULTS_END -->

## Notes

- Each formatter runs on the exact same codebase state (git reset between runs)
- Times include both parsing and formatting of all matched files
- I intended to bench checker.ts, but it appears to be running for a very long time or stuck with 100% CPU.
