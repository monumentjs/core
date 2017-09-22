import {TimeEntryProcessor} from './TimeEntryProcessor';
import {DateTime} from '../DateTime';
import {TimeSpan} from '../TimeSpan';
import {TextTransform} from '../../Text/TextTransform';
import {Singleton} from '../../Language/Decorators/Singleton';
import {IDateTimeFormatInfo} from '../IDateTimeFormatInfo';
import {DateTimeBuilder} from '../DateTimeBuilder';


@Singleton()
export class DayOfMonthProcessor extends TimeEntryProcessor {
    public static readonly instance: DayOfMonthProcessor;


    protected entryPattern: RegExp = /^(D+)$/;


    private constructor() {
        super();
    }


    public formatDateTime(dateTime: DateTime, format: string, formatInfo: IDateTimeFormatInfo): string {
        return this.formatDayOfMonth(dateTime.dayOfMonth, format, formatInfo);
    }


    public formatTimeSpan(timeSpan: TimeSpan, format: string, formatInfo: IDateTimeFormatInfo): string {
        return this.formatDayOfMonth(timeSpan.days, format, formatInfo);
    }


    public parseDateTime(
        value: string,
        formatEntry: string,
        formatInfo: IDateTimeFormatInfo,
        dateBuilder: DateTimeBuilder
    ): void {
        dateBuilder.dayOfMonth = parseInt(value, 10);
    }


    // formatInfo may contain information about years representation for specific culture.

    protected formatDayOfMonth(dayOfMonth: number, format: string, formatInfo: IDateTimeFormatInfo): string {
        let targetLength = format.length;

        return TextTransform.padStart(dayOfMonth.toString(), targetLength, '0');
    }
}

