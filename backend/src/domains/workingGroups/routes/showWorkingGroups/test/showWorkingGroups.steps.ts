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
Then(
  /^the response does not contain the following working groups:$/,
  async function (configuration: TableDefinition) {
    const unexpectedWorkingGroups = configuration.hashes();
    const workingGroups = this.response.body.workingGroups;

    workingGroups.forEach((workingGroup: any) => {
      unexpectedWorkingGroups.forEach((unexpectedWorkingGroup) => {
        expect(workingGroup.name).to.not.equal(unexpectedWorkingGroup.name);
      });
    });
  },
);
