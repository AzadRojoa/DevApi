import { Injectable } from '@nestjs/common';
import { UserServices } from '../../users/services/users.services';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../users/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserServices,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, pass: string): Promise<Omit<User, "password">> {
    const user = await this.usersService.findOne(email);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: User) {
    const payload = { 
      email: user.email, 
      id: user.id, 
      role: user.role, 
      username: user.username 
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
