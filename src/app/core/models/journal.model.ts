import { Pageable, Sort } from "./shared.model";

export interface JournalCommentParam {
    allowNotification?: boolean;
    author: string;
    authorUrl?: string;
    content: string;
    email: string;
    parentId?: number;
    postId?: number;
}



export interface JournalDTO {
    content?: string;
    createTime?: Date;
    id?: number;
    likes?: number;
    sourceContent?: string;
    type?: JournalDTO.TypeEnum;
}
export namespace JournalDTO {
    export type TypeEnum = 'INTIMATE' | 'PUBLIC';
    export const TypeEnum = {
        INTIMATE: 'INTIMATE' as TypeEnum,
        PUBLIC: 'PUBLIC' as TypeEnum
    };
}



export interface JournalWithCmtCountDTO {
    commentCount?: number;
    content?: string;
    createTime?: Date;
    id?: number;
    likes?: number;
    sourceContent?: string;
    type?: JournalWithCmtCountDTO.TypeEnum;
}
export namespace JournalWithCmtCountDTO {
    export type TypeEnum = 'INTIMATE' | 'PUBLIC';
    export const TypeEnum = {
        INTIMATE: 'INTIMATE' as TypeEnum,
        PUBLIC: 'PUBLIC' as TypeEnum
    };
}


export interface PageJournalWithCmtCountDTO { 
    content?: Array<JournalWithCmtCountDTO>;
    empty?: boolean;
    first?: boolean;
    last?: boolean;
    number?: number;
    numberOfElements?: number;
    pageable?: Pageable;
    size?: number;
    sort?: Sort;
    totalElements?: number;
    totalPages?: number;
}


