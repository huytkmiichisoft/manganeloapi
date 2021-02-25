import { ConfigServer } from './config.service';
export declare class FcmPushService {
    private configServer;
    private fcm;
    constructor(configServer: ConfigServer);
    sendMessage(message: pushMessage): Promise<void>;
}
export interface pushMessage {
    to?: string;
    registration_ids?: string[];
    collapse_key?: string;
    notification: {
        title: string;
        body: string;
        image?: string;
    };
    data?: {
        [index: string]: any;
    };
    apns?: {
        fcm_options?: {
            image: string;
        };
    };
}
