import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { UserRole } from '../user.entity';

export class LoginUserDTO {
  @IsNotEmpty()
  email!: string;

  @IsNotEmpty()
  password!: string;
}

export class SignupUserDTO {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  username!: string;

  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @IsNotEmpty()
  @MinLength(8)
  password!: string;

  @IsOptional()
  role?: UserRole;
}
