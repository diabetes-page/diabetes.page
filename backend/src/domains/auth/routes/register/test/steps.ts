import { expect } from 'chai';
import { Then, When } from 'cucumber';
import { testRequest } from '../../../../../test/setup.steps';

When(
  /^I register a new account with E-Mail "([^"]*)" and password "([^"]*)"$/,
  async function (email: string, password: string) {
    this.response = await testRequest('POST', '/register', {
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
      'email must be an email',
    ]);
  },
);
