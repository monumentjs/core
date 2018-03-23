import {TimeSpan} from '../../../../time/main/TimeSpan';
import {HttpHeaders} from '../Headers/HttpHeaders';
import {HeaderName} from '../Headers/HeaderName';
import {HttpCookie} from './HttpCookie';


export class HttpResponseCookie extends HttpCookie {
    private _domain: string | undefined;
    private _path: string | undefined;
    private _httpOnly: boolean;
    private _secure: boolean;
    private _maxAge: TimeSpan;


    public get domain(): string | undefined {
        return this._domain;
    }


    public get path(): string | undefined {
        return this._path;
    }


    public get httpOnly(): boolean {
        return this._httpOnly;
    }


    public get secure(): boolean {
        return this._secure;
    }


    public get maxAge(): TimeSpan {
        return this._maxAge;
    }


    public constructor(
        name: string,
        value: string,
        maxAge: TimeSpan,
        domain?: string,
        path?: string,
        httpOnly: boolean = false,
        secure: boolean = false
    ) {
        super(name, value);

        this._domain = domain;
        this._path = path;
        this._httpOnly = httpOnly;
        this._secure = secure;
        this._maxAge = maxAge;
    }


    public toString(): string {
        let value: string = `${this.name}=${this.value}`;

        if (this.path) {
            value += `; Path=${this.path}`;
        }

        if (this.domain) {
            value += `; Domain=${this.domain}`;
        }

        if (this.maxAge.isPositive) {
            value += `; Max-Age=${this.maxAge.totalSeconds}`;
            value += `; Expires=`;

            let headers: HttpHeaders = new HttpHeaders();
            let seconds: number = this.maxAge.totalMilliseconds;

            headers.expires = seconds > 0 ? Date.now() + seconds : 0;

            value += headers.getFirst(HeaderName.Expires);
        }

        if (this.secure) {
            value += `; Secure`;
        }

        if (this.httpOnly) {
            value += `; HttpOnly`;
        }

        return value;
    }
}
