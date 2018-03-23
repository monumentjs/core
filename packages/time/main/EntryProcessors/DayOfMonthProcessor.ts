import {TimeEntryProcessor} from './TimeEntryProcessor';
import {DateTime} from '../DateTime';
import {TimeSpan} from '../TimeSpan';
import {GetInstance} from '../../Language/Decorators/GetInstance';
import {DateTimeFormatInfo} from '../DateTimeFormatInfo';
import {StringUtils} from '../../../text/main/StringUtils';


export class DayOfMonthProcessor extends TimeEntryProcessor {
    @GetInstance()
    public static readonly instance: DayOfMonthProcessor;


    protected entryPattern: RegExp = /^(D+)$/;


    private constructor() {
        super();
    }


    public formatDateTime(dateTime: DateTime, format: string, formatInfo: DateTimeFormatInfo): string {
        return this.formatDayOfMonth(dateTime.dayOfMonth, format, formatInfo);
    }


    public formatTimeSpan(timeSpan: TimeSpan, format: string, formatInfo: DateTimeFormatInfo): string {
        return this.formatDayOfMonth(timeSpan.days, format, formatInfo);
    }


    public parseDateTime(
        value: string,
        formatEntry: string,
        formatInfo: DateTimeFormatInfo,
        dateBuilder: DateTime.Builder
    ): void {
        dateBuilder.dayOfMonth = parseInt(value, 10);
    }


    // formatInfo may contain information about years representation for specific culture.

    protected formatDayOfMonth(dayOfMonth: number, format: string, formatInfo: DateTimeFormatInfo): string {
        let targetLength = format.length;

        return StringUtils.padStart(dayOfMonth.toString(), targetLength, '0');
    }
}

