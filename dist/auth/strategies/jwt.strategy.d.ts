import { User } from '../../users/user.entity';
import { Strategy } from 'passport-jwt';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    constructor();
    validate(payload: User): Promise<{
        id: string;
        email: string;
        username: string;
        role: import("../../users/user.entity").UserRole;
    }>;
}
export {};
