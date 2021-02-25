import { ApiResult } from 'src/common/api-result';
import { dtoGetListChapter, dtoGetDetialChapter, dtoDeleteContentChapter } from './chapter.dto';
import { ChapterService } from './chapter.service';
export declare class ChapterController {
    private chapterService;
    constructor(chapterService: ChapterService);
    getListChapter(dataGet: dtoGetListChapter): Promise<ApiResult<unknown>>;
    getDetialListChapter(dataGet: dtoGetDetialChapter): Promise<ApiResult<unknown>>;
    deleteContentChapter(dataGet: dtoDeleteContentChapter): Promise<ApiResult<unknown>>;
    deleteAllImagesChapter(): Promise<ApiResult<unknown>>;
}
