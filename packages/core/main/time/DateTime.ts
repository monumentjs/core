import {Cloneable} from '../Cloneable';
import {ComparisonResult} from '../utils/comparison/ComparisonResult';
import {Comparable} from '../utils/comparison/Comparable';
import {Equatable} from '../utils/comparison/Equatable';
import {Formattable} from '../Formattable';
import {DAYS_OFFSET_PER_MONTH, DAYS_TO_MONTH_365, DAYS_TO_MONTH_366} from './Constants';
import {DayOfWeek} from './DayOfWeek';
import {TimeSpan} from './TimeSpan';


export class DateTime implements Cloneable<DateTime>, Comparable<DateTime>, Equatable<DateTime>, Formattable {

    public static get now(): DateTime {
        return this.fromDate(new Date());
    }


    public static cast(date: DateTime | Date): DateTime {
        if (date instanceof DateTime) {
            return date;
        }

        return this.fromDate(date);
    }


    public static fromDate(date: Date): DateTime {
        return this.fromTimestamp(date.getTime());
    }


    public static fromTimestamp(timestamp: number): DateTime {
        let dateTime: DateTime = new DateTime();

        dateTime._date = new Date(timestamp);

        return dateTime;
    }


    public static isValidDateString(dateString: string): boolean {
        return !isNaN(Date.parse(dateString));
    }


    public static isValidDate(date: Date): boolean {
        return !isNaN(date.getTime());
    }


    public static isLeapYear(year: number): boolean {
        if ((year & 3) !== 0) {
            return false;
        }

        return ((year % 100) !== 0 || (year % 400) === 0);
    }


    public static daysInMonth(year: number, month: number): number {
        let daysToMonth: number[] = this.isLeapYear(year) ? DAYS_TO_MONTH_366 : DAYS_TO_MONTH_365;

        return daysToMonth[month + 1] - daysToMonth[month];
    }


    private _date: Date;


    public get year(): number {
        return this._date.getFullYear();
    }


    public get month(): number {
        return this._date.getMonth();
    }


    public get dayOfMonth(): number {
        return this._date.getDate();
    }


    public get dayOfWeek(): DayOfWeek {
        return this._date.getDay();
    }


    public get dayOfYear(): number {
        let month = this.month;
        let dayOfMonth = this.dayOfMonth;
        let dayOfYear = DAYS_OFFSET_PER_MONTH[month] + dayOfMonth;

        if (month > 1 && DateTime.isLeapYear(this.year)) {
            dayOfYear++;
        }

        return dayOfYear;
    }


    public get hours(): number {
        return this._date.getHours();
    }


    public get minutes(): number {
        return this._date.getMinutes();
    }


    public get seconds(): number {
        return this._date.getSeconds();
    }


    public get milliseconds(): number {
        return this._date.getMilliseconds();
    }


    public get timezoneOffset(): TimeSpan {
        return new TimeSpan(0, 0, this._date.getTimezoneOffset());
    }


    public get date(): DateTime {
        return new DateTime(this.year, this.month, this.dayOfMonth);
    }


    public get timeOfDay(): TimeSpan {
        return new TimeSpan(0, this.hours, this.minutes, this.seconds, this.milliseconds);
    }


    public constructor(
        year: number = 0,
        month: number = 0,
        dayOfMonth: number = 0,
        hours: number = 0,
        minutes: number = 0,
        seconds: number = 0,
        milliseconds: number = 0
    ) {
        this._date = new Date(year, month, dayOfMonth, hours, minutes, seconds, milliseconds);
    }


    public clone(): DateTime {
        return DateTime.fromTimestamp(this._date.getTime());
    }


    public compareTo(other: DateTime): ComparisonResult {
        let currentTimeStamp: number = this._date.getTime();
        let otherTimeStamp: number = other._date.getTime();

        if (currentTimeStamp > otherTimeStamp) {
            return ComparisonResult.GREATER;
        } else if (currentTimeStamp < otherTimeStamp) {
            return ComparisonResult.LESS;
        } else {
            return ComparisonResult.EQUALS;
        }
    }


    public equals(other: DateTime): boolean {
        return this.compareTo(other) === ComparisonResult.EQUALS;
    }


    public setYear(value: number): DateTime {
        return new DateTime(value, this.month, this.dayOfMonth, this.hours, this.minutes, this.seconds, this.milliseconds);
    }


    public setMonth(value: number): DateTime {
        return new DateTime(this.year, value, this.dayOfMonth, this.hours, this.minutes, this.seconds, this.milliseconds);
    }


    public setDayOfMonth(value: number): DateTime {
        return new DateTime(this.year, this.month, value, this.hours, this.minutes, this.seconds, this.milliseconds);
    }


    public setHours(value: number): DateTime {
        return new DateTime(this.year, this.month, this.dayOfMonth, value, this.minutes, this.seconds, this.milliseconds);
    }


    public setMinutes(value: number): DateTime {
        return new DateTime(this.year, this.month, this.dayOfMonth, this.hours, value, this.seconds, this.milliseconds);
    }


    public setSeconds(value: number): DateTime {
        return new DateTime(this.year, this.month, this.dayOfMonth, this.hours, this.minutes, value, this.milliseconds);
    }


