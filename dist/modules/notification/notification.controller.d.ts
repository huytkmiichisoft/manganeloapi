import { ApiResult } from 'src/common/api-result';
import { dtoTestNotification, dtoTestNotificationUpdateManga } from './notification.dto';
import { NotificationService } from './notification.service';
export declare class NotificationController {
    private notificationService;
    constructor(notificationService: NotificationService);
    testNotification(data: dtoTestNotification): Promise<ApiResult<unknown>>;
    testNotificationUpdateChapterManga(data: dtoTestNotificationUpdateManga): Promise<ApiResult<unknown>>;
    notificationUpdateManga(data: dtoTestNotificationUpdateManga): Promise<ApiResult<unknown>>;
}
