import { UserDTO } from "./user.model";

export interface StatisticDTO { 
    attachmentCount?: number;
    birthday?: number;
    categoryCount?: number;
    commentCount?: number;
    establishDays?: number;
    journalCount?: number;
    likeCount?: number;
    linkCount?: number;
    postCount?: number;
    tagCount?: number;
    visitCount?: number;
}



export interface StatisticWithUserDTO { 
    attachmentCount?: number;
    birthday?: number;
    categoryCount?: number;
    commentCount?: number;
    establishDays?: number;
    journalCount?: number;
    likeCount?: number;
    linkCount?: number;
    postCount?: number;
    tagCount?: number;
    user?: UserDTO;
    visitCount?: number;
}
