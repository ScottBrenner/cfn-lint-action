const core = require("@actions/core");

const { getInput } = require("./getInput.js");
const { isWindows } = require("./helpers.js");

module.exports = {
  getInputs: () => {
    // python3 isn't standard on Windows
    const defaultPython = isWindows() ? "python" : "python3";

    try {
      const version = getInput(
        "version",
        /^(?:[A-Za-z0-9.*]+|(?:\[[A-Za-z0-9_,]+\])?\s*(?:==|!=|<=|>=|~=|===|<|>)\s*[A-Za-z0-9.*]+)$/,
        "[full]==1.*",
      );
      const command = getInput("command", /^cfn-lint\s || null/, null);
      const python = getInput("python", /^.+$/, defaultPython);
      return { version, command, python };
    } catch (e) {
      core.error("Failed to Collect Inputs");
      throw e;
    }
  },
};
