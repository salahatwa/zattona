import { Pageable, Sort } from "./shared.model";


export interface PhotoDTO { 
    description?: string;
    id?: number;
    location?: string;
    name?: string;
    takeTime?: Date;
    team?: string;
    thumbnail?: string;
    url?: string;
}

export interface PagePhotoDTO {
    content?: Array<PhotoDTO>;
    empty?: boolean;
    first?: boolean;
    last?: boolean;
    number?: number;
    numberOfElements?: number;
    pageable?: Pageable;
    size?: number;
    sort?: Sort;
    totalElements?: number;
    totalPages?: number;
}
