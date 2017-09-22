import {InvalidArgumentException} from '../Exceptions/InvalidArgumentException';
import {ArgumentNullException} from '../Exceptions/ArgumentNullException';
import {ArgumentTypeException} from '../Exceptions/ArgumentTypeException';
import {ArgumentRangeException} from '../Exceptions/ArgumentRangeException';
import {ArgumentIndexOutOfBoundsException} from '../Exceptions/ArgumentIndexOutOfBoundsException';
import {EMPTY_STRING} from '../Text/constants';
import {Constructor} from '../Core/Types/Constructor';


export class ArgumentAssertion {
    private _argumentName: string;
    private _argumentValue: any;


    public constructor(argumentName: string, argumentValue: any) {
        if (argumentName.length === 0) {
            throw new InvalidArgumentException('argumentName', 'Cannot be empty.');
        }

        this._argumentName = argumentName;
        this._argumentValue = argumentValue;
    }


    public notNull(): this {
        if (this._argumentValue == null) {
            throw new ArgumentNullException(this._argumentName);
        }

        return this;
    }


    public notEmptyString(): this {
        if (this._argumentValue === EMPTY_STRING) {
            throw new InvalidArgumentException(this._argumentName, `Value can not be empty string.`);
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
            throw new ArgumentRangeException(this._argumentName, min, max);
        }

        return this;
    }


    public indexBounds(min: number, max: number): this {
        if (this._argumentValue < min || this._argumentValue >= max) {
            throw new ArgumentIndexOutOfBoundsException(
                this._argumentName,
                this._argumentValue,
                min,
                max
            );
        }

        return this;
    }


    public isLength(): this {
        if (!isFinite(this._argumentValue) || isNaN(this._argumentValue) || this._argumentValue < 0) {
            const ex = new ArgumentRangeException(this._argumentName, 0, Infinity);

            ex.message = `Value is not a valid length.`;

            throw ex;
        }

        return this;
    }


    public isIndexOf(sequence: ArrayLike<any>): this {
        if (this._argumentValue < 0 || this._argumentValue >= sequence.length) {
            throw new ArgumentIndexOutOfBoundsException(
                this._argumentName,
                this._argumentValue,
                0,
                sequence.length
            );
        }

        return this;
    }


    public isIndex(): this {
        if (this._argumentValue < 0) {
            throw new ArgumentIndexOutOfBoundsException(
                this._argumentName,
                this._argumentValue,
                0,
                Infinity
            );
        }

        return this;
    }
}
