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
exports.MangaController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const api_result_1 = require("../../common/api-result");
const role_type_1 = require("../../common/constants/role-type");
const role_decorators_1 = require("../../common/decorators/role.decorators");
const user_decorators_1 = require("../../common/decorators/user.decorators");
const roles_guard_1 = require("../../common/guards/roles.guard");
const user_model_1 = require("../../database/user.model");
const manga_dto_1 = require("./manga.dto");
const manga_service_1 = require("./manga.service");
let MangaController = class MangaController {
    constructor(mangaService) {
        this.mangaService = mangaService;
    }
    async getListManga(dataGet) {
        const listManga = await this.mangaService.getListManga(dataGet);
        return (new api_result_1.ApiResult().success(listManga));
    }
    async getDetialManga(dataGet) {
        const Manga = await this.mangaService.getDetialMangaById(dataGet.manga_id);
        return (new api_result_1.ApiResult().success(Manga));
    }
    async getListMangaByCategory(dataGet) {
        const listManga = await this.mangaService.getListMangaByCategory(dataGet);
        return (new api_result_1.ApiResult().success(listManga));
    }
    async searchManga(dataGet) {
        const listManga = await this.mangaService.SearchMangaByName(dataGet);
        return (new api_result_1.ApiResult().success(listManga));
    }
    async hiddenManga(dataHidden) {
        let resultGame = await this.mangaService.HiddenManga(dataHidden.manga_id);
        return (new api_result_1.ApiResult().success());
    }
    async addDevicesToManga(dataAdd) {
        await this.mangaService.addDevicesToManga(dataAdd.manga_id, dataAdd.device);
        return (new api_result_1.ApiResult().success());
    }
    async removeDevicesToManga(dataAdd) {
        await this.mangaService.removeDevicesToManga(dataAdd.manga_id, dataAdd.device);
        return (new api_result_1.ApiResult().success());
    }
    async userFollowManga(user, data) {
        await this.mangaService.addUserFollowManga(user._id, data.manga_id);
        return (new api_result_1.ApiResult().success());
    }
    async userUnFollowManga(user, data) {
        await this.mangaService.userUnFollowManga(data.manga_id, user._id);
        return (new api_result_1.ApiResult().success());
    }
    async suggestToManga(dataSuggest) {
        const listSuggest = await this.mangaService.listSuggestManga(dataSuggest.category, dataSuggest.page, dataSuggest.numberItem);
        return (new api_result_1.ApiResult().success(listSuggest));
    }
    async hiddenMangaTop() {
        await this.mangaService.hiddenListManga();
        return (new api_result_1.ApiResult().success());
    }
    async showAllManga() {
        await this.mangaService.showAllManga();
        return (new api_result_1.ApiResult().success());
    }
    async setMangaSlide() {
        let listImagesNot = [
            "https://res.cloudinary.com/truyenfull/image/upload/v1614219775/mangalenosilde/fc8ed6dfa5f256ac0fe3_opxe6s.jpg",
            "https://res.cloudinary.com/truyenfull/image/upload/v1614219775/mangalenosilde/2f9e81cff2e201bc58f3_ztowqy.jpg",
            "https://res.cloudinary.com/truyenfull/image/upload/v1614219775/mangalenosilde/acc929995ab4a9eaf0a5_tlpkyh.jpg",
            "https://res.cloudinary.com/truyenfull/image/upload/v1614219775/mangalenosilde/7e4b751b0636f568ac27_pzofrd.jpg",
            "https://res.cloudinary.com/truyenfull/image/upload/v1614219775/mangalenosilde/d772d322a00f53510a1e_e4inaa.jpg"
        ];
        let listImage = [
            "https://res.cloudinary.com/truyenfull/image/upload/v1614219904/mangalenosilde/slide/11b18501f92c0a72533d_m3pt2b.jpg",
            "https://res.cloudinary.com/truyenfull/image/upload/v1614219904/mangalenosilde/slide/9eec8b5cf771042f5d60_s2hmmj.jpg",
            "https://res.cloudinary.com/truyenfull/image/upload/v1614219904/mangalenosilde/slide/701449a43589c6d79f98_xm0wkx.jpg",
            "https://res.cloudinary.com/truyenfull/image/upload/v1614219904/mangalenosilde/slide/886514d468f99ba7c2e8_gegqmm.jpg",
            "https://res.cloudinary.com/truyenfull/image/upload/v1614219904/mangalenosilde/slide/0dd9a168dd452e1b7754_i0diqq.jpg"
        ];
        return (new api_result_1.ApiResult().success(listImagesNot));
    }
};
__decorate([
    common_1.Post("get-list"),
    swagger_1.ApiOperation({ summary: "Get List Of Manga" }),
    swagger_1.ApiResponse({ status: 200, description: 'Get List Chapter Success Fully.' }),
    common_1.UsePipes(new common_1.ValidationPipe({ transform: true })),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [manga_dto_1.dtoGetListManga]),
    __metadata("design:returntype", Promise)
], MangaController.prototype, "getListManga", null);
__decorate([
    common_1.Post("detial-manga"),
    swagger_1.ApiOperation({ summary: "Get Detial Manga Buy Id" }),
    swagger_1.ApiResponse({ status: 200, description: 'Hidden Manga Success Fully.' }),
    common_1.UsePipes(new common_1.ValidationPipe({ transform: true })),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [manga_dto_1.dtoGetDetialManga]),
    __metadata("design:returntype", Promise)
], MangaController.prototype, "getDetialManga", null);
__decorate([
    common_1.Post("get-list-category"),
    swagger_1.ApiOperation({ summary: "Get List Of Manga By Category" }),
    swagger_1.ApiResponse({ status: 200, description: 'Get List Chapter Success Fully.' }),
    common_1.UsePipes(new common_1.ValidationPipe({ transform: true })),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [manga_dto_1.dtoGetListMangaByCategory]),
    __metadata("design:returntype", Promise)
], MangaController.prototype, "getListMangaByCategory", null);
__decorate([
    common_1.Post("search-manga"),
    swagger_1.ApiOperation({ summary: "Search Manga By Name" }),
    swagger_1.ApiResponse({ status: 200, description: 'Get List Chapter Success Fully.' }),
    common_1.UsePipes(new common_1.ValidationPipe({ transform: true })),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [manga_dto_1.dtoSearchManga]),
    __metadata("design:returntype", Promise)
], MangaController.prototype, "searchManga", null);
__decorate([
    common_1.Post("hidden-manga"),
    swagger_1.ApiOperation({ summary: "Hidden Manga By Name" }),
    swagger_1.ApiResponse({ status: 200, description: 'Hidden Manga Success Fully.' }),
    common_1.UsePipes(new common_1.ValidationPipe({ transform: true })),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [manga_dto_1.dtoHiddenManga]),
    __metadata("design:returntype", Promise)
], MangaController.prototype, "hiddenManga", null);
__decorate([
    common_1.Post("follow-manga"),
    swagger_1.ApiOperation({ summary: "Add Devices When Follow Manga. User Not Login " }),
    swagger_1.ApiResponse({ status: 200, description: 'Add Device Success Fully.' }),
    common_1.UsePipes(new common_1.ValidationPipe({ transform: true })),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [manga_dto_1.dtoAddDeviceManga]),
    __metadata("design:returntype", Promise)
], MangaController.prototype, "addDevicesToManga", null);
__decorate([
    common_1.Post("un-follow-manga"),
    swagger_1.ApiOperation({ summary: "Remove Devices When UnFollow Manga " }),
    swagger_1.ApiResponse({ status: 200, description: 'Remove Device Success Fully.' }),
    common_1.UsePipes(new common_1.ValidationPipe({ transform: true })),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [manga_dto_1.dtoRemoveDeviceManga]),
    __metadata("design:returntype", Promise)
], MangaController.prototype, "removeDevicesToManga", null);
__decorate([
    common_1.Post("user-follow-manga"),
    swagger_1.ApiOperation({ summary: "User follow Manga. User Is Login " }),
    swagger_1.ApiResponse({ status: 200, description: 'User follow Manga Success Fully.' }),
    common_1.UsePipes(new common_1.ValidationPipe({ transform: true })),
    role_decorators_1.Roles(role_type_1.RoleType.USER),
    __param(0, user_decorators_1.UserInfo()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, manga_dto_1.dtoUserFollowManga]),
    __metadata("design:returntype", Promise)
], MangaController.prototype, "userFollowManga", null);
__decorate([
    common_1.Post("user-un-follow-manga"),
    swagger_1.ApiOperation({ summary: "User Un follow Manga. User Is Login " }),
    swagger_1.ApiResponse({ status: 200, description: 'User  Un follow Manga Success Fully.' }),
    common_1.UsePipes(new common_1.ValidationPipe({ transform: true })),
    role_decorators_1.Roles(role_type_1.RoleType.USER),
    __param(0, user_decorators_1.UserInfo()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, manga_dto_1.dtoUserUnFollowManga]),
    __metadata("design:returntype", Promise)
], MangaController.prototype, "userUnFollowManga", null);
__decorate([
    common_1.Post("suggest-manga"),
    swagger_1.ApiOperation({ summary: "List Suggest Manga" }),
    swagger_1.ApiResponse({ status: 200, description: 'List Suggest Manga Success Fully.' }),
    common_1.UsePipes(new common_1.ValidationPipe({ transform: true })),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [manga_dto_1.dtoSuggestManga]),
    __metadata("design:returntype", Promise)
], MangaController.prototype, "suggestToManga", null);
__decorate([
    common_1.Get("hidden-list-manga"),
    swagger_1.ApiOperation({ summary: "Hidden List Manga" }),
    swagger_1.ApiResponse({ status: 200, description: 'Hidden List Manga Success Fully.' }),
    common_1.UsePipes(new common_1.ValidationPipe({ transform: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MangaController.prototype, "hiddenMangaTop", null);
__decorate([
    common_1.Get("show-all-manga"),
    swagger_1.ApiOperation({ summary: "Show All List Manga" }),
    swagger_1.ApiResponse({ status: 200, description: 'Show All Manga Success Fully.' }),
    common_1.UsePipes(new common_1.ValidationPipe({ transform: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MangaController.prototype, "showAllManga", null);
__decorate([
    common_1.Get("manga-slide-show"),
    swagger_1.ApiOperation({ summary: "Show All List Manga" }),
    swagger_1.ApiResponse({ status: 200, description: 'Show All Manga Success Fully.' }),
    common_1.UsePipes(new common_1.ValidationPipe({ transform: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MangaController.prototype, "setMangaSlide", null);
MangaController = __decorate([
    swagger_1.ApiHeader({
        name: 'token',
        description: 'Token Of User'
    }),
    swagger_1.ApiHeader({
        name: 'admin',
        description: 'admin key',
        example: "ADMIN"
    }),
    swagger_1.ApiTags("manga"),
    swagger_1.ApiConsumes("Manga Api"),
    common_1.Controller('manga'),
    common_1.UseGuards(roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [manga_service_1.MangaService])
], MangaController);
exports.MangaController = MangaController;
//# sourceMappingURL=manga.controller.js.map