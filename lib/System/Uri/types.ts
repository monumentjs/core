



export interface IUriAttributes {
    scheme: string;
    authority: string;
    userName: string;
    password: string;
    host: string;
    port: number;
    path: string;
    query: string;
    fragment: string;
}


export interface IQueryMapper<F> {
    transform(rawQuery: any): F;
}

