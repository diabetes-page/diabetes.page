import { Global, Module } from '@nestjs/common';
import { Password } from '../../../blueprints/validators/Password';
import { Unique } from '../../../blueprints/validators/Unique';

@Global()
@Module({
  imports: [],
  providers: [Unique, Password],
})
export class ValidationModule {}
