import {DateTimeFormatInfo} from '../DateTimeFormatInfo';
import {TimeSpan} from '../TimeSpan';
import {DateTime} from '../DateTime';
import {Assert} from '../../Assertion/Assert';


export abstract class TimeComponentFormatterBase {
    protected abstract entryPattern: RegExp;


    public supportsEntry(entry: string): boolean {
        Assert.argument('entry', entry).notNull();

        return this.entryPattern.test(entry);
    }


    public abstract formatDateTime(value: DateTime, format: string, formatInfo: DateTimeFormatInfo): string;
    public abstract formatTimeSpan(value: TimeSpan, format: string, formatInfo: DateTimeFormatInfo): string;
}
