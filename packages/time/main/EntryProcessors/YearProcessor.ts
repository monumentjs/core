import {GetInstance} from '@monument/core/main/decorators/GetInstance';
import {InvalidOperationException} from '@monument/core/main/exceptions/InvalidOperationException';
import {StringUtils} from '@monument/text/main/StringUtils';
import {DateTime} from '../DateTime';
import {TimeSpan} from '../TimeSpan';
import {DateTimeFormatInfo} from '../DateTimeFormatInfo';
import {TimeEntryProcessor} from './TimeEntryProcessor';


export class YearProcessor extends TimeEntryProcessor {
    @GetInstance()
    public static readonly instance: YearProcessor;


    protected entryPattern: RegExp = /^(Y+)$/;


    private constructor() {
        super();
    }


    public formatDateTime(dateTime: DateTime, format: string, formatInfo: DateTimeFormatInfo): string {
        return this.formatYear(dateTime.year, format, formatInfo);
    }


    public formatTimeSpan(timeSpan: TimeSpan, format: string, formatInfo: DateTimeFormatInfo): string {
        throw new InvalidOperationException(`Years component is not available for time span.`);
    }


    public parseDateTime(
        value: string,
        formatEntry: string,
        formatInfo: DateTimeFormatInfo,
        dateBuilder: DateTime.Builder
    ): void {
        let year: number = parseInt(value, 10);

        if (year < 100) {
            year += 1900;
        }

        dateBuilder.year = year;
    }


    // formatInfo may contain information about years representation for specific culture.

    protected formatYear(year: number, format: string, formatInfo: DateTimeFormatInfo): string {
        let targetLength = format.length;
        let formattedYear: string = StringUtils.padEnd(year.toString(), targetLength, '0');

        return StringUtils.clipEnd(formattedYear, targetLength);
    }
}
