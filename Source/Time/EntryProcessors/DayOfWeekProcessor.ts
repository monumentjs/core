import {TimeEntryProcessor} from './TimeEntryProcessor';
import {DateTime} from '../DateTime';
import {InvalidOperationException} from '../../Exceptions/InvalidOperationException';
import {TimeSpan} from '../TimeSpan';
import {EMPTY_STRING} from '../../Text/constants';
import {Singleton} from '../../Language/Decorators/Singleton';
import {IDateTimeFormatInfo} from '../IDateTimeFormatInfo';
import {DateTimeBuilder} from '../DateTimeBuilder';


@Singleton()
export class DayOfWeekProcessor extends TimeEntryProcessor {
    public static readonly instance: DayOfWeekProcessor;


    protected entryPattern: RegExp = /^(d{1,4})$/;


    private constructor() {
        super();
    }


    public formatDateTime(dateTime: DateTime, format: string, formatInfo: IDateTimeFormatInfo): string {
        return this.formatDayOfWeek(dateTime.dayOfWeek, format, formatInfo);
    }


    public formatTimeSpan(timeSpan: TimeSpan, format: string, formatInfo: IDateTimeFormatInfo): string {
        throw new InvalidOperationException(`Day of month component is not available for time span.`);
    }


    public parseDateTime(value: string, formatEntry: string, formatInfo: IDateTimeFormatInfo, dateBuilder: DateTimeBuilder): void {
        // Stub
    }

    // formatInfo may contain information about day-of-week representation for specific culture.

    protected formatDayOfWeek(dayOfWeek: number, format: string, formatInfo: IDateTimeFormatInfo): string {
        switch (format) {
            // Full name of day of week
            case 'dddd':
                return formatInfo.dayNames[dayOfWeek] as string;

            // Abbreviated name of day of week
            case 'ddd':
                return formatInfo.abbreviatedDayNames[dayOfWeek] as string;

            // Shortest name of day of week
            case 'dd':
                return formatInfo.shortestDayNames[dayOfWeek] as string;

            // Day of the week number
            case 'd':
                return (dayOfWeek + 1).toString();

            default:
                return EMPTY_STRING;
        }
    }
}

