import { DateTimeFormatInfo } from '../DateTimeFormatInfo';
import { TimeSpan } from '../TimeSpan';
import { DateTime } from '../DateTime';
export declare abstract class TimeComponentFormatterBase {
    protected abstract _entryPattern: RegExp;
    supportsEntry(entry: string): boolean;
    abstract formatDateTime(value: DateTime, format: string, formatInfo: DateTimeFormatInfo): string;
    abstract formatTimeSpan(value: TimeSpan, format: string, formatInfo: DateTimeFormatInfo): string;
}
