"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectUserModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const auth_module_1 = require("../auth/auth.module");
const project_module_1 = require("../projects/project.module");
const user_module_1 = require("../users/user.module");
const project_users_controller_1 = require("./controllers/project-users.controller");
const project_user_entity_1 = require("./project-user.entity");
const projects_users_services_1 = require("./services/projects-users.services");
let ProjectUserModule = class ProjectUserModule {
};
ProjectUserModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([project_user_entity_1.ProjectUser]), (0, common_1.forwardRef)(() => user_module_1.UserModule), (0, common_1.forwardRef)(() => project_module_1.ProjectModule), (0, common_1.forwardRef)(() => auth_module_1.AuthModule)],
        providers: [projects_users_services_1.ProjectsUserServices],
        controllers: [project_users_controller_1.ProjectsUserController],
        exports: [projects_users_services_1.ProjectsUserServices]
    })
], ProjectUserModule);
exports.ProjectUserModule = ProjectUserModule;
//# sourceMappingURL=project-users.module.js.map