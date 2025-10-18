#!/bin/bash

./setup.sh

# Formatter functions
prettier_format() {
  ./node_modules/.bin/prettier "$@" --write --experimental-cli --no-config --ignore-path=.prettierignore --no-cache
}
export -f prettier_format

prettier_oxc_format() {
  ./node_modules/.bin/prettier "$@" --write --experimental-cli --no-config --ignore-path=.prettierignore --no-cache --plugin @prettier/plugin-oxc
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
echo "Benchmarking parser.ts (single large file)"
echo "========================================="

# Run the benchmark for parser.ts
hyperfine --ignore-failure --warmup 3 --runs 10 \
  --prepare 'cp parser.ts.bak parser.ts' \
  --shell=bash \
  -n prettier -n 'prettier+oxc-parser' -n biome -n oxfmt \
  'prettier_format parser.ts' \
  'prettier_oxc_format parser.ts' \
  'biome_format parser.ts' \
  'oxfmt_format parser.ts'

echo ""
echo "========================================="
echo "Benchmarking Outline repository"
echo "========================================="
# Run the benchmark for Outline
hyperfine --ignore-failure --warmup 3 --runs 10 \
  --prepare 'git -C outline reset --hard' \
  --shell=bash \
  -n prettier -n 'prettier+oxc-parser' -n biome -n oxfmt \
  'prettier_format "outline/**/*.{js,jsx,ts,tsx}"' \
  'prettier_oxc_format "outline/**/*.{js,jsx,ts,tsx}"' \
  'biome_format outline' \
  'oxfmt_format outline'

echo ""
echo "Benchmark complete!"
