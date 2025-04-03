#!/usr/bin/env bun

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const packageFile = path.join(process.cwd(), "package.json");

// Read current version
const packageData = JSON.parse(fs.readFileSync(packageFile, "utf8"));
const [major, minor, patch] = packageData.version.split(".").map(Number);

// Get the version type from command line argument
const versionType = process.argv[2];

if (!["major", "minor", "patch"].includes(versionType)) {
    console.error("Please specify version type: major, minor, or patch");
    process.exit(1);
}

// Update version numbers
let newMajor = major;
let newMinor = minor;
let newPatch = patch;

if (versionType === "major") {
    newMajor += 1;
    newMinor = 0;
    newPatch = 0;
} else if (versionType === "minor") {
    newMinor += 1;
    newPatch = 0;
} else if (versionType === "patch") {
    newPatch += 1;
}

// Create new version string
const newVersion = `${newMajor}.${newMinor}.${newPatch}`;
packageData.version = newVersion;

// Write updated package.json
fs.writeFileSync(packageFile, JSON.stringify(packageData, null, 2));

// Create Git tag
try {
    execSync(`git tag -a v${newVersion} -m "Version ${newVersion}"`);
    console.log(`Created Git tag v${newVersion}`);
} catch (error) {
    console.error("Failed to create Git tag:", error.message);
    process.exit(1);
}

console.log(`Version updated to ${newVersion}`);
