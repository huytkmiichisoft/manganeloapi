import { Model } from 'mongoose';
import { Report } from 'src/database/report.model';
export declare class ReportService {
    private readonly reportModel;
    constructor(reportModel: Model<Report>);
    createNewMangaReport(manga_id: string, reason: string, user_id?: string): Promise<Report>;
    getListMangaReport(page: number, numberItem: number): Promise<Report[]>;
}
