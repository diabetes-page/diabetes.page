import { expect } from 'chai';
import { Then, When } from 'cucumber';
import { testRequest } from '../../../../../test/setup.steps';

When(
  /^I register a new account with name "([^"]*)", e-mail "([^"]*)" and password "([^"]*)"$/,
  async function (name: string, email: string, password: string) {
    this.response = await testRequest('POST', '/auth/register', {
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
  /^the reason for the rejection is that the e-mail address has the wrong format$/,
  function () {
    expect(this.response.body.message).to.have.members([
      'email must be an email',
    ]);
  },
);

Then(
  /^the reason for the rejection is that the e-mail is already in use$/,
  function () {
    expect(this.response.body.message).to.have.members([
      'User with this email already exists',
    ]);
  },
);

Then(
  /^the reason for the rejection is that the name must not be empty$/,
  function () {
    expect(this.response.body.message).to.have.members([
      'name must be longer than or equal to 1 characters',
      'name must be a string',
    ]);
  },
);
