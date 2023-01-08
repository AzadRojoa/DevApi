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
import { ProjectDTO } from '../dto/project.dto';
import { Project } from '../project.entity';
import { ProjectsServices } from '../services/projects.services';

@Controller('projects')
export class ProjectsController {
  constructor(private projectsservices: ProjectsServices) {}

  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @Post()
  create(@Body() Projectbody: ProjectDTO, @Request() req): Promise<Project> {
    return this.projectsservices.createproject(req.user, Projectbody);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getproject(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Request() req,
  ): Promise<Project> {
    return this.projectsservices.findOnebyid(id, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getallproject(@Request() req): Promise<Project[]> {
    return this.projectsservices.findall(req.user);
  }
}
