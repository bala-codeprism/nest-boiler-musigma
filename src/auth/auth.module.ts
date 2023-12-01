import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { LoggerModule } from 'src/shared/logger/logger.module';
import { PassportModule } from '@nestjs/passport';
import { JwtUserStrategy } from './passport/jwt.strategy';
import { AppConfigModule } from 'src/shared/config/config.module';
import { AppConfigService } from 'src/shared/config/config.service';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' }),
  JwtModule.registerAsync({
    imports: [AppConfigModule],
    useFactory: async (configService: AppConfigService) => ({
      secretOrPrivateKey: configService.secret,
      signOptions: {
        expiresIn: configService.jwtExpTime
      },
    }),
    inject: [AppConfigService],
  }),
    UserModule,
    LoggerModule,
    AppConfigModule
  ],
  providers: [AuthService, JwtUserStrategy],
  controllers: [AuthController],
  exports: [PassportModule]
})
export class AuthModule { }
