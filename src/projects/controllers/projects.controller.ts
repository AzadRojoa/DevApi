import { Body, Controller, Get, Param, ParseUUIDPipe, Post, Request, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { JwtAuthGuard } from "../../auth/guards/jwt-auth.guard";
import { LocalAuthGuard } from "../../auth/guards/local-auth.guard";
import { AuthService } from "../../auth/services/auth.service";
import { ProjectDTO } from "../dto/project.dto";
import { ProjectsServices } from "../services/projects.services";


@Controller('projects')
export class ProjectsController {
  constructor(private projectsservices:ProjectsServices, private authService: AuthService){
  }

  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @Post()
  create(@Body() Projectbody: ProjectDTO, @Request() req){
    return this.projectsservices.createproject(req.user, Projectbody)
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getproject(@Param('id', new ParseUUIDPipe()) id:string,@Request() req ){
    return this.projectsservices.findOnebyid(id,req.user)
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getallproject(@Request() req ){
    return this.projectsservices.findall(req.user)
  }

  
}
