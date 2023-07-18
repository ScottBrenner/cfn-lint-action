const exec = require("@actions/exec");
const core = require("@actions/core");

const { runCommand } = require("../lib/utils/runCommand.js");

describe("runCommand Test", () => {
  it("Successfully handles passed CFN-Lint Command", async () => {
    const command = { command: "cfn-lint -t ./template.yml" };
    const expectedReturnValue = "";

    jest.spyOn(exec, "exec").mockImplementation(() => {
      return expectedReturnValue;
    });

    const log = jest.spyOn(core, "info");

    const res = await runCommand(command);
    expect(res).toStrictEqual("");
    expect(log).toHaveBeenCalledTimes(1);
  });

  it("Successfully handles failure CFN-Lint Command", async () => {
    const command = { command: "cfn-lint -t ./template.yml" };
    const expectedReturnValue = new Error(
      "You have Errors in your Cloud Formation",
    );

    jest.spyOn(exec, "exec").mockImplementation(() => {
      throw expectedReturnValue;
    });

    const log = jest.spyOn(core, "error");

    try {
      await runCommand(command);
    } catch (e) {
      expect(e.message).toStrictEqual(
        "You have Errors in your Cloud Formation",
      );
      expect(log).toHaveBeenCalledTimes(1);
    }
  });
});
