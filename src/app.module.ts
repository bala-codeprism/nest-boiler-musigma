import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { APP_FILTER } from '@nestjs/core';
import { ExceptionsFilter } from './shared/exception/exception.filter';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { AppConfigModule } from './shared/config/config.module';

@Module({
  imports: [AuthModule, UserModule, AppConfigModule],
  providers:[
    {
      provide: APP_FILTER,
      useClass: ExceptionsFilter,
    },
  ]
})
export class AppModule {}
