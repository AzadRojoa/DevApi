import { Repository } from "typeorm";
import { PasswordLessUser } from "../../users/user.entity";
import { ProjectUserDTO } from "../dto/project-users.dto";
import { ProjectUser } from "../project-user.entity";
export declare class ProjectsUserServices {
    private projectUserRepository;
    constructor(projectUserRepository: Repository<ProjectUser>);
    createProjectUser(user: PasswordLessUser, Projectbody: ProjectUserDTO): Promise<void>;
}
