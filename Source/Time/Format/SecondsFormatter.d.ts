import { TimeComponentFormatterBase } from './TimeComponentFormatterBase';
import { DateTime } from '../DateTime';
import { DateTimeFormatInfo } from '../DateTimeFormatInfo';
import { TimeSpan } from '../TimeSpan';
export declare class SecondsFormatter extends TimeComponentFormatterBase {
    static readonly instance: SecondsFormatter;
    protected _entryPattern: RegExp;
    formatDateTime(dateTime: DateTime, format: string, formatInfo: DateTimeFormatInfo): string;
    formatTimeSpan(timeSpan: TimeSpan, format: string, formatInfo: DateTimeFormatInfo): string;
    protected formatSeconds(seconds: number, format: string, formatInfo: DateTimeFormatInfo): string;
}
