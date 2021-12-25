import { HttpUrlEncodingCodec } from "@angular/common/http";

export interface Sort { 
    sort?: Array<string>;
}


export interface Pageable { 
    page?: number;
    size?: number;
    sort?: Array<string>;
}

export interface OptionDTO { 
    key?: string;
    value?: any;
}

export interface Author { 
    avatar?: string;
    name?: string;
    website?: string;
}


/**
* CustomHttpUrlEncodingCodec
* Fix plus sign (+) not encoding, so sent as blank space
* See: https://github.com/angular/angular/issues/11058#issuecomment-247367318
*/
export class CustomHttpUrlEncodingCodec extends HttpUrlEncodingCodec {
    encodeKey(k: string): string {
        k = super.encodeKey(k);
        return k.replace(/\+/gi, '%2B');
    }
    encodeValue(v: string): string {
        v = super.encodeValue(v);
        return v.replace(/\+/gi, '%2B');
    }
}
