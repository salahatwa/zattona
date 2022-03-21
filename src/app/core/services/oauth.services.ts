
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiMessage, GithubUser, Repo } from '../models/models';
import { ApiService } from './api.service';



@Injectable({
    providedIn: 'root'
})
export class OauthService {

    constructor(private apiService: ApiService) {
    }



    public authorize(code: string): Observable<ApiMessage<GithubUser>> {
        return this.apiService.get(`/api/content/oauth/github/` + code
        ).pipe(map(data => {
            return data;
        }));
    }

    public getRepos(user: GithubUser): Observable<ApiMessage<Repo[]>> {
        return this.apiService.post(`/api/content/oauth/github/repos`,user
        ).pipe(map(data => {
            return data;
        }));
    }

   

    public deleteRepo(user: GithubUser,repo:string): Observable<ApiMessage<any>> {
        return this.apiService.post(`/api/content/oauth/github/repo/deleteRepo/`+repo,user
        ).pipe(map(data => {
            return data;
        }));
    }

    public createSite(user: GithubUser): Observable<ApiMessage<GithubUser>> {
        return this.apiService.post(`/api/content/oauth/github/create/site`, user
        ).pipe(map(data => {
            return data;
        }));
    }

}
