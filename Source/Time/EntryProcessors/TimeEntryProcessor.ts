import {TimeSpan} from '../TimeSpan';
import {DateTime} from '../DateTime';
import {IDateTimeFormatInfo} from '../IDateTimeFormatInfo';
import {DateTimeBuilder} from '../DateTimeBuilder';


export abstract class TimeEntryProcessor {
    protected abstract entryPattern: RegExp;


    public supportsEntry(entry: string): boolean {
        return this.entryPattern.test(entry);
    }


    public abstract formatDateTime(value: DateTime, format: string, formatInfo: IDateTimeFormatInfo): string;
    public abstract formatTimeSpan(value: TimeSpan, format: string, formatInfo: IDateTimeFormatInfo): string;

    public abstract parseDateTime(value: string, formatEntry: string, formatInfo: IDateTimeFormatInfo, dateBuilder: DateTimeBuilder): void;
}
