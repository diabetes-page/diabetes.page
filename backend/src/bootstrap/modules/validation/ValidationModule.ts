import { Global, Module } from '@nestjs/common';
import { Unique } from '../../../blueprints/validators/Unique';
import { Password } from '../../../blueprints/validators/Password';

@Global()
@Module({
  imports: [],
  providers: [Unique, Password],
})
export class ValidationModule {}
