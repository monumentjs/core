import * as net from 'net';


export class ProcessMessage {
    private _message: object | string | number;
    private _handle: net.Socket | net.Server | undefined;
    private _keepOpen: boolean = false;


    public get message(): object | string | number {
        return this._message;
    }


    public set message(value: object | string | number) {
        this._message = value;
    }


    public get handle(): net.Socket | net.Server | undefined {
        return this._handle;
    }


    public set handle(value: net.Socket | net.Server | undefined) {
        this._handle = value;
    }


    public get keepOpen(): boolean {
        return this._keepOpen;
    }


    public set keepOpen(value: boolean) {
        this._keepOpen = value;
    }


    public constructor(message: object | string | number) {
        this._message = message;
    }
}
