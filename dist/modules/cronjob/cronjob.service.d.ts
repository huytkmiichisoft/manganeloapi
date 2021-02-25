import { Model } from 'mongoose';
import { Chapter } from 'src/database/chapter.model';
import { Manga } from 'src/database/manga.model';
import { RequestService } from 'src/shared/services/request.service';
import { NotificationService } from '../notification/notification.service';
export declare class CronjobService {
    private readonly mangaModel;
    private readonly chapterModel;
    private requestService;
    private readonly notificationService;
    constructor(mangaModel: Model<Manga>, chapterModel: Model<Chapter>, requestService: RequestService, notificationService: NotificationService);
    private readonly URL_WEBSITE;
    handleCron(): Promise<void>;
    getListUrlNewsManga(): Promise<string[]>;
    getListMangaByUrl(listUrl: string[]): Promise<Manga[]>;
    updateMangaInfo(manga: Manga): Promise<void>;
    getListNewChapterByUrl(url: any): Promise<Array<{
        name?: string;
        url?: string;
        index?: number;
    }>>;
    private getListChapterInPageLink;
    private updateChapterOfManga;
}
