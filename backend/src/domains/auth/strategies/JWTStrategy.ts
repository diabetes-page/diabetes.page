import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from '../../users/entities/User.entity';
import { UsersService } from '../../users/services/UsersService';

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

  async validate(payload: Record<string, number>): Promise<User | undefined> {
    return this.usersService.get(payload.sub);
  }
}
