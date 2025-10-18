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
Benchmark 1: prettier_format parser.ts
  Time (mean ± σ):      2.149 s ±  0.328 s    [User: 3.066 s, System: 0.182 s]
  Range (min … max):    1.797 s …  2.597 s    10 runs

Benchmark 2: prettier_oxc_format parser.ts
  Time (mean ± σ):      1.241 s ±  0.019 s    [User: 1.909 s, System: 0.120 s]
  Range (min … max):    1.205 s …  1.273 s    10 runs

Benchmark 3: biome_format parser.ts
  Time (mean ± σ):     131.6 ms ±   1.1 ms    [User: 103.1 ms, System: 26.4 ms]
  Range (min … max):   130.0 ms … 133.4 ms    10 runs

Benchmark 4: oxfmt_format parser.ts
  Time (mean ± σ):      59.4 ms ±   0.4 ms    [User: 43.1 ms, System: 17.7 ms]
  Range (min … max):    58.8 ms …  60.1 ms    10 runs

Summary
  oxfmt_format parser.ts ran
    2.21 ± 0.03 times faster than biome_format parser.ts
   20.89 ± 0.36 times faster than prettier_oxc_format parser.ts
   36.16 ± 5.53 times faster than prettier_format parser.ts
=========================================
Benchmarking Outline repository
=========================================
Benchmark 1: prettier_format "outline/**/*.{js,jsx,ts,tsx}"
  Time (mean ± σ):     15.033 s ±  0.299 s    [User: 26.161 s, System: 1.365 s]
  Range (min … max):   14.538 s … 15.454 s    10 runs

Benchmark 2: prettier_oxc_format "outline/**/*.{js,jsx,ts,tsx}"
  Time (mean ± σ):      9.577 s ±  0.135 s    [User: 14.575 s, System: 1.123 s]
  Range (min … max):    9.405 s …  9.868 s    10 runs

Benchmark 3: biome_format outline
  Time (mean ± σ):      1.501 s ±  0.013 s    [User: 2.521 s, System: 0.372 s]
  Range (min … max):    1.489 s …  1.534 s    10 runs

Benchmark 4: oxfmt_format outline
  Time (mean ± σ):     450.1 ms ±   4.4 ms    [User: 665.9 ms, System: 169.9 ms]
  Range (min … max):   444.4 ms … 460.4 ms    10 runs

Summary
  oxfmt_format outline ran
    3.34 ± 0.04 times faster than biome_format outline
   21.28 ± 0.36 times faster than prettier_oxc_format "outline/**/*.{js,jsx,ts,tsx}"
   33.40 ± 0.74 times faster than prettier_format "outline/**/*.{js,jsx,ts,tsx}"

Benchmark complete!
Please update README.md with the results above.
```
<!-- BENCHMARK_RESULTS_END -->

## Notes

- Each formatter runs on the exact same codebase state (git reset between runs)
- Times include both parsing and formatting of all matched files
