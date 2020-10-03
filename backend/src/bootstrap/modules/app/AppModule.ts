import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ValidationModule } from '../validation/ValidationModule';
import { UsersModule } from '../../../domains/users/UsersModule';
import { AuthModule } from '../../../domains/auth/AuthModule';
import { ConfigModule } from '@nestjs/config';
import { config } from '../../../config';
import { User } from '../../../domains/users/entities/User.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      entities: [User],
    }),
    UsersModule,
    AuthModule,
    ValidationModule,
  ],
})
export class AppModule {}
