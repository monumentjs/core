import {IncomingMessage} from 'http';
import {RequestMethod} from './RequestMethod';
import TextTransform from '../../../Core/Text/TextTransform';
import Uri from '../../Uri/Uri';
import {Encoding} from '../../Text/Encoding';
import Version from '../../../Core/Application/Version/Version';
import {ReleaseStatus} from '../../../Core/Application/Version/types';
import {StreamReader} from '../../Stream/StreamReader';
import {AsyncResult} from '../../../Core/types';


export default class HttpRequest extends StreamReader<IncomingMessage, Buffer> {
    private _httpVersion: Version;
    private _requestUri: Uri;
    private _startTime: number;
    private _endTime: number;
    private _requestMethod: RequestMethod;


    public get isPaused(): boolean {
        return this.sourceStream.isPaused();
    }


    public get startTime(): number {
        return this._startTime;
    }


    public get endTime(): number {
        return this._endTime;
    }


    public get method(): RequestMethod {
        return this._requestMethod;
    }


    public get uri(): Uri {
        return this._requestUri;
    }


    public get httpVersion(): Version {
        return this._httpVersion;
    }


    public constructor(sourceStream: IncomingMessage) {
        super(sourceStream);

        this._startTime = Date.now();

        this.extractRequestMethod();
        this.extractRequestUri();
        this.extractHttpVersion();
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


    private extractRequestMethod(): void {
        let methodName: string = TextTransform.toCapitalCase(this.sourceStream.method);

        this._requestMethod = RequestMethod[methodName];
    }


    private extractRequestUri(): void {
        this._requestUri = new Uri(this.sourceStream.url);
    }


    private extractHttpVersion(): void {
        this._httpVersion = new Version(
            this.sourceStream.httpVersionMajor,
            this.sourceStream.httpVersionMinor,
            0,
            ReleaseStatus.Stable
        );
    }

}