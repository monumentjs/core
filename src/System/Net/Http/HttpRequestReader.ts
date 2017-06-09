import {IncomingMessage} from 'http';
import {HttpMethod} from './HttpMethod';
import {TextTransform} from '../../../Core/Text/TextTransform';
import {Uri} from '../../Uri/Uri';
import {Encoding} from '../../Text/Encoding';
import {StreamReader} from '../../Stream/StreamReader';
import {HttpRequest} from './HttpRequest';


export class HttpRequestReader extends StreamReader<IncomingMessage, Buffer> {
    private _request: HttpRequest;


    public get isPaused(): boolean {
        return this.sourceStream.isPaused();
    }


    public get request(): HttpRequest {
        return this._request;
    }


    public constructor(sourceStream: IncomingMessage) {
        super(sourceStream);

        this._request = new HttpRequest(
            this.extractRequestUrl(),
            this.extractRequestMethod()
        );

        this.extractRequestHeaders();
    }


    public setEncoding(encoding: Encoding): void {
        this.sourceStream.setEncoding(encoding.encodingName);
    }


    protected async onRead(length: number): Promise<Buffer> {
        return this.sourceStream.read(length);
    }


    protected async onPause(): Promise<void> {
        this.sourceStream.pause();
    }


    protected async onResume(): Promise<void> {
        this.sourceStream.resume();
    }


    protected async onClose(): Promise<void> {
        this.sourceStream.destroy();
    }


    private extractRequestMethod(): HttpMethod {
        let enumKey: string = TextTransform.toCapitalCase(this.sourceStream.method);
        let requestMethod: HttpMethod = HttpMethod[enumKey];

        if (requestMethod == null) {
            return HttpMethod.Get;
        }

        return requestMethod;
    }


    private extractRequestUrl(): Uri {
        return new Uri(this.sourceStream.url);
    }


    private extractRequestHeaders(): void {
        Object.keys(this.sourceStream.headers).forEach((headerName: string) => {
            let headerValue: string = this.sourceStream.headers[headerName];

            this._request.headers.set(headerName, headerValue);
        });
    }
}
