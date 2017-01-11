

export const URL_PATTERN = /^(((\w+):)?(\/\/))?([^\/:]+)?(:(\d+))?(\/[^?#]+)?(\?([^#]+))?(#(.*))?$/;


export type URLAttributes = {
    protocol?: string,
    host?: string,
    port?: number,
    path: string,
    search?: string,
    hash?: string
};


export interface IQueryMapper<F> {
    transform(rawQuery: any): F;
}

