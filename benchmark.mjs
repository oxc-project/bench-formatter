#!/usr/bin/env node

import { execSync, spawn } from 'child_process';
import { existsSync } from 'fs';

// Detect GNU time binary
let gnuTimeBinary = null;
try {
  execSync('gtime --version', { stdio: 'ignore' });
  gnuTimeBinary = 'gtime';
} catch (e) {
  try {
    execSync('/usr/bin/time --version', { stdio: 'ignore' });
    gnuTimeBinary = '/usr/bin/time';
  } catch (e2) {
    // GNU time not available, will be checked in main()
  }
}

// Formatter commands
// Target pure JS/TSX files with default config, disable embedded formatting
const formatters = {
  prettier_format: (files) =>
    `./node_modules/.bin/prettier ${files} --write --experimental-cli --no-config --embedded-language-formatting=off --ignore-path=.prettierignore --no-cache --ignore-unknown`,

  prettier_oxc_format: (files) =>
    `./node_modules/.bin/prettier ${files} --write --experimental-cli --no-config --embedded-language-formatting=off --ignore-path=.prettierignore --no-cache --ignore-unknown --plugin @prettier/plugin-oxc`,

  biome_format: (files) =>
    `./node_modules/.bin/biome format --write --files-ignore-unknown=true ${files}`,

  oxfmt_format: (files) =>
    `./node_modules/.bin/oxfmt ${files}`
};

// Memory measurement function
async function measureMemory(name, command, prepareCmd, runs = 10) {
  const measurements = [];
  
  for (let i = 0; i < runs; i++) {
    // Run prepare command if provided
    if (prepareCmd) {
      try {
        execSync(prepareCmd, { stdio: 'ignore' });
      } catch (e) {
        // Ignore prepare errors
      }
    }
    
    // Run the command with GNU time to measure memory
    try {
      if (!gnuTimeBinary) {
        // Skip if GNU time is not available
        return null;
      }
      // Use execSync with shell:true, but the command strings are controlled by us (not user input)
      // so this is safe. The escaping prevents any issues with quotes in our controlled strings.
      const escapedCommand = command.replace(/'/g, "'\\''");
      const output = execSync(
        `${gnuTimeBinary} -f '%M' sh -c '${escapedCommand}' 2>&1 | tail -1`,
        { encoding: 'utf8', stdio: 'pipe', shell: '/bin/bash' }
      );
      const memKB = parseInt(output.trim(), 10);
      if (!isNaN(memKB)) {
        measurements.push(memKB);
      }
    } catch (e) {
      // Continue on error
    }
  }
  
  if (measurements.length === 0) {
    return null;
  }
  
  // Calculate statistics
  measurements.sort((a, b) => a - b);
  const mean = measurements.reduce((a, b) => a + b, 0) / measurements.length;
  const min = measurements[0];
  const max = measurements[measurements.length - 1];
  
  return {
    name,
    mean: (mean / 1024).toFixed(1), // Convert to MB
    min: (min / 1024).toFixed(1),
    max: (max / 1024).toFixed(1)
  };
}

// Run hyperfine benchmark
function runHyperfine(args) {
  return new Promise((resolve, reject) => {
    const proc = spawn('hyperfine', args, { stdio: 'inherit' });
    proc.on('close', (code) => {
      if (code !== 0) {
        reject(new Error(`Hyperfine failed with code ${code}`));
      } else {
        resolve();
      }
    });
  });
}

// Run memory benchmarks
async function runMemoryBenchmarks(benchmarks) {
  console.log('');
  console.log('Memory Usage:');
  
  const results = [];
  for (const bench of benchmarks) {
    const result = await measureMemory(
      bench.name,
      bench.command,
      bench.prepare,
      10
    );
    if (result) {
      results.push(result);
    }
  }
  
  // Print results
  for (const result of results) {
    console.log(`  ${result.name}: ${result.mean} MB (min: ${result.min} MB, max: ${result.max} MB)`);
  }
  
  return results;
}

// Main async function
async function main() {
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

  // Check if GNU time is available
  if (!gnuTimeBinary) {
    console.warn('Warning: GNU time not found. Memory benchmarking will be skipped.');
    console.warn('Install GNU time to enable memory benchmarking:');
    console.warn('  macOS: brew install gnu-time (installs as gtime)');
    console.warn('  Linux: apt install time or yum install time');
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

  try {
    await runHyperfine([
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
    ]);

    // Memory benchmarks for parser.ts
    await runMemoryBenchmarks([
      { name: 'prettier', command: formatters.prettier_format('parser.ts'), prepare: 'cp parser.ts.bak parser.ts' },
      { name: 'prettier+oxc-parser', command: formatters.prettier_oxc_format('parser.ts'), prepare: 'cp parser.ts.bak parser.ts' },
      { name: 'biome', command: formatters.biome_format('parser.ts'), prepare: 'cp parser.ts.bak parser.ts' },
      { name: 'oxfmt', command: formatters.oxfmt_format('parser.ts'), prepare: 'cp parser.ts.bak parser.ts' }
    ]);
  } catch (e) {
    console.error(`Parser benchmark failed: ${e.message}`);
  }

  // Benchmark Outline repository
  console.log('');
  console.log('=========================================');
  console.log('Benchmarking Outline repository');
  console.log('=========================================');

  try {
    await runHyperfine([
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
    ]);

    // Memory benchmarks for Outline
    await runMemoryBenchmarks([
      { name: 'prettier', command: formatters.prettier_format('"outline/**/*.{js,jsx,ts,tsx}"'), prepare: 'git -C outline reset --hard' },
      { name: 'prettier+oxc-parser', command: formatters.prettier_oxc_format('"outline/**/*.{js,jsx,ts,tsx}"'), prepare: 'git -C outline reset --hard' },
      { name: 'biome', command: formatters.biome_format('outline'), prepare: 'git -C outline reset --hard' },
      { name: 'oxfmt', command: formatters.oxfmt_format('outline'), prepare: 'git -C outline reset --hard' }
    ]);
  } catch (e) {
    console.error(`Outline benchmark failed: ${e.message}`);
  }

  console.log('');
  console.log('Benchmark complete!');
}

// Run main function
main().catch(error => {
  console.error('Error:', error);
  process.exit(1);
});
