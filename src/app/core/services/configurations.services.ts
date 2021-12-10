
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject, Subject } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { ApiMessage, BlogConfigVO } from '../models/models';
import { ApiService } from './api.service';



@Injectable({
    providedIn: 'root'
})
export class ConfigrationsService {

    public data = new ReplaySubject<ApiMessage<BlogConfigVO>>();
    public data$ = this.data.asObservable().pipe(distinctUntilChanged());

    constructor(private apiService: ApiService) {
    }


    sendData(data) {
        this.data.next(data);
    }

    public init(): Observable<ApiMessage<BlogConfigVO>> {
        return this.apiService.get(`/api/content/configure/init`
        ).pipe(map(data => {
            return data;
        }));
    }







}
