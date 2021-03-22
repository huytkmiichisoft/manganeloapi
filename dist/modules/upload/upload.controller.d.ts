import { ApiResult } from 'src/common/api-result';
import { fileUploadCloudinary } from './upload.interface';
export declare class UploadController {
    uploadFile(file: fileUploadCloudinary): ApiResult<unknown>;
}
