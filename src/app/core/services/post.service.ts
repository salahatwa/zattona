
import {
    HttpParams
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiMessage, BaseCommentDTO, CustomHttpUrlEncodingCodec, PageBaseCommentVO, PageBaseCommentWithParentVO, PageBasePostSimpleDTO, PageCommentWithHasChildrenVO, PagePostListVO, PostCommentParam, PostDetailVO } from '../models/models';
import { ApiService } from './api.service';



@Injectable({
    providedIn: 'root'
})
export class PostService {

    constructor(private apiService: ApiService) {
    }




    /**
     * Comments a post
     * 
     * @param postCommentParam postCommentParam
     */
    public commentUsing(postCommentParam: PostCommentParam): Observable<BaseCommentDTO> {

        if (postCommentParam === null || postCommentParam === undefined) {
            throw new Error('Required parameter postCommentParam was null or undefined when calling commentUsingPOST1.');
        }

        let queryParameters = new HttpParams({ encoder: new CustomHttpUrlEncodingCodec() });

        return this.apiService.post(`/api/content/posts/comments`,
            postCommentParam, queryParameters
        ).pipe(map(data => {
            return data;
        }));
    }

    /**
     * Gets a post
     * 
     * @param postId postId
     * @param formatDisabled formatDisabled
     * @param sourceDisabled sourceDisabled
     */
    public getByUsing(postId: number, formatDisabled?: boolean, sourceDisabled?: boolean): Observable<PostDetailVO> {

        if (postId === null || postId === undefined) {
            throw new Error('Required parameter postId was null or undefined when calling getByUsingGET14.');
        }



        let queryParameters = new HttpParams({ encoder: new CustomHttpUrlEncodingCodec() });
        if (formatDisabled !== undefined && formatDisabled !== null) {
            queryParameters = queryParameters.set('formatDisabled', <any>formatDisabled);
        }
        if (sourceDisabled !== undefined && sourceDisabled !== null) {
            queryParameters = queryParameters.set('sourceDisabled', <any>sourceDisabled);
        }



        return this.apiService.get(`/api/content/posts/${encodeURIComponent(String(postId))}`, queryParameters
        ).pipe(map(data => {
            return data;
        }));
    }

