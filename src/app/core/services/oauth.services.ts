
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiMessage, Ouath } from '../models/models';
import { ApiService } from './api.service';



@Injectable({
    providedIn: 'root'
})
export class OauthService {

    constructor(private apiService: ApiService) {
    }



    public authorize(code: string): Observable<ApiMessage<Ouath>> {
        return this.apiService.get(`/api/content/oauth/github/` + code
        ).pipe(map(data => {
            return data;
        }));
    }







}
