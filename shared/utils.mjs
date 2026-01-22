import { execSync, spawn } from "child_process";
import { dirname } from "path";
import { fileURLToPath } from "url";

const FORMATTER_NAMES = ["prettier", "prettier+oxc-parser", "biome", "oxfmt"];

export { FORMATTER_NAMES };

export function setupCwd(importMetaUrl) {
  const __dirname = dirname(fileURLToPath(importMetaUrl));
  process.chdir(__dirname);
}

export function createFormatters(projectRoot, configDir) {
  const prettierBin = `${projectRoot}/node_modules/.bin/prettier`;
  const biomeBin = `${projectRoot}/node_modules/.bin/biome`;
  const oxfmtBin = `${projectRoot}/node_modules/.bin/oxfmt`;

  // NOTE: Do not use `--experimental-cli`, as it seems to behave differently than the stable CLI...
  return {
    prettier: (files) =>
      `${prettierBin} ${files} --write --config ${configDir}/prettierrc.json --ignore-path ${configDir}/prettierignore --ignore-unknown`,

    prettier_oxc: (files) =>
      `${prettierBin} ${files} --write --config ${configDir}/prettierrc.json --ignore-path ${configDir}/prettierignore --ignore-unknown --plugin @prettier/plugin-oxc`,

    biome: (files) =>
      `${biomeBin} format --write --files-ignore-unknown=true --config-path ${configDir} ${files}`,

    oxfmt: (files) => `${oxfmtBin} --config ${configDir}/oxfmtrc.json ${files}`,
  };
}

// ---

// Run hyperfine benchmark
export function runHyperfine(args) {
  return new Promise((resolve, reject) => {
    const proc = spawn("hyperfine", args, { stdio: "inherit" });
    proc.on("close", (code) => {
      if (code !== 0) {
        reject(new Error(`Hyperfine failed with code ${code}`));
      } else {
        resolve();
      }
    });
  });
}

// ---

// Print benchmark header
export function printHeader(title) {
  console.log("");
  console.log("=========================================");
  console.log(title);
  console.log("=========================================");
}

// ---

// Run memory benchmarks
export async function runMemoryBenchmarks(benchmarks, runs) {
  console.log("");
  console.log("Memory Usage:");

  const results = [];
  for (const bench of benchmarks) {
    const result = await measureMemory(bench.name, bench.command, bench.prepare, runs);
    if (result) {
      results.push(result);
    }
  }

  // Print results
  for (const result of results) {
    console.log(
      `  ${result.name}: ${result.mean} MB (min: ${result.min} MB, max: ${result.max} MB)`,
    );
  }

  return results;
}

// Detect GNU time binary
let gnuTimeBinary = null;
try {
  execSync("gtime --version", { stdio: "ignore" });
  gnuTimeBinary = "gtime";
} catch {
  try {
    execSync("/usr/bin/time --version", { stdio: "ignore" });
    gnuTimeBinary = "/usr/bin/time";
  } catch {
    // GNU time not available
  }
}

// Check GNU time availability and print warning if not found
export function checkGnuTime() {
  if (!gnuTimeBinary) {
    console.warn("Warning: GNU time not found. Memory benchmarking will be skipped.");
    console.warn("Install GNU time to enable memory benchmarking:");
    console.warn("  macOS: brew install gnu-time (installs as gtime)");
    console.warn("  Linux: apt install time or yum install time");
    return false;
  }
  return true;
}

// Memory measurement function
async function measureMemory(name, command, prepareCmd, runs) {
  const measurements = [];

  for (let i = 0; i < runs; i++) {
    // Run prepare command if provided
    if (prepareCmd) {
      try {
        execSync(prepareCmd, { stdio: "ignore" });
      } catch {
        // Ignore prepare errors
      }
    }

    // Run the command with GNU time to measure memory
    try {
      if (!gnuTimeBinary) {
        return null;
      }
      const escapedCommand = command.replace(/'/g, "'\\''");
      const output = execSync(`${gnuTimeBinary} -f '%M' sh -c '${escapedCommand}' 2>&1 | tail -1`, {
        encoding: "utf8",
        stdio: "pipe",
      });
      const memKB = Number.parseInt(output.trim(), 10);
      if (!Number.isNaN(memKB)) {
        measurements.push(memKB);
      }
    } catch {
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

  const KB_TO_MB = 1024;
  return {
    name,
    mean: (mean / KB_TO_MB).toFixed(1),
    min: (min / KB_TO_MB).toFixed(1),
    max: (max / KB_TO_MB).toFixed(1),
  };
}
