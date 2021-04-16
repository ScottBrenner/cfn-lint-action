const fs = require("fs");
const path = require("path");

const exec = require("@actions/exec");

const { mkdirTemp, createPythonVenv, isWindows} = require('./helpers.js');


module.exports = {
  installCLI: async ({ python, version }) => {
    const tempPath = mkdirTemp();

    // Create virtual environment
    const venvPath = path.join(tempPath, ".venv");
    await createPythonVenv(python, venvPath);

    // See https://docs.python.org/3/library/venv.html
    const binDir = isWindows() ? "Scripts" : "bin";
    const binPath = path.join(venvPath, binDir);

    // Virtual environment running Python
    const pythonPath = path.join(binPath, "python");

    // Ensure installation tooling is up-to-date across platforms
    await exec.exec(pythonPath, ["-m", "pip", "install", "--upgrade", "pip"]);
    // setuptools and wheel needed for source and binary distributions
    await exec.exec(pythonPath, ["-m", "pip", "install", "--upgrade", "setuptools", "wheel" ]);
    // Install latest compatible version
    await exec.exec(pythonPath, ["-m", "pip", "install", "--upgrade", `cfn-lint==${version}` ]);

    // Symlink from separate directory so only CFN LINT CLI is added to PATH
    const symlinkPath = path.join(tempPath, "bin");
    fs.mkdirSync(symlinkPath);
    const cfnLint = isWindows() ? "cfn-lint.exe" : "cfn-lint";
    fs.symlinkSync(path.join(binPath, cfnLint), path.join(symlinkPath, cfnLint));

    return symlinkPath;
  },

};
