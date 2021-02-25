import * as mongoose from 'mongoose';
export declare enum TYPE_STATUS_MANGA {
    ON_GOING = 0,
    COMPLETE = 1
}
export declare const mangaSchema: mongoose.Schema;
export interface Manga extends mongoose.Document {
    name?: string;
    author?: string;
    image?: string;
    views?: number;
    url?: string;
    manga_status?: number;
    enable?: boolean;
    description?: string;
    category?: Array<string>;
    chapters?: Array<string>;
    chapter_update?: Date;
    chapter_update_count?: number;
    source?: string;
    commentCount?: number;
    first_chapter?: string;
    devices?: Array<string>;
    user_follow?: Array<string>;
}
