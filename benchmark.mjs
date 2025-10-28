#!/usr/bin/env node

import { execSync, spawn } from 'child_process';
import { existsSync, copyFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Formatter commands
const formatters = {
  prettier_format: (files) =>
    `./node_modules/.bin/prettier ${files} --write --experimental-cli --no-config --ignore-path=.prettierignore --no-cache --ignore-unknown`,

  prettier_oxc_format: (files) =>
    `./node_modules/.bin/prettier ${files} --write --experimental-cli --no-config --ignore-path=.prettierignore --no-cache --ignore-unknown --plugin @prettier/plugin-oxc`,

  biome_format: (files) =>
    `./node_modules/.bin/biome format --write --files-ignore-unknown=true ${files}`,

  oxfmt_format: (files) =>
    `./node_modules/.bin/oxfmt ${files}`
};

// Run setup script
console.log('Running setup...');
execSync('./setup.sh', { stdio: 'inherit' });

console.log('=========================================');
console.log('JavaScript/TypeScript Formatter Benchmark');
console.log('=========================================');
console.log('');
console.log('Formatters: Prettier, Biome, Oxfmt');
console.log('');

// Check if outline directory exists
if (!existsSync('outline')) {
  console.error('Error: Outline repository not found!');
  console.error("Please run 'pnpm run setup' first");
  process.exit(1);
}

// Check if node_modules exists
if (!existsSync('node_modules')) {
  console.error('Error: Dependencies not installed!');
  console.error("Please run 'pnpm run setup' first");
  process.exit(1);
}

console.log('Starting benchmark with:');
console.log('- 3 warmup runs');
console.log('- 10 benchmark runs');
console.log('- Git reset before each run');
console.log('');

// Benchmark parser.ts
console.log('');
console.log('=========================================');
console.log('Benchmarking parser.ts (single large file)');
console.log('=========================================');

const parserBenchmark = spawn('hyperfine', [
  '--ignore-failure',
  '--warmup', '3',
  '--runs', '10',
  '--prepare', 'cp parser.ts.bak parser.ts',
  '--shell=bash',
  '-n', 'prettier',
  '-n', 'prettier+oxc-parser',
  '-n', 'biome',
  '-n', 'oxfmt',
  formatters.prettier_format('parser.ts'),
  formatters.prettier_oxc_format('parser.ts'),
  formatters.biome_format('parser.ts'),
  formatters.oxfmt_format('parser.ts')
], { stdio: 'inherit' });

parserBenchmark.on('close', (code) => {
  if (code !== 0) {
    console.error(`Parser benchmark failed with code ${code}`);
  }

  // Benchmark Outline repository
  console.log('');
  console.log('=========================================');
  console.log('Benchmarking Outline repository');
  console.log('=========================================');

  const outlineBenchmark = spawn('hyperfine', [
    '--ignore-failure',
    '--warmup', '3',
    '--runs', '10',
    '--prepare', 'git -C outline reset --hard',
    '--shell=bash',
    '-n', 'prettier',
    '-n', 'prettier+oxc-parser',
    '-n', 'biome',
    '-n', 'oxfmt',
    formatters.prettier_format('"outline/**/*.{js,jsx,ts,tsx}"'),
    formatters.prettier_oxc_format('"outline/**/*.{js,jsx,ts,tsx}"'),
    formatters.biome_format('outline'),
    formatters.oxfmt_format('outline')
  ], { stdio: 'inherit' });

  outlineBenchmark.on('close', (code) => {
    if (code !== 0) {
      console.error(`Outline benchmark failed with code ${code}`);
    }

    console.log('');
    console.log('Benchmark complete!');
  });
});
