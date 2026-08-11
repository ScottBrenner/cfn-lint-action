const core = require("@actions/core");

const { getInputs } = require("./utils/getInputs.js");
const { installCLI } = require("./utils/installCLI.js");
const { runCommand } = require("./utils/runCommand.js");

async function setup() {
  let inputs;
  let installResult;

  try {
    inputs = await getInputs();
  } catch (error) {
    core.error(error.message);
    throw error;
  }

  try {
    installResult = await installCLI(inputs);
  } catch (error) {
    core.error(error.message);
    throw error;
  }

  core.addPath(installResult.symlinkPath);
  core.setOutput("cfn_lint_venv", installResult.venvPath);

  if (!inputs.command) {
    return;
  }

  try {
    await runCommand(inputs);
  } catch (error) {
    core.error(error.message);
    throw error;
  }

  return;
}

module.exports = setup;
