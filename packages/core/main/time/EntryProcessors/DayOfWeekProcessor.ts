import {DateTime} from '../DateTime';
import {TimeSpan} from '../TimeSpan';
import {DateTimeFormatInfo} from '../DateTimeFormatInfo';
import {TimeEntryProcessor} from './TimeEntryProcessor';
import {InvalidOperationException} from '../../exceptions/InvalidOperationException';
import {StringPool} from '../../StringPool';


export class DayOfWeekProcessor extends TimeEntryProcessor {
    protected entryPattern: RegExp = /^(d{1,4})$/;


    public formatDateTime(dateTime: DateTime, format: string, formatInfo: DateTimeFormatInfo): string {
        return this.formatDayOfWeek(dateTime.dayOfWeek, format, formatInfo);
    }


    public formatTimeSpan(timeSpan: TimeSpan, format: string, formatInfo: DateTimeFormatInfo): string {
        throw new InvalidOperationException(`Day of month component is not available for time span.`);
    }


    public parseDateTime(value: string, formatEntry: string, formatInfo: DateTimeFormatInfo, dateBuilder: DateTime.Builder): void {
        // Stub
    }

    // formatInfo may contain information about day-of-week representation for specific culture.

    protected formatDayOfWeek(dayOfWeek: number, format: string, formatInfo: DateTimeFormatInfo): string {
        switch (format) {
            // Full name of day of week
            case 'dddd':
                return formatInfo.dayNames.getAt(dayOfWeek);

            // Abbreviated name of day of week
            case 'ddd':
                return formatInfo.abbreviatedDayNames.getAt(dayOfWeek);

            // Shortest name of day of week
            case 'dd':
                return formatInfo.shortestDayNames.getAt(dayOfWeek);

            // Day of the week number
            case 'd':
                return (dayOfWeek + 1).toString();

            default:
                return StringPool.BLANK;
        }
    }
}

