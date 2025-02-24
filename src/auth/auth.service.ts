/* eslint-disable prettier/prettier */
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TodoService } from 'src/todo/todo.service';
import * as bcrypt from 'bcrypt';
import { saltOrRounds } from 'src/constant/constant';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private todoService: TodoService,
    private jwtService: JwtService,
  ) {}
  async login(email: string, password: string, res: Response): Promise<any> {
    console.log('Login attempt for:', email); // Log the attempt

    const user = await this.todoService.findOneByEmail(email);
    console.log('User found:', user); // Log the user result

    if (!user) {
      console.log('User not found');
      throw new UnauthorizedException('User not found');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log('Password match:', isMatch); // Log the password match result

    if (!isMatch) {
      console.log('Invalid credentials');
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user._id, email: user.email };
    const token = await this.jwtService.signAsync(payload);
    console.log('JWT Token:', token); // Log the JWT token

    // Setting the cookie
    res.cookie('jwt', token, {
      httpOnly: true,
      secure: false, // Set to false for local development
      sameSite: 'strict',
    });

    console.log('Cookie set successfully');

    // Return the user details without password
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
