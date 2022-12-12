import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Between, FindManyOptions, LessThanOrEqual, MoreThanOrEqual, Repository } from "typeorm";
import { ProjectsServices } from "../../projects/services/projects.services";
import { UserServices } from "../../users/services/users.services";
import { PasswordLessUser,} from "../../users/user.entity";
import { ProjectUserDTO } from "../dto/project-users.dto";
import { ProjectUser } from "../project-user.entity";



@Injectable()
export class ProjectsUserServices{
  constructor(
    @InjectRepository(ProjectUser)
    private projectUserRepository: Repository<ProjectUser>,
    private userService: UserServices,
    private projetService: ProjectsServices
  ) {}

  async createProjectUser(user: PasswordLessUser, Projectbody: ProjectUserDTO){
    if(user.role === "Employee"){
      throw new UnauthorizedException()
    }

    const presentProj = await this.projetService.findOnebyid(Projectbody.projectId, user)
    const presentUser = await this.userService.findOnebyid(Projectbody.userId)
    if(!presentProj || !presentUser){
      throw new NotFoundException();
    }

    const present = await this.projectUserRepository.find({
      where:[
        {
          userId : Projectbody.userId,
          startDate: Between(Projectbody.startDate,Projectbody.endDate),
        },
        {
          userId : Projectbody.userId,
          endDate: Between(Projectbody.startDate,Projectbody.endDate)
        },
        {
          userId : Projectbody.userId,
          startDate: LessThanOrEqual(Projectbody.startDate),
          endDate: MoreThanOrEqual(Projectbody.endDate)
        },
        ]
    })
    if(present.length !== 0){
      throw new ConflictException();
    }else{
      return this.projectUserRepository.save(this.projectUserRepository.create(Projectbody))
    }
  }

  findOnebyProjectIdAndUserid(id: string, userid: string ){
    return this.projectUserRepository.findOneBy({projectId:id,userId:userid})
  }

  findOnebyid(id : string, user: PasswordLessUser){
    if(user.role === "Employee"){
      return this.projectUserRepository.findOneBy({id : id,userId : user.id})
    }
    return this.projectUserRepository.findOneBy({id : id})
  }

  findall(user: PasswordLessUser){
    if(user.role === "Employee"){
      return this.projectUserRepository.findBy({userId: user.id})
    }
    return this.projectUserRepository.find()
  }

  getAll(options?: FindManyOptions<ProjectUser>) {
    return this.projectUserRepository.find(options)
  }
  
 
}
