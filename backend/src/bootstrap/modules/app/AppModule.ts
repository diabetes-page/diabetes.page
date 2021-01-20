import { Module } from '@nestjs/common';
import { AppointmentsModule } from '../../../domains/appointments/AppointmentsModule';
import { AuthModule } from '../../../domains/auth/AuthModule';
import { UsersModule } from '../../../domains/users/UsersModule';
import { ConfigModule } from '../config/ConfigModule';
import { TypeOrmModule } from '../typeOrm/TypeOrmModule';
import { ValidationModule } from '../validation/ValidationModule';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule,
    ValidationModule,
    UsersModule,
    AuthModule,
    AppointmentsModule,
  ],
})
export class AppModule {}
