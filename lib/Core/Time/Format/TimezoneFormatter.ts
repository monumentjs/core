import {TimeComponentFormatterBase} from './TimeComponentFormatterBase';
import DateTime from '../DateTime';
import DateTimeFormatInfo from '../DateTimeFormatInfo';
import InvalidOperationException from '../../Exceptions/InvalidOperationException';
import TimeSpan from '../TimeSpan';
import {assertArgumentNotNull} from '../../../Assertion/Assert';


export default class TimezoneFormatter extends TimeComponentFormatterBase {
    public static readonly instance: TimezoneFormatter = new TimezoneFormatter();


    protected _entryPattern: RegExp = /^(Z)$/;


    public formatDateTime(dateTime: DateTime, format: string, formatInfo: DateTimeFormatInfo): string {
        assertArgumentNotNull('dateTime', dateTime);
        assertArgumentNotNull('format', format);
        assertArgumentNotNull('formatInfo', formatInfo);

        return this.formatTimezoneOffset(dateTime.timezoneOffset, format, formatInfo);
    }


    public formatTimeSpan(timeSpan: TimeSpan, format: string, formatInfo: DateTimeFormatInfo): string {
        throw new InvalidOperationException(`Time zone offset component is not available for time span.`);
    }


    // formatInfo may contain information about years representation for specific culture.

    protected formatTimezoneOffset(offset: TimeSpan, format: string, formatInfo: DateTimeFormatInfo): string {
        return offset.toString('{HH}:{mm}', formatInfo);
    }
}

