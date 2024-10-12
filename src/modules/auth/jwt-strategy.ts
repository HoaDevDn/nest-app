import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { env } from 'configs/env.config';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: env.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    return { userId: payload.id, email: payload.email };
  }
}
