import {IJSONSerializable, ICloneable} from '../../Core/types';
import {URLAttributes, URL_PATTERN} from './types';


export default class URL implements ICloneable<URL>, IJSONSerializable<URLAttributes> {
    public static parse(url: string): URL {
        return new URL(url);
    }


    public static validate(url: string): boolean {
        return URL_PATTERN.test(url);
    }


    private _protocol: string;
    private _host: string;
    private _port: number;
    private _path: string;
    private _search: string;
    private _hash: string;


    get isProtocolSafe(): boolean {
        return !this._protocol;
    }


    get protocol(): string {
        return this._protocol;
    }


    set protocol(value: string) {
        this._protocol = value;
    }


    get host(): string {
        return this._host;
    }


    set host(value: string) {
        this._host = value;
    }


    get port(): number {
        return this._port;
    }


    set port(value: number) {
        this._port = value;
    }


    get path(): string {
        return this._path;
    }


    set path(value: string) {
        this._path = value;
    }


    get search(): string {
        return this._search;
    }


    set search(value: string) {
        this._search = value;
    }


    get hash(): string {
        return this._hash;
    }


    set hash(value: string) {
        this._hash = value;
    }


    constructor(url: string = '/') {
        let components: RegExpExecArray = URL_PATTERN.exec(url);

        if (!components) {
            this._path = '/';
            return;
        }

        this._protocol = components[3];
        this._host = components[5];
        this._port = this.normalizePort(components[7]);
        this._path = this.normalizePath(components[8]);
        this._search = components[10];
        this._hash = components[12];
    }


    public toString(): string {
        let components: string[] = [];

        if (this._host) {
            if (this._protocol) {
                components.push(this._protocol + '://');
            } else {
                components.push('//');
            }

            components.push(this._host);
        }

        if (this._host && this._port) {
            components.push(':' + this._port);
        }

        components.push(this._path);

        if (this._host && this._search) {
            components.push('?' + this._search);
        }

        if (this._host && this._hash) {
            components.push('#' + this._hash);
        }

        return components.join('');
    }


    public toJSON(): URLAttributes {
        return {
            protocol: this._protocol,
            host: this._host,
            port: this._port,
            path: this._path,
            search: this._search,
            hash: this._hash
        };
    }


    public clone(): URL {
        return new URL(this.toString());
    }


    // TODO: use Path class to work with URL's path
    protected normalizePath(path: string = '/'): string {
        return path;
    }


    protected normalizePort(port: string): number {
        if (!port) {
            return undefined;
        }

        let num: number = parseInt(port, 10);

        if (isNaN(num)) {
            return undefined;
        }

        return num;
    }
}