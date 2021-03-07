import { expect } from 'chai';
import { TableDefinition, Then, When } from 'cucumber';
import { testRequest } from '../../../../../test/setup.steps';

When(/^I request the list of all users$/, async function () {
  this.response = await testRequest('GET', `/users`, {}, this.jwt);
});

Then(
  /^the response contains the following users in order:$/,
  async function (configuration: TableDefinition) {
    const expectedUsers = configuration.hashes();
    const users = this.response.body.users;

    expect(users).to.have.length(expectedUsers.length);
    expectedUsers.forEach((expectedUser, index) => {
      expect(users[index].name).to.equal(expectedUser.Name);
      expect(users[index].email).to.equal(expectedUser['E-Mail']);
      expect(users[index].isConsultant).to.equal(
        expectedUser.Consultant === 'Yes',
      );
      expect(users[index].isManager).to.equal(expectedUser.Manager === 'Yes');
    });
  },
);
