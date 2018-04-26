import {RangeException} from '@monument/core/main/exceptions/RangeException';


export class RangeAssertion {
    private readonly _from: number;
    private readonly _to: number;


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
                `Invalid range of arguments "${minArgumentName}" and "${maxArgumentName}": ` +
                `value of minimal argument (${this._from}) is greater than value of maximal (${this._to}).`
            );
        }

        return this;
    }
}
