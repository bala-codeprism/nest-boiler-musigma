import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsNumber, IsString } from 'class-validator';

export class AddUserDto {
    
    @ApiProperty()
    @IsString()
    readonly name: string

    @ApiProperty()
    @IsEmail()
    readonly email: string

}