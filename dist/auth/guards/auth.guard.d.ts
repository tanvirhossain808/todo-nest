import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schemas';
export declare class AuthGuard implements CanActivate {
    private jwtService;
    private reflector;
    private readonly userModel;
    constructor(jwtService: JwtService, reflector: Reflector, userModel: Model<User>);
    canActivate(context: ExecutionContext): Promise<boolean>;
    private extractTokenFromHeader;
}
