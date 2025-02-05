import * as mongoose  from 'mongoose';
import { Manga } from './manga.model';
export const chapterSchema:mongoose.Schema = new mongoose.Schema({
    manga:{
        type:mongoose.Schema.Types.ObjectId ,
        ref:"manga"
    },
    index:{
        type:Number,
        default:1
    },
    name:{
        type:String
    },
    url:{
        type:String
    },
    content:{
        type:String
    },
    commentCount:{
        type:Number,
        default:0
    },
    before:{
        type:mongoose.Types.ObjectId,
        ref:"chapter"
    },
    after:{
        type:mongoose.Types.ObjectId,
        ref:"chapter"
    },
    images:[
        {
            type:String
        }
    ]
},{timestamps:true})
chapterSchema.index({source:1})
export interface Chapter extends mongoose.Document {
    manga:string|Manga,
    index?:number,
    source?:string,
    images?:string[],
    content?:string,
    name?:string,
    url?:string,
    before?:string,
    after?:string,
    commentCount?:number,
    status_update_images?:boolean
}