    public setMilliseconds(value: number): DateTime {
        return new DateTime(this.year, this.month, this.dayOfMonth, this.hours, this.minutes, this.seconds, value);
    }


    public add(value: TimeSpan): DateTime {
        return DateTime.fromTimestamp(this.toTimestamp() + value.totalMilliseconds);
    }


    public addYears(value: number): DateTime {
        return this.addMonths(value * 12);
    }


    public addMonths(value: number): DateTime {
        let currentYear: number = this.year;
        let currentMonth: number = this.month;
        let currentDayOfMonth: number = this.dayOfMonth;
        let newMonth: number = currentMonth - 1 + value;
        let days: number;

        if (newMonth >= 0) {
            currentMonth = Math.floor(newMonth % 12 + 1);
            currentYear = Math.floor(currentYear + newMonth / 12);
        } else {
            currentMonth = Math.floor(12 + (newMonth + 1) % 12);
            currentYear = Math.floor(currentYear + (newMonth - 11) / 12);
        }

        days = DateTime.daysInMonth(currentYear, currentMonth);

        if (currentDayOfMonth > days) {
            currentDayOfMonth = days;
        }

        return new DateTime(
            currentYear, currentMonth, currentDayOfMonth,
            this.hours, this.minutes, this.seconds, this.milliseconds
        );
    }


    public addDays(value: number): DateTime {
        return this.add(new TimeSpan(value, 0, 0, 0, 0));
    }


    public addHours(value: number): DateTime {
        return this.add(new TimeSpan(0, value, 0, 0, 0));
    }


    public addMinutes(value: number): DateTime {
        return this.add(new TimeSpan(0, 0, value, 0, 0));
    }


    public addSeconds(value: number): DateTime {
        return this.add(new TimeSpan(0, 0, 0, value, 0));
    }


    public addMilliseconds(value: number): DateTime {
        return this.add(new TimeSpan(0, 0, 0, 0, value));
    }


    public subtract(value: TimeSpan): DateTime {
        return DateTime.fromTimestamp(this.toTimestamp() - value.totalMilliseconds);
    }


    public getTimeSpanTo(other: DateTime): TimeSpan {
        return TimeSpan.cast(this.toTimestamp() - other.toTimestamp());
    }


    public valueOf(): number {
        return this._date.getTime();
    }


    public toTimestamp(): number {
        return this._date.getTime();
    }


    public toUniversalTime(): DateTime {
        return new DateTime(
            this._date.getUTCFullYear(),
            this._date.getUTCMonth(),
            this._date.getUTCDate(),
            this._date.getUTCHours(),
            this._date.getUTCMinutes(),
            this._date.getUTCSeconds(),
            this._date.getUTCMilliseconds()
        );
    }

    //
    // public toString(format?: string, formatInfo: DateTimeFormatInfo = InvariantDateTimeFormatInfo.invariant): string {
    //     format = format || formatInfo.fullDateTimePattern;
    //
    //     let template: TemplateString = new TemplateString(format);
    //     let dateComponents = this.getTimeComponents(this, template.uniqueEntries, formatInfo);
    //
    //     return template.fillByKeys(dateComponents);
    // }
    //
    //
    // public toLongDateString(formatInfo: DateTimeFormatInfo = InvariantDateTimeFormatInfo.invariant): string {
    //     return this.toString(formatInfo.longDatePattern, formatInfo);
    // }
    //
    //
    // public toShortDateString(formatInfo: DateTimeFormatInfo = InvariantDateTimeFormatInfo.invariant): string {
    //     return this.toString(formatInfo.shortDatePattern, formatInfo);
    // }
    //
    //
    // public toLongTimeString(formatInfo: DateTimeFormatInfo = InvariantDateTimeFormatInfo.invariant): string {
    //     return this.toString(formatInfo.longTimePattern, formatInfo);
    // }
    //
    //
    // public toShortTimeString(formatInfo: DateTimeFormatInfo = InvariantDateTimeFormatInfo.invariant): string {
    //     return this.toString(formatInfo.shortTimePattern, formatInfo);
    // }
    //
    //
    // public toJSON(): string {
    //     return this._date.toJSON();
    // }
    //
    //
    // private getTimeComponents(
    //     time: DateTime,
    //     formatEntries: ReadOnlyCollection<string>,
    //     formatInfo: DateTimeFormatInfo
    // ): Map<string, string> {
    //     let components: Map<string, string> = new ListMap();
    //
    //     for (let formatEntry of formatEntries) {
    //         let formatter: TimeEntryProcessor = TimeEntryProcessorProvider.instance.getFormatter(formatEntry);
    //
    //         components.put(formatEntry, formatter.formatDateTime(time, formatEntry, formatInfo));
    //     }
    //
    //     return components;
    // }
}


export namespace DateTime {

    export class Builder {
        public year: number = 0;
        public month: number = 0;
        public dayOfMonth: number = 0;
        public hours: number = 0;
        public minutes: number = 0;
        public seconds: number = 0;
        public milliseconds: number = 0;


        public build(): DateTime {
            return new DateTime(this.year, this.month, this.dayOfMonth, this.hours, this.minutes, this.seconds, this.milliseconds);
        }
    }
}
