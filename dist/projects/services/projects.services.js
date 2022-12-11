"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectsServices = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const users_services_1 = require("../../users/services/users.services");
const project_entity_1 = require("../project.entity");
let ProjectsServices = class ProjectsServices {
    constructor(projectRepository, userservices) {
        this.projectRepository = projectRepository;
        this.userservices = userservices;
    }
    async createproject(user, Projectbody) {
        if (user.role === "Admin" && ((await this.userservices.findOnebyid(Projectbody.referringEmployeeId)).role !== "Employee")) {
            return this.projectRepository.save(this.projectRepository.create(Projectbody));
        }
        else {
            throw new common_1.UnauthorizedException();
        }
    }
    findOnebyid(id, user) {
        if (user.role === "Employee") {
            throw new common_1.UnauthorizedException();
        }
        const project = this.projectRepository.findOneBy({ id: id });
        if (!project) {
        }
    }
    findall(user) {
        if (user.role === "Employee") {
            throw new common_1.UnauthorizedException();
        }
        return this.projectRepository.find();
    }
};
ProjectsServices = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(project_entity_1.Project)),
    __metadata("design:paramtypes", [typeorm_2.Repository, users_services_1.UserServices])
], ProjectsServices);
exports.ProjectsServices = ProjectsServices;
//# sourceMappingURL=projects.services.js.map