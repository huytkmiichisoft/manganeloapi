"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const usermiddleware_1 = require("./common/middleware/usermiddleware");
const validation_request_1 = require("./common/middleware/validation.request");
const category_module_1 = require("./modules/category/category.module");
const chapter_module_1 = require("./modules/chapter/chapter.module");
const comment_module_1 = require("./modules/comment/comment.module");
const cronjob_module_1 = require("./modules/cronjob/cronjob.module");
const manga_module_1 = require("./modules/manga/manga.module");
const notification_module_1 = require("./modules/notification/notification.module");
const report_module_1 = require("./modules/report/report.module");
const upload_module_1 = require("./modules/upload/upload.module");
const user_module_1 = require("./modules/user/user.module");
const version_module_1 = require("./modules/version/version.module");
const shared_module_1 = require("./shared/shared.module");
let AppModule = class AppModule {
    configure(consumer) {
        consumer
            .apply(usermiddleware_1.RequestCheckMiddleware, validation_request_1.ValidationRequestServer)
            .forRoutes('*');
    }
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            shared_module_1.ShareModule,
            manga_module_1.MangaModule,
            chapter_module_1.ChapterModule,
            category_module_1.CategoryModule,
            user_module_1.UserModule,
            comment_module_1.CommentModule,
            upload_module_1.UploadModule,
            version_module_1.VersionModule,
            cronjob_module_1.CronjobModule,
            notification_module_1.NotificationModule,
            report_module_1.ReportModule
        ],
        controllers: [],
        providers: [],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map