const core = require("@actions/core");
const path = require("path");

const setup = require("./lib/setup");

(async () => {
  try {
    const matchersPath = path.join(__dirname, "..", ".github");
    core.info(`##[add-matcher]${path.join(matchersPath, "cfn-lint.json")}`);
    await setup();
  } catch (error) {
    core.setFailed(error.message);
  }
})();
