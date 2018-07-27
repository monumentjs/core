import {StringPool} from '@monument/core/main/StringPool';
import {DefaultAttributeAccessor} from '@monument/core/main/object-model/attributes/support/DefaultAttributeAccessor';
import {HttpRequest} from './HttpRequest';
import {IncomingMessage} from 'http';
import {Http2ServerRequest} from 'http2';


export class ServerRequestWrapper extends DefaultAttributeAccessor implements HttpRequest {
    private readonly _request: IncomingMessage | Http2ServerRequest;

    public get method(): string {
        return this._request.method || StringPool.BLANK;
    }

    public get url(): string {
        return this._request.url || StringPool.BLANK;
    }

    public constructor(request: IncomingMessage | Http2ServerRequest) {
        super();
        this._request = request;
    }
}
