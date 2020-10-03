import { Module } from '@nestjs/common';
import { ValidationModule } from '../validation/ValidationModule';
import { UsersModule } from '../../../domains/users/UsersModule';
import { AuthModule } from '../../../domains/auth/AuthModule';
import { TypeOrmModule } from './TypeOrmModule';
import { ConfigModule } from './ConfigModule';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule,
    UsersModule,
    AuthModule,
    ValidationModule,
  ],
})
export class AppModule {}
