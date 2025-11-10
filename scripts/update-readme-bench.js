#!/usr/bin/env node

import { exec } from "child_process";
import { readFile, writeFile } from "fs/promises";
import { promisify } from "util";

const execAsync = promisify(exec);

async function runBenchmark() {
  console.log("Running benchmark...");
  try {
    const { stdout } = await execAsync("pnpm run bench");
    return stdout;
  } catch (error) {
    console.error("Error running benchmark:", error);
    process.exit(1);
  }
}

function extractBenchmarkResults(output) {
  // Extract everything from "=========================================" onwards
  // This captures both the parser.ts and outline repository benchmarks
  const benchmarkStartMatch = output.match(
    /=========================================\nBenchmarking .*?\n=========================================\n([\s\S]*)/
  );

  if (!benchmarkStartMatch) {
    throw new Error("Could not find benchmark results in output");
  }

  const benchmarkSection = benchmarkStartMatch[0].trim();

  return benchmarkSection;
}

async function getVersions() {
  console.log("Fetching versions...");
  try {
    const [prettier, biome, oxfmt] = await Promise.all([
      execAsync("pnpm prettier --version"),
      execAsync("pnpm biome --version"),
      execAsync("pnpm oxfmt --version"),
    ]);

    return {
      prettier: prettier.stdout.trim(),
      biome: biome.stdout.trim().replace("Version: ", ""),
      oxfmt: oxfmt.stdout.trim().replace("Version: ", ""),
    };
  } catch (error) {
    console.error("Error fetching versions:", error);
    process.exit(1);
  }
}

async function updateReadme(benchmarkResults, versions) {
  console.log("Updating README...");

  const readmePath = "README.md";
  let readmeContent = await readFile(readmePath, "utf-8");

  // Find the benchmark results section between markers
  const startMarker = "<!-- BENCHMARK_RESULTS_START -->";
  const endMarker = "<!-- BENCHMARK_RESULTS_END -->";

  const startIndex = readmeContent.indexOf(startMarker);
  const endIndex = readmeContent.indexOf(endMarker);

  if (startIndex === -1 || endIndex === -1) {
    throw new Error("Could not find benchmark results markers in README.md");
  }

  // Create the new benchmark content
  const newBenchmarkContent = `\`\`\`
${benchmarkResults}
\`\`\``;

  // Replace the content between markers
  const beforeMarker = readmeContent.substring(
    0,
    startIndex + startMarker.length
  );
  const afterMarker = readmeContent.substring(endIndex);

  readmeContent =
    beforeMarker + "\n" + newBenchmarkContent + "\n" + afterMarker;

  // Update versions section
  const versionsRegex = /## Versions\n\n- \*\*Prettier\*\*: .*\n- \*\*Biome\*\*: .*\n- \*\*Oxfmt\*\*: .*/;
  const newVersionsContent = `## Versions\n\n- **Prettier**: ${versions.prettier}\n- **Biome**: ${versions.biome}\n- **Oxfmt**: ${versions.oxfmt}`;

  if (versionsRegex.test(readmeContent)) {
    readmeContent = readmeContent.replace(versionsRegex, newVersionsContent);
  } else {
    console.warn("Could not find versions section in README.md");
  }

  await writeFile(readmePath, readmeContent);
  console.log("README updated successfully");
}

async function main() {
  try {
    const benchmarkOutput = await runBenchmark();
    const results = extractBenchmarkResults(benchmarkOutput);
    const versions = await getVersions();
    await updateReadme(results, versions);

    console.log("README has been updated with the latest benchmark results");
  } catch (error) {
    console.error("Error:", error.message);
    process.exit(1);
  }
}

main();
