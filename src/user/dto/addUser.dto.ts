import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AddUserDto {
    
    @ApiProperty({
        type: "string",
        required: true,
        description: 'The name of the user',
        examples: { name: "John Player" }
    })
    @IsNotEmpty()
    @IsString()
    readonly name: string

    @ApiProperty({
        required: true,
        type: "string",
        description: 'Email of the user',
        examples: { email: "johnplayer@gmail.com" }
    })
    @IsNotEmpty()
    @IsEmail()
    readonly email: string

}