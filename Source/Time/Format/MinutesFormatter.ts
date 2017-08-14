import {TimeComponentFormatterBase} from './TimeComponentFormatterBase';
import {DateTime} from '../DateTime';
import {DateTimeFormatInfo} from '../DateTimeFormatInfo';
import {TimeSpan} from '../TimeSpan';
import {TextTransform} from '../../Text/TextTransform';
import {Assert} from '../../Assertion/Assert';
import {Singleton} from '../../DI/Decorators/Singleton';
import {UnitGetter} from '../../DI/Decorators/UnitGetter';


@Singleton()
export class MinutesFormatter extends TimeComponentFormatterBase {
    @UnitGetter(TextTransform)
    private readonly textTransform: TextTransform;

    protected entryPattern: RegExp = /^(m+)$/;


    public formatDateTime(dateTime: DateTime, format: string, formatInfo: DateTimeFormatInfo): string {
        Assert.argument('dateTime', dateTime).notNull();
        Assert.argument('format', format).notNull();
        Assert.argument('formatInfo', formatInfo).notNull();

        return this.formatMinutes(dateTime.minutes, format, formatInfo);
    }


    public formatTimeSpan(timeSpan: TimeSpan, format: string, formatInfo: DateTimeFormatInfo): string {
        Assert.argument('timeSpan', timeSpan).notNull();
        Assert.argument('format', format).notNull();
        Assert.argument('formatInfo', formatInfo).notNull();

        return this.formatMinutes(timeSpan.minutes, format, formatInfo);
    }


    // formatInfo may contain information about minutes representation for specific culture.

    protected formatMinutes(minutes: number, format: string, formatInfo: DateTimeFormatInfo): string {
        let targetLength = format.length;

        return this.textTransform.padStart(minutes.toString(), targetLength, '0');
    }
}
