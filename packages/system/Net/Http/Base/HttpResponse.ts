import {HttpHeaders} from '../Headers/HttpHeaders';
import {HttpContent} from '../Content/HttpContent';
import {StatusCode} from './StatusCode';
import {Uri} from '../../Uri/Uri';
import {HttpMethod} from './HttpMethod';
import {HttpCookieCollection} from './HttpCookieCollection';


export class HttpResponse {
    private _url: Uri;
    private _method: HttpMethod;
    private _statusCode: StatusCode;
    private _statusMessage: string = '';
    private _headers: HttpHeaders = new HttpHeaders();
    private _cookies: HttpCookieCollection = new HttpCookieCollection();
    private _content: HttpContent | undefined;


    public get url(): Uri {
        return this._url;
    }


    public set url(value: Uri) {
        this._url = value;
    }


    public get method(): HttpMethod {
        return this._method;
    }


    public set method(value: HttpMethod) {
        this._method = value;
    }


    public get statusCode(): StatusCode {
        return this._statusCode;
    }


    public set statusCode(value: StatusCode) {
        this._statusCode = value;
    }


    public get statusMessage(): string {
        return this._statusMessage;
    }


    public set statusMessage(value: string) {
        this._statusMessage = value;
    }


    public get headers(): HttpHeaders {
        return this._headers;
    }


    public get cookies(): HttpCookieCollection {
        return this._cookies;
    }


    public get content(): HttpContent | undefined {
        return this._content;
    }


    public set content(value: HttpContent | undefined) {
        this._content = value;
    }


    public get hasContent(): boolean {
        return this.content != null;
    }


    public get isSuccessStatusCode(): boolean {
        return this.statusCode < 400;
    }


    public constructor(url: Uri | string, method: HttpMethod = HttpMethod.GET, statusCode: StatusCode = StatusCode.Ok, statusMessage: string = '') {
        this.url = Uri.cast(url);
        this.method = method;
        this.statusCode = statusCode;
        this.statusMessage = statusMessage;
    }
}
