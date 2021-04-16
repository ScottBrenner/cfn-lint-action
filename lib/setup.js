const fs = require("fs");
const path = require("path");
const os = require("os");

const core = require("@actions/core");
const exec = require("@actions/exec");
const io = require("@actions/io");

/**
 * Returns whether the current platform is Windows.
 */
function isWindows() {
  return os.platform() === "win32";
}

/**
 * Returns a new temporary directory.
 */
function mkdirTemp() {
  return fs.mkdtempSync(path.join(os.tmpdir(), "setup-cfn-lint-"));
}

/**
 * Creates a Python virtual environment.
 *
 * @param {string} python - The Python interpreter to use.
 * @param {string} venvPath - The virtual environment directory.
 */
async function createPythonVenv(python, venvPath) {
  const pythonPath = await io.which(python, true);

  await exec.exec(pythonPath, ["--version"]);
  await exec.exec(pythonPath, ["-m", "venv", venvPath]);
}

/**
 * Installs CFN LINT CLI.
 *
 * @param {string} python - The Python interpreter to use for CFN LINT CLI.
 * @param {string} version - The CFN LINT CLI version to install.
 * @returns {Promise<string>} The directory CFN LINT CLI is installed in.
 */
async function installCLI({ python, version }) {
  const tempPath = mkdirTemp();

  // Create virtual environment
  const venvPath = path.join(tempPath, ".venv");
  await createPythonVenv(python, venvPath);

  // See https://docs.python.org/3/library/venv.html
  const binDir = isWindows() ? "Scripts" : "bin";
  const binPath = path.join(venvPath, binDir);

  // Virtual environment Python
  const pythonPath = path.join(binPath, "python");

  // Ensure installation tooling is up-to-date across platforms
  // setuptools and wheel needed for source and binary distributions
  await exec.exec(pythonPath, [
    "-m",
    "pip",
    "install",
    "--upgrade",
    "pip",
  ]);

  await exec.exec(pythonPath, [
    "-m",
    "pip",
    "install",
    "--upgrade",
    "setuptools",
    "wheel",
  ]);

  // Install latest compatible version
  await exec.exec(pythonPath, [
    "-m",
    "pip",
    "install",
    "--upgrade",
    `cfn-lint==${version}`,
  ]);

  // Symlink from separate directory so only CFN LINT CLI is added to PATH
  const symlinkPath = path.join(tempPath, "bin");
  fs.mkdirSync(symlinkPath);
  const cfnLint = isWindows() ? "cfn-lint.exe" : "cfn-lint";
  fs.symlinkSync(path.join(binPath, cfnLint), path.join(symlinkPath, cfnLint));

  return symlinkPath;
}

/**
 * Runs a Cloud Formation Linter Command.
 *
 * @param {string} command - The Cloud Formation Linter Command to Run
 * @throws {e} Throws if the exec command fails.
 */
async function runCommand(command) {
  try{
    const exec = await exec.exec(command)
    core.info(`Ran command: ${command}. Response is: ${exec}`);
  } catch(e){
    core.error(`Error running command: ${command}. Returned error is: ${e.message}`);
    throw e;
  }

}

/**
 * Gets an input value.
 *
 * @param {string} name - The input value name.
 * @param {RegExp} pattern - The input value pattern.
 * @param {string} defaultValue - The default value if the input value is empty.
 * @returns {string} The input value.
 * @throws {Error} Throws if the input value doesn't match `pattern`.
 */
function getInput(name, pattern, defaultValue) {
  const value = core.getInput(name) || defaultValue;
  if (!pattern.test(value)) {
    throw new Error(`${name} doesn't match ${pattern}`);
  }
  return value;
}

/**
 * Collects all the input values and returns them as an object.
 *
 * @returns {object} Returns Object of Inputs.
 * @throws {e} Throws if any of the inputs fail to collect.
 */
function getInputs(){
  const defaultPython = isWindows() ? "python" : "python3"; // python3 isn't standard on Windows

  try {
    const version = getInput("version", /^[\d.*]+$/, "0.*");
    const command = getInput("command", /^cfn-lint\s || null/, null);
    const python = getInput("python", /^.+$/, defaultPython);
    return { version, command, python }
  } catch(e){
    core.error('Failed to Collect Inputs');
    throw e;
  }

}

async function setup() {
  try {
    const inputs = await getInputs();
    core.info(`inputs found: ${inputs}`)
    const binPath = await installCLI(inputs);
    core.info(`setting binPath: ${binPath}`)
    core.addPath(binPath);
    if(inputs.command) {
      core.info('Command Found within Inputs');
      await runCommand();
    }
    return { success: true }
  } catch(e){
    core.error('Failed to run within setup');
    throw e;
  }
}

module.exports = setup;
