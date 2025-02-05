import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiConsumes, ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiResult } from 'src/common/api-result';
import { dtoGetListChapter ,dtoGetDetialChapter, dtoDeleteContentChapter } from './chapter.dto';
import { ChapterService } from './chapter.service';
@ApiHeader({
    name: 'token',
    description: 'Token Of User'
})
@ApiHeader({
    name: 'admin',
    description: 'admin key',
    example:"ADMIN"
})
@ApiTags("chapter")
@ApiConsumes("chapter Api")
@Controller('chapter')
export class ChapterController {
    constructor(private chapterService:ChapterService){}
    @Post("list-chapter")
    @ApiOperation({summary:"Get List Chapter of Manga"})
    @ApiResponse({ status: 200, description: 'Get List Chapter Success Fully.'})
    @UsePipes(new ValidationPipe({transform:true,whitelist:true}))
    async getListChapter(@Body()dataGet:dtoGetListChapter){
        const [listChapter,totalChapter] = await Promise.all([
            this.chapterService.getListChapterManga(dataGet.manga_id,dataGet.page,dataGet.numberItem,dataGet.sort),
            this.chapterService.totalNumberChapter(dataGet.manga_id)
        ])
        return (new ApiResult().success(listChapter,totalChapter))
    }
    @Post("detial-chapter")
    @ApiOperation({summary:"Get Detial Chapter"})
    @ApiResponse({ status: 200, description: 'Get Detial Chapter Success Fully.'})
    @UsePipes(new ValidationPipe())
    async getDetialListChapter(@Body()dataGet:dtoGetDetialChapter){
       const chapter = await this.chapterService.getDetialChapter(dataGet.id);
       return (new ApiResult().success(chapter))
    }
    @Post("delete-content-chapter")
    @ApiOperation({summary:"Delete Content Text Chapter . For Admin User"})
    @ApiResponse({ status: 200, description: 'Get Detial Chapter Success Fully. '})
    @UsePipes(new ValidationPipe())
    async deleteContentChapter(@Body()dataGet:dtoDeleteContentChapter){
       const chapter = await this.chapterService.deleteContentChapter(dataGet.id);
       return (new ApiResult().success(chapter))
    }
    @Get("delete-all-image-chapter")
    @ApiOperation({summary:"Delete All Image Chapter . For Admin User"})
    @ApiResponse({ status: 200, description: 'Delete All Image Chapter Success Fully. '})
    @UsePipes(new ValidationPipe())
    async deleteAllImagesChapter(){
        await this.chapterService.deleteAllImageChapter();
       return (new ApiResult().success())
    }
    @Get("delete-chapter-not-found")
    @ApiOperation({summary:"Delete Chapter Not Found"})
    async deleteChapterNotFound(){
        await this.chapterService.deleteChapterNotInManga();
        return 1 ;
    }
}
