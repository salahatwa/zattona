
import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiMessage, BaseCommentDTO, CustomHttpUrlEncodingCodec, PageBaseCommentVO, PageBaseCommentWithParentVO, PageCommentWithHasChildrenVO, PageSheetListVO, SheetCommentParam, SheetDetailVO } from '../models/models';
import { ApiService } from './api.service';


@Injectable({
    providedIn: 'root'
})
export class SheetService {

    constructor(private apiService: ApiService) {
    }


    /**
     * Comments a post
     * 
     * @param sheetCommentParam sheetCommentParam
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public commentUsingPOST2(sheetCommentParam: SheetCommentParam): Observable<ApiMessage<BaseCommentDTO>> {

        if (sheetCommentParam === null || sheetCommentParam === undefined) {
            throw new Error('Required parameter sheetCommentParam was null or undefined when calling commentUsingPOST2.');
        }

        return this.apiService.post(`/api/content/sheets/comments`,
            sheetCommentParam
        );
    }

    /**
     * Gets a sheet
     * 
     * @param sheetId sheetId
     * @param formatDisabled formatDisabled
     * @param sourceDisabled sourceDisabled
     */
    public getByUsingGET16(sheetId: number, formatDisabled?: boolean, sourceDisabled?: boolean): Observable<ApiMessage<SheetDetailVO>> {

        if (sheetId === null || sheetId === undefined) {
            throw new Error('Required parameter sheetId was null or undefined when calling getByUsingGET16.');
        }

        let queryParameters = new HttpParams({ encoder: new CustomHttpUrlEncodingCodec() });
        if (formatDisabled !== undefined && formatDisabled !== null) {
            queryParameters = queryParameters.set('formatDisabled', <any>formatDisabled);
        }
        if (sourceDisabled !== undefined && sourceDisabled !== null) {
            queryParameters = queryParameters.set('sourceDisabled', <any>sourceDisabled);
        }



        return this.apiService.get(`/api/content/sheets/${encodeURIComponent(String(sheetId))}`,
            queryParameters

        );
    }

    /**
     * Gets a sheet by slug
     * 
     * @param slug slug
     * @param formatDisabled formatDisabled
     * @param sourceDisabled sourceDisabled
     */
    public getBySlug(slug: string, formatDisabled?: boolean, sourceDisabled?: boolean): Observable<ApiMessage<SheetDetailVO>> {
        if (slug === null || slug === undefined) {
            throw new Error('Required parameter slug was null or undefined when calling getByUsingGET17.');
        }

        let queryParameters = new HttpParams({ encoder: new CustomHttpUrlEncodingCodec() });
        if (formatDisabled !== undefined && formatDisabled !== null) {
            queryParameters = queryParameters.set('formatDisabled', <any>formatDisabled);
        }
        if (slug !== undefined && slug !== null) {
            queryParameters = queryParameters.set('slug', <any>slug);
        }
        if (sourceDisabled !== undefined && sourceDisabled !== null) {
            queryParameters = queryParameters.set('sourceDisabled', <any>sourceDisabled);
        }


        return this.apiService.get(`/api/content/sheets/slug`,
            queryParameters
        );
    }

