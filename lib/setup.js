const core = require("@actions/core");

const { getInputs } = require('./utils/getInputs.js')
const { installCLI } = require('./utils/installCLI.js')
const { runCommand } = require('./utils/runCommand.js')

async function setup() {

  let inputs; let binPath;

  try {
    inputs = await getInputs();
  } catch (error){
    core.error(error.message)
    throw error;
  }

  try {
    binPath = await installCLI(inputs);
  } catch (error){
    core.error(error.message)
    throw error;
  }

  core.addPath(binPath);

  if(!inputs.command){
    return;
  }

  try {
    await runCommand(inputs);
  } catch (error){
    core.error(error.message)
    throw error;
  }

  return;

}

module.exports = setup;
