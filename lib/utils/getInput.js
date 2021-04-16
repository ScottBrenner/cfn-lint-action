const core = require("@actions/core");

module.exports = {
  getInput: (name, pattern, defaultValue) => {
    const value = core.getInput(name) || defaultValue;
    if (!pattern.test(value)) {
      throw new Error(`${name} doesn't match ${pattern}`);
    }
    return value;
  },
};
