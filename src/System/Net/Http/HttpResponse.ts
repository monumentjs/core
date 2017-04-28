import {HeadersCollection} from './HeadersCollection';
import {HttpContent} from './HttpContent';
import {assertArgumentNotNull} from '../../../Core/Assertion/Assert';
import {StatusCode} from './StatusCode';


export class HttpResponse {
    private _statusCode: StatusCode;
    private _statusMessage: string = '';
    private _headers: HeadersCollection = new HeadersCollection();
    private _content: HttpContent;


    public get statusCode(): StatusCode {
        return this._statusCode;
    }


    public set statusCode(value: StatusCode) {
        assertArgumentNotNull('value', value);

        this._statusCode = value;
    }


    public get statusMessage(): string {
        return this._statusMessage;
    }


    public set statusMessage(value: string) {
        assertArgumentNotNull('value', value);

        this._statusMessage = value;
    }


    public get headers(): HeadersCollection {
        return this._headers;
    }


    public get content(): HttpContent {
        return this._content;
    }


    public set content(value: HttpContent) {
        this._content = value;
    }


    public get hasContent(): boolean {
        return !!this.content;
    }


    public get isSuccessStatusCode(): boolean {
        return this.statusCode < 400;
    }


    public constructor(statusCode: StatusCode = StatusCode.Ok) {
        this._statusCode = statusCode;
    }
}
