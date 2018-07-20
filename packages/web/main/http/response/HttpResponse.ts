
/**
 * @immutable
 */
export interface HttpResponse {
    readonly url: string;

    setUrl(url: string): HttpResponse;
}
