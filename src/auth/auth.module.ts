/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TodoModule } from 'src/todo/todo.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { jwtSecret } from 'src/constant/constant';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    TodoModule,
    ConfigModule.forRoot(),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
    }),
  ],
})
export class AuthModule {
  constructor() {
    console.log(process.env.JWT_SECRET);
  }
}
