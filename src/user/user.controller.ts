import { Body, Controller, Get, HttpStatus, Param, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { Logger } from 'src/shared/logger/logger.service';
import { AddUserDto } from './dto/addUser.dto';
import { ApiBearerAuth, ApiHeader, ApiResponse, ApiTags } from '@nestjs/swagger';
import GlobalStrings from 'src/shared/constants/globalStrings';
import { LocalAuthGuard } from 'src/auth/guards/auth.guard';

@ApiTags('user')
@ApiBearerAuth()
@ApiHeader({name: 'token', required: true})
@ApiResponse({
    status: HttpStatus.OK,
  description: GlobalStrings.successStatus},)
  @ApiResponse({status: HttpStatus.BAD_REQUEST, description: GlobalStrings.errorStatus})
  @ApiResponse({status:HttpStatus.INTERNAL_SERVER_ERROR, description:GlobalStrings.internalServerError})
  @ApiResponse({status: HttpStatus.FORBIDDEN, description: GlobalStrings.forbiddenContent})
@Controller('user')
// @UseGuards(JwtAuthGuard)
@UseGuards(LocalAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService,
    private readonly logger: Logger) {}

  @Get()
 async getAllUsers() {
   try {
    return await this.userService.findAllUser();
   } catch (error) {
    this.logger.error(error)
   }
  }
  @Get("/:id")
 async getUserById(@Param('id') id: number) {
   try {
    return await this.userService.findById(id);
   } catch (error) {
    this.logger.error(error)
   }
  }
  @Post("addUser")
 async addUser(@Body() userDto: AddUserDto) {
   try {
    return await this.userService.addUser(userDto);
   } catch (error) {
    this.logger.error(error)
   }
  }
}
