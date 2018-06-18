import {RangeException} from '../exceptions/RangeException';


export class NumberAssertion {
    private readonly _value: number;


    public constructor(value: number) {
        this._value = value;
    }


    public isIndex(): this {
        if (this._value < 0) {
            throw new RangeException(`Value (${this._value}) is not a valid index.`);
        }

        return this;
    }


    public isLength(): this {
        if (this._value < 0) {
            throw new RangeException(`Value (${this._value}) is not a valid length.`);
        }

        return this;
    }
}
