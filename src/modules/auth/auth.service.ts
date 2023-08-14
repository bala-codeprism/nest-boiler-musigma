import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  getLoginToken(): string {
    return 'Logged In with Token: XXXXXXXXXXXXXXX!';
  }
}
