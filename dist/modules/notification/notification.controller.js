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
exports.NotificationController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const api_result_1 = require("../../common/api-result");
const roles_guard_1 = require("../../common/guards/roles.guard");
const notification_dto_1 = require("./notification.dto");
const notification_service_1 = require("./notification.service");
let NotificationController = class NotificationController {
    constructor(notificationService) {
        this.notificationService = notificationService;
    }
    async testNotification(data) {
        const result = await this.notificationService.testPushNotification([data.devices]);
        return (new api_result_1.ApiResult().success(result));
    }
    async testNotificationUpdateChapterManga(data) {
        const result = await this.notificationService.sendNotificationUpdateChapterManga(data.manga_id);
        return (new api_result_1.ApiResult().success(result));
    }
    async notificationUpdateManga(data) {
        const result = await this.notificationService.sendNotificationTopicUpdateManga(data.manga_id);
        return (new api_result_1.ApiResult().success(result));
    }
};
__decorate([
    common_1.Post("test-push-notification"),
    swagger_1.ApiOperation({ summary: "Test Notification" }),
    swagger_1.ApiResponse({ status: 200, description: 'Test Notification Success Fully.' }),
    common_1.UsePipes(new common_1.ValidationPipe({ transform: true })),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [notification_dto_1.dtoTestNotification]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "testNotification", null);
__decorate([
    common_1.Post("test-notification-manga"),
    swagger_1.ApiOperation({ summary: "Test Notification To update Manga" }),
    swagger_1.ApiResponse({ status: 200, description: 'Test Notification To update Manga Success Fully.' }),
    common_1.UsePipes(new common_1.ValidationPipe({ transform: true })),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [notification_dto_1.dtoTestNotificationUpdateManga]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "testNotificationUpdateChapterManga", null);
__decorate([
    common_1.Post("notification-manga-update"),
    swagger_1.ApiOperation({ summary: "Test Notification To update Manga" }),
    swagger_1.ApiResponse({ status: 200, description: 'Test Notification To update Manga Success Fully.' }),
    common_1.UsePipes(new common_1.ValidationPipe({ transform: true })),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [notification_dto_1.dtoTestNotificationUpdateManga]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "notificationUpdateManga", null);
NotificationController = __decorate([
    swagger_1.ApiHeader({
        name: 'token',
        description: 'Token Of User'
    }),
    swagger_1.ApiHeader({
        name: 'admin',
        description: 'admin key',
        example: "ADMIN"
    }),
    swagger_1.ApiTags("Notification"),
    swagger_1.ApiConsumes("Notification Api"),
    common_1.UseGuards(roles_guard_1.RolesGuard),
    common_1.Controller('notification'),
    __metadata("design:paramtypes", [notification_service_1.NotificationService])
], NotificationController);
exports.NotificationController = NotificationController;
//# sourceMappingURL=notification.controller.js.map