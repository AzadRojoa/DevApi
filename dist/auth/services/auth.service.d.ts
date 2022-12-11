import { UserServices } from '../../users/services/users.services';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../users/user.entity';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UserServices, jwtService: JwtService);
    validateUser(email: string, pass: string): Promise<Omit<User, "password">>;
    login(user: User): Promise<{
        access_token: string;
    }>;
}
