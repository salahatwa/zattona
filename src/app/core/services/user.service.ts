import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiMessage, UserDTO } from '../models/models';
import { ApiService } from './api.service';


@Injectable({
    providedIn: 'root'
})
export class UserService {


    constructor(private apiService: ApiService) {
    }


    /**
     * Gets blogger profile
     */
    public getProfile(): Observable<ApiMessage<UserDTO>> {
        return this.apiService.get(`/api/content/users/profile`
        );
    }

    /**
    * Subscribe user
    */
    public subscribe(email: string): Observable<ApiMessage<UserDTO>> {
        return this.apiService.get(`/api/content/users/subscribe/${encodeURIComponent(String(email))}`
        );
    }

    verifySubscriber(token) {
        return this.apiService.get(`/api/content/users/subscribe/verify/${token}`);
    }

    contactUs(data) {
        return this.apiService.post(`/api/content/users/contact/`, data);
    }

}
