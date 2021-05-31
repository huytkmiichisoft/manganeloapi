import { Model } from 'mongoose';
import { Chapter } from 'src/database/chapter.model';
import { CacheService } from 'src/shared/services/cache/cache.service';
import { RequestService } from 'src/shared/services/request.service';
import { MangaService } from '../manga/manga.service';
export declare class ChapterService {
    private chapterModel;
    private cacheService;
    private requestService;
    private mangaService;
    constructor(chapterModel: Model<Chapter>, cacheService: CacheService, requestService: RequestService, mangaService: MangaService);
    getListChapterManga(manga_id: string, page: number, numberItem: number, sort: number): Promise<Array<Chapter>>;
    totalNumberChapter(manga_id: string): Promise<number>;
    getDetialChapter(chapter_id: string): Promise<Chapter>;
    private getListImagesChapter;
    private getContentChapter;
    private IncrementToManga;
    deleteContentChapter(chapter_id: string): Promise<Chapter>;
    addCommentCount(chapter_id: string, numberComment?: number): Promise<any>;
    deleteAllImageChapter(): Promise<any>;
    deleteChapterNotInManga(): Promise<void>;
}
