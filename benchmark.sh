#!/bin/bash

# Formatter functions
prettier_format() {
  ./node_modules/.bin/prettier --write "$@" --experimental-cli --no-config
}
export -f prettier_format

prettier_oxc_format() {
  ./node_modules/.bin/prettier --write "$@" --experimental-cli --no-config --plugin @prettier/plugin-oxc
}
export -f prettier_oxc_format

biome_format() {
  ./node_modules/.bin/biome format --write "$@"
}
export -f biome_format

oxfmt_format() {
  ./node_modules/.bin/oxfmt "$@"
}
export -f oxfmt_format

echo "========================================="
echo "JavaScript/TypeScript Formatter Benchmark"
echo "========================================="
echo ""
echo "Formatters: Prettier, Biome, Oxfmt"
echo ""

# Check if kibana directory exists
if [ ! -d "outline" ]; then
  echo "Error: Outline repository not found!"
  echo "Please run 'pnpm run setup' first"
  exit 1
fi

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
  echo "Error: Dependencies not installed!"
  echo "Please run 'pnpm run setup' first"
  exit 1
fi

echo "Starting benchmark with:"
echo "- 3 warmup runs"
echo "- 10 benchmark runs"
echo "- Git reset before each run"
echo ""

echo ""
echo "========================================="
echo "Benchmarking checker.ts (single large file)"
echo "========================================="
# Run the benchmark for checker.ts
hyperfine --ignore-failure --warmup 3 --runs 10 \
  --shell=bash \
  --prepare 'cp checker.ts checker.ts.bak && mv checker.ts.bak checker.ts' \
  'prettier_format checker.ts' \
  'prettier_oxc_format checker.ts' \
  'biome_format checker.ts' \
  'oxfmt_format checker.ts'

echo "========================================="
echo "Benchmarking Outline repository"
echo "========================================="
# Run the benchmark for Outline
hyperfine --ignore-failure --warmup 3 --runs 10 \
  --shell=bash \
  --prepare 'git -C outline reset --hard' \
  'prettier_format "outline/**/*.{js,jsx,ts,tsx}" --ignore-path=.prettierignore' \
  'prettier_oxc_format "outline/**/*.{js,jsx,ts,tsx}" --ignore-path=.prettierignore' \
  'biome_format outline' \
  'oxfmt_format outline'

echo ""
echo "Benchmark complete!"
echo "Please update README.md with the results above."
