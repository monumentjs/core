import {MILLISECONDS_IN_DAY, MILLISECONDS_IN_HOUR, MILLISECONDS_IN_MINUTE, MILLISECONDS_IN_SECOND} from './Constants';
import {IDateTimeFormatInfo} from './IDateTimeFormatInfo';
import {ComparisonResult} from '../Core/Types/ComparisonResult';
import {FormattableString} from '../Text/FormattableString';
import {DateTimeFormatInfo} from './DateTimeFormatInfo';
import {IReadOnlyCollection} from '../Collections/Abstraction/IReadOnlyCollection';
import {TimeEntryProcessor} from './EntryProcessors/TimeEntryProcessor';
import {TimeEntryProcessorProvider} from './EntryProcessors/TimeEntryProcessorProvider';
import {ICloneable} from '../Core/Abstraction/ICloneable';
import {IComparable} from '../Core/Abstraction/IComparable';
import {IEquatable} from '../Core/Abstraction/IEquatable';
import {IFormattable} from '../Core/Abstraction/IFormattable';
import {IPropertyAccess} from '../Core/Abstraction/IPropertyAccess';


export class TimeSpan implements ICloneable<TimeSpan>, IComparable<TimeSpan>, IEquatable<TimeSpan>, IFormattable {
    public static readonly zero: TimeSpan = new TimeSpan();


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
            return ComparisonResult.Less;
        } else if (this._length > other._length) {
            return ComparisonResult.Greater;
        } else {
            return ComparisonResult.Equals;
        }
    }


    public equals(other: TimeSpan): boolean {
        return this.compareTo(other) === ComparisonResult.Equals;
    }


    public toString(format?: string, formatInfo: IDateTimeFormatInfo = DateTimeFormatInfo.invariant): string {
        format = format || formatInfo.longTimePattern;

        let template: FormattableString = new FormattableString(format);
        let dateComponents: IPropertyAccess<string> = this.getTimeComponents(this, template.uniqueEntries, formatInfo);

        return template.fillByKeys(dateComponents);
    }


    private getTimeComponents(
        time: TimeSpan,
        formatEntries: IReadOnlyCollection<string>,
        formatInfo: IDateTimeFormatInfo
    ): IPropertyAccess<string> {
        let components: IPropertyAccess<string> = {};

        for (let formatEntry of formatEntries) {
            let formatter: TimeEntryProcessor = TimeEntryProcessorProvider.instance.getFormatter(formatEntry);

            components[formatEntry] = formatter.formatTimeSpan(time, formatEntry, formatInfo);
        }

        return components;
    }
}
