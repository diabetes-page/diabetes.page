import { Module } from '@nestjs/common';
import { UsersModule } from '../../../domains/users/UsersModule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../../../domains/auth/AuthModule';
import { ValidationModule } from '../validation/ValidationModule';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { config } from '../../../config';
import { User } from '../../../domains/users/entities/User.entity';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    ValidationModule,
    ConfigModule.forRoot({
      load: [config],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: async (configService: ConfigService) => {
        if (configService.get<string>('environment') === 'test') {
          console.log('test');
          return {
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'postgres',
            password: 'postgres',
            database: 'testdb',
            entities: [User],
            synchronize: false,
          };
        }

        return {};
      },
      inject: [ConfigService],
    }),
  ],
})
export class AppModule {}
