import {assertArgumentNotNull} from '../../../Core/Assertion/Assert';


export default class HttpServerStartInfo {
    private _host: string;
    private _port: number;
    private _backlogSize: number = 10 ** 3;


    public get host(): string {
        return this._host;
    }


    public get port(): number {
        return this._port;
    }


    public get backlogSize(): number {
        return this._backlogSize;
    }


    public set backlogSize(value: number) {
        assertArgumentNotNull('value', value);

        this._backlogSize = value;
    }


    public constructor(host: string, port: number) {
        assertArgumentNotNull('host', host);
        assertArgumentNotNull('port', port);

        this._host = host;
        this._port = port;
    }
}