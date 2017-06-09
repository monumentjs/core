import {Uri} from '../../Uri/Uri';
import {HttpMethod} from './HttpMethod';
import {HeadersCollection} from './HeadersCollection';
import {AcceptTypesCollection} from './AcceptTypesCollection';
import {AcceptTypesParser} from './AcceptTypesParser';


export class HttpRequest {
    private _httpMethod: HttpMethod;
    private _url: Uri;
    private _headers: HeadersCollection = new HeadersCollection();


    public get httpMethod(): HttpMethod {
        return this._httpMethod;
    }


    public get url(): Uri {
        return this._url;
    }


    public get headers(): HeadersCollection {
        return this._headers;
    }


    public get acceptTypes(): AcceptTypesCollection {
        let acceptHeaderValue: string = this._headers.find('Accept');
        let acceptTypesParser: AcceptTypesParser = new AcceptTypesParser();

        return acceptTypesParser.parse(acceptHeaderValue);
    }


    public get userAgent(): string {
        return this._headers.find('User-Agent');
    }


    public constructor(url: Uri, method: HttpMethod = HttpMethod.Get) {
        this._httpMethod = method;
        this._url = url;
    }
}