    /**
     * Gets a post
     * 
     * @param slug slug
     * @param formatDisabled formatDisabled
     * @param sourceDisabled sourceDisabled
     */
    public getByUsingSlug(slug: string, formatDisabled?: boolean, sourceDisabled?: boolean): Observable<ApiMessage<PostDetailVO>> {

        if (slug === null || slug === undefined) {
            throw new Error('Required parameter slug was null or undefined when calling getByUsingGET15.');
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

        return this.apiService.get(`/api/content/posts/slug`, queryParameters
        ).pipe(map(data => {
            return data;
        }));
    }

    /**
     * Gets next post by current post id.
     * 
     * @param postId postId
     */
    public getNextPostBy(postId: number): Observable<PostDetailVO> {

        if (postId === null || postId === undefined) {
            throw new Error('Required parameter postId was null or undefined when calling getNextPostByUsingGET.');
        }

        let queryParameters = new HttpParams({ encoder: new CustomHttpUrlEncodingCodec() });



        return this.apiService.get(`/api/content/posts/${encodeURIComponent(String(postId))}/next`,
            queryParameters
        ).pipe(map(data => {
            return data;
        }));
    }

    /**
     * Gets previous post by current post id.
     * 
     * @param postId postId
     */
    public getPrevPostByUsing(postId: number): Observable<PostDetailVO> {

        if (postId === null || postId === undefined) {
            throw new Error('Required parameter postId was null or undefined when calling getPrevPostByUsingGET.');
        }

        let queryParameters = new HttpParams({ encoder: new CustomHttpUrlEncodingCodec() });


        return this.apiService.get(`/api/content/posts/${encodeURIComponent(String(postId))}/prev`,
            queryParameters
        ).pipe(map(data => {
            return data;
        }));
    }

    /**
     * Likes a post
     * 
     * @param postId postId
     */
    public likeUsingPOST1(postId: number): Observable<any> {

        if (postId === null || postId === undefined) {
            throw new Error('Required parameter postId was null or undefined when calling likeUsingPOST1.');
        }

        let queryParameters = new HttpParams({ encoder: new CustomHttpUrlEncodingCodec() });




        return this.apiService.post(`/api/content/posts/${encodeURIComponent(String(postId))}/likes`,
            null, queryParameters
        ).pipe(map(data => {
            return data;
        }));
    }

    /**
     * listChildrenBy
     * 
     * @param commentParentId commentParentId
     * @param postId postId
     * @param sort 
     */
    public listChildrenByUsingGET1(commentParentId: number, postId: number, sort?: Array<string>): Observable<Array<BaseCommentDTO>> {

        if (commentParentId === null || commentParentId === undefined) {
            throw new Error('Required parameter commentParentId was null or undefined when calling listChildrenByUsingGET1.');
        }

        if (postId === null || postId === undefined) {
            throw new Error('Required parameter postId was null or undefined when calling listChildrenByUsingGET1.');
        }


        let queryParameters = new HttpParams({ encoder: new CustomHttpUrlEncodingCodec() });
        if (sort) {
            sort.forEach((element) => {
                queryParameters = queryParameters.append('sort', <any>element);
            })
        }



        return this.apiService.get(`/api/content/posts/${encodeURIComponent(String(postId))}/comments/${encodeURIComponent(String(commentParentId))}/children`,
            queryParameters
        ).pipe(map(data => {
            return data;
        }));
    }

    /**
     * Lists comments with tree view
     * 
     * @param postId postId
     * @param page page
     * @param sort 
     */
    public listCommentsTreeUsingGET1(postId: number, page?: number, sort?: Array<string>): Observable<PageBaseCommentVO> {

        if (postId === null || postId === undefined) {
            throw new Error('Required parameter postId was null or undefined when calling listCommentsTreeUsingGET1.');
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


        return this.apiService.get(`/api/content/posts/${encodeURIComponent(String(postId))}/comments/tree_view`,
            queryParameters
        ).pipe(map(data => {
            return data;
        }));
    }

    /**
     * Lists comment with list view
     * 
     * @param postId postId
     * @param page page
     * @param sort   
     */
    public listCommentsUsingGET4(postId: number, page?: number, sort?: Array<string>): Observable<PageBaseCommentWithParentVO> {

        if (postId === null || postId === undefined) {
            throw new Error('Required parameter postId was null or undefined when calling listCommentsUsingGET4.');
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



        return this.apiService.get(`/api/content/posts/${encodeURIComponent(String(postId))}/comments/list_view`,
            queryParameters
        ).pipe(map(data => {
            return data;
        }));
    }

    /**
     * listTopComments
     * 
     * @param postId postId
     * @param page page
     * @param sort 
     */
    public listTopCommentsUsingGET1(postId: number, page?: number, sort?: Array<string>): Observable<PageCommentWithHasChildrenVO> {

        if (postId === null || postId === undefined) {
            throw new Error('Required parameter postId was null or undefined when calling listTopCommentsUsingGET1.');
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


        return this.apiService.get(`/api/content/posts/${encodeURIComponent(String(postId))}/comments/top_view`,
            queryParameters
        ).pipe(map(data => {
            return data;
        }));
    }

    /**
     * Lists posts
     * 
     * @param page 
     * @param size 
     * @param sort 
     */
    public pageBy(page?: number, size?: number, sort?: Array<string>): Observable<PagePostListVO> {
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


        return this.apiService.get(`/api/content/posts`,
            queryParameters

        ).pipe(map(data => {
            return data;
        }));
    }

    /**
     * Lists posts by keyword
     * 
     * @param keyword keyword
     * @param page 
     * @param size 
     * @param sort 
     */
    public pageByUsingPOST(keyword: string, page?: number, size?: number, sort?: Array<string>): Observable<PageBasePostSimpleDTO> {

        if (keyword === null || keyword === undefined) {
            throw new Error('Required parameter keyword was null or undefined when calling pageByUsingPOST.');
        }


        let queryParameters = new HttpParams({ encoder: new CustomHttpUrlEncodingCodec() });
        if (keyword !== undefined && keyword !== null) {
            queryParameters = queryParameters.set('keyword', <any>keyword);
        }
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

        return this.apiService.post(`/api/content/posts/search`,
            null, queryParameters
        ).pipe(map(data => {
            return data;
        }));
    }

}
