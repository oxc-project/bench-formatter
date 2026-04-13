# JavaScript/TypeScript Formatter Benchmark

Comparing execution time and memory usage of **Prettier**, **Biome**, and **Oxfmt**.

## Formatters

- [Prettier](https://prettier.io/)
- [Prettier](https://prettier.io/) + @prettier/plugin-oxc
- [Biome](https://biomejs.dev/) Formatter
- [Oxfmt](https://oxc.rs)

## Run

```bash
# Run all benchmarks
# Automatically setup fixture if not exists
pnpm run bench

# Or explicit benchmark with manual setup
./init.sh
node ./bench-large-single-file/bench.mjs
node ./bench-js-no-embedded/bench.mjs
node ./bench-mixed-embedded/bench.mjs
node ./bench-full-features/bench.mjs
```

## Notes

- Each formatter runs on the exact same codebase state (git reset between runs)
- Times include both parsing and formatting of all matched files
- Memory measurements track peak resident set size (RSS) during execution
- I intended to bench checker.ts, but it appears to be running for a very long time or stuck with 100% CPU.

## Benchmark Details

- **Test Data**:
  - TypeScript compiler's [parser.ts](https://github.com/microsoft/TypeScript/blob/v5.9.2/src/compiler/parser.ts) (~13.7K lines, single large file)
  - [Outline](https://github.com/outline/outline) repository (JS/JSX/TS/TSX only)
  - [Storybook](https://github.com/storybookjs/storybook) repository (mixed with embedded languages)
  - [Continue](https://github.com/continuedev/continue) repository (full features: sort imports + Tailwind CSS)
- **Methodology**:
  - Multiple warmup runs before measurement
  - Multiple benchmark runs for statistical accuracy
  - Git reset before each run to ensure identical starting conditions
  - Memory usage measured using GNU time (peak RSS)
  - Local binaries via `./node_modules/.bin/`

## Versions

- **Prettier**: 3.8.1
- **Biome**: 2.4.11
- **Oxfmt**: 0.45.0

## Results

<!-- BENCHMARK_RESULTS_START -->
```
=========================================
Benchmarking Large Single File
=========================================

Target: TypeScript compiler parser.ts (~540KB)
- 2 warmup runs, 5 benchmark runs
- Copy original before each run

Benchmark 1: prettier
  Time (mean ± σ):      1.037 s ±  0.050 s    [User: 1.989 s, System: 0.181 s]
  Range (min … max):    0.984 s …  1.120 s    5 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):     740.7 ms ±  34.5 ms    [User: 1183.0 ms, System: 101.9 ms]
  Range (min … max):   709.4 ms … 795.6 ms    5 runs
 
Benchmark 3: biome
  Time (mean ± σ):     173.2 ms ±   3.4 ms    [User: 147.8 ms, System: 26.5 ms]
  Range (min … max):   168.8 ms … 177.6 ms    5 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):     173.0 ms ±   3.5 ms    [User: 207.5 ms, System: 70.5 ms]
  Range (min … max):   169.6 ms … 178.1 ms    5 runs
 
Summary
  oxfmt ran
    1.00 ± 0.03 times faster than biome
    4.28 ± 0.22 times faster than prettier+oxc-parser
    5.99 ± 0.31 times faster than prettier

Memory Usage:
  prettier: 230.4 MB (min: 222.3 MB, max: 251.0 MB)
  prettier+oxc-parser: 172.0 MB (min: 169.9 MB, max: 174.1 MB)
  biome: 67.9 MB (min: 67.7 MB, max: 68.3 MB)
  oxfmt: 111.0 MB (min: 110.9 MB, max: 111.2 MB)

Large single file benchmark complete!


=========================================
Benchmarking JS/TS (no embedded)
=========================================

Target: Outline repository (js/ts/tsx only)
- 3 warmup runs, 10 benchmark runs
- Git reset before each run

Benchmark 1: prettier
  Time (mean ± σ):     14.653 s ±  0.150 s    [User: 25.244 s, System: 1.245 s]
  Range (min … max):   14.485 s … 14.993 s    10 runs
 
Benchmark 2: prettier+oxc-parser
  Time (mean ± σ):     12.307 s ±  0.170 s    [User: 16.640 s, System: 0.683 s]
  Range (min … max):   11.964 s … 12.463 s    10 runs
 
Benchmark 3: biome
  Time (mean ± σ):      1.288 s ±  0.113 s    [User: 4.381 s, System: 0.325 s]
  Range (min … max):    1.239 s …  1.606 s    10 runs
 
Benchmark 4: oxfmt
  Time (mean ± σ):     403.1 ms ±   3.0 ms    [User: 894.3 ms, System: 299.3 ms]
  Range (min … max):   397.9 ms … 407.1 ms    10 runs
 
Summary
  oxfmt ran
    3.20 ± 0.28 times faster than biome
   30.53 ± 0.48 times faster than prettier+oxc-parser
   36.35 ± 0.46 times faster than prettier

Memory Usage:
  prettier: 414.9 MB (min: 379.7 MB, max: 558.0 MB)
  prettier+oxc-parser: 324.3 MB (min: 315.2 MB, max: 337.2 MB)
  biome: 71.5 MB (min: 68.8 MB, max: 75.5 MB)
  oxfmt: 140.6 MB (min: 135.8 MB, max: 146.4 MB)

JS/TS (no embedded) benchmark complete!


=========================================
Benchmarking Mixed (embedded)
=========================================

Target: Storybook repository (mixed with embedded languages)
- 1 warmup runs, 3 benchmark runs
- Git reset before each run

Benchmark 1: prettier+oxc-parser
  Time (mean ± σ):     41.310 s ±  0.194 s    [User: 52.302 s, System: 2.507 s]
  Range (min … max):   41.111 s … 41.499 s    3 runs
 
Benchmark 2: oxfmt
  Time (mean ± σ):     12.845 s ±  0.085 s    [User: 46.419 s, System: 3.671 s]
  Range (min … max):   12.748 s … 12.910 s    3 runs
 
Summary
  oxfmt ran
    3.22 ± 0.03 times faster than prettier+oxc-parser

Memory Usage:
  prettier+oxc-parser: 1148.1 MB (min: 1145.4 MB, max: 1152.9 MB)
  oxfmt: 553.0 MB (min: 492.8 MB, max: 601.5 MB)

Mixed (embedded) benchmark complete!


=========================================
Benchmarking Full features
=========================================

Target: Continue repository (full features)
- 1 warmup runs, 3 benchmark runs
- Git reset before each run

Benchmark 1: prettier+oxc-parser
  Time (mean ± σ):     59.772 s ±  0.292 s    [User: 70.835 s, System: 3.016 s]
  Range (min … max):   59.438 s … 59.982 s    3 runs
 
Benchmark 2: oxfmt
  Time (mean ± σ):      6.418 s ±  0.049 s    [User: 22.892 s, System: 1.679 s]
  Range (min … max):    6.362 s …  6.450 s    3 runs
 
Summary
  oxfmt ran
    9.31 ± 0.08 times faster than prettier+oxc-parser

Memory Usage:
  prettier+oxc-parser: 655.7 MB (min: 648.6 MB, max: 659.4 MB)
  oxfmt: 355.8 MB (min: 337.4 MB, max: 379.3 MB)

Full features benchmark complete!

=========================================
All benchmarks complete!
=========================================
```
<!-- BENCHMARK_RESULTS_END -->
