import {TimeComponentFormatterBase} from './TimeComponentFormatterBase';
import DateTime from '../DateTime';
import DateTimeFormatInfo from '../DateTimeFormatInfo';
import TimeSpan from '../TimeSpan';
import DateTimeFormatException from '../DateTimeFormatException';
import {assertArgumentNotNull} from '../../../Assertion/Assert';


export default class SignFormatter extends TimeComponentFormatterBase {
    public static readonly instance: SignFormatter = new SignFormatter();


    protected _entryPattern: RegExp = /^(S)$/;


    public formatDateTime(dateTime: DateTime, format: string, formatInfo: DateTimeFormatInfo): string {
        throw new DateTimeFormatException(`Sign component is not available for date and time.`);
    }


    public formatTimeSpan(timeSpan: TimeSpan, format: string, formatInfo: DateTimeFormatInfo): string {
        assertArgumentNotNull('timeSpan', timeSpan);
        assertArgumentNotNull('format', format);
        assertArgumentNotNull('formatInfo', formatInfo);

        return this.formatSign(!timeSpan.isNegative, format, formatInfo);
    }


    // formatInfo may contain information about sign representation for specific culture.

    protected formatSign(isPositive: boolean, format: string, formatInfo: DateTimeFormatInfo): string {
        return isPositive ? '+' : '-';
    }
}
