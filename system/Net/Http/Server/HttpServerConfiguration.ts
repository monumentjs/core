import {HttpRequestHandler} from './HttpRequestHandler';
import {HttpErrorHandler} from '../Base/HttpErrorHandler';
import {DefaultHttpErrorHandler} from '../Base/DefaultHttpErrorHandler';


export class HttpServerConfiguration {
    private _host: string;
    private _port: number;
    private _useSSL: boolean = false;
    private _backlogSize: number = 1000;
    private _maxHeadersCount: number = 1000;
    private _requestTimeout: number = 60 * 1000;
    private _keepAliveTimeout: number = 5 * 60 * 1000;
    private _requestHandler: HttpRequestHandler;
    private _errorHandler: HttpErrorHandler = new DefaultHttpErrorHandler();


    public get host(): string {
        return this._host;
    }


    public set host(value: string) {
        this._host = value;
    }


    public get port(): number {
        return this._port;
    }


    public set port(value: number) {
        this._port = value;
    }


    public get useSSL(): boolean {
        return this._useSSL;
    }


    public set useSSL(value: boolean) {
        this._useSSL = value;
    }


    public get backlogSize(): number {
        return this._backlogSize;
    }


    public set backlogSize(value: number) {
        this._backlogSize = value;
    }


    public get maxHeadersCount(): number {
        return this._maxHeadersCount;
    }


    public set maxHeadersCount(value: number) {
        this._maxHeadersCount = value;
    }


    public get requestTimeout(): number {
        return this._requestTimeout;
    }


    public set requestTimeout(value: number) {
        this._requestTimeout = value;
    }


    public get keepAliveTimeout(): number {
        return this._keepAliveTimeout;
    }


    public set keepAliveTimeout(value: number) {
        this._keepAliveTimeout = value;
    }


    public get requestHandler(): HttpRequestHandler {
        return this._requestHandler;
    }


    public set requestHandler(value: HttpRequestHandler) {
        this._requestHandler = value;
    }


    public get errorHandler(): HttpErrorHandler {
        return this._errorHandler;
    }


    public set errorHandler(value: HttpErrorHandler) {
        this._errorHandler = value;
    }


    public constructor(requestHandler: HttpRequestHandler, host: string, port: number) {
        this._host = host;
        this._port = port;
        this._requestHandler = requestHandler;
    }
}
