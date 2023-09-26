import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { Logger } from 'src/shared/logger/logger.service';
import { UserInfoDto } from '../user/dto/userInfo.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService,
    private readonly logger: Logger){}
  getLoginToken(): string {
    return 'Logged In with Token: XXXXXXXXXXXXXXX!';
  }
  async validateUser(userInfo: UserInfoDto){
    try {
      return this.userService.findById(userInfo.id)
    } catch (error) {
      
    }
  }
}
