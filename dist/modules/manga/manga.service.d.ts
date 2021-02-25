import { Model } from 'mongoose';
import { Manga } from 'src/database/manga.model';
import { CacheService } from 'src/shared/services/cache/cache.service';
import { dtoGetListManga, dtoGetListMangaByCategory, dtoSearchManga } from './manga.dto';
export declare class MangaService {
    private mangaModel;
    private cacheService;
    constructor(mangaModel: Model<Manga>, cacheService: CacheService);
    getListManga(dataGet: dtoGetListManga): Promise<Manga[]>;
    getDetialMangaById(manga_id: string): Promise<Manga>;
    getListMangaByCategory(dataGet: dtoGetListMangaByCategory): Promise<Manga[]>;
    SearchMangaByName(dataSearch: dtoSearchManga): Promise<Manga[]>;
    HiddenManga(manga_id: string[]): Promise<any>;
    getListMangaByListUrl(list_url: string[]): Promise<Manga[]>;
    updateNewChapter(manga_id: string, chapter_id: string[]): Promise<Manga>;
    addDevicesToManga(manga_id: string, devices: string): Promise<void>;
    removeDevicesToManga(manga_id: string, devices: string): Promise<void>;
    IncreaseViewsManga(manga_id: string, view: number): Promise<void>;
    addCountComment(manga_id: string, numberComment?: number): Promise<void>;
    listSuggestManga(category: string[], page: number, numberItem: number): Promise<Manga[]>;
    addUserFollowManga(user_id: string, manga_id: string): Promise<Manga>;
    userUnFollowManga(manga_id: string, user_id: string): Promise<Manga>;
    hiddenListManga(): Promise<any>;
    showAllManga(): Promise<any>;
}
