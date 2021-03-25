import { expect } from 'chai';
import { TableDefinition, Then, When } from 'cucumber';
import { testRequest } from '../../../../../test/setup.steps';
import { compareToTable } from '../../../../../test/utilities/testingUtilities';
import { SensitiveDataUserResource } from '../../../resources/SensitiveDataUserResource';

When(/^I request the list of all users$/, async function () {
  this.response = await testRequest('GET', `/users`, {}, this.jwt);
});

Then(
  /^the response contains the following users in order:$/,
  async function (table: TableDefinition) {
    compareToTable(
      this.response.body.users,
      table,
      (
        user: SensitiveDataUserResource,
        expectedUser: Record<string, string>,
      ): void => {
        expect(user.name).to.equal(expectedUser.Name);
        expect(user.email).to.equal(expectedUser['E-Mail']);
        expect(!!user.consultantId).to.equal(expectedUser.Consultant === 'Yes');
        expect(!!user.managerId).to.equal(expectedUser.Manager === 'Yes');
        expect(user.workingGroups.map((g) => g.name).join(', ')).to.equal(
          expectedUser['Working groups'],
        );
      },
    );
  },
);
