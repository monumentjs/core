import {RandomValue} from './RandomValue';
import {ToJSON} from '../base/ToJSON';
import {ToString} from '../base/ToString';


/**
 * @author Alex Chugaev
 * @since 0.0.1
 */
export class RandomFloat implements RandomValue<number>, ToJSON<number>, ToString {
    private readonly _min: number;
    private readonly _max: number;
    private _value?: number;

    public get value(): number {
        if (this._value == null) {
            const random: number = Math.random();
            const rawValue: number = this._min + random * (this._max - this._min);

            this._value = rawValue;
        }

        return this._value;
    }

    public constructor();
    public constructor(min: number);
    public constructor(min: number, max: number);
    public constructor(min: number = Number.MIN_SAFE_INTEGER, max: number = Number.MAX_SAFE_INTEGER) {
        this._min = min;
        this._max = max;

    }

    public toJSON(): number {
        return this.value;
    }

    public toString(): string {
        return this.value.toString(10);
    }
}
