#!/bin/bash

# Install pnpm dependencies
echo "Installing pnpm dependencies..."
pnpm install

# Clone Outline repository if not exists
if [ ! -d "bench-js-no-embedded/data" ]; then
	echo "Cloning Outline repository..."
	git clone --depth=1 https://github.com/outline/outline.git bench-js-no-embedded/data
else
	echo "Outline repository already exists"
fi

# Download TypeScript compiler parser.ts if not exists
if [ ! -f "bench-large-single-file/data/parser.ts" ]; then
	echo "Downloading TypeScript compiler parser.ts..."
	mkdir -p bench-large-single-file/data
	curl -o bench-large-single-file/data/parser.ts https://raw.githubusercontent.com/microsoft/TypeScript/refs/tags/v5.9.2/src/compiler/parser.ts
	cp bench-large-single-file/data/parser.ts bench-large-single-file/data/parser.ts.bak
	echo "Downloaded parser.ts (TypeScript v5.9.2)"
else
	echo "parser.ts already exists"
fi

# Check hyperfine installation
if ! command -v hyperfine &> /dev/null; then
	echo ""
	echo "Hyperfine is not installed!"
	echo "Please install hyperfine: https://github.com/sharkdp/hyperfine"
	echo "On macOS: brew install hyperfine"
	echo "On Ubuntu/Debian: apt install hyperfine"
else
	echo "Hyperfine is installed"
fi

# Check GNU time installation
if command -v gtime &> /dev/null; then
	echo "GNU time is installed (gtime)"
elif /usr/bin/time --version &> /dev/null; then
	echo "GNU time is installed (/usr/bin/time)"
else
	echo ""
	echo "GNU time is not installed!"
	echo "Memory benchmarking requires GNU time (not BSD time)"
	echo "On macOS: brew install gnu-time (installs as gtime)"
	echo "On Ubuntu/Debian: apt install time"
fi

echo ""
echo "Setup complete! Run 'pnpm run bench' to start benchmarking."
