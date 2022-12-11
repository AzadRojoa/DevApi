import { Repository } from "typeorm";
import { UserServices } from "../../users/services/users.services";
import { PasswordLessUser } from "../../users/user.entity";
import { ProjectDTO } from "../dto/project.dto";
import { Project } from "../project.entity";
export declare class ProjectsServices {
    private projectRepository;
    private userservices;
    constructor(projectRepository: Repository<Project>, userservices: UserServices);
    createproject(user: PasswordLessUser, Projectbody: ProjectDTO): Promise<Project>;
    findOnebyid(id: string, user: PasswordLessUser): void;
    findall(user: PasswordLessUser): Promise<Project[]>;
}
