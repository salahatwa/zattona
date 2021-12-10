import { CategoryDTO } from './categoryDTO';
import { TagDTO } from './tag.model';

export interface BlogConfigVO {
    topViewPosts?: PostListVO[];
    latestPosts?: PostListVO[];
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
