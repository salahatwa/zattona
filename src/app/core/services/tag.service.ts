import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiMessage, CustomHttpUrlEncodingCodec, PagePostListVO, TagDTO } from '../models/models';
import { ApiService } from './api.service';



@Injectable({
    providedIn: 'root'
})
export class TagService {

    constructor(private apiService: ApiService) {
    }


    /**
     * Lists posts by tag slug
     * 
     * @param slug slug
     * @param page 
     * @param size 
     * @param sort 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public listPostsBySlug(slug: string, page?: number, size?: number, sort?: Array<string>): Observable<PagePostListVO> {

        if (slug === null || slug === undefined) {
            throw new Error('Required parameter slug was null or undefined when calling listPostsByUsingGET1.');
        }

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

        return this.apiService.get(`/api/content/tags/${encodeURIComponent(String(slug))}/posts`,
            queryParameters
        );
    }

    /**
     * Lists tags
     * 
     * @param more If the param is true, post count of tag will be returned
     * @param sort 
     */
    public listTags(more?: boolean, sort?: Array<string>): Observable<ApiMessage<Array<TagDTO>>> {



        let queryParameters = new HttpParams({ encoder: new CustomHttpUrlEncodingCodec() });
        if (more !== undefined && more !== null) {
            queryParameters = queryParameters.set('more', <any>more);
        }
        if (sort) {
            sort.forEach((element) => {
                queryParameters = queryParameters.append('sort', <any>element);
            })
        }

        return this.apiService.get(`/api/content/tags`,
            queryParameters
        );
    }

}
