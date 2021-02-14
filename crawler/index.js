require("dotenv").config();
let mongoose = require("mongoose");
let {getListMangaData,getListChapterManga,listMangaNotUpdate} = require('./getmanga');
var Redis = require('ioredis');
const redis = require("redis");
const client = redis.createClient();

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
for (let i=1;i<=1201;i++){
    let job = queue.create("getlinkmanga",i).attempts(3).save(function(error) {
        if (!error) console.log(job.id);
        else console.log(error);
    });
}
queue.process("getlinkmanga",6,function(job,done){
    getListMangaData(job.data).then((data)=>{
        console.log(data);
        done()
    })
    .catch(error=>{
        console.log(error);
    })
})

//getListMangaData(2).catch(error=>console.log(error));
//getListChapterManga("600fe73f318eb464cc8d7587","https://manganelo.com/manga/tang_yin_zai_yi_jie");
// listMangaNotUpdate().then(data=>{
//     data.forEach((item)=>{
//         let job = queue.create("updatedetialmanga",{url:item.url,id:item._id}).attempts(3).save(function(error) {
//             if (!error) console.log(job.id);
//             else console.log(error);
//         });
//     })
//     queue.process("updatedetialmanga",8, function(job,done){
//         getListChapterManga(job.data.id,job.data.url).then((number)=>{
//             console.log(job.data.url + " : " + number);
//             done()
//         }).catch(error=>{
//             console.log(error);
//         })
//     })
// })

kue.app.listen(4000);