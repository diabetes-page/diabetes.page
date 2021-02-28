import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from '../../users/entities/User.entity';
import { UsersService } from '../../users/services/UsersService';
import { JWTPayload } from '../types/JWTPayload';

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy, 'JWT') {
  constructor(
    private usersService: UsersService,
    private configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('security.secretKey'),
    });
  }

  async validate(payload: JWTPayload): Promise<User | undefined> {
    // todo: make sure that this request gets rejected if the user is not found
    return this.usersService.get(payload.sub);
  }
}
