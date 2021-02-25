import { Model } from 'mongoose';
import { Chapter } from 'src/database/chapter.model';
import { Manga } from 'src/database/manga.model';
import { FcmPushService } from 'src/shared/services/push.service';
export declare class NotificationService {
    private readonly fcmPushService;
    private readonly mangaModel;
    private readonly chapterModel;
    constructor(fcmPushService: FcmPushService, mangaModel: Model<Manga>, chapterModel: Model<Chapter>);
    testPushNotification(devices: string[]): Promise<void>;
    sendNotificationUpdateChapterManga(manga_id: string): Promise<void>;
    sendNotificationTopicUpdateManga(manga_id: string): Promise<void>;
}
