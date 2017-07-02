import {RangeException} from '../Exceptions/RangeException';


export class NumberAssertion {
    private _value: number;


    public constructor(value: number) {
        this._value = value;
    }


    public isLength(): this {
        if (this._value < 0) {
            throw new RangeException(`Given value (${this._value}) is not a valid length.`);
        }

        return this;
    }
}
