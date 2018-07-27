import {DefaultAttributeAccessor} from '@monument/core/main/object-model/attributes/support/DefaultAttributeAccessor';
import {HttpResponse} from './HttpResponse';
import {ServerResponse} from 'http';
import {Http2ServerResponse} from 'http2';


export class ServerResponseWrapper extends DefaultAttributeAccessor implements HttpResponse {
    private readonly _response: ServerResponse | Http2ServerResponse;

    public get statusCode(): number {
        return this._response.statusCode;
    }

    public constructor(response: ServerResponse | Http2ServerResponse) {
        super();
        this._response = response;
    }
}
