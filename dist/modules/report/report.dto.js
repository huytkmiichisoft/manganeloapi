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
exports.dtoGetListReportManga = exports.dtoReportManga = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class dtoReportManga {
}
__decorate([
    swagger_1.ApiProperty({ description: "manga id" }),
    class_validator_1.IsMongoId(),
    __metadata("design:type", String)
], dtoReportManga.prototype, "manga_id", void 0);
__decorate([
    swagger_1.ApiProperty({ description: "reason" }),
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], dtoReportManga.prototype, "reason", void 0);
exports.dtoReportManga = dtoReportManga;
class dtoGetListReportManga {
}
__decorate([
    swagger_1.ApiProperty({ description: "page number", default: 1 }),
    class_validator_1.IsNumber(),
    __metadata("design:type", Number)
], dtoGetListReportManga.prototype, "page", void 0);
__decorate([
    swagger_1.ApiProperty({ description: "reason", default: 10 }),
    class_validator_1.IsNumber(),
    class_validator_1.IsOptional(),
    __metadata("design:type", Number)
], dtoGetListReportManga.prototype, "numberItem", void 0);
exports.dtoGetListReportManga = dtoGetListReportManga;
//# sourceMappingURL=report.dto.js.map