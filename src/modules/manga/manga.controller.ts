import { Body, Controller, Get, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiConsumes, ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiResult } from 'src/common/api-result';
import { RoleType } from 'src/common/constants/role-type';
import { Roles } from 'src/common/decorators/role.decorators';
import { UserInfo } from 'src/common/decorators/user.decorators';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { User } from 'src/database/user.model';
import { dtoAddDeviceManga, dtoGetDetialManga, dtoGetListManga, dtoGetListMangaByCategory, dtoHiddenManga, dtoRemoveDeviceManga, dtoSearchManga, dtoSuggestManga, dtoUserFollowManga, dtoUserUnFollowManga } from './manga.dto';
import { MangaService } from './manga.service';
@ApiHeader({
    name: 'token',
    description: 'Token Of User'
})
@ApiHeader({
    name: 'admin',
    description: 'admin key',
    example:"ADMIN"
})
@ApiTags("manga")
@ApiConsumes("Manga Api")
@Controller('manga')
@UseGuards(RolesGuard)
export class MangaController {
    constructor(
        private mangaService:MangaService
    ){}
    @Post("get-list")
    @ApiOperation({summary:"Get List Of Manga"})
    @ApiResponse({ status: 200, description: 'Get List Chapter Success Fully.'})
    @UsePipes(new ValidationPipe({transform:true}))
    async getListManga(@Body()dataGet:dtoGetListManga){
        const listManga = await this.mangaService.getListManga(dataGet);
        return (new ApiResult().success(listManga))
    }
    @Post("detial-manga")
    @ApiOperation({summary:"Get Detial Manga Buy Id"})
    @ApiResponse({ status: 200, description: 'Hidden Manga Success Fully.'})
    @UsePipes(new ValidationPipe({transform:true}))
    async getDetialManga(@Body()dataGet:dtoGetDetialManga){
        const Manga = await this.mangaService.getDetialMangaById(dataGet.manga_id);
        return (new ApiResult().success(Manga))
    }
    @Post("get-list-category")
    @ApiOperation({summary:"Get List Of Manga By Category"})
    @ApiResponse({ status: 200, description: 'Get List Chapter Success Fully.'})
    @UsePipes(new ValidationPipe({transform:true}))
    async getListMangaByCategory(@Body()dataGet:dtoGetListMangaByCategory){
        const listManga = await this.mangaService.getListMangaByCategory(dataGet);
        return (new ApiResult().success(listManga))
    }
    @Post("search-manga")
    @ApiOperation({summary:"Search Manga By Name"})
    @ApiResponse({ status: 200, description: 'Get List Chapter Success Fully.'})
    @UsePipes(new ValidationPipe({transform:true}))
    async searchManga(@Body()dataGet:dtoSearchManga){
        const listManga = await this.mangaService.SearchMangaByName(dataGet);
        return (new ApiResult().success(listManga))
    }
    @Post("hidden-manga")
    @ApiOperation({summary:"Hidden Manga By Name"})
    @ApiResponse({ status: 200, description: 'Hidden Manga Success Fully.'})
    @UsePipes(new ValidationPipe({transform:true}))
    async hiddenManga(@Body()dataHidden:dtoHiddenManga){
        let resultGame = await this.mangaService.HiddenManga(dataHidden.manga_id);
        return (new ApiResult().success())
    }
    @Post("follow-manga")
    @ApiOperation({summary:"Add Devices When Follow Manga. User Not Login "})
    @ApiResponse({ status: 200, description: 'Add Device Success Fully.'})
    @UsePipes(new ValidationPipe({transform:true}))
    async addDevicesToManga(@Body()dataAdd:dtoAddDeviceManga){
        await this.mangaService.addDevicesToManga(dataAdd.manga_id,dataAdd.device);
        return (new ApiResult().success())
    }
    @Post("un-follow-manga")
    @ApiOperation({summary:"Remove Devices When UnFollow Manga "})
    @ApiResponse({ status: 200, description: 'Remove Device Success Fully.'})
    @UsePipes(new ValidationPipe({transform:true}))
    async removeDevicesToManga(@Body()dataAdd:dtoRemoveDeviceManga){
        await this.mangaService.removeDevicesToManga(dataAdd.manga_id,dataAdd.device);
        return (new ApiResult().success())
    }
    @Post("user-follow-manga")
    @ApiOperation({summary:"User follow Manga. User Is Login "})
    @ApiResponse({ status: 200, description: 'User follow Manga Success Fully.'})
    @UsePipes(new ValidationPipe({transform:true}))
    @Roles(RoleType.USER)
    async userFollowManga(@UserInfo()user:User,@Body()data:dtoUserFollowManga){
        await this.mangaService.addUserFollowManga(user._id,data.manga_id);
        return (new ApiResult().success())
    }
    @Post("user-un-follow-manga")
    @ApiOperation({summary:"User Un follow Manga. User Is Login "})
    @ApiResponse({ status: 200, description: 'User  Un follow Manga Success Fully.'})
    @UsePipes(new ValidationPipe({transform:true}))
    @Roles(RoleType.USER)
    async userUnFollowManga(@UserInfo()user:User,@Body()data:dtoUserUnFollowManga){
        await this.mangaService.userUnFollowManga(data.manga_id,user._id);
        return (new ApiResult().success())
    }
    @Post("suggest-manga")
    @ApiOperation({summary:"List Suggest Manga"})
    @ApiResponse({ status: 200, description: 'List Suggest Manga Success Fully.'})
    @UsePipes(new ValidationPipe({transform:true}))
    async suggestToManga(@Body()dataSuggest:dtoSuggestManga){
        const listSuggest= await this.mangaService.listSuggestManga(dataSuggest.category,dataSuggest.page,dataSuggest.numberItem);
        return (new ApiResult().success(listSuggest))
    }
    @Get("hidden-list-manga")
    @ApiOperation({summary:"Hidden List Manga"})
    @ApiResponse({ status: 200, description: 'Hidden List Manga Success Fully.'})
    @UsePipes(new ValidationPipe({transform:true}))
    async hiddenMangaTop(){
        await this.mangaService.hiddenListManga();
        return (new ApiResult().success())
    }
    @Get("show-all-manga")
    @ApiOperation({summary:"Show All List Manga"})
    @ApiResponse({ status: 200, description: 'Show All Manga Success Fully.'})
    @UsePipes(new ValidationPipe({transform:true}))
    async showAllManga(){
        await this.mangaService.showAllManga();
        return (new ApiResult().success())
    }
    @Get("manga-slide-show")
    @ApiOperation({summary:"Show All List Manga"})
    @ApiResponse({ status: 200, description: 'Show All Manga Success Fully.'})
    @UsePipes(new ValidationPipe({transform:true}))
    async setMangaSlide (){
        let listImagesNot :Array<string>=[
            "https://res.cloudinary.com/truyenfull/image/upload/v1614219775/mangalenosilde/fc8ed6dfa5f256ac0fe3_opxe6s.jpg",
            "https://res.cloudinary.com/truyenfull/image/upload/v1614219775/mangalenosilde/2f9e81cff2e201bc58f3_ztowqy.jpg",
            "https://res.cloudinary.com/truyenfull/image/upload/v1614219775/mangalenosilde/acc929995ab4a9eaf0a5_tlpkyh.jpg",
            "https://res.cloudinary.com/truyenfull/image/upload/v1614219775/mangalenosilde/7e4b751b0636f568ac27_pzofrd.jpg",
            "https://res.cloudinary.com/truyenfull/image/upload/v1614219775/mangalenosilde/d772d322a00f53510a1e_e4inaa.jpg"
        ]
        let listImage:string[] =[
            "https://res.cloudinary.com/truyenfull/image/upload/v1614219904/mangalenosilde/slide/11b18501f92c0a72533d_m3pt2b.jpg",
            "https://res.cloudinary.com/truyenfull/image/upload/v1614219904/mangalenosilde/slide/9eec8b5cf771042f5d60_s2hmmj.jpg",
            "https://res.cloudinary.com/truyenfull/image/upload/v1614219904/mangalenosilde/slide/701449a43589c6d79f98_xm0wkx.jpg",
            "https://res.cloudinary.com/truyenfull/image/upload/v1614219904/mangalenosilde/slide/886514d468f99ba7c2e8_gegqmm.jpg",
            "https://res.cloudinary.com/truyenfull/image/upload/v1614219904/mangalenosilde/slide/0dd9a168dd452e1b7754_i0diqq.jpg"
        ]
        return (new ApiResult().success(listImagesNot))
    }
}
