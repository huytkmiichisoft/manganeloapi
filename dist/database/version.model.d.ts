import * as mongoose from 'mongoose';
export declare enum VERSION_TYPE {
    ANDROID = "ANDROID",
    IOS = "IOS"
}
export declare const versionSchema: mongoose.Schema<any>;
export interface Version extends mongoose.Document {
    version_type?: string;
    name?: string;
    support?: boolean;
}
