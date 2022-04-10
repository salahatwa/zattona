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
    input?: string;
    selectedTmpIds?: [];
    options?: {};
}

export interface ParamRqInfo {
    input?: string;
    selectedTmpIds?: [];
    options?: Options;
}

export interface Options {
    authorName?: string;
    packageName?: string;
    returnUtilSuccess?: string;
    returnUtilFailure?: string;
    ignorePrefix?: string;
    dataType?: string;

    tinyintTransType?: string;
    timeTransType?: string;
    nameCaseType?: string;

    isSwagger?: boolean;
    isLombok?: boolean;
    isComment?: boolean;
    isAutoImport?: boolean;
    isWithPackage?: boolean;
    isPackageType?: boolean;
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

