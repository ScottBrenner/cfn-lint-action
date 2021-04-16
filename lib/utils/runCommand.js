const exec = require("@actions/exec");
const core = require("@actions/core");

module.exports = {
  runCommand: async ({ command }) => {
    try{
      const response = await exec.exec(command)
      core.info(`Ran command: ${command}. Response is: ${response}`);
    } catch(e){
      core.error(`Error running command: ${command}. Returned error is: ${e.message}`);
      throw e;
    }
  },
};
