require("dotenv").config();
let mongoose = require("mongoose");
let {getListMangaData,getListChapterManga,listMangaNotUpdate} = require('./getmanga');
var Redis = require('ioredis');
const redis = require("redis");
const client = redis.createClient();
const chapterModel = require('./model/chapter');
const requestPromise = require('request-promise');
const cheerio = require('cheerio');
client.flushdb( function (err, succeeded) {
    console.log("Xóa Thành Công :" + succeeded); // will be true if successfull
});
let kue = require('kue');
let queue  = kue.createQueue({
    redis: {
        createClientFactory: function(){
            return new Redis();
        }
    },
});


mongoose.connect(`${process.env.MONGO_URL}`, {useNewUrlParser: true,useUnifiedTopology: true ,useCreateIndex: true,useFindAndModify:false},(error)=>{
    if(error){
        console.log(error);
        console.log('Thất Bại');
    }else {
        console.log('Kết Nối Thành Công');
    }
});

const getListChapter = async ()=>{
    return    chapterModel.find({images:{$size:0}})
}

const UpdateImages=async(url,id)=>{
    const options =  {
        url:url,
        headers:{
            "User-Agent":"Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.66 Safari/537.36"
        }
    }
    let result = await requestPromise(options);
    const $ = cheerio.load(result,{decodeEntities:false});
    let listImages=[];
    $(".container-chapter-reader>img").each(function(){
        listImages.push($(this).attr("src"));
    })
    console.log(listImages);
    await chapterModel.findByIdAndUpdate(id,{images:listImages})
}
getListChapter().then(data=>{
    data.forEach((item)=>{
        let job = queue.create("updatedetialmanga",{url:item.url,id:item._id}).attempts(3).save(function(error) {
            if (!error) console.log(job.id);
            else console.log(error);
        });
    })
    queue.process("updatedetialmanga",8, function(job,done){
        UpdateImages(job.data.url,job.data.id).then((number)=>{
            // console.log(job.data.url + " : " + number);
            done()
        }).catch(error=>{
            console.log(error);
        })
    })
})

//UpdateImages("https://manganelo.com/chapter/shiroi_heya_no_futari/chapter_15","60291abbe939254b3c00c6dd");