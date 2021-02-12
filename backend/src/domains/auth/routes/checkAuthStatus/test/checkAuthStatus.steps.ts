import { expect } from 'chai';
import { Given, Then, When } from 'cucumber';
import { testRequest } from '../../../../../test/setup.steps';
import { User } from '../../../../users/entities/User.entity';

Given(/^I have no JSON Web Token$/, function () {
  this.jwt = null;
});

When(/^I check my authentication status$/, async function () {
  this.response = await testRequest('GET', '/auth/status', {}, this.jwt);
});

Given(/^I have a JSON Web Token "([^"]*)"$/, function (jwt: string) {
  this.jwt = jwt;
});

Given(/^my account is deleted$/, async function () {
  const user = await User.findOne(this.user.id);
  await user!.softRemove();
});

Then(/^the response shows that I am authenticated$/, function () {
  expect(this.response.body.authenticated).to.equal(true);
});

Then(/^the response contains my user id$/, function () {
  expect(this.response.body.userId).to.equal(this.user.id);
});
