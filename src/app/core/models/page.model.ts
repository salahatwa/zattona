export interface Page<T>{
    content?: Array<T>;
    empty?: boolean;
    first?: boolean;
    last?: boolean;
    size?: number;
    page?:number;
    pages?:number;
    total?: number;
}