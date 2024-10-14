import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  @ApiProperty({ example: 'john-doe@yopmail.com' })
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  @ApiProperty({ example: 'Admin123@' })
  password: string;

  @IsString()
  @ApiProperty({ example: 'John Doe' })
  name: string;
}
