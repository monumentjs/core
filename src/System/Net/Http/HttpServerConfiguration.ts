import {Assert} from '../../../Core/Assertion/Assert';
import {IHttpRequestHandler} from './IHttpRequestHandler';
import {IHttpErrorHandler} from './IHttpErrorHandler';
import {HttpErrorHandler} from './HttpErrorHandler';


export class HttpServerConfiguration {
    private _host: string;
    private _port: number;
    private _backlogSize: number = 1000;
    private _maxHeadersCount: number = 1000;
    private _requestTimeout: number = 60 * 1000;
    private _keepAliveTimeout: number = 5 * 60 * 1000;
    private _requestHandler: IHttpRequestHandler;
    private _errorHandler: IHttpErrorHandler;


    public get host(): string {
        return this._host;
    }


    public set host(value: string) {
        Assert.argument('value', value).notNull();

        this._host = value;
    }


    public get port(): number {
        return this._port;
    }


    public set port(value: number) {
        Assert.argument('value', value).notNull();

        this._port = value;
    }


    public get backlogSize(): number {
        return this._backlogSize;
    }


    public set backlogSize(value: number) {
        Assert.argument('value', value).notNull().bounds(1, Infinity);

        this._backlogSize = value;
    }


    public get maxHeadersCount(): number {
        return this._maxHeadersCount;
    }


    public set maxHeadersCount(value: number) {
        Assert.argument('value', value).notNull().bounds(1, Infinity);

        this._maxHeadersCount = value;
    }


    public get requestTimeout(): number {
        return this._requestTimeout;
    }


    public set requestTimeout(value: number) {
        Assert.argument('value', value).notNull();

        this._requestTimeout = value;
    }


    public get keepAliveTimeout(): number {
        return this._keepAliveTimeout;
    }


    public set keepAliveTimeout(value: number) {
        Assert.argument('value', value).notNull();

        this._keepAliveTimeout = value;
    }


    public get requestHandler(): IHttpRequestHandler {
        return this._requestHandler;
    }


    public set requestHandler(value: IHttpRequestHandler) {
        Assert.argument('value', value).notNull();

        this._requestHandler = value;
    }


    public get errorHandler(): IHttpErrorHandler {
        return this._errorHandler;
    }


    public set errorHandler(value: IHttpErrorHandler) {
        Assert.argument('value', value).notNull();

        this._errorHandler = value;
    }


    public constructor(host: string, port: number) {
        Assert.argument('host', host).notNull();
        Assert.argument('port', port).notNull().bounds(0, Math.pow(2, 16) - 1);

        this._host = host;
        this._port = port;

        this._errorHandler = new HttpErrorHandler();
    }
}