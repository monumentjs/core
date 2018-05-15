import {GetInstance} from '@monument/core/main/decorators/GetInstance';
import {InvalidOperationException} from '@monument/core/main/exceptions/InvalidOperationException';
import {StringPool} from '@monument/core/main/StringPool';
import {StringUtils} from '@monument/text/main/StringUtils';
import {DateTime} from '../DateTime';
import {TimeSpan} from '../TimeSpan';
import {DateTimeFormatInfo} from '../DateTimeFormatInfo';
import {TimeEntryProcessor} from './TimeEntryProcessor';


export class MonthProcessor extends TimeEntryProcessor {
    @GetInstance()
    public static readonly instance: MonthProcessor;


    protected entryPattern: RegExp = /^(M(M{0,3}|G|g))$/;


    private constructor() {
        super();
    }


    public formatDateTime(dateTime: DateTime, format: string, formatInfo: DateTimeFormatInfo): string {
        return this.formatMonth(dateTime.month, format, formatInfo);
    }


    public formatTimeSpan(timeSpan: TimeSpan, format: string, formatInfo: DateTimeFormatInfo): string {
        throw new InvalidOperationException(`Month component is not available for time span.`);
    }


    public parseDateTime(
        value: string,
        formatEntry: string,
        formatInfo: DateTimeFormatInfo,
        dateBuilder: DateTime.Builder
    ): void {
        dateBuilder.month = parseInt(value, 10);
    }


    protected formatMonth(month: number, format: string, formatInfo: DateTimeFormatInfo): string {
        switch (format) {
            // Full name of month
            case 'MMMM':
                return formatInfo.monthNames.getAt(month);

            // Abbreviated name of month
            case 'MMM':
                return formatInfo.abbreviatedMonthNames.getAt(month);

            // Month number
            case 'MM':
            case 'M':
                let targetLength = format.length;

                return StringUtils.padStart((month + 1).toString(), targetLength, '0');

            // Full genitive name of month
            case 'MG':
                return formatInfo.monthGenitiveNames.getAt(month);

            // Abbreviated genitive name of month
            case 'Mg':
                return formatInfo.abbreviatedMonthGenitiveNames.getAt(month);

            default:
                return StringPool.BLANK;
        }
    }
}
