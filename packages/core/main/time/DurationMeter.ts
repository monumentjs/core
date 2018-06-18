import {InvalidStateException} from '../exceptions/InvalidStateException';
import {Duration} from './Duration';


export class DurationMeter {
    private _from: number | undefined;
    private _to: number | undefined;
    private _duration: Duration | undefined;


    public get duration(): Duration {
        if (this._duration == null) {
            throw new InvalidStateException('Unable to measure duration: time range is not defined yet.');
        }

        return this._duration;
    }


    public start(): void {
        if (this._from != null) {
            throw new InvalidStateException('Duration meter has already started.');
        }

        if (this._to != null) {
            throw new InvalidStateException('Duration meter has ended.');
        }

        this._from = Date.now();
    }


    public end(): void {
        if (this._from == null) {
            throw new InvalidStateException('Duration meter has not started yet.');
        }

        if (this._to != null) {
            throw new InvalidStateException('Duration meter has already ended.');
        }

        this._to = Date.now();
        this._duration = new Duration(0, 0, 0, this._to - this._from);
    }
}
