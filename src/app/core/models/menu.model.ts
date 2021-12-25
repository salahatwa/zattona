export interface MenuTeamVO { 
    team?: string;
    menus?: MenuVO[];
}

export interface MenuVO { 
    children?: Array<MenuVO>;
    icon?: string;
    id?: number;
    name?: string;
    parentId?: number;
    priority?: number;
    target?: string;
    team?: string;
    url?: string;
}


export interface MenuDTO { 
    icon?: string;
    id?: number;
    name?: string;
    parentId?: number;
    priority?: number;
    target?: string;
    team?: string;
    url?: string;
}
