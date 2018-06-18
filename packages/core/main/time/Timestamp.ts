import {JSONSerializable} from '../JSONSerializable';
import {MILLISECONDS_IN_DAY, MILLISECONDS_IN_HOUR, MILLISECONDS_IN_MINUTE, MILLISECONDS_IN_SECOND} from './Constants';


export class Timestamp implements JSONSerializable<number> {
    public static compute(
        days: number = 0,
        hours: number = 0,
        minutes: number = 0,
        seconds: number = 0,
        milliseconds: number = 0
    ): Timestamp {
        let timestamp: number = 0;

        timestamp += days * MILLISECONDS_IN_DAY;
        timestamp += hours * MILLISECONDS_IN_HOUR;
        timestamp += minutes * MILLISECONDS_IN_MINUTE;
        timestamp += seconds * MILLISECONDS_IN_SECOND;
        timestamp += milliseconds;

        timestamp = Math.floor(timestamp);

        return new Timestamp(timestamp);
    }


    private readonly _value: number;


    public constructor(value: number) {
        this._value = value;
    }


    public valueOf(): number {
        return this._value;
    }


    public toJSON(): number {
        return this._value;
    }
}
