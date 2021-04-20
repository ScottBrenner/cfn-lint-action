const core = require("@actions/core");
const path = require("path");

const setup = require("./lib/setup");

(async () => {
  try {
    await setup();
    const matchersPath = path.join(__dirname, "..", ".github");
    core.info(`##[add-matcher]${path.join(matchersPath, "cfn-lint.json")}`);
  } catch (error) {
    core.setFailed(error.message);
  }
})();
