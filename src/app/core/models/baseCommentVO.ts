/**
 * Halo API Documentation
 * Documentation for Halo API
 *
 * OpenAPI spec version: unknown
 * Contact: hi@halo.run
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */


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
