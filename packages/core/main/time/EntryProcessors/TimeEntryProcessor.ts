import {TimeSpan} from '../TimeSpan';
import {DateTime} from '../DateTime';
import {DateTimeFormatInfo} from '../DateTimeFormatInfo';
import {Singleton} from '../../stereotype/Singleton';


@Singleton
export abstract class TimeEntryProcessor {
    protected abstract entryPattern: RegExp;


    public supportsEntry(entry: string): boolean {
        return this.entryPattern.test(entry);
    }


    public abstract formatDateTime(value: DateTime, format: string, formatInfo: DateTimeFormatInfo): string;
    public abstract formatTimeSpan(value: TimeSpan, format: string, formatInfo: DateTimeFormatInfo): string;

    public abstract parseDateTime(value: string, formatEntry: string, formatInfo: DateTimeFormatInfo, dateBuilder: DateTime.Builder): void;
}
