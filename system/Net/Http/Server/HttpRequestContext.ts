import {IncomingMessage, ServerResponse} from 'http';
import {CancellationSupport} from '@monument/core/main/CancellationSupport';
import {HttpRequestInputStream} from './HttpRequestInputStream';
import {HttpResponseOutputStream} from './HttpResponseOutputStream';
import {HttpRequestExtractor} from './HttpRequestExtractor';
import {HttpRequest} from '../Base/HttpRequest';
import {HttpResponse} from '../Base/HttpResponse';


export class HttpRequestContext extends CancellationSupport {
    private _requestStream: HttpRequestInputStream;
    private _responseStream: HttpResponseOutputStream;
    private _request: HttpRequest;
    private _response: HttpResponse;


    public get isCancellable(): boolean {
        return true;
    }


    public get requestStream(): HttpRequestInputStream {
        return this._requestStream;
    }


    public get responseStream(): HttpResponseOutputStream {
        return this._responseStream;
    }


    public get request(): HttpRequest {
        return this._request;
    }


    public get response(): HttpResponse {
        return this._response;
    }


    public constructor(request: IncomingMessage, response: ServerResponse) {
        super();

        let requestExtractor: HttpRequestExtractor = HttpRequestExtractor.instance;

        this._requestStream = new HttpRequestInputStream(request);
        this._responseStream = new HttpResponseOutputStream(response);
        this._request = requestExtractor.extract(request);
        this._response = new HttpResponse(this._request.url, this._request.method);
    }
}
