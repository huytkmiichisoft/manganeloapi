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
exports.VersionController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const api_result_1 = require("../../common/api-result");
const role_type_1 = require("../../common/constants/role-type");
const role_decorators_1 = require("../../common/decorators/role.decorators");
const roles_guard_1 = require("../../common/guards/roles.guard");
const version_dto_1 = require("./version.dto");
const version_service_1 = require("./version.service");
let VersionController = class VersionController {
    constructor(versionService) {
        this.versionService = versionService;
    }
    async createNewVersion(dataCreate) {
        const result = await this.versionService.createNewVersion(dataCreate.name, dataCreate.version_type, dataCreate.support);
        return (new api_result_1.ApiResult().success(result));
    }
    async getListVersion(dataGetList) {
        const listVersion = await this.versionService.getListVersion(dataGetList.version_type);
        return (new api_result_1.ApiResult().success(listVersion));
    }
    async checkUpdateVersion(data) {
        const statusUpdate = await this.versionService.checkUpdateVersion(data.name, data.version_type);
        return (new api_result_1.ApiResult().success(statusUpdate));
    }
};
__decorate([
    common_1.Post("create-new"),
    role_decorators_1.Roles(role_type_1.RoleType.MEMBER),
    swagger_1.ApiOperation({ summary: "Create New Version" }),
    swagger_1.ApiResponse({ status: 200, description: 'Create New Version Success Full.' }),
    common_1.UsePipes(new common_1.ValidationPipe()),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [version_dto_1.dtoCreateNewVersion]),
    __metadata("design:returntype", Promise)
], VersionController.prototype, "createNewVersion", null);
__decorate([
    common_1.Post("get-list"),
    role_decorators_1.Roles(role_type_1.RoleType.MEMBER),
    swagger_1.ApiOperation({ summary: "Get List Version" }),
    swagger_1.ApiResponse({ status: 200, description: 'Get List Version Success Full.' }),
    common_1.UsePipes(new common_1.ValidationPipe()),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [version_dto_1.dtoGetListVersion]),
    __metadata("design:returntype", Promise)
], VersionController.prototype, "getListVersion", null);
__decorate([
    common_1.Post("check-update"),
    role_decorators_1.Roles(role_type_1.RoleType.MEMBER),
    swagger_1.ApiOperation({ summary: "Check Update Version" }),
    swagger_1.ApiResponse({ status: 200, description: 'Check Update Version Success Full.' }),
    common_1.UsePipes(new common_1.ValidationPipe()),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [version_dto_1.dtoCheckUpdateVersion]),
    __metadata("design:returntype", Promise)
], VersionController.prototype, "checkUpdateVersion", null);
VersionController = __decorate([
    swagger_1.ApiHeader({
        name: 'token',
        description: 'Token Of User'
    }),
    swagger_1.ApiHeader({
        name: 'admin',
        description: 'admin key',
        example: "ADMIN"
    }),
    swagger_1.ApiTags("Version"),
    swagger_1.ApiConsumes("Version Api"),
    common_1.UseGuards(roles_guard_1.RolesGuard),
    common_1.Controller('version'),
    __metadata("design:paramtypes", [version_service_1.VersionService])
], VersionController);
exports.VersionController = VersionController;
//# sourceMappingURL=version.controller.js.map