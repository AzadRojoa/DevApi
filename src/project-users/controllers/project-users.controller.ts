import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Request,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { LocalAuthGuard } from '../../auth/guards/local-auth.guard';
import { AuthService } from '../../auth/services/auth.service';
import { ProjectUserDTO } from '../dto/project-users.dto';
import { ProjectUser } from '../project-user.entity';
import { ProjectsUserServices } from '../services/projects-users.services';

@Controller('project-users')
export class ProjectsUserController {
  constructor(
    private projectsuserservices: ProjectsUserServices,
    private authService: AuthService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @Post()
  create(
    @Body() Projectbody: ProjectUserDTO,
    @Request() req,
  ): Promise<ProjectUser> {
    return this.projectsuserservices.createProjectUser(req.user, Projectbody);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getproject(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Request() req,
  ): Promise<ProjectUser> {
    return this.projectsuserservices.findOnebyid(id, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getallproject(@Request() req): Promise<ProjectUser[]> {
    return this.projectsuserservices.findall(req.user);
  }
}
