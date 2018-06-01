

export interface UriAttributes {
    scheme: string;
    authority: string;
    userName: string;
    password: string;
    host: string;
    port: number | undefined;
    path: string;
    query: string;
    fragment: string;
}

