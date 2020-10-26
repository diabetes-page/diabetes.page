import { Then } from 'cucumber';
import { expect } from 'chai';
import { HttpStatus } from '@nestjs/common';

Then(/^the request is rejected$/, function () {
  expect(this.response.status).to.equal(HttpStatus.BAD_REQUEST);
});
