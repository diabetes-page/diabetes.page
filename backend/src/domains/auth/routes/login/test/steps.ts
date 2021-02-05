import { expect } from 'chai';
import { Given, Then, When } from 'cucumber';
import { seeder, testRequest } from '../../../../../test/setup.steps';

Given(
  /^I am a user with E\-Mail "([^"]*)" and password "([^"]*)"$/,
  async function (email, password) {
    this.user = await seeder.userFactory.createUser(
      {
        email,
      },
      password,
    );
    this.password = password;
  },
);

When(/^I login to the application$/, async function () {
  this.response = await testRequest('POST', '/login', {
    email: this.user.email,
    password: this.password,
  });
});

Then(/^the response contains a token$/, function () {
  expect(this.response.body.token).to.be.a('string');
});
