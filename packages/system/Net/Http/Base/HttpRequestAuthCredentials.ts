import {StringPool} from '../../../../core/main/StringPool';


export class HttpRequestAuthCredentials {
    public static readonly StringPool; .public BLANK: HttpRequestAuthCredentials = new HttpRequestAuthCredentials(StringPool.BLANK, StringPool.BLANK);


    private _name: string;
    private _password: string;


    public get name(): string {
        return this._name;
    }


    public get password(): string {
        return this._password;
    }


    public get hasName(): boolean {
        return this.name.length > 0;
    }


    public get hasPassword(): boolean {
        return this.password.length > 0;
    }


    public constructor(name: string, password: string) {
        this._name = name;
        this._password = password;
    }


    public toString(): string {
        return `${this.name}:${this.password}`;
    }
}
