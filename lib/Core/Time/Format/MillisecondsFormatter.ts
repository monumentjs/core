import {TimeComponentFormatterBase} from './TimeComponentFormatterBase';
import DateTime from '../DateTime';
import DateTimeFormatInfo from '../DateTimeFormatInfo';
import TimeSpan from '../TimeSpan';
import TextTransform from '../../../System/Text/TextTransform';
import {assertArgumentNotNull} from '../../../Assertion/Assert';


export default class MillisecondsFormatter extends TimeComponentFormatterBase {
    public static readonly instance: MillisecondsFormatter = new MillisecondsFormatter();


    protected _entryPattern: RegExp = /^(f+)$/;


    public formatDateTime(dateTime: DateTime, format: string, formatInfo: DateTimeFormatInfo): string {
        assertArgumentNotNull('dateTime', dateTime);
        assertArgumentNotNull('format', format);
        assertArgumentNotNull('formatInfo', formatInfo);

        return this.formatMilliseconds(dateTime.milliseconds, format, formatInfo);
    }


    public formatTimeSpan(timeSpan: TimeSpan, format: string, formatInfo: DateTimeFormatInfo): string {
        assertArgumentNotNull('timeSpan', timeSpan);
        assertArgumentNotNull('format', format);
        assertArgumentNotNull('formatInfo', formatInfo);

        return this.formatMilliseconds(timeSpan.milliseconds, format, formatInfo);
    }


    // formatInfo may contain information about milliseconds representation for specific culture.

    protected formatMilliseconds(milliseconds: number, format: string, formatInfo: DateTimeFormatInfo): string {
        let targetLength = format.length;
        let clippedMilliseconds: string = TextTransform.padStart(milliseconds.toString(), 3, '0');
        clippedMilliseconds = TextTransform.padEnd(clippedMilliseconds, targetLength, '0');

        return TextTransform.clipStart(clippedMilliseconds, targetLength);
    }
}
