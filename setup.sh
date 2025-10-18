#!/bin/bash

# Install pnpm dependencies
echo "Installing pnpm dependencies..."
pnpm install

# Clone Outline repository if not exists
if [ ! -d "outline" ]; then
  echo "Cloning Outline repository..."
  git clone --depth=1 git@github.com:outline/outline.git
else
  echo "Outline repository already exists"
fi

# Download TypeScript compiler parser.ts if not exists
if [ ! -f "parser.ts" ]; then
  echo "Downloading TypeScript compiler parser.ts..."
  curl -o parser.ts https://raw.githubusercontent.com/microsoft/TypeScript/refs/tags/v5.9.2/src/compiler/parser.ts
  cp parser.ts parser.ts.bak
  echo "✓ Downloaded parser.ts (TypeScript v5.9.2)"
else
  echo "parser.ts already exists"
fi

# Check hyperfine installation
if ! command -v hyperfine &> /dev/null; then
  echo ""
  echo "⚠️  Hyperfine is not installed!"
  echo "Please install hyperfine: https://github.com/sharkdp/hyperfine"
  echo "On macOS: brew install hyperfine"
  echo "On Ubuntu/Debian: apt install hyperfine"
else
  echo "✓ Hyperfine is installed"
fi

echo ""
echo "Setup complete! Run 'pnpm run bench' to start benchmarking."
