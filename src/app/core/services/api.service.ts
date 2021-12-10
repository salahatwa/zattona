import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ApiMessage } from '../models/models';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    API_URL = "";
    
    constructor(
        private http: HttpClient
    ) {
        // this.API_URL = environment.apiUrl;
        this.API_URL = 'http://127.0.0.1:8090';
    }

    private formatErrors(error: any) {
        let errorMsg: ApiMessage<any> = error?.error;
        return throwError(errorMsg.message);
    }



    get(path: string, params: HttpParams = new HttpParams()): Observable<any> {

        return this.http.get(`${this.API_URL}${path}`, { params })
            .pipe(catchError(this.formatErrors));
    }

    getFile(path: string): Observable<ArrayBuffer> {
        return this.http.get(`${this.API_URL}${path}`, {
            responseType: 'arraybuffer'
        });
    }

    getGetFile(path: string): Observable<ArrayBuffer> {
        return this.http.get(`${this.API_URL}${path}`, {
            responseType: 'arraybuffer'
        });
    }


    postGetFile(path: string, body: Object = {}): Observable<ArrayBuffer> {
        return this.http.post(`${this.API_URL}${path}`, body, {
            responseType: 'arraybuffer'
        });
    }

    openFile(path: string, body: Object = {}): Observable<Blob> {
        return this.http.post(`${this.API_URL}${path}`, JSON.stringify(body), {
            responseType: 'blob'
        });
    }

    put(path: string, body: Object = {}): Observable<any> {
        return this.http.put(
            `${this.API_URL}${path}`,
            body
        ).pipe(catchError(this.formatErrors));
    }

    post(path: string, body: Object = {}, params?: any): Observable<any> {
        return this.http.post(
            `${this.API_URL}${path}`,
            body,
            {
                params: params
            }
        ).pipe(catchError(this.formatErrors));
    }

    delete(path): Observable<any> {
        return this.http.delete(
            `${this.API_URL}${path}`
        ).pipe(catchError(this.formatErrors));
    }

    uploadFile(path, uploadFileData): Observable<any> {
        return this.http.post(`${this.API_URL}${path}`, uploadFileData, { observe: 'response' })
            .pipe(catchError(this.formatErrors));
    }
}
