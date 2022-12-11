import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { AuthService } from '../auth/services/auth.service';
import { UsersController } from './controllers/users.controller';
import { UserServices } from './services/users.services';
import { User } from './user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    forwardRef(()=> AuthModule)
  ],
  providers: [UserServices],
  controllers: [UsersController],
  exports:[UserServices]
})
export class UserModule {}
