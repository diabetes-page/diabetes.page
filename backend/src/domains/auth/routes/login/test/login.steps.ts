import { HttpStatus } from '@nestjs/common';
import { expect } from 'chai';
import { Then, When } from 'cucumber';
import { testRequest } from '../../../../../test/setup.steps';

When(/^I login to the application$/, async function () {
  this.response = await testRequest('POST', '/auth/login', {
    email: this.user.email,
    password: this.password,
  });
});

Then(/^the response contains a token$/, function () {
  expect(this.response.body.token).to.be.a('string');
  this.jwt = this.response.body.token;
});

Then(/^the token is valid$/, async function () {
  const response = await testRequest('GET', '/auth/status', {}, this.jwt);
  expect(response.status).to.equal(HttpStatus.OK);
  expect(response.body.authenticated).to.equal(true);
});
