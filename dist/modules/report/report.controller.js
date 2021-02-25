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
exports.ReportController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const api_result_1 = require("../../common/api-result");
const role_type_1 = require("../../common/constants/role-type");
const role_decorators_1 = require("../../common/decorators/role.decorators");
const user_decorators_1 = require("../../common/decorators/user.decorators");
const user_model_1 = require("../../database/user.model");
const report_dto_1 = require("./report.dto");
const report_service_1 = require("./report.service");
let ReportController = class ReportController {
    constructor(reportService) {
        this.reportService = reportService;
    }
    async createNewReportManga(dataReport, user) {
        const resultReport = await this.reportService.createNewMangaReport(dataReport.manga_id, dataReport.reason, user === null || user === void 0 ? void 0 : user._id);
        return (new api_result_1.ApiResult().success(resultReport));
    }
    async getListReportManga(dataReport) {
        const listReportManga = await this.reportService.getListMangaReport(dataReport.page, dataReport.numberItem);
        return (new api_result_1.ApiResult().success(listReportManga));
    }
};
__decorate([
    common_1.Post("report-manga"),
    swagger_1.ApiOperation({ summary: "Comment To Manga" }),
    swagger_1.ApiResponse({ status: 200, description: 'Comment Success Full.' }),
    role_decorators_1.Roles(role_type_1.RoleType.USER),
    common_1.UsePipes(new common_1.ValidationPipe()),
    __param(0, common_1.Body()), __param(1, user_decorators_1.UserInfo()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [report_dto_1.dtoReportManga, Object]),
    __metadata("design:returntype", Promise)
], ReportController.prototype, "createNewReportManga", null);
__decorate([
    common_1.Post("list-report-manga"),
    swagger_1.ApiOperation({ summary: "Get List Report Manga" }),
    swagger_1.ApiResponse({ status: 200, description: 'Get List Report Manga Success Full.' }),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [report_dto_1.dtoGetListReportManga]),
    __metadata("design:returntype", Promise)
], ReportController.prototype, "getListReportManga", null);
ReportController = __decorate([
    swagger_1.ApiHeader({
        name: 'token',
        description: 'Token Of User'
    }),
    swagger_1.ApiHeader({
        name: 'admin',
        description: 'admin key',
        example: "ADMIN"
    }),
    swagger_1.ApiTags("Report"),
    swagger_1.ApiConsumes("Report Api"),
    common_1.Controller('report'),
    __metadata("design:paramtypes", [report_service_1.ReportService])
], ReportController);
exports.ReportController = ReportController;
//# sourceMappingURL=report.controller.js.map