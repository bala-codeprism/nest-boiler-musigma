import { Module } from '@nestjs/common';
import { LoggerModule } from 'src/shared/logger/logger.module';
import { UserService } from './user.service';
import { UserController } from './user.controller';


@Module({
    imports: [LoggerModule],
    providers: [UserService],
    controllers:[UserController],
    exports: [UserService],
})
export class UserModule { }