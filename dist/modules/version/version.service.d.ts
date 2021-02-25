import { Model } from 'mongoose';
import { Version } from 'src/database/version.model';
export declare class VersionService {
    private readonly versionModel;
    constructor(versionModel: Model<Version>);
    createNewVersion(name: string, version_type: string, support: boolean): Promise<Version>;
    getListVersion(version_type: any): Promise<Version[]>;
    checkUpdateVersion(name: string, version_type: string): Promise<boolean>;
}
