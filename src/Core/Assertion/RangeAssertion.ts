import {RangeException} from '../Exceptions/RangeException';


export class RangeAssertion {
    private _from: number;
    private _to: number;


    public constructor(from: number, to: number) {
        this._from = from;
        this._to = to;
    }


    public bounds(): this {
        if (this._from > this._to) {
            throw new RangeException(`Invalid range bounds.`);
        }

        return this;
    }


    public ofArguments(minArgumentName: string, maxArgumentName: string): this {
        if (this._from > this._to) {
            throw new RangeException(
                `Invalid range of arguments "${minArgumentName}" (minimal) and "${maxArgumentName}" (maximal): ` +
                `value of minimal argument (${this._from}) is greater than value of maximal (${this._to}).`
            );
        }

        return this;
    }
}
