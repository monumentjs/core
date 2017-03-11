import {TimeComponentFormatterBase} from './TimeComponentFormatterBase';
import DateTime from '../DateTime';
import DateTimeFormatInfo from '../DateTimeFormatInfo';
import InvalidOperationException from '../../Exceptions/InvalidOperationException';
import TimeSpan from '../TimeSpan';
import TextTransform from '../../../System/Text/TextTransform';


export default class YearComponentFormatter extends TimeComponentFormatterBase {
    public static readonly instance: YearComponentFormatter = new YearComponentFormatter();


    protected _entryPattern: RegExp = /^(Y+)$/;


    public formatDateTime(dateTime: DateTime, format: string, formatInfo: DateTimeFormatInfo): string {
        return this.formatYear(dateTime.year, format, formatInfo);
    }


    public formatTimeSpan(timeSpan: TimeSpan, format: string, formatInfo: DateTimeFormatInfo): string {
        throw new InvalidOperationException(`Years component is not available for time span.`);
    }


    // formatInfo may contain information about years representation for specific culture.

    protected formatYear(year: number, format: string, formatInfo: DateTimeFormatInfo): string {
        let targetLength = format.length;
        let formattedYear: string = TextTransform.padEnd(year.toString(), targetLength, '0');

        return TextTransform.clipEnd(formattedYear, targetLength);
    }
}
