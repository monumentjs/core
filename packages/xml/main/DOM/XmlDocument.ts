import {XmlNode} from './XmlNode';


export class XmlDocument extends XmlNode {
    private _version: string = '';
    private _encoding: string = '';


    public get version(): string {
        return this._version;
    }


    public set version(value: string) {
        this._version = value;
    }


    public get encoding(): string {
        return this._encoding;
    }


    public set encoding(value: string) {
        this._encoding = value;
    }


    public constructor() {
        super('');
    }
}
