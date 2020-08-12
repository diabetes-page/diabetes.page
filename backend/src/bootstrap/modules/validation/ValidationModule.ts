import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Unique } from './validators/Unique';
import { Password } from './validators/Password';

@Global()
@Module({
  imports: [TypeOrmModule.forRoot()],
  providers: [Unique, Password],
})
export class ValidationModule {}
