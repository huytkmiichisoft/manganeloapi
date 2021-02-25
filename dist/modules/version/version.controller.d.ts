import { ApiResult } from 'src/common/api-result';
import { dtoCheckUpdateVersion, dtoCreateNewVersion, dtoGetListVersion } from './version.dto';
import { VersionService } from './version.service';
export declare class VersionController {
    private versionService;
    constructor(versionService: VersionService);
    createNewVersion(dataCreate: dtoCreateNewVersion): Promise<ApiResult<unknown>>;
    getListVersion(dataGetList: dtoGetListVersion): Promise<ApiResult<unknown>>;
    checkUpdateVersion(data: dtoCheckUpdateVersion): Promise<ApiResult<unknown>>;
}
