
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiMessage, GeneratedCode, GTemplateGroup, ParamInfo } from '../models/models';
import { ApiService } from './api.service';

@Injectable({
    providedIn: 'root'
})
export class ToolsService {

    constructor(private apiService: ApiService) {
    }

    /**
     * Lists generator templates
     */
    public listGeneratorTmp(): Observable<ApiMessage<GTemplateGroup[]>> {
        return this.apiService.get(`/api/content/tools/generator/template/list`).pipe(map(data => {
            return data;
        }));
    }

    /**
     * Lists posts by category slug
     * 
     */
    public generateCode(paramsInfo: ParamInfo): Observable<ApiMessage<GeneratedCode[]>> {

        if (paramsInfo === null || paramsInfo === undefined) {
            throw new Error('Required parameter paramsInfo was null or undefined when calling generateCode.');
        }

        return this.apiService.post(`/api/content/tools/generator/generate`, paramsInfo).pipe(map(data => {
            return data;
        }));
    }

}
