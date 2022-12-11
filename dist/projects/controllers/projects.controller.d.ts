import { ProjectDTO } from "../dto/project.dto";
import { ProjectsServices } from "../services/projects.services";
export declare class ProjectsController {
    private projectsservices;
    constructor(projectsservices: ProjectsServices);
    create(Projectbody: ProjectDTO, req: any): Promise<import("../project.entity").Project>;
    getproject(id: string, req: any): void;
    getallproject(req: any): Promise<import("../project.entity").Project[]>;
}
