import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { AppConfigService } from 'src/shared/config/config.service';
import * as jwksClient from 'jwks-rsa';

@Injectable()
export class JwtUserStrategy extends PassportStrategy(Strategy, 'jwt') {
  private readonly jwksClientInstance: jwksClient.JwksClient;

  constructor(
    private readonly authService: AuthService,
    private readonly config: AppConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKeyProvider: (request: any, jwtToken: string, done: (arg0: Error, arg1: string) => void) => {
        const token = jwtToken?.split('.');
        if (token && token.length === 3) {
          const encodedHeader = token[0];
          const decodedHeader = Buffer.from(encodedHeader, 'base64').toString('utf-8');
          const header = JSON.parse(decodedHeader);
          const kid = header?.kid;
          if (kid) {
            this.getPublicKey(kid)
              .then((publicKey) => done(null, publicKey))
              .catch((err) => done(err, ""));
          } else {
            done(new Error('Key ID (kid) not found in JWT header'), null);
          }
        } else {
          done(new Error('Invalid JWT format'), null);
        }
      },
    });

    this.jwksClientInstance = jwksClient({
      jwksUri: `https://login.microsoftonline.com/${config.msalTenantId}/discovery/keys?${config.msalAppId}`
    });
  }

  async validate(payload: any) {
    console.log("success")
    // const user = await this.authService.validateUser(verifiedToken);
    if (payload) {
      return payload;
    } else {
      throw new HttpException(
        {
          timestamp: new Date(),
          message: 'You are not an authorized user',
          code: HttpStatus.UNAUTHORIZED,
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  private getPublicKey(kid: string): Promise<string> {
    return new Promise((resolve, reject) => {
      this.jwksClientInstance.getSigningKey(kid, (err, key) => {
        if (err) {
          reject(err);
        } else {
          const signingKey = key.getPublicKey();
          resolve(signingKey);
        }
      });
    });
  }

  private verifyToken(token: any, publicKey: string): any {
    // Use a JWT library (e.g., jsonwebtoken) to verify the token with the public key
    // Example using jsonwebtoken
    // const verifiedToken = jwt.verify(token, publicKey, { algorithms: ['RS256'] });
    return "verifiedToken";
  }
}
