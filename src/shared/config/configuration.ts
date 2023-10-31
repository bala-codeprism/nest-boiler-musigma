import { registerAs } from '@nestjs/config';
export default registerAs('app', () => ({
  env: process.env.APP_ENV,
  name: process.env.APP_NAME,
  port: process.env.APP_PORT,
  secret: process.env.JWT_SECRET,
  jwtExpTime: process.env.JWT_EXP_TIME,
  refreshSecret: process.env.JWT_REFRESH_SECRET,
  jwtRefreshExpTime: process.env.JWT_REFRESH_EXP_TIME,
}));