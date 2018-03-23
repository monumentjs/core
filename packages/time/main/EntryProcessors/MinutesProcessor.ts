import {TimeEntryProcessor} from './TimeEntryProcessor';
import {DateTime} from '../DateTime';
import {TimeSpan} from '../TimeSpan';
import {GetInstance} from '../../Language/Decorators/GetInstance';
import {DateTimeFormatInfo} from '../DateTimeFormatInfo';
import {StringUtils} from '../../../text/main/StringUtils';


export class MinutesProcessor extends TimeEntryProcessor {
    @GetInstance()
    public static readonly instance: MinutesProcessor;


    protected entryPattern: RegExp = /^(m+)$/;


    private constructor() {
        super();
    }


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
        let targetLength = format.length;

        return StringUtils.padStart(minutes.toString(), targetLength, '0');
    }
}
