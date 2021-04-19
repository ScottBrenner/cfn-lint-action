const fs = require("fs");
const path = require("path");
const os = require("os");

const exec = require("@actions/exec");
const io = require("@actions/io");

module.exports = {
  isWindows: () => {
    return os.platform() === "win32";
  },
  mkdirTemp: () => {
    return fs.mkdtempSync(path.join(os.tmpdir(), "setup-cfn-lint-"));
  },
  createPythonVenv: async (python, venvPath) => {
    const pythonPath = await io.which(python, true);

    await exec.exec(pythonPath, ["--version"]);
    await exec.exec(pythonPath, ["-m", "venv", venvPath]);
  },
};
