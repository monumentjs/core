import {DateTime} from '../DateTime';
import {TimeSpan} from '../TimeSpan';
import {DateTimeFormatInfo} from '../DateTimeFormatInfo';
import {TimeEntryProcessor} from './TimeEntryProcessor';
import {StringUtils} from '../../text/StringUtils';


export class MinutesProcessor extends TimeEntryProcessor {

    protected entryPattern: RegExp = /^(m+)$/;


    public formatDateTime(dateTime: DateTime, format: string, formatInfo: DateTimeFormatInfo): string {
        return this.formatMinutes(dateTime.minutes, format, formatInfo);
    }


    public formatTimeSpan(timeSpan: TimeSpan, format: string, formatInfo: DateTimeFormatInfo): string {
        return this.formatMinutes(timeSpan.minutes, format, formatInfo);
    }


    public parseDateTime(
        value: string,
        formatEntry: string,
        formatInfo: DateTimeFormatInfo,
        dateBuilder: DateTime.Builder
    ): void {
        dateBuilder.minutes = parseInt(value, 10);
    }


    // formatInfo may contain information about minutes representation for specific culture.

    protected formatMinutes(minutes: number, format: string, formatInfo: DateTimeFormatInfo): string {
        return StringUtils.padStart(minutes.toString(), format.length, '0');
    }
}
