import { Module } from '@nestjs/common';
import { UsersModule } from '../users/UsersModule';
import { AuthService } from './services/AuthService';
import { Login } from './routes/Login/Login';
import { JwtModule } from '@nestjs/jwt';
import { JWTStrategy } from './strategies/JWTStrategy';
import { Register } from './routes/Register/Register';

@Module({
  imports: [
    UsersModule,
    // todo: use db session for passport
    JwtModule.register({
      secret: 'secretKey', // todo
      signOptions: { expiresIn: '60s' }, // todo
    }),
  ],
  controllers: [Login, Register],
  providers: [AuthService, JWTStrategy],
})
export class AuthModule {}
