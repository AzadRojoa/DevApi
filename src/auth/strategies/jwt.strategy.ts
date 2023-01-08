import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { User, UserRole } from '../../users/user.entity';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from '../constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: User): Promise<{
    id: string;
    email: string;
    username: string;
    role: UserRole;
  }> {
    return {
      id: payload.id,
      email: payload.email,
      username: payload.username,
      role: payload.role,
    };
  }
}
