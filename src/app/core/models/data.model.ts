import { Page } from "./page.model";

export interface ApiMessage<T>{
    data?: T;
    message?: string;
    status?: number;
}



export interface PagedData<T> {
    data?: Page<T>;
}