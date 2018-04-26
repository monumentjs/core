import {ComparisonResult} from '@monument/core/main/ComparisonResult';
import {Equatable} from '@monument/core/main/Equatable';
import {Comparable} from '@monument/core/main/Comparable';
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
        this.hours = hours;
        this.minutes = minutes;
        this.seconds = seconds;
        this.milliseconds = milliseconds;

        this.totalMilliseconds = hours * MILLISECONDS_IN_HOUR + minutes * MILLISECONDS_IN_MINUTE + seconds * MILLISECONDS_IN_SECOND + milliseconds;
        this.totalSeconds = this.totalMilliseconds / MILLISECONDS_IN_SECOND;
        this.totalMinutes = this.totalMilliseconds / MILLISECONDS_IN_MINUTE;
        this.totalHours = this.totalMilliseconds / MILLISECONDS_IN_HOUR;
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
