import {TimeComponentFormatterBase} from './TimeComponentFormatterBase';
import {DateTime} from '../DateTime';
import {DateTimeFormatInfo} from '../DateTimeFormatInfo';
import {TimeSpan} from '../TimeSpan';
import {TextTransform} from '../../Text/TextTransform';
import {Assert} from '../../Assertion/Assert';


export class MillisecondsFormatter extends TimeComponentFormatterBase {
    public static readonly instance: MillisecondsFormatter = new MillisecondsFormatter();


    protected entryPattern: RegExp = /^(f+)$/;


    private readonly textTransform: TextTransform = TextTransform.instance;


    public formatDateTime(dateTime: DateTime, format: string, formatInfo: DateTimeFormatInfo): string {
        Assert.argument('dateTime', dateTime).notNull();
        Assert.argument('format', format).notNull();
        Assert.argument('formatInfo', formatInfo).notNull();

        return this.formatMilliseconds(dateTime.milliseconds, format, formatInfo);
    }


    public formatTimeSpan(timeSpan: TimeSpan, format: string, formatInfo: DateTimeFormatInfo): string {
        Assert.argument('timeSpan', timeSpan).notNull();
        Assert.argument('format', format).notNull();
        Assert.argument('formatInfo', formatInfo).notNull();

        return this.formatMilliseconds(timeSpan.milliseconds, format, formatInfo);
    }


    // formatInfo may contain information about milliseconds representation for specific culture.

    protected formatMilliseconds(milliseconds: number, format: string, formatInfo: DateTimeFormatInfo): string {
        let targetLength = format.length;
        let clippedMilliseconds: string;

        clippedMilliseconds = this.textTransform.padStart(milliseconds.toString(), 3, '0');
        clippedMilliseconds = this.textTransform.padEnd(clippedMilliseconds, targetLength, '0');

        return this.textTransform.clipStart(clippedMilliseconds, targetLength);
    }
}
