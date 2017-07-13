import { TimeComponentFormatterBase } from './TimeComponentFormatterBase';
import { DateTime } from '../DateTime';
import { DateTimeFormatInfo } from '../DateTimeFormatInfo';
import { TimeSpan } from '../TimeSpan';
export declare class HoursFormatter extends TimeComponentFormatterBase {
    static readonly instance: HoursFormatter;
    protected _entryPattern: RegExp;
    formatDateTime(dateTime: DateTime, format: string, formatInfo: DateTimeFormatInfo): string;
    formatTimeSpan(timeSpan: TimeSpan, format: string, formatInfo: DateTimeFormatInfo): string;
    protected formatHours(hours: number, format: string, formatInfo: DateTimeFormatInfo): string;
}
