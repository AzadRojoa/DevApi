import { AuthService } from "../../auth/services/auth.service";
import { ProjectUserDTO } from "../dto/project-users.dto";
import { ProjectsUserServices } from "../services/projects-users.services";
export declare class ProjectsUserController {
    private projectsuserservices;
    private authService;
    constructor(projectsuserservices: ProjectsUserServices, authService: AuthService);
    create(Projectbody: ProjectUserDTO, req: any): Promise<void>;
    getproject(id: string, req: any): any;
    getallproject(req: any): any;
}
