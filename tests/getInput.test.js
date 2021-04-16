const core = require("@actions/core");
const { getInput } = require('../lib/utils/getInput.js');


describe('getInput Test', () => {

  it('Returns Valid Value', async () => {

    const name = "version";
    const pattern = /^[\d.*]+$/;
    const defaultValue = "0.*";
    const expectedReturnValue = '0.44.4';

    jest.spyOn(core, 'getInput').mockImplementation(() => {
      return expectedReturnValue;
    });
    const userInputs = await getInput(name, pattern, defaultValue);
    expect(userInputs).toStrictEqual('0.44.4');
  });

  it('Handles Unsuccessul Value', async () => {

    const name = "version";
    const pattern = /^[\d.*]+$/;
    const defaultValue = "0.*";
    const expectedReturnValue = 'bbgerbgreiugbreiugbire';

    jest.spyOn(core, 'getInput').mockImplementation(() => {
      return expectedReturnValue;
    });

    try{
      await getInput(name, pattern, defaultValue);
    } catch(e){
      expect(e.message).toStrictEqual(`${name} doesn't match ${pattern}`)
    }
  });

  it('Handles Default Value', async () => {

    const name = "version";
    const pattern = /^[\d.*]+$/;
    const defaultValue = "0.*";
    const expectedReturnValue = undefined;

    jest.spyOn(core, 'getInput').mockImplementation(() => {
      return expectedReturnValue;
    });

    try{
      await getInput(name, pattern, defaultValue);
    } catch(e){
      expect(e.message).toStrictEqual('0.*')
    }
  });
});
