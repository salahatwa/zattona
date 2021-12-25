
 export interface IpDetails {
    continent_name?: string;

    zip?: string;

    city?: string;

    ip?: string;

    latitude?: number;

    continent_code?: string;

    type?: string;

    country_code?: string;

    country_name?: string;

    region_name?: string;

    location?: Location;

    region_code?: string;

    longitude?: number;

}

export interface Location {
    capital?: string;
   
    calling_code?: string;
   
    languages?: Languages[];
   
    country_flag_emoji_unicode?: string;
   
    is_eu?: Boolean;
   
    country_flag_emoji?: string;
   
    country_flag?: string;
   
    geoname_id?: number;
}

export interface Languages {
    code?: string;
    native?: string;    
    name?: string;
}