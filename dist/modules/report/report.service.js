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
exports.ReportService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const report_model_1 = require("../../database/report.model");
let ReportService = class ReportService {
    constructor(reportModel) {
        this.reportModel = reportModel;
    }
    async createNewMangaReport(manga_id, reason, user_id) {
        return this.reportModel.create({
            user_id: user_id,
            manga_id: manga_id,
            reason: reason
        });
    }
    async getListMangaReport(page, numberItem) {
        return this.reportModel.find({
            report_type: report_model_1.REPORT_TYPE.REPORT_MANGA
        }).populate({
            path: "manga_id",
            select: "_id image name",
            match: { enable: true }
        }).sort({ createdAt: -1 })
            .skip((page - 1) * numberItem)
            .limit(numberItem);
    }
};
ReportService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel("report")),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ReportService);
exports.ReportService = ReportService;
//# sourceMappingURL=report.service.js.map