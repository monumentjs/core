import { TimeComponentFormatterBase } from './TimeComponentFormatterBase';
import { DateTime } from '../DateTime';
import { TimeSpan } from '../TimeSpan';
import { DateTimeFormatInfo } from '../DateTimeFormatInfo';
export declare class MonthFormatter extends TimeComponentFormatterBase {
    static readonly instance: MonthFormatter;
    protected _entryPattern: RegExp;
    formatDateTime(dateTime: DateTime, format: string, formatInfo: DateTimeFormatInfo): string;
    formatTimeSpan(timeSpan: TimeSpan, format: string, formatInfo: DateTimeFormatInfo): string;
    protected formatMonth(month: number, format: string, formatInfo: DateTimeFormatInfo): string;
}
