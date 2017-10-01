import {TimeEntryProcessor} from './TimeEntryProcessor';
import {DateTime} from '../DateTime';
import {InvalidOperationException} from '../../Exceptions/InvalidOperationException';
import {TimeSpan} from '../TimeSpan';
import {TextTransform} from '../../Text/TextTransform';
import {GetInstance} from '../../Language/Decorators/GetInstance';
import {IDateTimeFormatInfo} from '../IDateTimeFormatInfo';
import {DateTimeBuilder} from '../DateTimeBuilder';


export class YearProcessor extends TimeEntryProcessor {
    @GetInstance()
    public static readonly instance: YearProcessor;


    protected entryPattern: RegExp = /^(Y+)$/;


    private constructor() {
        super();
    }


    public formatDateTime(dateTime: DateTime, format: string, formatInfo: IDateTimeFormatInfo): string {
        return this.formatYear(dateTime.year, format, formatInfo);
    }


    public formatTimeSpan(timeSpan: TimeSpan, format: string, formatInfo: IDateTimeFormatInfo): string {
        throw new InvalidOperationException(`Years component is not available for time span.`);
    }


    public parseDateTime(
        value: string,
        formatEntry: string,
        formatInfo: IDateTimeFormatInfo,
        dateBuilder: DateTimeBuilder
    ): void {
        let year: number = parseInt(value, 10);

        if (year < 100) {
            year += 1900;
        }

        dateBuilder.year = year;
    }


    // formatInfo may contain information about years representation for specific culture.

    protected formatYear(year: number, format: string, formatInfo: IDateTimeFormatInfo): string {
        let targetLength = format.length;
        let formattedYear: string = TextTransform.padEnd(year.toString(), targetLength, '0');

        return TextTransform.clipEnd(formattedYear, targetLength);
    }
}
