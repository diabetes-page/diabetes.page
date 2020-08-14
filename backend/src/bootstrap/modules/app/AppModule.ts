import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ValidationModule } from '../validation/ValidationModule';
import { UsersModule } from '../../../domains/users/UsersModule';
import { AuthModule } from '../../../domains/auth/AuthModule';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { config } from '../../../config';
import { User } from '../../../domains/users/entities/User.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      // @ts-ignore : We can assume that the config values are present and of correct type
      useFactory: async (configService: ConfigService) => {
        return {
          type: configService.get<string>('database.type'),
          host: configService.get<string>('database.host'),
          port: configService.get<number>('database.port'),
          username: configService.get<string>('database.user'),
          password: configService.get<string>('database.user'),
          database: configService.get<string>('database.database'),
          entities: [User],
          synchronize: false,
          migrations: ['dist/database/migrations/*.js'],
        };
      },
      inject: [ConfigService],
    }),
    UsersModule,
    AuthModule,
    ValidationModule,
  ],
})
export class AppModule {}
