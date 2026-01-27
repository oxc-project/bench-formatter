# AGENTS.md

This file provides guidance to AI coding agents when working with code in this repository.

## Project Overview

Benchmarking suite that compares execution speed and memory usage of JS/TS formatters: Prettier, Prettier+oxc-parser, Biome, and Oxfmt. Uses external tools hyperfine (execution time) and GNU time (memory).

## Commands

```bash
# Setup and run all benchmarks
pnpm run bench

# Explicit setup (downloads test data)
./init.sh
# Run individual scenarios
pnpm run bench:large-single-file   # TypeScript parser.ts (~540KB single file)
pnpm run bench:js-no-embedded      # Outline repository (1,925 files)

# Run all benchmarks + auto-update README.md results section
pnpm run update-readme
```

## Architecture

All source files are ESM (`.mjs`). No test framework or linter is configured.

### Benchmark Scenarios

Each scenario lives in its own directory with identical structure:

```
bench-*/
├── bench.mjs          # Scenario-specific benchmark script
├── biome.json         # Biome config
├── oxfmtrc.json       # Oxfmt config
├── prettierrc.json    # Prettier config
├── prettierignore     # Prettier ignore
└── data/              # Test data (gitignored, fetched by init.sh)
```

Each `bench.mjs` imports from `shared/utils.mjs`, calls `setupCwd()` to change to its own directory, then runs hyperfine benchmarks and memory measurements.

### shared/utils.mjs

Common logic shared across all scenarios:
- `createFormatters(projectRoot, configDir)` — Returns command builders for all 4 formatters. `projectRoot` is the base for `node_modules`, `configDir` holds config files.
- `runHyperfine(args)` — Spawns hyperfine process, returns a Promise.
- `runMemoryBenchmarks()` / `measureMemory()` — Measures Peak RSS via GNU time (`gtime` or `/usr/bin/time`).
- `checkGnuTime()` — Checks for GNU time availability; warns and skips memory measurement if missing.

### Adding a New Scenario

1. Create `bench-<name>/` directory with `bench.mjs` and formatter config files
2. In `bench.mjs`, use `createFormatters()` and `runHyperfine()` from `shared/utils.mjs`
3. Add the directory name to the `scenarios` array in `bench-all.mjs`
4. Add any test data fetching to `init.sh`

## External Tool Requirements

- **hyperfine**: `brew install hyperfine` (macOS) / `apt install hyperfine` (Linux)
- **GNU time**: `brew install gnu-time` (macOS, installs as `gtime`) / `apt install time` (Linux)

## CI

GitHub Actions (`.github/workflows/ci.yml`) runs benchmarks on main push and auto-commits updated README.md with `[skip ci]`. On PRs, benchmarks run but results are not committed.
