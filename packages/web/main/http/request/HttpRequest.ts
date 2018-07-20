
/**
 * @immutable
 */
export interface HttpRequest {
    readonly url: string;

    setUrl(url: string): HttpRequest;
}
