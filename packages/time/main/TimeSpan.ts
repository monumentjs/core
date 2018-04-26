import {Cloneable} from '@monument/core/main/Cloneable';
import {Comparable} from '@monument/core/main/Comparable';
import {Equatable} from '@monument/core/main/Equatable';
import {Formattable} from '@monument/core/main/Formattable';
import {ComparisonResult} from '@monument/core/main/ComparisonResult';
import {Map} from '@monument/collections/main/Map';
import {ReadOnlyCollection} from '@monument/collections/main/ReadOnlyCollection';
import {ListMap} from '@monument/collections/main/ListMap';
import {FormattableString} from '@monument/text/main/FormattableString';
import {MILLISECONDS_IN_DAY, MILLISECONDS_IN_HOUR, MILLISECONDS_IN_MINUTE, MILLISECONDS_IN_SECOND} from './Constants';
import {DateTimeFormatInfo} from './DateTimeFormatInfo';
import {InvariantDateTimeFormatInfo} from './InvariantDateTimeFormatInfo';
import {TimeEntryProcessor} from './EntryProcessors/TimeEntryProcessor';
import {TimeEntryProcessorProvider} from './EntryProcessors/TimeEntryProcessorProvider';


export class TimeSpan implements Cloneable<TimeSpan>, Comparable<TimeSpan>, Equatable<TimeSpan>, Formattable {
    public static readonly ZERO: TimeSpan = new TimeSpan();


    public static cast(value: TimeSpan | number): TimeSpan {
        if (value instanceof TimeSpan) {
            return value;
        }

        const timeSpan: TimeSpan = new TimeSpan();

        timeSpan._length = value;

        return timeSpan;
    }


    private _length: number = 0;


    public get days(): number {
        return Math.floor(this._length / MILLISECONDS_IN_DAY);
    }


    public get hours(): number {
        return Math.floor(this._length / MILLISECONDS_IN_HOUR) % 24;
    }


    public get minutes(): number {
        return Math.floor(this._length / MILLISECONDS_IN_MINUTE) % 60;
    }


    public get seconds(): number {
        return Math.floor(this._length / MILLISECONDS_IN_SECOND) % 60;
    }


    public get milliseconds(): number {
        return this._length % 1000;
    }


    public get totalDays(): number {
        return this._length / MILLISECONDS_IN_DAY;
    }


    public get totalHours(): number {
        return this._length / MILLISECONDS_IN_HOUR;
    }


    public get totalMinutes(): number {
        return this._length / MILLISECONDS_IN_MINUTE;
    }


    public get totalSeconds(): number {
        return this._length / MILLISECONDS_IN_SECOND;
    }


    public get totalMilliseconds(): number {
        return this._length;
    }


    public get isNegative(): boolean {
        return this._length < 0;
    }


    public get isPositive(): boolean {
        return this._length > 0;
    }


    public get duration(): number {
        return Math.abs(this._length);
    }


    public constructor(
        days: number = 0,
        hours: number = 0,
        minutes: number = 0,
        seconds: number = 0,
        milliseconds: number = 0
    ) {
        this._length += days * MILLISECONDS_IN_DAY;
        this._length += hours * MILLISECONDS_IN_HOUR;
        this._length += minutes * MILLISECONDS_IN_MINUTE;
        this._length += seconds * MILLISECONDS_IN_SECOND;
        this._length += milliseconds;

        this._length = Math.floor(this._length);
    }


    public add(value: TimeSpan): TimeSpan {
        return TimeSpan.cast(this._length + value._length);
    }


    public subtract(value: TimeSpan): TimeSpan {
        return TimeSpan.cast(this._length - value._length);
    }


    public negate(): TimeSpan {
        return TimeSpan.cast(-1 * this._length);
    }


    public clone(): TimeSpan {
        return TimeSpan.cast(this._length);
    }


    public compareTo(other: TimeSpan): ComparisonResult {
        if (this._length < other._length) {
            return ComparisonResult.LESS;
        } else if (this._length > other._length) {
            return ComparisonResult.GREATER;
        } else {
            return ComparisonResult.EQUALS;
        }
    }


    public equals(other: TimeSpan): boolean {
        return this.compareTo(other) === ComparisonResult.EQUALS;
    }


    public toString(format?: string, formatInfo: DateTimeFormatInfo = InvariantDateTimeFormatInfo.invariant): string {
        format = format || formatInfo.longTimePattern;

        let template: FormattableString = new FormattableString(format);
        let dateComponents: Map<string, string> = this.getTimeComponents(this, template.uniqueEntries, formatInfo);

        return template.fillByKeys(dateComponents);
    }


    private getTimeComponents(
        time: TimeSpan,
        formatEntries: ReadOnlyCollection<string>,
        formatInfo: DateTimeFormatInfo
    ): Map<string, string> {
        let components: Map<string, string> = new ListMap();

        for (let formatEntry of formatEntries) {
            let formatter: TimeEntryProcessor = TimeEntryProcessorProvider.instance.getFormatter(formatEntry);

            components.put(formatEntry, formatter.formatTimeSpan(time, formatEntry, formatInfo));
        }

        return components;
    }
}


export namespace TimeSpan {

    export class Builder {
        public days: number = 0;
        public hours: number = 0;
        public minutes: number = 0;
        public seconds: number = 0;
        public milliseconds: number = 0;


        public build(): TimeSpan {
            return new TimeSpan(this.days, this.hours, this.minutes, this.seconds, this.milliseconds);
        }
    }
}
