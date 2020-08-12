import { Module } from '@nestjs/common';
import { UsersModule } from '../../../domains/users/UsersModule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../../../domains/auth/AuthModule';
import { ValidationModule } from '../validation/ValidationModule';
import { ConfigModule } from '@nestjs/config';
import { config } from '../../../config';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    ValidationModule,
    TypeOrmModule.forRoot(),
    ConfigModule.forRoot({
      load: [config],
      isGlobal: true,
    }),
  ],
})
export class AppModule {}
