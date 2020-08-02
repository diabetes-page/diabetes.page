import { Module } from '@nestjs/common';
import { UsersModule } from '../../domains/users/UsersModule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../../domains/auth/AuthModule';

@Module({
  imports: [UsersModule, AuthModule, TypeOrmModule.forRoot()],
})
export class AppModule {}
