import { Module } from '@nestjs/common';
import { UsersModule } from '../../../domains/users/UsersModule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../../../domains/auth/AuthModule';
import { ValidationModule } from '../validation/ValidationModule';

@Module({
  imports: [UsersModule, AuthModule, ValidationModule, TypeOrmModule.forRoot()],
})
export class AppModule {}
