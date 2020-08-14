import { Global, Module } from '@nestjs/common';
import { Unique } from './validators/Unique';
import { Password } from './validators/Password';

@Global()
@Module({
  imports: [],
  providers: [Unique, Password],
})
export class ValidationModule {}
