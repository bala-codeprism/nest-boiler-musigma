import * as Joi from 'joi';
import { Global, Module } from '@nestjs/common';
import configuration from './configuration';
import { AppConfigService } from './config.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: process.env.NODE_ENV === 'development' ? '.env.development' : '.env.production',
      load: [configuration],
      isGlobal: true,
      validationSchema: Joi.object({
        APP_NAME: Joi.string().default('React_Boilerplate'),
        APP_ENV: Joi.string()
          .valid('development', 'production', 'test').default("development"),
        // APP_URL: Joi.string().default('http://my-app.test'),
        APP_PORT: Joi.number().default(3000),
        JWT_SECRET: Joi.string(),
        JWT_EXP_TIME: Joi.number(),
      }),
    }),
  ],
  providers: [ConfigService, AppConfigService],
  exports: [ConfigService, AppConfigService],
})
export class AppConfigModule { }
