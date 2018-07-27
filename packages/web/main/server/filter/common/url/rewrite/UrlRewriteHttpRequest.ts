import {HttpRequestWrapper} from '@monument/node/main/http/server/request/HttpRequestWrapper';
import {HttpRequest} from '@monument/node/main/http/server/request/HttpRequest';


export class UrlRewriteHttpRequest extends HttpRequestWrapper {
    private readonly _url: string;

    public get url(): string {
        return this._url;
    }

    public constructor(request: HttpRequest, url: string) {
        super(request);
        this._url = url;
    }
}
