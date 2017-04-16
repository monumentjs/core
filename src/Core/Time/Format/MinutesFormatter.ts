import {TimeComponentFormatterBase} from './TimeComponentFormatterBase';
import DateTime from '../DateTime';
import DateTimeFormatInfo from '../DateTimeFormatInfo';
import TimeSpan from '../TimeSpan';
import TextTransform from '../../Text/TextTransform';
import {assertArgumentNotNull} from '../../Assertion/Assert';


export default class HoursFormatter extends TimeComponentFormatterBase {
    public static readonly instance: HoursFormatter = new HoursFormatter();


    protected _entryPattern: RegExp = /^(m+)$/;


    public formatDateTime(dateTime: DateTime, format: string, formatInfo: DateTimeFormatInfo): string {
        assertArgumentNotNull('dateTime', dateTime);
        assertArgumentNotNull('format', format);
        assertArgumentNotNull('formatInfo', formatInfo);

        return this.formatMinutes(dateTime.minutes, format, formatInfo);
    }


    public formatTimeSpan(timeSpan: TimeSpan, format: string, formatInfo: DateTimeFormatInfo): string {
        assertArgumentNotNull('timeSpan', timeSpan);
        assertArgumentNotNull('format', format);
        assertArgumentNotNull('formatInfo', formatInfo);

        return this.formatMinutes(timeSpan.minutes, format, formatInfo);
    }


    // formatInfo may contain information about minutes representation for specific culture.

    protected formatMinutes(minutes: number, format: string, formatInfo: DateTimeFormatInfo): string {
        let targetLength = format.length;

        return TextTransform.padStart(minutes.toString(), targetLength, '0');
    }
}
