import {ZERO} from '../../Constants';


export class RepeatableNumberGenerator {
    private readonly _max: number;
    private _value: number = ZERO;


    public constructor(max: number = Number.MAX_SAFE_INTEGER) {
        this._max = max;
    }


    public next(): number {
        this._value++;

        if (this._value >= this._max) {
            this._value = 0;
        }

        return this._value;
    }
}
