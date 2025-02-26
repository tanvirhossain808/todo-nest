import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { User } from 'src/schemas/user.schemas';
import { Model } from 'mongoose';
export declare class AuthService {
    private userModel;
    private jwtService;
    constructor(userModel: Model<User>, jwtService: JwtService);
    login(email: string, password: string, res: Response): Promise<any>;
    signout(res: Response): Promise<any>;
    signup(email: string, password: string): Promise<any>;
}
