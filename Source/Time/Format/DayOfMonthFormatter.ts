import {TimeComponentFormatterBase} from './TimeComponentFormatterBase';
import {DateTime} from '../DateTime';
import {DateTimeFormatInfo} from '../DateTimeFormatInfo';
import {TimeSpan} from '../TimeSpan';
import {TextTransform} from '../../Text/TextTransform';
import {Assert} from '../../Assertion/Assert';
import {Singleton} from '../../DI/Decorators/Singleton';
import {Getter} from '../../DI/Decorators/Getter';


@Singleton()
export class DayOfMonthFormatter extends TimeComponentFormatterBase {
    @Getter(TextTransform)
    private readonly textTransform: TextTransform;


    protected entryPattern: RegExp = /^(D+)$/;


    public formatDateTime(dateTime: DateTime, format: string, formatInfo: DateTimeFormatInfo): string {
        Assert.argument('dateTime', dateTime).notNull();
        Assert.argument('format', format).notNull();
        Assert.argument('formatInfo', formatInfo).notNull();

        return this.formatDayOfMonth(dateTime.dayOfMonth, format, formatInfo);
    }


    public formatTimeSpan(timeSpan: TimeSpan, format: string, formatInfo: DateTimeFormatInfo): string {
        Assert.argument('timeSpan', timeSpan).notNull();
        Assert.argument('format', format).notNull();
        Assert.argument('formatInfo', formatInfo).notNull();

        return this.formatDayOfMonth(timeSpan.days, format, formatInfo);
    }


    // formatInfo may contain information about years representation for specific culture.

    protected formatDayOfMonth(dayOfMonth: number, format: string, formatInfo: DateTimeFormatInfo): string {
        let targetLength = format.length;

        return this.textTransform.padStart(dayOfMonth.toString(), targetLength, '0');
    }
}

