
import {
    HttpParams
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiMessage, CategoryPosts, CustomHttpUrlEncodingCodec } from '../models/models';
import { ApiService } from './api.service';

@Injectable({
    providedIn: 'root'
})
export class CategoryService {

    constructor(private apiService: ApiService) {
    }

    /**
     * Lists categories
     * 
     * @param more more
     * @param sort 
     */
    public listCategories(more?: boolean, sort?: Array<string>): Observable<any> {
        let queryParameters = new HttpParams({ encoder: new CustomHttpUrlEncodingCodec() });
        if (more !== undefined && more !== null) {
            queryParameters = queryParameters.set('more', <any>more);
        }
        if (sort) {
            sort.forEach((element) => {
                queryParameters = queryParameters.append('sort', <any>element);
            })
        }

        return this.apiService.get(`/api/content/categories`, queryParameters).pipe(map(data => {
            return data;
        }));
    }

    /**
     * Lists posts by category slug
     * 
     * @param slug slug
     * @param page 
     * @param size 
     * @param sort 
     */
    public listPostsBy(slug: string, page?: number, size?: number, sort?: Array<string>): Observable<ApiMessage<CategoryPosts>> {

        if (slug === null || slug === undefined) {
            throw new Error('Required parameter slug was null or undefined when calling listPostsByUsingGET.');
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

        return this.apiService.get(`/api/content/categories/${encodeURIComponent(String(slug))}/posts`, queryParameters).pipe(map(data => {
            return data;
        }));
    }

}
