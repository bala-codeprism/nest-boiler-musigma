import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { LoggerModule } from 'src/shared/logger/logger.module';
import { PassportModule } from '@nestjs/passport';
import { JwtUserStrategy } from './passport/jwt.strategy';
import { AppConfigModule } from 'src/shared/config/config.module';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' }),
  JwtModule.register({
    secretOrPrivateKey: process.env.JWT_SECRET,
    signOptions: {
      expiresIn: process.env.JWT_EXP_TIME,
    },
  }),
    UserModule,
    LoggerModule,
    AppConfigModule
  ],
  providers: [AuthService, JwtUserStrategy],
  controllers: [AuthController],
  exports:[PassportModule]
})
export class AuthModule { }
