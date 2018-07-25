import {RangeException} from '../exceptions/RangeException';
import {IndexOutOfBoundsException} from '../exceptions/IndexOutOfBoundsException';
import {Countable} from '../collection/Countable';


export class PropertyAssertion {
    private readonly _propertyName: string;
    private readonly _propertyValue: any;


    public constructor(propertyName: string, propertyValue: any) {
        this._propertyName = propertyName;
        this._propertyValue = propertyValue;
    }


    public bounds(min: number, max: number): this {
        if (this._propertyValue < min || this._propertyValue > max) {
            throw new RangeException(
                `Invalid property ${this._propertyName}: ` +
                `Value (${this._propertyValue}) is out of bounds: min=${min}, max=${max}.`
            );
        }

        return this;
    }


    public indexBounds(min: number, max: number): this {
        if (this._propertyValue < min || this._propertyValue >= max) {
            throw new IndexOutOfBoundsException(
                `Invalid property ${this._propertyName}: ` +
                `Value (${this._propertyValue}) is out of bounds: min=${min}, max=${max}.`
            );
        }

        return this;
    }


    public isLength(): this {
        if (!isFinite(this._propertyValue) || isNaN(this._propertyValue) || this._propertyValue < 0) {
            throw new RangeException(
                `Invalid property ${this._propertyName}: ` +
                `Value (${this._propertyValue}) is not a valid length.`
            );
        }

        return this;
    }


    public isIndexOf(sequence: Countable): this {
        if (this._propertyValue < 0 || this._propertyValue >= sequence.length) {
            throw new IndexOutOfBoundsException(
                `Invalid property '${this._propertyName}': ` +
                `Index (${this._propertyValue}) is out of bounds [0, ${sequence.length}).`
            );
        }

        return this;
    }


    public isIndex(): this {
        if (this._propertyValue < 0) {
            throw new IndexOutOfBoundsException(
                `Invalid property '${this._propertyName}': ` +
                `Index (${this._propertyValue}) is out of bounds [0, +Infinity).`
            );
        }

        return this;
    }
}
