/* eslint-disable prettier/prettier */

import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(400)
  @MinLength(4)
  password: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
