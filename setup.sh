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

# Download TypeScript compiler checker.ts if not exists
if [ ! -f "checker.ts" ]; then
  echo "Downloading TypeScript compiler checker.ts..."
  curl -o checker.ts https://raw.githubusercontent.com/microsoft/TypeScript/refs/tags/v5.9.2/src/compiler/checker.ts
  echo "✓ Downloaded checker.ts (TypeScript v5.9.2)"
else
  echo "checker.ts already exists"
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
echo "Setup complete! Run 'pnpm run benchmark' to start benchmarking."
