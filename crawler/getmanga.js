const request = require("request-promise");
let cheerio = require("cheerio");
let mangaDb = require('./model/manga');
let chapterDb = require('./model/chapter');
let {TYPE_STATUS_MANGA} = require('./constant');
const getListMangaData=async(page)=>{
    let url ='https://manganato.com/genre-all/'+page
    if(page==1){
        url ="https://manganato.com/genre-all"
    }
    url +='?type=topview';
    let data=  await request({
        uri:url
    })
    const $ = cheerio.load(data);
    const listManga = $(".content-genres-item");
    let promiseManga = [];
    listManga.each(function(i,element){
        let elementManga = $(this).children("a:nth-child(1)").attr("href")
        let views = $(this).find(".genres-item-view").text().replace(/,/g,"");
         promiseManga.push(mangaDb.create({url:elementManga,views:views}));
    })
    let result = await Promise.all(promiseManga);
    return result.length ;

}
 const getListChapterManga=async (manga_id,url)=>{
    let data = await request({
        uri:url
    });
    //console.log(data);
    const $ = cheerio.load(data);
    let nameManga = $("body > div.body-site > div.container.container-main > div.container-main-left > div.panel-story-info > div.story-info-right > h1").text();
    let imageManga=$("body > div.body-site > div.container.container-main > div.container-main-left > div.panel-story-info > div.story-info-left > span.info-image > img").attr("src");
    let description = $("#panel-story-info-description").children().remove().end().text().trim().replace(/\n/g, "");
    let status , genres=[], authors,listChapter=[];
    
    const listInfo = $(".variations-tableInfo >tbody>tr");
    listInfo.each(function(){
        if($(this).find("td:nth-child(1)").text().replace(":","").trim()=="Status"){
            status=$(this).find("td:nth-child(2)").text();
        }
        if($(this).find("td:nth-child(1)").text().replace(":","").trim()=="Author(s)"){
            authors=$(this).find("td:nth-child(2)").text();
        }
        if($(this).find("td:nth-child(1)").text().replace(":","").trim()=="Genres"){
          $(this).find("td:nth-child(2)> .a-h").each(function(){
                genres.push($(this).text());
          });
        }
    })
    $(".row-content-chapter >li.a-h >a").each(function(){
        listChapter.push({
            url:$(this).attr("href"),
            name:$(this).text()
        });
    })
    status = status=="Ongoing"?TYPE_STATUS_MANGA.ON_GOING:TYPE_STATUS_MANGA.COMPLETE ;
    listChapter = listChapter.reverse().map((item,index)=>{
        item.index=index+1 ;
        return item ;
    })
    const listIdChapter = await createNewChapterManga(manga_id,listChapter);
    await updateMangaInfo(manga_id,nameManga,imageManga,description,status,genres,authors,listIdChapter);
    return listIdChapter.length ;

}
const createNewChapterManga=async (manga_id,listChapter)=>{
    const listPromise = listChapter.map((item)=>{
        return chapterDb.create({
            name:item.name,
            url:item.url,
            index:item.index,
            manga:manga_id
        })
    })
    let resultChapter = await Promise.all(listPromise);
    return resultChapter.map((item)=>item._id);
}
const updateMangaInfo =(manga_id,nameManga,imageManga,description,status,genres,authors,listChapter)=>{
    return mangaDb.findByIdAndUpdate(manga_id,{
        name:nameManga,
        image:imageManga,
        description:description,
        category:genres,
        status:status,
        author:authors,
        chapters:listChapter,
        first_chapter:listChapter[0],
        last_chapter:listChapter[listChapter.length-1],
        chapter_update:Date.now()
    })
}
const listMangaNotUpdate=()=>{
    return mangaDb.find({
        $or:[
            {
                description:{ $exists: false }
            },
            {
                chapters:{$size:0}
            }
        ]
        
    }).limit(10000);

}
module.exports= {
    getListMangaData,
    getListChapterManga,
    listMangaNotUpdate
};