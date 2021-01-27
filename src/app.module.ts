import { Module } from '@nestjs/common';
import { CategoryModule } from './modules/category/category.module';
import { ChapterModule } from './modules/chapter/chapter.module';
import { CommentModule } from './modules/comment/comment.module';
import { CronjobModule } from './modules/cronjob/cronjob.module';
import { MangaModule } from './modules/manga/manga.module';
import { NotificationModule } from './modules/notification/notification.module';
import { ReportModule } from './modules/report/report.module';
import { UploadModule } from './modules/upload/upload.module';
import { UserModule } from './modules/user/user.module';
import { VersionModule } from './modules/version/version.module';
import { ShareModule } from './shared/shared.module';

@Module({
  imports: [
    ShareModule,
    MangaModule, 
    ChapterModule,
    CategoryModule,
    UserModule, 
    CommentModule, 
    UploadModule, 
    VersionModule, 
    CronjobModule, 
    NotificationModule, 
    ReportModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
