import { TimeComponentFormatterBase } from './TimeComponentFormatterBase';
import { DateTime } from '../DateTime';
import { DateTimeFormatInfo } from '../DateTimeFormatInfo';
import { TimeSpan } from '../TimeSpan';
export declare class TimezoneFormatter extends TimeComponentFormatterBase {
    static readonly instance: TimezoneFormatter;
    protected _entryPattern: RegExp;
    formatDateTime(dateTime: DateTime, format: string, formatInfo: DateTimeFormatInfo): string;
    formatTimeSpan(timeSpan: TimeSpan, format: string, formatInfo: DateTimeFormatInfo): string;
    protected formatTimezoneOffset(offset: TimeSpan, format: string, formatInfo: DateTimeFormatInfo): string;
}
