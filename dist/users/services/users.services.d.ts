import { Repository } from 'typeorm';
import { SignupUserDTO } from "../dto/user.dto";
import { User } from "../user.entity";
export declare class UserServices {
    private userRepository;
    constructor(userRepository: Repository<User>);
    findOne(email: string): Promise<User>;
    findOnebyid(id: string): Promise<User>;
    findall(): Promise<User[]>;
    createuser(Userbody: SignupUserDTO): Promise<User>;
}
