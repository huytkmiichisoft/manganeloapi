import { Injectable } from '@nestjs/common';
import * as fcmPush from 'fcm-push';
import { ConfigServer } from './config.service';
@Injectable()
export class FcmPushService{
    private fcm:any ;
    private fcmManga:any;
    constructor(private configServer:ConfigServer){
        console.log(configServer.push_key);
        this.fcm = new fcmPush(configServer.push_key);
        this.fcmManga = new fcmPush("AAAAnEm3VTo:APA91bH6QPTW739zHb8d-mtO7jFfhXWZa5GhdadH4TzAuHugNANyGEOHeBfiz_006BmYGNS2cuTRmlhjU6TEZEBmKqfi6JT0Oh3Or0Menw5OAM8IYNcOZqqDdYZcHhd_PGYes3yWykV-");
    }
    async sendMessage(message:pushMessage):Promise<void>{
        this.fcm.send(message,function(err, response){
            if (err) {
                console.log(err);
                console.log("Push Notification False");
            } else {
                console.log(response);
            }
        });
        this.fcmManga.send(message,function(err, response){
            if (err) {
                console.log(err);
                console.log("Push Notification False");
            } else {
                console.log(response);
            }
        });
    }
}
export interface pushMessage{
    to?:string,
    registration_ids?:string[],
    collapse_key?:string,
    notification:{title:string,body:string,image?:string},
    data?:{[index:string]:any},
    apns?:{
        fcm_options?:{image:string}
    }
}