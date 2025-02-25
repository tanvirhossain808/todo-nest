/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TodoService } from '../../src/todo/todo.service';
import * as bcrypt from 'bcrypt';
import { saltOrRounds } from '../../src/constant/constant';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private todoService: TodoService,
    private jwtService: JwtService,
  ) {}
  async login(email: string, password: string, res: Response): Promise<any> {
    console.log('Login attempt for:', email);
    console.log(res.cookie('ky', 'value'));
    const user = await this.todoService.findOneByEmail(email);
    console.log('User found:', user);

    if (!user) {
      console.log('User not found');
      throw new UnauthorizedException('User not found');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log('Password match:', isMatch);

    if (!isMatch) {
      console.log('Invalid credentials');
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user._id, email: user.email };
    const token = await this.jwtService.signAsync(payload);
    console.log('JWT Token:', token);

    // Setting the cookie
    res.cookie('jwt', `Bearer ${token}`, {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
    });

    console.log('Cookie set successfully');

    return {
      user: {
        id: user._id,
        email: user.email,
      },
    };
  }
  async signup(email: string, password: string): Promise<any> {
    const user = await this.todoService.findOneByEmail(email);
    if (user) throw new UnauthorizedException('User Already Registered');
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);
    const newUser = await this.todoService.createUser(email, hashedPassword);
    return { user: newUser };
  }
}
