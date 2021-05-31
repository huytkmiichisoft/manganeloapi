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
exports.ChapterController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const api_result_1 = require("../../common/api-result");
const chapter_dto_1 = require("./chapter.dto");
const chapter_service_1 = require("./chapter.service");
let ChapterController = class ChapterController {
    constructor(chapterService) {
        this.chapterService = chapterService;
    }
    async getListChapter(dataGet) {
        const [listChapter, totalChapter] = await Promise.all([
            this.chapterService.getListChapterManga(dataGet.manga_id, dataGet.page, dataGet.numberItem, dataGet.sort),
            this.chapterService.totalNumberChapter(dataGet.manga_id)
        ]);
        return (new api_result_1.ApiResult().success(listChapter, totalChapter));
    }
    async getDetialListChapter(dataGet) {
        const chapter = await this.chapterService.getDetialChapter(dataGet.id);
        return (new api_result_1.ApiResult().success(chapter));
    }
    async deleteContentChapter(dataGet) {
        const chapter = await this.chapterService.deleteContentChapter(dataGet.id);
        return (new api_result_1.ApiResult().success(chapter));
    }
    async deleteAllImagesChapter() {
        await this.chapterService.deleteAllImageChapter();
        return (new api_result_1.ApiResult().success());
    }
    async deleteChapterNotFound() {
        await this.chapterService.deleteChapterNotInManga();
        return 1;
    }
};
__decorate([
    common_1.Post("list-chapter"),
    swagger_1.ApiOperation({ summary: "Get List Chapter of Manga" }),
    swagger_1.ApiResponse({ status: 200, description: 'Get List Chapter Success Fully.' }),
    common_1.UsePipes(new common_1.ValidationPipe({ transform: true, whitelist: true })),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [chapter_dto_1.dtoGetListChapter]),
    __metadata("design:returntype", Promise)
], ChapterController.prototype, "getListChapter", null);
__decorate([
    common_1.Post("detial-chapter"),
    swagger_1.ApiOperation({ summary: "Get Detial Chapter" }),
    swagger_1.ApiResponse({ status: 200, description: 'Get Detial Chapter Success Fully.' }),
    common_1.UsePipes(new common_1.ValidationPipe()),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [chapter_dto_1.dtoGetDetialChapter]),
    __metadata("design:returntype", Promise)
], ChapterController.prototype, "getDetialListChapter", null);
__decorate([
    common_1.Post("delete-content-chapter"),
    swagger_1.ApiOperation({ summary: "Delete Content Text Chapter . For Admin User" }),
    swagger_1.ApiResponse({ status: 200, description: 'Get Detial Chapter Success Fully. ' }),
    common_1.UsePipes(new common_1.ValidationPipe()),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [chapter_dto_1.dtoDeleteContentChapter]),
    __metadata("design:returntype", Promise)
], ChapterController.prototype, "deleteContentChapter", null);
__decorate([
    common_1.Get("delete-all-image-chapter"),
    swagger_1.ApiOperation({ summary: "Delete All Image Chapter . For Admin User" }),
    swagger_1.ApiResponse({ status: 200, description: 'Delete All Image Chapter Success Fully. ' }),
    common_1.UsePipes(new common_1.ValidationPipe()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ChapterController.prototype, "deleteAllImagesChapter", null);
__decorate([
    common_1.Get("delete-chapter-not-found"),
    swagger_1.ApiOperation({ summary: "Delete Chapter Not Found" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ChapterController.prototype, "deleteChapterNotFound", null);
ChapterController = __decorate([
    swagger_1.ApiHeader({
        name: 'token',
        description: 'Token Of User'
    }),
    swagger_1.ApiHeader({
        name: 'admin',
        description: 'admin key',
        example: "ADMIN"
    }),
    swagger_1.ApiTags("chapter"),
    swagger_1.ApiConsumes("chapter Api"),
    common_1.Controller('chapter'),
    __metadata("design:paramtypes", [chapter_service_1.ChapterService])
], ChapterController);
exports.ChapterController = ChapterController;
//# sourceMappingURL=chapter.controller.js.map