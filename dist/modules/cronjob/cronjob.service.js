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
exports.CronjobService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const schedule_1 = require("@nestjs/schedule");
const mongoose_2 = require("mongoose");
const chapter_model_1 = require("../../database/chapter.model");
const manga_model_1 = require("../../database/manga.model");
const request_service_1 = require("../../shared/services/request.service");
const cheerio = require("cheerio");
const lodash_1 = require("lodash");
const notification_service_1 = require("../notification/notification.service");
let CronjobService = class CronjobService {
    constructor(mangaModel, chapterModel, requestService, notificationService) {
        this.mangaModel = mangaModel;
        this.chapterModel = chapterModel;
        this.requestService = requestService;
        this.notificationService = notificationService;
        this.URL_WEBSITE = "https://manganelo.com/";
    }
    async handleCron() {
        const listUrlNeedUpdate = await this.getListUrlNewsManga();
        console.log("LIST URL NEED UPDATE : " + listUrlNeedUpdate.length);
        const listMangaUpdate = await this.getListMangaByUrl(listUrlNeedUpdate);
        if (listMangaUpdate.length == 0) {
            return;
        }
        for (let i = 0; i < listMangaUpdate.length; i++) {
            await this.updateMangaInfo(listMangaUpdate[i]);
        }
    }
    async getListUrlNewsManga() {
        const resultFetch = await this.requestService.getMethod(this.URL_WEBSITE);
        const $ = cheerio.load(resultFetch);
        let listLink = [];
        $(".panel-content-homepage>.content-homepage-item>a").each(function () {
            listLink.push($(this).attr("href"));
        });
        return listLink;
    }
    async getListMangaByUrl(listUrl) {
        return this.mangaModel.find({
            url: { $in: listUrl }
        });
    }
    async updateMangaInfo(manga) {
        const listChapterDB = await this.chapterModel.find({ manga: manga._id }).sort({ index: -1 });
        const listArrayOnWeb = await this.getListNewChapterByUrl(manga.url);
        const listNotUpdate = lodash_1.xorBy(listArrayOnWeb, listChapterDB, 'url');
        if (listNotUpdate.length == 0) {
            return;
        }
        const ArrayPromiseInsertChapter = listNotUpdate.map((chapter) => {
            return this.chapterModel.create({
                manga: manga._id,
                url: chapter.url,
                index: chapter.index,
                name: chapter.name
            });
        });
        const resultInsertChapter = await Promise.all(ArrayPromiseInsertChapter);
        const listIdChapterInsert = resultInsertChapter.map(item => item._id);
        await this.updateChapterOfManga(manga._id, listIdChapterInsert);
        this.notificationService.sendNotificationTopicUpdateManga(manga._id);
        console.log("Update Success : " + listIdChapterInsert.length + "  Url : " + manga.url);
    }
    async getListNewChapterByUrl(url) {
        const resultFetch = await this.requestService.getMethod(url);
        const $ = cheerio.load(resultFetch);
        let Chapter = [];
        $(".row-content-chapter >li.a-h >a").each(function () {
            Chapter.push({
                url: $(this).attr("href"),
                name: $(this).text()
            });
        });
        Chapter = Chapter.reverse().map((item, index) => { item.index = index + 1; return item; });
        return Chapter;
    }
    async getListChapterInPageLink(url, page) {
        const urlPage = url + "trang-" + page;
        const data = await this.requestService.getMethod(urlPage, {
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.66 Safari/537.36"
            }
        });
        const $ = cheerio.load(data);
        const listChapter = $(".list-chapter>li>a");
        let Chapter = [];
        listChapter.each(function (index, element) {
            const nameChapter = $(this).text();
            const urlChapter = $(this).attr("href");
            Chapter.push({ name: nameChapter, url: urlChapter });
        });
        return Chapter;
    }
    async updateChapterOfManga(manga_id, listChapter) {
        return this.mangaModel.findByIdAndUpdate(manga_id, {
            $push: {
                chapters: { $each: listChapter }
            },
            chapter_update_count: listChapter.length,
            chapter_update: new Date()
        });
    }
};
__decorate([
    schedule_1.Cron(schedule_1.CronExpression.EVERY_2_HOURS),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CronjobService.prototype, "handleCron", null);
CronjobService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel("manga")),
    __param(1, mongoose_1.InjectModel("chapter")),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        request_service_1.RequestService,
        notification_service_1.NotificationService])
], CronjobService);
exports.CronjobService = CronjobService;
//# sourceMappingURL=cronjob.service.js.map