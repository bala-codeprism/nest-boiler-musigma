import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { APP_FILTER } from '@nestjs/core';
import { ExceptionsFilter } from './shared/exception/exception.filter';

@Module({
  imports: [AuthModule],
  providers:[
    {
      provide: APP_FILTER,
      useClass: ExceptionsFilter,
    },
  ]
})
export class AppModule {}
