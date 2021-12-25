import { Pageable, Sort } from "./shared.model";

export interface BaseCommentDTO { 
    allowNotification?: boolean;
    author?: string;
    authorUrl?: string;
    content?: string;
    createTime?: Date;
    email?: string;
    gravatarMd5?: string;
    id?: number;
    ipAddress?: string;
    isAdmin?: boolean;
    parentId?: number;
    status?: BaseCommentDTO.StatusEnum;
    userAgent?: string;
}
export namespace BaseCommentDTO {
    export type StatusEnum = 'AUDITING' | 'PUBLISHED' | 'RECYCLE';
    export const StatusEnum = {
        AUDITING: 'AUDITING' as StatusEnum,
        PUBLISHED: 'PUBLISHED' as StatusEnum,
        RECYCLE: 'RECYCLE' as StatusEnum
    };
}


export interface CommentWithHasChildrenVO { 
    allowNotification?: boolean;
    author?: string;
    authorUrl?: string;
    content?: string;
    createTime?: Date;
    email?: string;
    gravatarMd5?: string;
    hasChildren?: boolean;
    id?: number;
    ipAddress?: string;
    isAdmin?: boolean;
    parentId?: number;
    status?: CommentWithHasChildrenVO.StatusEnum;
    userAgent?: string;
}
export namespace CommentWithHasChildrenVO {
    export type StatusEnum = 'AUDITING' | 'PUBLISHED' | 'RECYCLE';
    export const StatusEnum = {
        AUDITING: 'AUDITING' as StatusEnum,
        PUBLISHED: 'PUBLISHED' as StatusEnum,
        RECYCLE: 'RECYCLE' as StatusEnum
    };
}

export interface PageBaseCommentVO { 
    content?: Array<BaseCommentVO>;
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


export interface BaseCommentVO { 
    allowNotification?: boolean;
    author?: string;
    authorUrl?: string;
    children?: Array<BaseCommentVO>;
    content?: string;
    createTime?: Date;
    email?: string;
    gravatarMd5?: string;
    id?: number;
    ipAddress?: string;
    isAdmin?: boolean;
    parentId?: number;
    status?: BaseCommentVO.StatusEnum;
    userAgent?: string;
}
export namespace BaseCommentVO {
    export type StatusEnum = 'AUDITING' | 'PUBLISHED' | 'RECYCLE';
    export const StatusEnum = {
        AUDITING: 'AUDITING' as StatusEnum,
        PUBLISHED: 'PUBLISHED' as StatusEnum,
        RECYCLE: 'RECYCLE' as StatusEnum
    };
}



export interface BaseCommentWithParentVO { 
    allowNotification?: boolean;
    author?: string;
    authorUrl?: string;
    content?: string;
    createTime?: Date;
    email?: string;
    gravatarMd5?: string;
    id?: number;
    ipAddress?: string;
    isAdmin?: boolean;
    parent?: BaseCommentWithParentVO;
    parentId?: number;
    status?: BaseCommentWithParentVO.StatusEnum;
    userAgent?: string;
}
export namespace BaseCommentWithParentVO {
    export type StatusEnum = 'AUDITING' | 'PUBLISHED' | 'RECYCLE';
    export const StatusEnum = {
        AUDITING: 'AUDITING' as StatusEnum,
        PUBLISHED: 'PUBLISHED' as StatusEnum,
        RECYCLE: 'RECYCLE' as StatusEnum
    };
}


export interface PageBaseCommentWithParentVO { 
    content?: Array<BaseCommentWithParentVO>;
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


export interface PageCommentWithHasChildrenVO { 
    content?: Array<CommentWithHasChildrenVO>;
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
