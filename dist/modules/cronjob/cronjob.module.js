"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CronjobModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const schedule_1 = require("@nestjs/schedule");
const chapter_model_1 = require("../../database/chapter.model");
const manga_model_1 = require("../../database/manga.model");
const notification_module_1 = require("../notification/notification.module");
const cronjob_service_1 = require("./cronjob.service");
let CronjobModule = class CronjobModule {
};
CronjobModule = __decorate([
    common_1.Module({
        imports: [
            schedule_1.ScheduleModule.forRoot(),
            mongoose_1.MongooseModule.forFeature([
                { name: "manga", schema: manga_model_1.mangaSchema },
                { name: "chapter", schema: chapter_model_1.chapterSchema }
            ]),
            notification_module_1.NotificationModule
        ],
        providers: [cronjob_service_1.CronjobService]
    })
], CronjobModule);
exports.CronjobModule = CronjobModule;
//# sourceMappingURL=cronjob.module.js.map