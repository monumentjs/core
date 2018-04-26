import * as http from 'http';
import {DeferredObject} from '../../../../async/main/DeferredObject';
import {AbstractOutputStream} from '../../../Stream/AbstractOutputStream';
import {Encoding} from '../../../Text/Encoding';
import {Uri} from '../../Uri/Uri';
import {HttpMethod} from '../Base/HttpMethod';
import {HttpCookies} from '../Base/HttpCookies';
import {HeaderName} from '../Headers/HeaderName';
import {HttpHeaders} from '../Headers/HttpHeaders';
import {EMPTY_STRING} from '@monument/core/main/constants';


export class HttpRequestOutputStream extends AbstractOutputStream<Buffer, http.ClientRequest> {
    private _method: HttpMethod;
    private _url: Uri;
    private _response: DeferredObject<http.IncomingMessage>;


    public get url(): Uri {
        return this._url;
    }


    public get method(): HttpMethod {
        return this._method;
    }


    public get response(): Promise<http.IncomingMessage> {
        return this._response.promise;
    }


    public constructor(method: HttpMethod, url: Uri | string) {
        url = Uri.cast(url);

        super(http.request({
            method: method,
            host: url.host,
            port: url.port,
            path: url.path + (url.query.isEmpty ? EMPTY_STRING : '?' + url.query),
            auth: url.auth,
            protocol: url.scheme
        }));

        this._method = method;
        this._url = url;
        this._response = new DeferredObject();

        this.baseStream.on('response', (incomingMessage: http.IncomingMessage) => {
            this._response.resolve(incomingMessage);
        });

        this.baseStream.on('error', (error: Error) => {
            this._response.reject(error);
        });
    }


    public setHeaders(headers: HttpHeaders) {
        for (let entry of headers) {
            let name = entry.key;
            let values = entry.value;

            if (values.length > 1) {
                this.baseStream.setHeader(name, values.toArray());
            } else if (values.length === 1) {
                this.baseStream.setHeader(name, values.getAt(0));
            }
        }
    }


    public setCookies(cookies: HttpCookies) {
        for (let cookie of cookies) {
            this.baseStream.setHeader(HeaderName.Cookie, cookie.toString());
        }
    }
}
