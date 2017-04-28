import {assertArgumentNotNull} from '../../../Core/Assertion/Assert';


export class HttpServerConfiguration {
    private _host: string;
    private _port: number;
    private _backlogSize: number = 1000;
    private _maxHeadersCount: number = 1000;
    private _requestTimeout: number = 60000;


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


    public get backlogSize(): number {
        return this._backlogSize;
    }


    public set backlogSize(value: number) {
        assertArgumentNotNull('value', value);

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


    public constructor(host: string, port: number) {
        assertArgumentNotNull('host', host);
        assertArgumentNotNull('port', port);

        this._host = host;
        this._port = port;
    }
}