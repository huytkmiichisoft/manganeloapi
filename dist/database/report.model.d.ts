import * as mongoose from 'mongoose';
export declare enum REPORT_TYPE {
    REPORT_MANGA = "REPORT_MANGA"
}
export declare const reportSchema: mongoose.Schema<any>;
export interface Report extends mongoose.Document {
    user_id?: string;
    manga_id?: string;
    report_type?: string;
    reason?: string;
}
