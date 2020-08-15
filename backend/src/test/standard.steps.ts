import { Response } from 'supertest';
import { HttpStatus } from '@nestjs/common';
import { Then } from 'cucumber';

Then(/^the request is rejected$/, function(): Promise<Response> {
  return this.response.expect(HttpStatus.BAD_REQUEST);
});
