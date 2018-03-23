import {GetInstance} from '@monument/core/main/decorators/GetInstance';
import {TimeEntryProcessor} from './TimeEntryProcessor';
import {DateTime} from '../DateTime';
import {TimeSpan} from '../TimeSpan';
import {DateTimeFormatException} from '../DateTimeFormatException';
import {DateTimeFormatInfo} from '../DateTimeFormatInfo';


export class SignProcessor extends TimeEntryProcessor {
    @GetInstance()
    public static readonly instance: SignProcessor;


    protected entryPattern: RegExp = /^(S)$/;


    private constructor() {
        super();
    }


    public formatDateTime(dateTime: DateTime, format: string, formatInfo: DateTimeFormatInfo): string {
        throw new DateTimeFormatException(`Sign component is not available for date and time.`);
    }


    public formatTimeSpan(timeSpan: TimeSpan, format: string, formatInfo: DateTimeFormatInfo): string {
        return this.formatSign(!timeSpan.isNegative, format, formatInfo);
    }


    public parseDateTime(value: string, formatEntry: string, formatInfo: DateTimeFormatInfo, dateBuilder: DateTime.Builder): void {
        // Stub
    }


    // formatInfo may contain information about sign representation for specific culture.

    protected formatSign(isPositive: boolean, format: string, formatInfo: DateTimeFormatInfo): string {
        return isPositive ? '+' : '-';
    }
}
