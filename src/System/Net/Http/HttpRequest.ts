import {IncomingMessage} from 'http';
import {RequestMethod} from './RequestMethod';
import {TextTransform} from '../../../Core/Text/TextTransform';
import {Uri} from '../../Uri/Uri';
import {Encoding} from '../../Text/Encoding';
import {Version} from '../../../Core/Version/Version';
import {ReleaseStatus} from '../../../Core/Version/types';
import {StreamReader} from '../../Stream/StreamReader';
import {AsyncResult} from '../../../Core/types';
import {HeadersCollection} from './HeadersCollection';


export class HttpRequest extends StreamReader<IncomingMessage, Buffer> {
    private _httpVersion: Version;
    private _requestUri: Uri;
    private _requestMethod: RequestMethod;
    private _headers: HeadersCollection;


    public get isPaused(): boolean {
        return this.sourceStream.isPaused();
    }


    public get method(): RequestMethod {
        if (this._requestMethod == null) {
            this._requestMethod = this.extractRequestMethod();
        }

        return this._requestMethod;
    }


    public get uri(): Uri {
        if (this._requestUri == null) {
            this._requestUri = this.extractRequestUri();
        }

        return this._requestUri;
    }


    public get httpVersion(): Version {
        if (this._httpVersion == null) {
            this._httpVersion = this.extractHttpVersion();
        }

        return this._httpVersion;
    }


    public get headers(): HeadersCollection {
        if (this._headers == null) {
            this._headers = this.extractHeaders();
        }

        return this._headers;
    }


    public setEncoding(encoding: Encoding): void {
        this.sourceStream.setEncoding(encoding.encodingName);
    }


    protected async onRead(length: number): AsyncResult<Buffer> {
        return this.sourceStream.read(length);
    }


    protected async onPause(): AsyncResult<void> {
        this.sourceStream.pause();
    }


    protected async onResume(): AsyncResult<void> {
        this.sourceStream.resume();
    }


    protected async onClose(): AsyncResult<void> {
        this.sourceStream.destroy();
    }


    private extractRequestMethod(): RequestMethod {
        let enumKey: string = TextTransform.toCapitalCase(this.sourceStream.method);
        let requestMethod: RequestMethod = RequestMethod[enumKey];

        if (requestMethod == null) {
            return RequestMethod.Get;
        }

        return requestMethod;
    }


    private extractRequestUri(): Uri {
        return new Uri(this.sourceStream.url);
    }


    private extractHttpVersion(): Version {
        return new Version(
            this.sourceStream.httpVersionMajor,
            this.sourceStream.httpVersionMinor,
            0,
            ReleaseStatus.Stable
        );
    }


    private extractHeaders(): HeadersCollection {
        let headers: HeadersCollection = new HeadersCollection();

        Object.keys(this.sourceStream.headers).forEach((headerName: string) => {
            let headerValue: string = this.sourceStream.headers[headerName];

            headers.set(headerName, headerValue);
        });

        return headers;
    }
}
