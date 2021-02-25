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
Object.defineProperty(exports, "__esModule", { value: true });
exports.dtoCheckUpdateVersion = exports.dtoGetListVersion = exports.dtoCreateNewVersion = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const version_model_1 = require("../../database/version.model");
class dtoCreateNewVersion {
    constructor() {
        this.version_type = version_model_1.VERSION_TYPE.ANDROID;
        this.support = true;
    }
}
__decorate([
    swagger_1.ApiProperty({ description: "Version Type", default: version_model_1.VERSION_TYPE.ANDROID }),
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    class_validator_1.IsEnum(version_model_1.VERSION_TYPE),
    __metadata("design:type", String)
], dtoCreateNewVersion.prototype, "version_type", void 0);
__decorate([
    swagger_1.ApiProperty({ description: "Name Of Version" }),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], dtoCreateNewVersion.prototype, "name", void 0);
__decorate([
    swagger_1.ApiProperty({ description: "support version", default: true }),
    class_validator_1.IsBoolean(),
    class_validator_1.IsOptional(),
    __metadata("design:type", Boolean)
], dtoCreateNewVersion.prototype, "support", void 0);
exports.dtoCreateNewVersion = dtoCreateNewVersion;
class dtoGetListVersion {
    constructor() {
        this.version_type = version_model_1.VERSION_TYPE.ANDROID;
    }
}
__decorate([
    swagger_1.ApiProperty({ description: "Version Type", default: version_model_1.VERSION_TYPE.ANDROID }),
    class_validator_1.IsString(),
    class_validator_1.IsEnum(version_model_1.VERSION_TYPE),
    __metadata("design:type", String)
], dtoGetListVersion.prototype, "version_type", void 0);
exports.dtoGetListVersion = dtoGetListVersion;
class dtoCheckUpdateVersion {
    constructor() {
        this.version_type = version_model_1.VERSION_TYPE.ANDROID;
    }
}
__decorate([
    swagger_1.ApiProperty({ description: "Version Type", default: version_model_1.VERSION_TYPE.ANDROID }),
    class_validator_1.IsString(),
    class_validator_1.IsEnum(version_model_1.VERSION_TYPE),
    __metadata("design:type", String)
], dtoCheckUpdateVersion.prototype, "version_type", void 0);
__decorate([
    swagger_1.ApiProperty({ description: "Name Version", default: "1.1" }),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], dtoCheckUpdateVersion.prototype, "name", void 0);
exports.dtoCheckUpdateVersion = dtoCheckUpdateVersion;
//# sourceMappingURL=version.dto.js.map