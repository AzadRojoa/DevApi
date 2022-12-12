import { ForbiddenException, forwardRef, Inject, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { OffsetWithoutLimitNotSupportedError, Repository } from "typeorm";
import { ProjectsUserServices } from "../../project-users/services/projects-users.services";
import { UserServices } from "../../users/services/users.services";
import { PasswordLessUser, User, UserRole } from "../../users/user.entity";
import { ProjectDTO } from "../dto/project.dto";
import { Project } from "../project.entity";


@Injectable()
export class ProjectsServices{
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
    private userservices:UserServices,
    @Inject(forwardRef(() => ProjectsUserServices))
    private projectUserServices:ProjectsUserServices,
  ) {}

  async createproject(user: PasswordLessUser, Projectbody: ProjectDTO){
    if(user.role === "Admin" && ((await this.userservices.findOnebyid(Projectbody.referringEmployeeId)).role !== "Employee")){
      return this.projectRepository.save(this.projectRepository.create(Projectbody))
    }else{
      throw new UnauthorizedException()
    }
    
  }

  async findOnebyid(id: string, user: PasswordLessUser) {
    if (user.role === "Employee") {
      const projectuser = await this.projectUserServices.findOnebyProjectIdAndUserid(id,user.id)
      if (!projectuser){
        throw new ForbiddenException()
      }
    }
    const project = await this.projectRepository.findOneBy({ id: id })
    if (project) {
      return project
    }
    throw new NotFoundException() 
  }

  async findallprojects(user: PasswordLessUser){
    const a = await this.projectUserServices.getAll({
      where:{
        userId:user.id,
      },
      relations:{
        project: true,
      }
    })
    return a
  }
  async findall(user: PasswordLessUser){
    if(user.role === "Employee"){
      const a = await this.findallprojects(user)
      return a.map((e)=>e.project)
    }
    return this.projectRepository.find()
  }

  
 
}
