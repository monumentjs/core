import {ComparisonResult} from '../utils/comparison/ComparisonResult';
import {Equatable} from '../utils/comparison/Equatable';
import {Comparable} from '../utils/comparison/Comparable';
import {Time} from './Time';
import {MILLISECONDS_IN_HOUR, MILLISECONDS_IN_MINUTE, MILLISECONDS_IN_SECOND} from './Constants';


export class Duration implements Time, Equatable<Duration>, Comparable<Duration> {
    public static readonly ZERO: Duration = new Duration();

    public readonly hours: number;
    public readonly milliseconds: number;
    public readonly minutes: number;
    public readonly seconds: number;

    public readonly totalMilliseconds: number;
    public readonly totalSeconds: number;
    public readonly totalMinutes: number;
    public readonly totalHours: number;


    public constructor(hours: number = 0, minutes: number = 0, seconds: number = 0, milliseconds: number = 0) {
        const totalMilliseconds: number = milliseconds + seconds * MILLISECONDS_IN_SECOND + minutes * MILLISECONDS_IN_MINUTE + hours * MILLISECONDS_IN_HOUR;

        this.hours = Math.floor(totalMilliseconds / MILLISECONDS_IN_HOUR);
        this.minutes = Math.floor((totalMilliseconds - this.hours * MILLISECONDS_IN_HOUR) / MILLISECONDS_IN_MINUTE);
        this.seconds = Math.floor((totalMilliseconds - this.hours * MILLISECONDS_IN_HOUR - this.minutes * MILLISECONDS_IN_MINUTE) / MILLISECONDS_IN_SECOND);
        this.milliseconds = totalMilliseconds % MILLISECONDS_IN_SECOND;

        this.totalMilliseconds = totalMilliseconds;
        this.totalSeconds = totalMilliseconds / MILLISECONDS_IN_SECOND;
        this.totalMinutes = totalMilliseconds / MILLISECONDS_IN_MINUTE;
        this.totalHours = totalMilliseconds / MILLISECONDS_IN_HOUR;
    }


    public compareTo(other: Duration): ComparisonResult {
        if (this.totalMilliseconds > other.totalMilliseconds) {
            return ComparisonResult.GREATER;
        }

        if (this.totalMilliseconds < other.totalMilliseconds) {
            return ComparisonResult.LESS;
        }

        return ComparisonResult.EQUALS;
    }


    public equals(other: Duration): boolean {
        return this.totalMilliseconds === other.totalMilliseconds;
    }
}
