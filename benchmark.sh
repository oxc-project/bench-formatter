#!/bin/bash

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

# Check if hyperfine is installed
if ! command -v hyperfine &> /dev/null; then
  echo "Error: Hyperfine is not installed!"
  echo "Please install hyperfine: https://github.com/sharkdp/hyperfine"
  exit 1
fi

echo "Starting benchmark with:"
echo "- 3 warmup runs"
echo "- 10 benchmark runs"
echo "- Git reset before each run"
echo ""

# Run the benchmark
hyperfine --ignore-failure --warmup 3 --runs 10 \
  --prepare 'git -C outline reset --hard' \
  './node_modules/.bin/prettier --write "outline/**/*.{js,jsx,ts,tsx}" --experimental-cli --no-config --ignore-path=.prettierignore' \
  './node_modules/.bin/prettier --write "outline/**/*.{js,jsx,ts,tsx}" --experimental-cli --no-config --ignore-path=.prettierignore --plugin @prettier/plugin-oxc' \
  './node_modules/.bin/biome format --write outline' \
  './node_modules/.bin/oxfmt outline'

echo ""
echo "Benchmark complete!"
echo "Please update README.md with the results above."
