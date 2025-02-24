/* eslint-disable prettier/prettier */
import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/login')
  async login(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    const user = await this.authService.login(
      createUserDto.email,
      createUserDto.password,
      res,
    );
    return res.json(user);
  }

  @Post('/signup')
  async signup(@Body() userDto: CreateUserDto) {
    const newUser = await this.authService.signup(
      userDto.email,
      userDto.password,
    );
    return newUser;
  }
}
