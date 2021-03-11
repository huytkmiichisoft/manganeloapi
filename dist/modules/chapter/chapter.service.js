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
exports.ChapterService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const error_1 = require("../../common/constants/error");
const chapter_model_1 = require("../../database/chapter.model");
const cache_service_1 = require("../../shared/services/cache/cache.service");
const request_service_1 = require("../../shared/services/request.service");
const cheerio = require("cheerio");
const manga_service_1 = require("../manga/manga.service");
let ChapterService = class ChapterService {
    constructor(chapterModel, cacheService, requestService, mangaService) {
        this.chapterModel = chapterModel;
        this.cacheService = cacheService;
        this.requestService = requestService;
        this.mangaService = mangaService;
    }
    async getListChapterManga(manga_id, page, numberItem, sort) {
        const KEY_CACHE = "CACHE_LIST_CHAPTER_" + manga_id + "_" + page + "_" + numberItem + "_" + sort;
        let dataCache = await this.cacheService.get(KEY_CACHE);
        if (dataCache) {
            return dataCache;
        }
        dataCache = await this.chapterModel.find({
            manga: manga_id
        })
            .skip((page - 1) * numberItem)
            .limit(numberItem)
            .sort({ index: sort })
            .select("-images -url -updatedAt -source -manga -content");
        await this.cacheService.set(KEY_CACHE, dataCache, 1000 * 60 * 30);
        return dataCache;
    }
    async totalNumberChapter(manga_id) {
        const KEY_CACHE = "NUMBER_CHAPTER_" + manga_id;
        let resultCacheNumberChapter = await this.cacheService.get(KEY_CACHE);
        if (resultCacheNumberChapter) {
            return resultCacheNumberChapter;
        }
        resultCacheNumberChapter = await this.chapterModel.countDocuments({
            manga: manga_id
        });
        await this.cacheService.set(KEY_CACHE, resultCacheNumberChapter, 60 * 30);
        return resultCacheNumberChapter;
    }
    async getDetialChapter(chapter_id) {
        const KEY_CACHE = "CACHE_DETIAL_CHAPTER_" + chapter_id;
        let dataCache = await this.cacheService.get(KEY_CACHE);
        if (dataCache) {
            await this.IncrementToManga(dataCache.manga);
            return dataCache;
        }
        let chapter = await this.chapterModel.findById(chapter_id);
        if (!chapter) {
            throw new common_1.HttpException(error_1.ERROR_TYPE.CHAPTER_NOT_FOUND, common_1.HttpStatus.BAD_REQUEST);
        }
        if (chapter.images.length == 0) {
            const listImages = await this.getListImagesChapter(chapter.url);
            chapter.images = listImages;
            await chapter.save();
        }
        if (chapter.before == undefined && chapter.after == undefined) {
            const [beforeChapter, afterChapter] = await Promise.all([
                this.chapterModel.findOne({ manga: chapter.manga, index: chapter.index - 1 }),
                this.chapterModel.findOne({ manga: chapter.manga, index: chapter.index + 1 })
            ]);
            chapter.before = beforeChapter === null || beforeChapter === void 0 ? void 0 : beforeChapter._id;
            chapter.after = afterChapter === null || afterChapter === void 0 ? void 0 : afterChapter._id;
            await chapter.save();
        }
        await this.cacheService.set(KEY_CACHE, chapter, 60 * 30);
        await this.IncrementToManga(chapter.manga);
        return chapter;
    }
    async getListImagesChapter(url) {
        const data = await this.requestService.getMethod(url, {
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.66 Safari/537.36"
            }
        });
        const $ = cheerio.load(data, { decodeEntities: false });
        let listImages = [];
        $(".container-chapter-reader>img").each(function () {
            listImages.push($(this).attr("src"));
        });
        return listImages;
    }
    async getContentChapter(url) {
        const data = await this.requestService.getMethod(url, {
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.66 Safari/537.36"
            }
        });
        const $ = cheerio.load(data, { decodeEntities: false });
        const content = $("#chapter-c");
        content.children("div").remove();
        content.children("a").remove();
        let html = content.html();
        html = html.replace(/Nguồn/g, "");
        return html;
    }
    async IncrementToManga(manga_id) {
        const KEY_CACHE_VIEW_MANGA = "CACHE_VIEWS_MANGA" + manga_id;
        const dataKey = await this.cacheService.get(KEY_CACHE_VIEW_MANGA);
        if (!dataKey) {
            return this.cacheService.set(KEY_CACHE_VIEW_MANGA, 1);
        }
        let radomViewsAdd = Math.floor(Math.random() * (10 - 5)) + 5;
        if (dataKey >= radomViewsAdd) {
            await this.mangaService.IncreaseViewsManga(manga_id, radomViewsAdd);
            return await this.cacheService.set(KEY_CACHE_VIEW_MANGA, dataKey - radomViewsAdd + 1);
        }
        await this.cacheService.set(KEY_CACHE_VIEW_MANGA, dataKey + 1);
    }
    async deleteContentChapter(chapter_id) {
        return this.chapterModel.findByIdAndUpdate(chapter_id, { $unset: { content: "" } });
    }
    async addCommentCount(chapter_id, numberComment = 1) {
        return this.chapterModel.findByIdAndUpdate(chapter_id, { $inc: { commentCount: numberComment } });
    }
    async deleteAllImageChapter() {
        return this.chapterModel.updateMany({}, {
            images: []
        });
    }
};
ChapterService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel("chapter")),
    __metadata("design:paramtypes", [mongoose_2.Model,
        cache_service_1.CacheService,
        request_service_1.RequestService,
        manga_service_1.MangaService])
], ChapterService);
exports.ChapterService = ChapterService;
//# sourceMappingURL=chapter.service.js.map