import { HttpStatus } from '@nestjs/common';
import { expect } from 'chai';
import { Given, Then } from 'cucumber';
import { seeder, testRequest } from './setup.steps';

Then(/^the request is rejected$/, function () {
  expect(this.response.status).to.equal(HttpStatus.BAD_REQUEST);
});

Then(/^the request is successful$/, function () {
  expect(this.response.status).to.equal(HttpStatus.OK);
});

Then(/^the request is unauthorized$/, function () {
  expect(this.response.status).to.equal(HttpStatus.UNAUTHORIZED);
});

Given(
  /^a user with name "([^"]*)" and E\-Mail "([^"]*)"$/,
  async function (name: string, email: string) {
    await seeder.userFactory.createUser({
      name,
      email,
    });
  },
);

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

Given(/^I am logged in$/, async function () {
  const response = await testRequest('POST', '/auth/login', {
    email: this.user.email,
    password: this.password,
  });

  this.jwt = response.body.token;
});
