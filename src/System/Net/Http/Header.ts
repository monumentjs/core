import {Assert} from '../../../Core/Assertion/Assert';
import {InvalidArgumentException} from '../../../Core/Exceptions/InvalidArgumentException';


export class Header {
    private _name: string;
    private _value: string;


    public get name(): string {
        return this._name;
    }


    public get value(): string {
        return this._value;
    }


    public constructor(headerName: string, headerValue: string) {
        Assert.argument('headerName', headerName).notNull();
        Assert.argument('headerValue', headerValue).notNull();

        if (headerName.length === 0) {
            throw new InvalidArgumentException(`Header name cannot be empty.`);
        }

        this._name = headerName;
        this._value = headerValue;
    }
}