import { IFormattable, IJSONSerializable, ICloneable } from '../../Core/types';
import { URLAttributes } from './types';
export default class URL implements IFormattable, ICloneable<URL>, IJSONSerializable<URLAttributes> {
    static parse(url: string): URL;
    static validate(url: string): boolean;
    private _protocol;
    private _host;
    private _port;
    private _path;
    private _search;
    private _hash;
    readonly isProtocolSafe: boolean;
    protocol: string;
    host: string;
    port: number;
    path: string;
    search: string;
    hash: string;
    constructor(url?: string);
    toString(): string;
    toJSON(): URLAttributes;
    clone(): URL;
    protected normalizePath(path?: string): string;
    protected normalizePort(port: string): number;
}
