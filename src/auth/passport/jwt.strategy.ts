import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { AppConfigService } from 'src/shared/config/config.service';

@Injectable()
export class JwtUserStrategy extends PassportStrategy(Strategy,"jwt") {
  constructor(private readonly authService: AuthService,
    private readonly config: AppConfigService,) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // passReqToCallback: false,
      ignoreExpiration: false,
      secretOrKey: config.secret,
    });
  }

  async validate(payload) {
    const user = await this.authService.validateUser(payload);
    if(user){
      return user
    } else {
      throw new HttpException(
        {
          timestamp: new Date(),
          message: "You are not a authorised user",
          code: HttpStatus.UNAUTHORIZED,
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}