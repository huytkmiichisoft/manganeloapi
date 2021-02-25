export declare class dtoGetListManga {
    page: number;
    numberItem: number;
    type: number;
}
export declare class dtoGetListMangaByCategory {
    page: number;
    numberItem: number;
    type: number;
    category: string;
}
export declare class dtoSearchManga {
    page: number;
    numberItem: number;
    name: string;
}
export declare class dtoHiddenManga {
    manga_id: string[];
}
export declare class dtoGetDetialManga {
    manga_id: string;
}
export declare class dtoAddDeviceManga {
    manga_id: string;
    device: string;
}
export declare class dtoRemoveDeviceManga {
    manga_id: string;
    device: string;
}
export declare class dtoSuggestManga {
    category: Array<string>;
    page: number;
    numberItem: number;
}
export declare class dtoUserFollowManga {
    manga_id: string;
}
export declare class dtoUserUnFollowManga {
    manga_id: string;
}
export declare class dotReportManga {
    manga_id: string;
}
