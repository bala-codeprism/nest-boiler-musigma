import { Controller, Get, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiHeader, ApiResponse, ApiTags } from '@nestjs/swagger';
import GlobalStrings from 'src/shared/constants/globalStrings';
@ApiTags('user')
@ApiBearerAuth()
@ApiHeader({name: 'token', required: true})
@ApiResponse({
    status: HttpStatus.OK,
  description: GlobalStrings.successStatus},)
  @ApiResponse({status: HttpStatus.BAD_REQUEST, description: GlobalStrings.errorStatus})
  @ApiResponse({status:HttpStatus.INTERNAL_SERVER_ERROR, description:GlobalStrings.internalServerError})
  @ApiResponse({status: HttpStatus.FORBIDDEN, description: GlobalStrings.forbiddenContent})
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  getLoginToken(): string {
    return this.authService.getLoginToken();
  }
}
