/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { saltOrRounds } from 'src/constant/constant';
import { Response } from 'express';
import { User } from 'src/schemas/user.schemas';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}
  async login(email: string, password: string, res: Response): Promise<any> {
    console.log('Login attempt for:', email);
    console.log(res.cookie('ky', 'value'));
    const user = await this.userModel.findOne({ email: email });
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
  async signout(res: Response): Promise<any> {
    res.clearCookie('jwt', {
      httpOnly: false,
      secure: false,
      // (use https)
      sameSite: 'strict',
    });

    console.log('Cookie set successfully');

    return { message: 'Sign out successfully' };
  }
  async signup(email: string, password: string): Promise<any> {
    const user = await this.userModel.findOne({ email: email });
    if (user) throw new UnauthorizedException('User Already Registered');
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);
    const newUser = new this.userModel({ email, password: hashedPassword });
    newUser.save();

    return { user: { email: newUser.email } };
  }
}
