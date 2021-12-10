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
import { BaseCommentWithParentVO } from './baseCommentWithParentVO';
import { Pageable } from './pageable';
import { Sort } from './sort';


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
