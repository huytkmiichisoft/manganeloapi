import { ApiResult } from 'src/common/api-result';
import { User } from 'src/database/user.model';
import { dtoGetListReportManga, dtoReportManga } from './report.dto';
import { ReportService } from './report.service';
export declare class ReportController {
    private reportService;
    constructor(reportService: ReportService);
    createNewReportManga(dataReport: dtoReportManga, user: User): Promise<ApiResult<unknown>>;
    getListReportManga(dataReport: dtoGetListReportManga): Promise<ApiResult<unknown>>;
}
