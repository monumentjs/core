import {EMPTY_STRING} from '../../../../core/main/constants';


export class HttpRequestAuthCredentials {
    public static readonly BLANK: HttpRequestAuthCredentials = new HttpRequestAuthCredentials(EMPTY_STRING, EMPTY_STRING);


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
