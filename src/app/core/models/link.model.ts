export interface LinkDTO { 
    description?: string;
    id?: number;
    logo?: string;
    name?: string;
    priority?: number;
    team?: string;
    url?: string;
}

export interface LinkTeamVO { 
    links?: Array<LinkDTO>;
    team?: string;
}

