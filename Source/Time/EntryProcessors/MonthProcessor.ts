import {TimeEntryProcessor} from './TimeEntryProcessor';
import {DateTime} from '../DateTime';
import {TimeSpan} from '../TimeSpan';
import {InvalidOperationException} from '../../Exceptions/InvalidOperationException';
import {TextTransform} from '../../Text/TextTransform';
import {EMPTY_STRING} from '../../Text/constants';
import {GetInstance} from '../../Language/Decorators/GetInstance';
import {IDateTimeFormatInfo} from '../IDateTimeFormatInfo';
import {DateTimeBuilder} from '../DateTimeBuilder';


export class MonthProcessor extends TimeEntryProcessor {
    @GetInstance()
    public static readonly instance: MonthProcessor;


    protected entryPattern: RegExp = /^(M(M{0,3}|G|g))$/;


    private constructor() {
        super();
    }


    public formatDateTime(dateTime: DateTime, format: string, formatInfo: IDateTimeFormatInfo): string {
        return this.formatMonth(dateTime.month, format, formatInfo);
    }


    public formatTimeSpan(timeSpan: TimeSpan, format: string, formatInfo: IDateTimeFormatInfo): string {
        throw new InvalidOperationException(`Month component is not available for time span.`);
    }


    public parseDateTime(
        value: string,
        formatEntry: string,
        formatInfo: IDateTimeFormatInfo,
        dateBuilder: DateTimeBuilder
    ): void {
        dateBuilder.month = parseInt(value, 10);
    }


    protected formatMonth(month: number, format: string, formatInfo: IDateTimeFormatInfo): string {
        switch (format) {
            // Full name of month
            case 'MMMM':
                return formatInfo.monthNames[month] as string;

            // Abbreviated name of month
            case 'MMM':
                return formatInfo.abbreviatedMonthNames[month] as string;

            // Month number
            case 'MM':
            case 'M':
                let targetLength = format.length;

                return TextTransform.padStart((month + 1).toString(), targetLength, '0');

            // Full genitive name of month
            case 'MG':
                return formatInfo.monthGenitiveNames[month] as string;

            // Abbreviated genitive name of month
            case 'Mg':
                return formatInfo.abbreviatedMonthGenitiveNames[month] as string;

            default:
                return EMPTY_STRING;
        }
    }
}
