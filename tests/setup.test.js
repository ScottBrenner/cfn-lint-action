jest.mock("@actions/core");
jest.mock("@actions/exec");
jest.mock("@actions/io");

const os = require("os");

const core = require("@actions/core");
const exec = require("@actions/exec");
const io = require("@actions/io");

const setup = require("../lib/setup.js");

afterEach(() => {
  jest.clearAllMocks();
});

test.each([
  {
    platform: "linux",
    input: {},
    expected: { version: "[full]==1.*", python: "python3" },
  },
  {
    platform: "darwin",
    input: {},
    expected: { version: "[full]==1.*", python: "python3" },
  },
  {
    platform: "win32",
    input: {},
    expected: { version: "[full]==1.*", python: "python" },
  },
  {
    platform: "linux",
    input: { version: "[full]>=0.44.4" },
    expected: { version: "[full]>=0.44.4", python: "python3" },
  },
  {
    platform: "linux",
    input: { python: "python3" },
    expected: { version: "[full]==1.*", python: "python3" },
  },
  {
    platform: "linux",
    input: { version: "[full]~=0.44.4", python: "python3" },
    expected: { version: "[full]~=0.44.4", python: "python3" },
  },
])("setup %o", async (test) => {
  jest.spyOn(os, "platform").mockReturnValue(test.platform);

  core.getInput = jest
    .fn()
    .mockReturnValueOnce(test.input.version)
    .mockReturnValueOnce(test.input.python);

  await setup();

  expect(io.which).toHaveBeenCalledWith(test.expected.python, true);
  expect(exec.exec).toHaveBeenCalledWith(
    expect.anything(),
    expect.arrayContaining(["install", `cfn-lint${test.expected.version}`]),
  );
  expect(core.addPath).toHaveBeenCalledTimes(1);
});

test.each([
  {
    version: " ",
  },
  {
    version: "  ",
  },
])("invalid input %o", async (input) => {
  core.getInput = jest
    .fn()
    .mockReturnValueOnce(input.version)
    .mockReturnValueOnce(input.python);
  await expect(setup).rejects.toThrow(Error);
});
