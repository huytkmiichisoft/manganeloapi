export declare class dtoRegisterUser {
    email: string;
    password: string;
    name: string;
}
export declare class dtoLoginUser {
    email: string;
    password: string;
}
export declare class dtoDevicesUser {
    devices: string;
}
export declare class dtoRemoveDevicesUser {
    devices: string;
}
export declare class dtoUpdateUserInfo {
    name?: string;
    avatar?: string;
    phone?: string;
    gender?: number;
}
