import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserServices } from "../../users/services/users.services";
import { PasswordLessUser, User, UserRole } from "../../users/user.entity";
import { ProjectDTO } from "../dto/project.dto";
import { Project } from "../project.entity";


@Injectable()
export class ProjectsServices{
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,private userservices:UserServices
  ) {}

  async createproject(user: PasswordLessUser, Projectbody: ProjectDTO){
    if(user.role === "Admin" && ((await this.userservices.findOnebyid(Projectbody.referringEmployeeId)).role !== "Employee")){
      return this.projectRepository.save(this.projectRepository.create(Projectbody))
    }else{
      throw new UnauthorizedException()
    }
    
  }

  findOnebyid(id : string, user: PasswordLessUser){
    if(user.role === "Employee"){
      throw new UnauthorizedException()
    }
    const project = this.projectRepository.findOneBy({id : id})
    if (!project){
      
    }
  }
  findall(user: PasswordLessUser){
    if(user.role === "Employee"){
      throw new UnauthorizedException()
    }
    return this.projectRepository.find()
  }

  
 
}
