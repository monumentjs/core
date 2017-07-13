import { TimeComponentFormatterBase } from './TimeComponentFormatterBase';
import { DateTime } from '../DateTime';
import { DateTimeFormatInfo } from '../DateTimeFormatInfo';
import { TimeSpan } from '../TimeSpan';
export declare class MinutesFormatter extends TimeComponentFormatterBase {
    static readonly instance: MinutesFormatter;
    protected _entryPattern: RegExp;
    formatDateTime(dateTime: DateTime, format: string, formatInfo: DateTimeFormatInfo): string;
    formatTimeSpan(timeSpan: TimeSpan, format: string, formatInfo: DateTimeFormatInfo): string;
    protected formatMinutes(minutes: number, format: string, formatInfo: DateTimeFormatInfo): string;
}
