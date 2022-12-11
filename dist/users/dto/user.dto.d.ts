import { UserRole } from "../user.entity";
export declare class LoginUserDTO {
    email: string;
    password: string;
}
export declare class SignupUserDTO {
    username: string;
    email: string;
    password: string;
    role?: UserRole;
}
