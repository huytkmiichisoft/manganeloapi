"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const notification_type_1 = require("../../common/constants/notification.type");
const chapter_model_1 = require("../../database/chapter.model");
const manga_model_1 = require("../../database/manga.model");
const push_service_1 = require("../../shared/services/push.service");
let NotificationService = class NotificationService {
    constructor(fcmPushService, mangaModel, chapterModel) {
        this.fcmPushService = fcmPushService;
        this.mangaModel = mangaModel;
        this.chapterModel = chapterModel;
    }
    async testPushNotification(devices) {
        return this.fcmPushService.sendMessage({
            registration_ids: devices,
            notification: {
                title: "Hello",
                body: "22222",
                image: "https://static.8cache.com/cover/eJwFwcm2a0oAANAvsp6UrgzegOiFKH1MLEKOnkq09fV376Fh_luRKEHtrcbbR_KEIhl91-YzKx1KaJZJPg6JJK8ffWfJkkxN1obJ3zfv8c9HXza1cIPysk8N_1EYwcSvVpwGMFp7X2S09FZVsnwxl-ztGQ3eJwcDqGbtTDFTAfsYzZ78N3bWizo2gXlpbzkqzAMWn0eYoY-bnkkMVdTUwy1-WYmNJ0ki8A4mpRSamkwRyunvNAjHtYyhLVd7cMedb2mNQpfCVQeVzFuxPzmjE4VImdcFJva0ARElF-f4q1xWxH92_REKzg0ryAJqC04-JX1vOsD78bxV5As532uwZdPVDRKocSPRbpJ2ovxbWbIrm4HTgXXKTzHv7ohNJb2ef2XlnP2K1ijhcd7PHvsgnDQrh66a7H3rNHY60Rw88ZF4IRSK5oXqbMpi7RmiVVx26VbXEWCxR-hhM6Czb0U08Hxx_5ZUrQPWqjiwZSikWkrVsS37TqB7MRQ8IRPn74j0tzsGrpjo8BXbHshMipIN2hUXLDV6cwPX1h_mc7JoSc3Pw3wMD_HMZvFhecYJMXnClh00MgaWnJstEH6v8dRSwuzekmg_cei61p2rsXTuARBNwtmQzBkHQe61uolaw2WIPztsuTLKb6_YTvz_uPEs1QCW-wddONCp/dai-boss-tre-con-cuc-ky-yeu-vo.jpg"
            },
            apns: {
                fcm_options: {
                    image: "https://static.8cache.com/cover/eJwFwcm2a0oAANAvsp6UrgzegOiFKH1MLEKOnkq09fV376Fh_luRKEHtrcbbR_KEIhl91-YzKx1KaJZJPg6JJK8ffWfJkkxN1obJ3zfv8c9HXza1cIPysk8N_1EYwcSvVpwGMFp7X2S09FZVsnwxl-ztGQ3eJwcDqGbtTDFTAfsYzZ78N3bWizo2gXlpbzkqzAMWn0eYoY-bnkkMVdTUwy1-WYmNJ0ki8A4mpRSamkwRyunvNAjHtYyhLVd7cMedb2mNQpfCVQeVzFuxPzmjE4VImdcFJva0ARElF-f4q1xWxH92_REKzg0ryAJqC04-JX1vOsD78bxV5As532uwZdPVDRKocSPRbpJ2ovxbWbIrm4HTgXXKTzHv7ohNJb2ef2XlnP2K1ijhcd7PHvsgnDQrh66a7H3rNHY60Rw88ZF4IRSK5oXqbMpi7RmiVVx26VbXEWCxR-hhM6Czb0U08Hxx_5ZUrQPWqjiwZSikWkrVsS37TqB7MRQ8IRPn74j0tzsGrpjo8BXbHshMipIN2hUXLDV6cwPX1h_mc7JoSc3Pw3wMD_HMZvFhecYJMXnClh00MgaWnJstEH6v8dRSwuzekmg_cei61p2rsXTuARBNwtmQzBkHQe61uolaw2WIPztsuTLKb6_YTvz_uPEs1QCW-wddONCp/dai-boss-tre-con-cuc-ky-yeu-vo.jpg"
                }
            }
        });
    }
    async sendNotificationUpdateChapterManga(manga_id) {
        const mangaData = await this.mangaModel.findById(manga_id);
        if (!mangaData) {
            return;
        }
        if (mangaData.devices.length == 0) {
            return;
        }
        this.fcmPushService.sendMessage({
            registration_ids: mangaData.devices,
            notification: {
                title: "🚩New chapter 🚩",
                body: ` ${mangaData.name} have new chapter . Click to read now !!!`,
                image: mangaData.image
            },
            data: {
                type: notification_type_1.NOTIFiCATION_TYPE.MANGA_NEW_CHAPTER,
                id: manga_id
            },
            apns: {
                fcm_options: {
                    image: mangaData.image
                }
            }
        });
    }
    async sendNotificationTopicUpdateManga(manga_id) {
        const mangaData = await this.mangaModel.findById(manga_id).select("-devices");
        if (!mangaData) {
            return;
        }
        this.fcmPushService.sendMessage({
            to: "/topics/" + manga_id,
            notification: {
                title: "🚩New chapter ",
                body: `⏳ ${mangaData.name} have new chapter . Click to read now !!!`,
                image: mangaData.image
            },
            data: {
                type: notification_type_1.NOTIFiCATION_TYPE.MANGA_NEW_CHAPTER,
                data: mangaData
            },
            apns: {
                fcm_options: {
                    image: mangaData.image
                }
            }
        });
    }
};
NotificationService = __decorate([
    common_1.Injectable(),
    __param(1, mongoose_1.InjectModel("manga")),
    __param(2, mongoose_1.InjectModel("chapter")),
    __metadata("design:paramtypes", [push_service_1.FcmPushService,
        mongoose_2.Model,
        mongoose_2.Model])
], NotificationService);
exports.NotificationService = NotificationService;
//# sourceMappingURL=notification.service.js.map