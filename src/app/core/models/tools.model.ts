export interface GTemplateGroup {
    group?: string;
    templates?: GTemplate[];
}

export interface GTemplate {
    id?: string;
    name?: string;
    description?: string;
    group?: string;
}

export interface ParamInfo {
    json?: string;
    selectedTmpIds: string[];
    options: Map<StaticRangeInit, Object>;
}


export interface GeneratedCode {
    tableName?: string;
    originTableName?: string;
    className?: string;
    classComment?: string;
    results: TmpData[];
}

export interface TmpData {
    tmpName?: string;
    tmpCode?: string;

}

