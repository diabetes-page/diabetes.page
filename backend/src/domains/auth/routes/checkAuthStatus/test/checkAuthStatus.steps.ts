import { HttpStatus } from '@nestjs/common';
import { expect } from 'chai';
import { Given, When } from 'cucumber';
import { testRequest } from '../../../../../test/setup.steps';
import { User } from '../../../../users/entities/User.entity';

Given(/^I have no JSON Web Token$/, function () {
  this.jwt = null;
});

When(/^I check my authentication status$/, async function () {
  this.response = await testRequest('GET', '/auth/status', {}, this.jwt);
});

Given(/^I have a JSON WEB Token "([^"]*)"$/, function (jwt: string) {
  this.jwt = jwt;
});

Given(/^I have a valid JSON Web Token$/, async function () {
  const response = await testRequest('POST', '/auth/login', {
    email: this.user.email,
    password: this.password,
  });
  expect(response.status).to.equal(HttpStatus.OK);
  this.jwt = response.body.token;
});

Given(/^my account is deleted$/, async function () {
  const user = await User.findOne(this.user.id);
  await user!.softRemove();
});
