import {TimeComponentFormatterBase} from './TimeComponentFormatterBase';
import {DateTime} from '../DateTime';
import {DateTimeFormatInfo} from '../DateTimeFormatInfo';
import {InvalidOperationException} from '../../Exceptions/InvalidOperationException';
import {TimeSpan} from '../TimeSpan';
import {Assert} from '../../Assertion/Assert';
import {EMPTY_STRING} from '../../Text/constants';


export class DayOfWeekFormatter extends TimeComponentFormatterBase {
    public static readonly instance: DayOfWeekFormatter = new DayOfWeekFormatter();


    protected _entryPattern: RegExp = /^(d{1,4})$/;


    public formatDateTime(dateTime: DateTime, format: string, formatInfo: DateTimeFormatInfo): string {
        Assert.argument('dateTime', dateTime).notNull();
        Assert.argument('format', format).notNull();
        Assert.argument('formatInfo', formatInfo).notNull();

        return this.formatDayOfWeek(dateTime.dayOfWeek, format, formatInfo);
    }


    public formatTimeSpan(timeSpan: TimeSpan, format: string, formatInfo: DateTimeFormatInfo): string {
        throw new InvalidOperationException(`Day of month component is not available for time span.`);
    }


    // formatInfo may contain information about day-of-week representation for specific culture.

    protected formatDayOfWeek(dayOfWeek: number, format: string, formatInfo: DateTimeFormatInfo): string {
        switch (format) {
            // Full name of day of week
            case 'dddd':
                return formatInfo.dayNames[dayOfWeek];

            // Abbreviated name of day of week
            case 'ddd':
                return formatInfo.abbreviatedDayNames[dayOfWeek];

            // Shortest name of day of week
            case 'dd':
                return formatInfo.shortestDayNames[dayOfWeek];

            // Day of the week number
            case 'd':
                return (dayOfWeek + 1).toString();

            default:
                return EMPTY_STRING;
        }
    }
}

