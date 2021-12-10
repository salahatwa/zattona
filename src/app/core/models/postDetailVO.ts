import { BaseMetaDTO } from './baseMetaDTO';
import { CategoryDTO } from './categoryDTO';
import { TagDTO } from './tag.model';


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
