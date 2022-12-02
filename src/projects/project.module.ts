import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../users/user.module';
import { ProjectsController } from './controllers/projects.controller';
import { Project } from './project.entity';
import { ProjectsServices } from './services/projects.services';



@Module({
  imports: [TypeOrmModule.forFeature([Project]),forwardRef(()=> UserModule), forwardRef(()=> AuthModule)],
  providers: [ProjectsServices],
  controllers: [ProjectsController],
  exports:[ProjectsServices]
})
export class ProjectModule {}
