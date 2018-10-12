

export interface UriComponents {
    readonly schema?: string;
    readonly userName?: string;
    readonly password?: string;
    readonly host?: string;
    readonly port?: number;
    readonly path?: string;
    readonly fragment?: string;
    readonly queryParameters: ReadOnlyMultiValueMap<string, string>;
}
