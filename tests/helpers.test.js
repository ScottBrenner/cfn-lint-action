jest.mock("@actions/exec");
jest.mock("@actions/io");

const os = require("os");
const exec = require("@actions/exec");
const io = require("@actions/io");

const { isWindows, mkdirTemp, createPythonVenv } = require('../lib/utils/helpers.js');

describe('helpers Test', () => {

  it('Returns Valid OS for Linux', async () => {
    jest.spyOn(os, "platform").mockReturnValue('linux');
    const res = await isWindows();
    expect(res).toStrictEqual(false);
  });

  it('Returns Valid OS for MacOS', async () => {
    jest.spyOn(os, "platform").mockReturnValue('darwin');
    const res = await isWindows();
    expect(res).toStrictEqual(false);
  });

  it('Returns Valid OS for Windows', async () => {
    jest.spyOn(os, "platform").mockReturnValue('win32');
    const res = await isWindows();
    expect(res).toStrictEqual(true);
  });

  it('Temporary Directory Contains String(s)', async () => {
    jest.spyOn(os, "platform").mockReturnValue('linux');
    const res = await mkdirTemp();
    expect(res).toMatch(/setup-cfn-lint-/);
  });

  it('Ensures Exec & IO which get called', async () => {
    const python = '3.7.0';
    const venvPath = '/path/.venv';
    await createPythonVenv(python, venvPath);
    expect(exec.exec).toHaveBeenCalledTimes(2);
    expect(io.which).toHaveBeenCalledTimes(1);
  });

});
