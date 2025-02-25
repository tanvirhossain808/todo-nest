/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Response } from 'express';
import { Public } from 'src/common/decorators/public.decorator';

@Public()
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  async login(
    @Body() createUserDto: CreateUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = await this.authService.login(
      createUserDto.email,
      createUserDto.password,
      res,
    );
    return user;
  }

  @Post('/signup')
  async signup(@Body() userDto: CreateUserDto) {
    const newUser = await this.authService.signup(
      userDto.email,
      userDto.password,
    );
    return newUser;
  }
  @Get('/signout')
  async signout(@Res({ passthrough: true }) res: Response) {
    const signout = await this.authService.signout(res);
    return signout;
  }
}
