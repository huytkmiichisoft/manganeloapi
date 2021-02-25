import * as mongoose from 'mongoose';
import { Manga } from './manga.model';
export declare const chapterSchema: mongoose.Schema;
export interface Chapter extends mongoose.Document {
    manga: string | Manga;
    index?: number;
    source?: string;
    images?: string[];
    content?: string;
    name?: string;
    url?: string;
    before?: string;
    after?: string;
    commentCount?: number;
    status_update_images?: boolean;
}
