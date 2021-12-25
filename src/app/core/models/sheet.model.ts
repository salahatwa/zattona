import { BaseMetaDTO } from './meta.model';
import { Pageable, Sort } from './shared.model';


export interface SheetDetailVO { 
    commentCount?: number;
    createTime?: Date;
    disallowComment?: boolean;
    editTime?: Date;
    editorType?: SheetDetailVO.EditorTypeEnum;
    formatContent?: string;
    fullPath?: string;
    id?: number;
    likes?: number;
    metaDescription?: string;
    metaIds?: Array<number>;
    metaKeywords?: string;
    metas?: Array<BaseMetaDTO>;
    originalContent?: string;
    password?: string;
    slug?: string;
    status?: SheetDetailVO.StatusEnum;
    summary?: string;
    template?: string;
    thumbnail?: string;
    title?: string;
    topPriority?: number;
    topped?: boolean;
    updateTime?: Date;
    visits?: number;
    wordCount?: number;
}
export namespace SheetDetailVO {
    export type EditorTypeEnum = 'MARKDOWN' | 'RICHTEXT';
    export const EditorTypeEnum = {
        MARKDOWN: 'MARKDOWN' as EditorTypeEnum,
        RICHTEXT: 'RICHTEXT' as EditorTypeEnum
    };
    export type StatusEnum = 'DRAFT' | 'INTIMATE' | 'PUBLISHED' | 'RECYCLE';
    export const StatusEnum = {
        DRAFT: 'DRAFT' as StatusEnum,
        INTIMATE: 'INTIMATE' as StatusEnum,
        PUBLISHED: 'PUBLISHED' as StatusEnum,
        RECYCLE: 'RECYCLE' as StatusEnum
    };
}


export interface PageSheetListVO { 
    content?: Array<SheetListVO>;
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



export interface SheetListVO { 
    commentCount?: number;
    createTime?: Date;
    disallowComment?: boolean;
    editTime?: Date;
    editorType?: SheetListVO.EditorTypeEnum;
    fullPath?: string;
    id?: number;
    likes?: number;
    metaDescription?: string;
    metaKeywords?: string;
    password?: string;
    slug?: string;
    status?: SheetListVO.StatusEnum;
    summary?: string;
    template?: string;
    thumbnail?: string;
    title?: string;
    topPriority?: number;
    topped?: boolean;
    updateTime?: Date;
    visits?: number;
    wordCount?: number;
}
export namespace SheetListVO {
    export type EditorTypeEnum = 'MARKDOWN' | 'RICHTEXT';
    export const EditorTypeEnum = {
        MARKDOWN: 'MARKDOWN' as EditorTypeEnum,
        RICHTEXT: 'RICHTEXT' as EditorTypeEnum
    };
    export type StatusEnum = 'DRAFT' | 'INTIMATE' | 'PUBLISHED' | 'RECYCLE';
    export const StatusEnum = {
        DRAFT: 'DRAFT' as StatusEnum,
        INTIMATE: 'INTIMATE' as StatusEnum,
        PUBLISHED: 'PUBLISHED' as StatusEnum,
        RECYCLE: 'RECYCLE' as StatusEnum
    };
}


export interface SheetCommentParam { 
    allowNotification?: boolean;
    author: string;
    authorUrl?: string;
    content: string;
    email: string;
    parentId?: number;
    postId?: number;
}