import { expect } from 'chai';
import { TableDefinition, Then, When } from 'cucumber';
import { testRequest } from '../../../../../test/setup.steps';

Then(
  /^the response contains the working groups in the following order:$/,
  async function (configuration: TableDefinition) {
    const expectedWorkingGroups = configuration.hashes();
    const workingGroups = this.response.body.workingGroups;
    expect(workingGroups).to.have.length(expectedWorkingGroups.length);

    expectedWorkingGroups.forEach((expectedTraining, index) => {
      expect(workingGroups[index].name).to.equal(expectedTraining.name);
    });
  },
);

When(/^I request for my working groups$/, async function () {
  this.response = await testRequest('GET', '/working-groups', {}, this.jwt);
});
