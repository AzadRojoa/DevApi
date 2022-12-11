import { UserServices } from '../services/users.services';
import { LoginUserDTO, SignupUserDTO } from '../dto/user.dto';
import { User } from '../user.entity';
import { AuthService } from '../../auth/services/auth.service';
export declare class UsersController {
    private userservices;
    private authService;
    constructor(userservices: UserServices, authService: AuthService);
    checklog(Userbody: LoginUserDTO, req: any): Promise<{
        access_token: string;
    }>;
    create(Userbody: SignupUserDTO): Promise<User>;
    getProfile(req: any): any;
    findOne(id: string): Promise<User>;
    findAll(): Promise<User[]>;
}
