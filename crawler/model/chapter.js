let mongoose = require("mongoose");
let Schema = mongoose.Schema ;
let chapter = new Schema({
    manga:{
        type:Schema.Types.ObjectId ,
        ref:"manga"
    },
    index:Number,
    name:{
        type:String
    },
    url:{
        type:String
    },
    images:[
        {
            type:String
        }
    ]
},{timestamps:true})
module.exports = mongoose.model('chapter',chapter);
