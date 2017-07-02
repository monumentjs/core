import {ArgumentNullException} from '../Exceptions/ArgumentNullException';
import {RangeException} from '../Exceptions/RangeException';
import {IndexOutOfBoundsException} from '../Exceptions/IndexOutOfBoundsException';
import {Constructor} from '../types';
import {ArgumentTypeException} from '../Exceptions/ArgumentTypeException';
import {IEnumerable} from '../Collections/IEnumerable';


export class ArgumentAssertion {
    private _argumentName: string;
    private _argumentValue: any;


    public constructor(argumentName: string, argumentValue: any) {
        this._argumentName = argumentName;
        this._argumentValue = argumentValue;
    }


    public notNull(): this {
        if (this._argumentValue == null) {
            throw new ArgumentNullException(this._argumentName);
        }

        return this;
    }


    public type(argumentClass: Constructor<any>): this {
        if (!(this._argumentValue instanceof argumentClass)) {
            throw new ArgumentTypeException(this._argumentName, argumentClass);
        }

        return this;
    }


    public bounds(min: number, max: number): this {
        if (this._argumentValue < min || this._argumentValue > max) {
            throw new RangeException(
                `Invalid argument ${this._argumentName}: ` +
                `Value (${this._argumentValue}) is out of bounds: min=${min}, max=${max}.`
            );
        }

        return this;
    }


    public indexBounds(min: number, max: number): this {
        if (this._argumentValue < min || this._argumentValue >= max) {
            throw new IndexOutOfBoundsException(
                `Invalid argument ${this._argumentName}: ` +
                `Value (${this._argumentValue}) is out of bounds: min=${min}, max=${max}.`
            );
        }

        return this;
    }


    public isLength(): this {
        if (!isFinite(this._argumentValue) || isNaN(this._argumentValue) || this._argumentValue < 0) {
            throw new RangeException(
                `Invalid argument ${this._argumentName}: ` +
                `Value (${this._argumentValue}) is not a valid length.`
            );
        }

        return this;
    }


    public isIndexOf(sequence: IEnumerable<any>): this {
        if (this._argumentValue < 0 || this._argumentValue >= sequence.length) {
            throw new IndexOutOfBoundsException(
                `Invalid argument '${this._argumentName}': ` +
                `Index (${this._argumentValue}) is out of bounds [0, ${sequence.length}).`
            );
        }

        return this;
    }


    public isIndex(): this {
        if (this._argumentValue < 0) {
            throw new IndexOutOfBoundsException(
                `Invalid argument '${this._argumentName}': ` +
                `Index (${this._argumentValue}) is out of bounds [0, +Infinity).`
            );
        }

        return this;
    }
}
