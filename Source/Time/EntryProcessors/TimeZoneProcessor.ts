import {TimeEntryProcessor} from './TimeEntryProcessor';
import {DateTime} from '../DateTime';
import {InvalidOperationException} from '../../Exceptions/InvalidOperationException';
import {TimeSpan} from '../TimeSpan';
import {GetInstance} from '../../Language/Decorators/GetInstance';
import {IDateTimeFormatInfo} from '../IDateTimeFormatInfo';
import {DateTimeBuilder} from '../DateTimeBuilder';


export class TimeZoneProcessor extends TimeEntryProcessor {
    @GetInstance()
    public static readonly instance: TimeZoneProcessor;


    protected entryPattern: RegExp = /^(Z)$/;


    private constructor() {
        super();
    }


    public formatDateTime(dateTime: DateTime, format: string, formatInfo: IDateTimeFormatInfo): string {
        return this.formatTimezoneOffset(dateTime.timezoneOffset, format, formatInfo);
    }


    public formatTimeSpan(timeSpan: TimeSpan, format: string, formatInfo: IDateTimeFormatInfo): string {
        throw new InvalidOperationException(`Time zone offset component is not available for time span.`);
    }


    public parseDateTime(value: string, formatEntry: string, formatInfo: IDateTimeFormatInfo, dateBuilder: DateTimeBuilder): void {
        // Stub
    }


    // formatInfo may contain information about years representation for specific culture.

    protected formatTimezoneOffset(offset: TimeSpan, format: string, formatInfo: IDateTimeFormatInfo): string {
        return offset.toString('{HH}:{mm}', formatInfo);
    }
}

