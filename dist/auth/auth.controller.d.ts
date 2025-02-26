import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Response } from 'express';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(createUserDto: CreateUserDto, res: Response): Promise<any>;
    signup(userDto: CreateUserDto): Promise<any>;
    signout(res: Response): Promise<any>;
}
