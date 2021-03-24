import { Global, Module } from '@nestjs/common';
import { Exists } from '../../../blueprints/validators/Exists';
import { Password } from '../../../blueprints/validators/Password';
import { Unique } from '../../../blueprints/validators/Unique';

@Global()
@Module({
  imports: [],
  providers: [Unique, Exists, Password],
})
export class ValidationModule {}
