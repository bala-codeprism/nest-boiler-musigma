import { Module, forwardRef } from '@nestjs/common';
import { LoggerModule } from 'src/shared/logger/logger.module';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AuthModule } from 'src/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';


@Module({
    imports: [JwtModule,LoggerModule, forwardRef(() => AuthModule)],
    providers: [UserService],
    controllers:[UserController],
    exports: [UserService],
})
export class UserModule { }