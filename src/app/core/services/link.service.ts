import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiMessage, CustomHttpUrlEncodingCodec, LinkDTO, LinkTeamVO } from '../models/models';
import { ApiService } from './api.service';


@Injectable({
    providedIn: 'root'
})
export class LinkService {

    constructor(private apiService: ApiService) {
    }


    /**
     * List all links
     * 
     * @param sort 
     */
    public listLinks(sort?: Array<string>): Observable<ApiMessage<Array<LinkDTO>>> {


        let queryParameters = new HttpParams({ encoder: new CustomHttpUrlEncodingCodec() });
        if (sort) {
            sort.forEach((element) => {
                queryParameters = queryParameters.append('sort', <any>element);
            })
        }



        return this.apiService.get(`/api/content/links`,
            queryParameters
        );
    }



    /**
   * List group links
   * 
   * @param sort 
   */
    public listTeamLinks(sort?: Array<string>): Observable<ApiMessage<LinkTeamVO>> {


        let queryParameters = new HttpParams({ encoder: new CustomHttpUrlEncodingCodec() });
        if (sort) {
            sort.forEach((element) => {
                queryParameters = queryParameters.append('sort', <any>element);
            })
        }



        return this.apiService.get(`/api/content/links/team_view`,
            queryParameters
        );
    }


}
