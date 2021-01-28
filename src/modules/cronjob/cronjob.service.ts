import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cron ,Timeout ,CronExpression} from '@nestjs/schedule';
import { Model } from 'mongoose';
import { Chapter } from 'src/database/chapter.model';
import { Manga } from 'src/database/manga.model';
import { RequestService } from 'src/shared/services/request.service';
import * as cheerio from 'cheerio';
import {xorBy} from 'lodash';
import { NotificationService } from '../notification/notification.service';
@Injectable()
export class CronjobService {
    constructor(
        @InjectModel("manga") private readonly mangaModel:Model<Manga>,
        @InjectModel("chapter") private readonly chapterModel:Model<Chapter>,
        private requestService:RequestService,
        private readonly notificationService:NotificationService
    ){}
    private readonly URL_WEBSITE="https://manganelo.com/"
    //@Timeout(1000)
    @Cron(CronExpression.EVERY_2_HOURS)
    async handleCron(){
       const listUrlNeedUpdate = await this.getListUrlNewsManga();
       console.log("LIST URL NEED UPDATE : " + listUrlNeedUpdate.length);
       const listMangaUpdate = await this.getListMangaByUrl(listUrlNeedUpdate);
       if(listMangaUpdate.length==0){
           return ;
       } 
       for(let i=0;i<listMangaUpdate.length;i++){
            await this.updateMangaInfo(listMangaUpdate[i]);
       }
    }
    async getListUrlNewsManga():Promise<string[]>{
        const resultFetch  = await this.requestService.getMethod(this.URL_WEBSITE);
        const $ = cheerio.load(resultFetch);
        let listLink:string[] = [];
        $(".panel-content-homepage>.content-homepage-item>a").each(function(){
            listLink.push($(this).attr("href"))
        })
        return listLink ;
    }
    async getListMangaByUrl(listUrl:string[]):Promise<Manga[]>{
        return this.mangaModel.find({
            url:{$in:listUrl}
        })
    }
    async updateMangaInfo(manga:Manga){
        const listChapterDB:Array<any> = await this.chapterModel.find({manga:manga._id}).sort({index:-1});
        const listArrayOnWeb = await this.getListNewChapterByUrl(manga.url);
        const listNotUpdate = xorBy(listArrayOnWeb,listChapterDB,'url');
        if(listNotUpdate.length==0){
            return ;
        }
        const ArrayPromiseInsertChapter = listNotUpdate.map((chapter)=>{
            return this.chapterModel.create({
                manga:manga._id,
                url:chapter.url,
                index:chapter.index,
                name:chapter.name
            })
        })
        const resultInsertChapter =await Promise.all(ArrayPromiseInsertChapter);
        const listIdChapterInsert:string[] = resultInsertChapter.map(item=>item._id);
        await this.updateChapterOfManga(manga._id,listIdChapterInsert);
        this.notificationService.sendNotificationUpdateChapterManga(manga._id);
        console.log("Update Success : " + listIdChapterInsert.length + "  Url : "+manga.url);
    }
    async getListNewChapterByUrl(url):Promise<Array<{name?:string,url?:string,index?:number}>>{
        const resultFetch = await this.requestService.getMethod(url);
        const $ = cheerio.load(resultFetch);
        let Chapter:Array<{name?:string,url?:string,index?:number}>=[];
        $(".row-content-chapter >li.a-h >a").each(function(){
            Chapter.push({
                url:$(this).attr("href"),
                name:$(this).text()
            });
        })
        Chapter = Chapter.reverse().map((item,index)=>{item.index=index+1;return item});
        return Chapter ;
    }
    private async getListChapterInPageLink(url:string,page:number):Promise<Array<{name?:string,url?:string,index?:number}>>{
        const urlPage:string = url +"trang-"+page ;
        const data = await this.requestService.getMethod(urlPage,{
            headers:{
                "User-Agent":"Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.66 Safari/537.36"
            }
        })
        const $  = cheerio.load(data);
        const listChapter = $(".list-chapter>li>a");
        let Chapter = [];
        listChapter.each(function(index,element){
            const nameChapter = $(this).text();
            const urlChapter = $(this).attr("href");
            Chapter.push({name:nameChapter,url:urlChapter});
        })
        return Chapter;
    }
    private async updateChapterOfManga(manga_id:string,listChapter:string[]){
        return this.mangaModel.findByIdAndUpdate(manga_id,{
            $push:{
                chapters:{$each:listChapter}
            },
            chapter_update_count:listChapter.length,
            chapter_update: new Date()
        })
    }
}
