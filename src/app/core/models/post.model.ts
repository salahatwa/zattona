
import { BaseMetaDTO } from './meta.model';
import { CategoryDTO } from './category.model';
import { PagedData } from './data.model';
import { MenuTeamVO } from './menu.model';
import { TagDTO } from './tag.model';
import { Pageable, Sort } from './shared.model';
import { Page } from './page.model';



export interface CategoryPosts{
    category?:CategoryDTO;
    posts?:Page<PostListVO>;
}


export interface BlogConfigVO {
    topViewPosts?: PostListVO[];
    latestPosts?: PostListVO[];
    menuTeams?: MenuTeamVO[];
}

export interface PostListVO {
    categories?: Array<CategoryDTO>;
    commentCount?: number;
    createTime?: Date;
    disallowComment?: boolean;
    editTime?: Date;
    editorType?: PostListVO.EditorTypeEnum;
    fullPath?: string;
    id?: number;
    likes?: number;
    metaDescription?: string;
    metaKeywords?: string;
    metas?: any;
    password?: string;
    slug?: string;
    status?: PostListVO.StatusEnum;
    summary?: string;
    tags?: Array<TagDTO>;
    template?: string;
    thumbnail?: string;
    title?: string;
    topPriority?: number;
    topped?: boolean;
    updateTime?: Date;
    visits?: number;
    wordCount?: number;
}
export namespace PostListVO {
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


export interface PostDetailVO {
    categories?: Array<CategoryDTO>;
    categoryIds?: Array<number>;
    commentCount?: number;
    createTime?: Date;
    disallowComment?: boolean;
    editTime?: Date;
    editorType?: PostDetailVO.EditorTypeEnum;
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
    status?: PostDetailVO.StatusEnum;
    summary?: string;
    tagIds?: Array<number>;
    tags?: Array<TagDTO>;
    template?: string;
    thumbnail?: string;
    title?: string;
    topPriority?: number;
    topped?: boolean;
    updateTime?: Date;
    visits?: number;
    wordCount?: number;
    prevPost?: PostDetailVO;
    nextPost?: PostDetailVO;
}
export namespace PostDetailVO {
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


export interface BasePostSimpleDTO { 
    createTime?: Date;
    disallowComment?: boolean;
    editTime?: Date;
    editorType?: BasePostSimpleDTO.EditorTypeEnum;
    fullPath?: string;
    id?: number;
    likes?: number;
    metaDescription?: string;
    metaKeywords?: string;
    password?: string;
    slug?: string;
    status?: BasePostSimpleDTO.StatusEnum;
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
export namespace BasePostSimpleDTO {
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



export interface PageBasePostSimpleDTO { 
    content?: Array<BasePostSimpleDTO>;
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


export interface PostCommentParam { 
    allowNotification?: boolean;
    author: string;
    authorUrl?: string;
    content: string;
    email: string;
    parentId?: number;
    postId?: number;
}
