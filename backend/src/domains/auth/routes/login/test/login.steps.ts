import { HttpStatus } from '@nestjs/common';
import { expect } from 'chai';
import { Given, Then, When } from 'cucumber';
import { seeder, testRequest } from '../../../../../test/setup.steps';

Then(/^the response contains a token$/, function () {
  expect(this.response.body.token).to.be.a('string');
  this.jwt = this.response.body.token;
});

Then(/^the token is valid$/, async function () {
  const response = await testRequest('GET', '/auth/status', {}, this.jwt);
  expect(response.status).to.equal(HttpStatus.OK);
  expect(response.body.authenticated).to.equal(true);
});

When(
  /^I login to the application with E-Mail "([^"]*)" and password "([^"]*)"$/,
  async function (email, password) {
    this.response = await testRequest('POST', '/auth/login', {
      email: email,
      password: password,
    });
  },
);

Then(/^the response contains the id, email and name of me$/, function () {
  expect(this.response.body.user).to.deep.include({
    id: this.user.id,
    name: this.user.name,
    email: this.user.email,
  });
});

Given(/^I have a verification token set$/, async function () {
  return await seeder.userFactory.addVerificationToken(this.user);
});
