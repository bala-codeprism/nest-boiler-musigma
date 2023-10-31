import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
/**
 * Service dealing with app config based operations.
 *
 * @class
 */
@Injectable()
export class AppConfigService {
  constructor(private configService: ConfigService) {}
  
  get name(): string {
    return this.configService.get<string>('app.name');
  }
  get env(): string {
    return this.configService.get<string>('app.env');
  }
  get port(): number {
   return Number(this.configService.get<number>('app.port'));
  }
  get secret(): string {
    return this.configService.get<string>('app.secret');
  }
   get jwtExpTime(): number {
    return this.configService.get<number>('app.jwtExpTime');
  }
  get refreshSecret(): string {
    return this.configService.get<string>('app.refreshSecret');
  }
  get jwtRefreshExpTime(): string {
    return this.configService.get<string>('app.jwtRefreshExpTime');
  }
}