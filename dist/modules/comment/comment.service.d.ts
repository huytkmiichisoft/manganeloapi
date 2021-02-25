import { Model } from 'mongoose';
import { Comment } from 'src/database/comment.model';
import { ChapterService } from '../chapter/chapter.service';
import { MangaService } from '../manga/manga.service';
export declare class CommentService {
    private commentModel;
    private mangaService;
    private chapterService;
    constructor(commentModel: Model<Comment>, mangaService: MangaService, chapterService: ChapterService);
    commentToManga(manga_id: string, user_id: string, message: string): Promise<Comment>;
    commentToChapter(chapter_id: string, user_id: string, message: string): Promise<Comment>;
    getListCommentInManga(manga_id: string, page: number, numberItem: number): Promise<Array<Comment>>;
    getListCommentInChapter(chapter_id: string, page: number, numberItem: number): Promise<Array<Comment>>;
    getDetialComment(comment_id: string): Promise<Comment>;
    replyComment(user_id: string, comment_id: string, message: string): Promise<Comment>;
}
