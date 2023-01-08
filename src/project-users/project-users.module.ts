import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { ProjectModule } from '../projects/project.module';
import { UserModule } from '../users/user.module';
import { ProjectsUserController } from './controllers/project-users.controller';
import { ProjectUser } from './project-user.entity';
import { ProjectsUserServices } from './services/projects-users.services';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProjectUser]),
    forwardRef(() => UserModule),
    forwardRef(() => ProjectModule),
    forwardRef(() => AuthModule),
  ],
  providers: [ProjectsUserServices],
  controllers: [ProjectsUserController],
  exports: [ProjectsUserServices],
})
export class ProjectUserModule {}
