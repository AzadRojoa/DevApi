import { ConflictException, Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { PasswordLessUser,} from "../../users/user.entity";
import { ProjectUserDTO } from "../dto/project-users.dto";
import { ProjectUser } from "../project-user.entity";



@Injectable()
export class ProjectsUserServices{
  constructor(
    @InjectRepository(ProjectUser)
    private projectRepository: Repository<ProjectUser>
  ) {}

  createProjectUser(user: PasswordLessUser, Projectbody: ProjectUserDTO){
    if(user.role === "Employee"){
      throw new UnauthorizedException()
    }
    const present = this.projectRepository.findBy({userId: user.id})
    if(!present){
      return this.projectRepository.save(this.projectRepository.create(Projectbody))
    }
    throw new ConflictException()
    
  }
    
  findOnebyid(id : string, user: PasswordLessUser){
    if(user.role === "Employee"){
      return this.projectRepository.findOneBy({id : id,userId : user.id})
    }
    return this.projectRepository.findOneBy({id : id})
  }

  findall(user: PasswordLessUser){
    if(user.role === "Employee"){
      return this.projectRepository.findBy({userId: user.id})
    }
    return this.projectRepository.find()
  }

  
 
}
