import { expect } from 'chai';
import { Given, Then, When } from 'cucumber';
import { seeder, testRequest } from '../../../../../test/setup.steps';

When(
  /^I register a new account with name "([^"]*)", E-Mail "([^"]*)" and password "([^"]*)"$/,
  async function (name: string, email: string, password: string) {
    this.response = await testRequest('POST', '/register', {
      name,
      email,
      password,
    });
  },
);

Then(
  /^the reason for the rejection is that the password must be at least (\d+) characters long$/,
  function (length: number) {
    expect(this.response.body.message).to.have.members([
      `Password must be at least ${length} characters long`,
    ]);
  },
);

Then(
  /^the reason for the rejection is that the E-Mail address has the wrong format$/,
  function () {
    expect(this.response.body.message).to.have.members([
      'email must be an email',
    ]);
  },
);

Then(
  /^the reason for the rejection is that the E-Mail is already in use$/,
  function () {
    expect(this.response.body.message).to.have.members([
      "User with the same 'email' already exist",
    ]);
  },
);

Given(
  /^a user with name "([^"]*)" and E\-Mail "([^"]*)"$/,
  async function (name: string, email: string) {
    await seeder.userFactory.createUser({
      name,
      email,
    });
  },
);