    /**
     * listChildrenBy
     * 
     * @param commentParentId commentParentId
     * @param sheetId sheetId
     * @param sort 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public listChildrenByUsingGET2(commentParentId: number, sheetId: number, sort?: Array<string>): Observable<ApiMessage<Array<BaseCommentDTO>>> {

        if (commentParentId === null || commentParentId === undefined) {
            throw new Error('Required parameter commentParentId was null or undefined when calling listChildrenByUsingGET2.');
        }

        if (sheetId === null || sheetId === undefined) {
            throw new Error('Required parameter sheetId was null or undefined when calling listChildrenByUsingGET2.');
        }


        let queryParameters = new HttpParams({ encoder: new CustomHttpUrlEncodingCodec() });
        if (sort) {
            sort.forEach((element) => {
                queryParameters = queryParameters.append('sort', <any>element);
            })
        }


        return this.apiService.get(`/api/content/sheets/${encodeURIComponent(String(sheetId))}/comments/${encodeURIComponent(String(commentParentId))}/children`, queryParameters
        );
    }

    /**
     * Lists comments with tree view
     * 
     * @param sheetId sheetId
     * @param page page
     * @param sort 
   */
    public listCommentsTreeUsingGET2(sheetId: number, page?: number, sort?: Array<string>): Observable<ApiMessage<PageBaseCommentVO>> {

        if (sheetId === null || sheetId === undefined) {
            throw new Error('Required parameter sheetId was null or undefined when calling listCommentsTreeUsingGET2.');
        }

        let queryParameters = new HttpParams({ encoder: new CustomHttpUrlEncodingCodec() });
        if (page !== undefined && page !== null) {
            queryParameters = queryParameters.set('page', <any>page);
        }
        if (sort) {
            sort.forEach((element) => {
                queryParameters = queryParameters.append('sort', <any>element);
            })
        }


        return this.apiService.get(`/api/content/sheets/${encodeURIComponent(String(sheetId))}/comments/tree_view`,
            queryParameters
        );
    }

    /**
     * Lists comment with list view
     * 
     * @param sheetId sheetId
     * @param page page
     * @param sort 
     */
    public listCommentsUsingGET5(sheetId: number, page?: number, sort?: Array<string>): Observable<ApiMessage<PageBaseCommentWithParentVO>> {

        if (sheetId === null || sheetId === undefined) {
            throw new Error('Required parameter sheetId was null or undefined when calling listCommentsUsingGET5.');
        }

        let queryParameters = new HttpParams({ encoder: new CustomHttpUrlEncodingCodec() });
        if (page !== undefined && page !== null) {
            queryParameters = queryParameters.set('page', <any>page);
        }
        if (sort) {
            sort.forEach((element) => {
                queryParameters = queryParameters.append('sort', <any>element);
            })
        }

        return this.apiService.get(`/api/content/sheets/${encodeURIComponent(String(sheetId))}/comments/list_view`,
            queryParameters
        );
    }

    /**
     * listTopComments
     * 
     * @param sheetId sheetId
     * @param page page
     * @param sort 
     */
    public listTopCommentsUsingGET2(sheetId: number, page?: number, sort?: Array<string>): Observable<ApiMessage<PageCommentWithHasChildrenVO>> {

        if (sheetId === null || sheetId === undefined) {
            throw new Error('Required parameter sheetId was null or undefined when calling listTopCommentsUsingGET2.');
        }



        let queryParameters = new HttpParams({ encoder: new CustomHttpUrlEncodingCodec() });
        if (page !== undefined && page !== null) {
            queryParameters = queryParameters.set('page', <any>page);
        }
        if (sort) {
            sort.forEach((element) => {
                queryParameters = queryParameters.append('sort', <any>element);
            })
        }

        return this.apiService.get(`/api/content/sheets/${encodeURIComponent(String(sheetId))}/comments/top_view`,
            queryParameters
        );
    }

    /**
     * Lists sheets
     * 
     * @param page 
     * @param size 
     * @param sort 
     */
    public pageByUsingGET12(page?: number, size?: number, sort?: Array<string>): Observable<ApiMessage<PageSheetListVO>> {

        let queryParameters = new HttpParams({ encoder: new CustomHttpUrlEncodingCodec() });
        if (page !== undefined && page !== null) {
            queryParameters = queryParameters.set('page', <any>page);
        }
        if (size !== undefined && size !== null) {
            queryParameters = queryParameters.set('size', <any>size);
        }
        if (sort) {
            sort.forEach((element) => {
                queryParameters = queryParameters.append('sort', <any>element);
            })
        }
        return this.apiService.get(`/api/content/sheets`, queryParameters);
    }

}
