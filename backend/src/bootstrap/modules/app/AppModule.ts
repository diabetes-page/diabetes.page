import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ValidationModule } from '../validation/ValidationModule';
import { UsersModule } from '../../../domains/users/UsersModule';
import { AuthModule } from '../../../domains/auth/AuthModule';
import { ConfigModule } from '@nestjs/config';
import { config } from '../../../config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'testdb',
      entities: ['dist/**/*.entity.js'],
      synchronize: false,
      migrations: ['dist/database/migrations/*.js'],
      cli: {
        migrationsDir: 'src/database/migrations',
      },
    }),
    UsersModule,
    AuthModule,
    ValidationModule,
  ],
})
export class AppModule {}
