import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { UsersService } from '../../users/services/UsersService';
import { User } from '../../users/entities/User.entity';

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy, 'JWT') {
  constructor(private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'secretKey', // todo
    });
  }

  async validate(payload: Record<string, number>): Promise<User | undefined> {
    return this.usersService.get(payload.sub);
  }
}
