import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsNumber, IsString } from 'class-validator';

export class UserInfoDto {
    
    @ApiProperty()
    @IsString()
    readonly id: number

    @ApiProperty()
    @IsString()
    readonly name: string

    @ApiProperty()
    @IsEmail()
    readonly email: string

}