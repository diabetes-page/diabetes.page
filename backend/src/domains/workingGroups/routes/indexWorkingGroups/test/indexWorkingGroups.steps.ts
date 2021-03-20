import { expect } from 'chai';
import { TableDefinition, Then, When } from 'cucumber';
import { testRequest } from '../../../../../test/setup.steps';
import { compareToTable } from '../../../../../test/utilities/testingUtilities';
import { BasicWorkingGroupResource } from '../../../resources/BasicWorkingGroupResource';

Then(
  /^the response contains the working groups in the following order:$/,
  async function (table: TableDefinition) {
    compareToTable(
      this.response.body.workingGroups,
      table,
      (
        workingGroup: BasicWorkingGroupResource,
        expectation: Record<string, string>,
      ): void => {
        expect(workingGroup.name).to.equal(expectation.Name);
      },
    );
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
        expect(workingGroup.name).to.not.equal(unexpectedWorkingGroup.Name);
      });
    });
  },
);
