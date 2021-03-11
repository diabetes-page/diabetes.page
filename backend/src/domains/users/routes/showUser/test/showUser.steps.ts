import { expect } from 'chai';
import { TableDefinition, Then, When } from 'cucumber';
import { testRequest } from '../../../../../test/setup.steps';
import { User } from '../../../entities/User.entity';

When(/^I request the user profile of "([^"]*)"$/, async function (userName) {
  const user = (await User.findOne({ name: userName }))!;
  this.response = await testRequest('GET', `/users/${user.id}`, {}, this.jwt);
});

Then(
  /^the response contains the following user data:$/,
  function (configuration: TableDefinition) {
    const expectedUser = configuration.rowsHash();
    const user = this.response.body;

    expect(user.name).to.equal(expectedUser.Name);
    expect(user.email).to.equal(expectedUser['E-Mail']);
    expect(user.isConsultant).to.equal(expectedUser.Consultant === 'Yes');
    expect(user.isManager).to.equal(expectedUser.Manager === 'Yes');
  },
);
