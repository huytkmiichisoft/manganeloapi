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
exports.VersionService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const version_model_1 = require("../../database/version.model");
let VersionService = class VersionService {
    constructor(versionModel) {
        this.versionModel = versionModel;
    }
    async createNewVersion(name, version_type, support) {
        return this.versionModel.create({
            name: name,
            version_type: version_type,
            support: support
        });
    }
    async getListVersion(version_type) {
        return this.versionModel.find({
            version_type: version_type
        }).sort({ createdAt: -1 });
    }
    async checkUpdateVersion(name, version_type) {
        let updateStatus = true;
        let listVersion = await this.versionModel.find({ version_type: version_type });
        listVersion.forEach((version) => {
            if (version.name == name) {
                updateStatus = version.support;
            }
        });
        return updateStatus;
    }
};
VersionService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel("version")),
    __metadata("design:paramtypes", [mongoose_2.Model])
], VersionService);
exports.VersionService = VersionService;
//# sourceMappingURL=version.service.js.map