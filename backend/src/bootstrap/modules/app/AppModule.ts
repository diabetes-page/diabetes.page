import { Module } from '@nestjs/common';
import { ValidationModule } from '../validation/ValidationModule';
import { UsersModule } from '../../../domains/users/UsersModule';
import { AuthModule } from '../../../domains/auth/AuthModule';
import { TypeOrmModule } from '../typeOrm/TypeOrmModule';
import { ConfigModule } from '../config/ConfigModule';
import { AppointmentsModule } from '../../../domains/appointments/AppointmentsModule';

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
