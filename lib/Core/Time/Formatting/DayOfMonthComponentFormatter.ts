import {TimeComponentFormatterBase} from './TimeComponentFormatterBase';
import DateTime from '../DateTime';
import DateTimeFormatInfo from '../DateTimeFormatInfo';
import TimeSpan from '../TimeSpan';
import TextTransform from '../../../System/Text/TextTransform';


export default class DayOfMonthComponentFormatter extends TimeComponentFormatterBase {
    public static readonly instance: DayOfMonthComponentFormatter = new DayOfMonthComponentFormatter();


    protected _entryPattern: RegExp = /^(D+)$/;


    public formatDateTime(dateTime: DateTime, format: string, formatInfo: DateTimeFormatInfo): string {
        return this.formatDayOfMonth(dateTime.dayOfMonth, format, formatInfo);
    }


    public formatTimeSpan(timeSpan: TimeSpan, format: string, formatInfo: DateTimeFormatInfo): string {
        return this.formatDayOfMonth(timeSpan.days, format, formatInfo);
    }


    // formatInfo may contain information about years representation for specific culture.

    protected formatDayOfMonth(dayOfMonth: number, format: string, formatInfo: DateTimeFormatInfo): string {
        let targetLength = format.length;

        return TextTransform.padStart(dayOfMonth.toString(), targetLength, '0');
    }
}

