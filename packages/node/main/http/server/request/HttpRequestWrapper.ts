import {HttpRequest} from './HttpRequest';


export abstract class HttpRequestWrapper implements HttpRequest {
    private readonly _request: HttpRequest;

    public get method(): string {
        return this._request.method;
    }

    public get url(): string {
        return this._request.url;
    }

    protected constructor(request: HttpRequest) {
        this._request = request;
    }
}
