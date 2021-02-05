import { HttpStatus } from '@nestjs/common';
import { expect } from 'chai';
import { Given, Then } from 'cucumber';
import { seeder } from './setup.steps';

Then(/^the request is rejected$/, function () {
  expect(this.response.status).to.equal(HttpStatus.BAD_REQUEST);
});

Then(/^the request is successful$/, function () {
  expect(this.response.status).to.equal(HttpStatus.OK);
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
