import {TimeComponentFormatterBase} from './TimeComponentFormatterBase';
import DateTime from '../DateTime';
import DateTimeFormatInfo from '../DateTimeFormatInfo';
import TimeSpan from '../TimeSpan';
import TextTransform from '../../../System/Text/TextTransform';
import {assertArgumentNotNull} from '../../../Assertion/Assert';


export default class SecondsFormatter extends TimeComponentFormatterBase {
    public static readonly instance: SecondsFormatter = new SecondsFormatter();


    protected _entryPattern: RegExp = /^(s+)$/;


    public formatDateTime(dateTime: DateTime, format: string, formatInfo: DateTimeFormatInfo): string {
        assertArgumentNotNull('dateTime', dateTime);
        assertArgumentNotNull('format', format);
        assertArgumentNotNull('formatInfo', formatInfo);

        return this.formatSeconds(dateTime.seconds, format, formatInfo);
    }


    public formatTimeSpan(timeSpan: TimeSpan, format: string, formatInfo: DateTimeFormatInfo): string {
        assertArgumentNotNull('timeSpan', timeSpan);
        assertArgumentNotNull('format', format);
        assertArgumentNotNull('formatInfo', formatInfo);

        return this.formatSeconds(timeSpan.seconds, format, formatInfo);
    }


    // formatInfo may contain information about seconds representation for specific culture.

    protected formatSeconds(seconds: number, format: string, formatInfo: DateTimeFormatInfo): string {
        let targetLength = format.length;

        return TextTransform.padStart(seconds.toString(), targetLength, '0');
    }
}
