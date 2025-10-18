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
pnpm run benchmark
```

## Benchmark Details

- **Test Data**: [Outline](https://github.com/outline/outline) repository (1915 js,jsx,ts,tsx files)
- **File Patterns**: `**/*.{js,jsx,ts,tsx}`
- **Methodology**:
  - 3 warmup runs before measurement
  - 10 benchmark runs for statistical accuracy
  - Git reset before each run to ensure identical starting conditions
  - Local binaries via `./node_modules/.bin/`

## Results

<!-- BENCHMARK_RESULTS_START -->
```
=========================================
Benchmarking checker.ts (single large file)
=========================================
Benchmark 1: prettier_format checker.ts
  Time (mean ± σ):      63.0 ms ±   1.4 ms    [User: 135.9 ms, System: 18.1 ms]
  Range (min … max):    61.3 ms …  65.0 ms    10 runs

Benchmark 2: prettier_oxc_format checker.ts
  Time (mean ± σ):      73.7 ms ±   3.4 ms    [User: 147.0 ms, System: 21.1 ms]
  Range (min … max):    69.7 ms …  80.7 ms    10 runs

Benchmark 3: biome_format checker.ts
  Time (mean ± σ):      27.0 ms ±   0.4 ms    [User: 17.6 ms, System: 6.6 ms]
  Range (min … max):    26.4 ms …  27.5 ms    10 runs

  Warning: Ignoring non-zero exit code.

Benchmark 4: oxfmt_format checker.ts
  Time (mean ± σ):      27.2 ms ±   0.7 ms    [User: 16.6 ms, System: 7.0 ms]
  Range (min … max):    26.8 ms …  29.2 ms    10 runs

  Warning: Ignoring non-zero exit code.

Summary
  biome_format checker.ts ran
    1.01 ± 0.03 times faster than oxfmt_format checker.ts
    2.34 ± 0.06 times faster than prettier_format checker.ts
    2.73 ± 0.13 times faster than prettier_oxc_format checker.ts
```

```
=========================================
Benchmarking Outline repository
=========================================

Benchmark 1: ./node_modules/.bin/prettier --write "outline/**/*.{js,jsx,ts,tsx}" --experimental-cli --no-config --ignore-path=.prettierignore
  Time (mean ± σ):      3.426 s ±  0.363 s    [User: 20.338 s, System: 1.581 s]
  Range (min … max):    3.124 s …  4.220 s    10 runs

Benchmark 2: ./node_modules/.bin/prettier --write "outline/**/*.{js,jsx,ts,tsx}" --experimental-cli --no-config --ignore-path=.prettierignore --plugin @prettier/plugin-oxc
  Time (mean ± σ):      2.763 s ±  0.160 s    [User: 15.321 s, System: 1.372 s]
  Range (min … max):    2.589 s …  3.162 s    10 runs

Benchmark 3: ./node_modules/.bin/biome format --write outline
  Time (mean ± σ):     296.0 ms ±  31.5 ms    [User: 1149.5 ms, System: 357.2 ms]
  Range (min … max):   260.5 ms … 349.2 ms    10 runs

  Warning: Ignoring non-zero exit code.

Benchmark 4: ./node_modules/.bin/oxfmt outline
  Time (mean ± σ):     168.5 ms ±  59.9 ms    [User: 309.2 ms, System: 317.9 ms]
  Range (min … max):   137.8 ms … 334.9 ms    10 runs

  Warning: Statistical outliers were detected. Consider re-running this benchmark on a quiet system without any interferences from other programs.

Summary
  ./node_modules/.bin/oxfmt outline ran
    1.76 ± 0.65 times faster than ./node_modules/.bin/biome format --write outline
   16.40 ± 5.90 times faster than ./node_modules/.bin/prettier --write "outline/**/*.{js,jsx,ts,tsx}" --experimental-cli --no-config --ignore-path=.prettierignore --plugin @prettier/plugin-oxc
   20.33 ± 7.54 times faster than ./node_modules/.bin/prettier --write "outline/**/*.{js,jsx,ts,tsx}" --experimental-cli --no-config --ignore-path=.prettierignore
```
<!-- BENCHMARK_RESULTS_END -->

## Notes

- Each formatter runs on the exact same codebase state (git reset between runs)
- Times include both parsing and formatting of all matched files
