import { HttpStatus } from '@nestjs/common';
import { expect } from 'chai';
import { Then } from 'cucumber';

Then(/^the request is rejected$/, function () {
  expect(this.response.status).to.equal(HttpStatus.BAD_REQUEST);
});
