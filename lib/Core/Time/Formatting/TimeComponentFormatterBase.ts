import DateTimeFormatInfo from '../DateTimeFormatInfo';
import TimeSpan from '../TimeSpan';
import DateTime from '../DateTime';


export abstract class TimeComponentFormatterBase {
    protected abstract _entryPattern: RegExp;


    public supportsEntry(entry: string): boolean {
        return this._entryPattern.test(entry);
    }


    public abstract formatDateTime(value: DateTime, format: string, formatInfo: DateTimeFormatInfo): string;
    public abstract formatTimeSpan(value: TimeSpan, format: string, formatInfo: DateTimeFormatInfo): string;
}
