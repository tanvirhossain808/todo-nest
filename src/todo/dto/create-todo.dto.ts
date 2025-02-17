/* eslint-disable prettier/prettier */
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

/* eslint-disable prettier/prettier */
export class CreateTodoDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsBoolean()
  completed?: boolean;
}
