import {TimeEntryProcessor} from './TimeEntryProcessor';
import {DateTime} from '../DateTime';
import {TimeSpan} from '../TimeSpan';
import {DateTimeFormatException} from '../DateTimeFormatException';
import {GetInstance} from '../../Language/Decorators/GetInstance';
import {IDateTimeFormatInfo} from '../IDateTimeFormatInfo';
import {DateTimeBuilder} from '../DateTimeBuilder';


export class SignProcessor extends TimeEntryProcessor {
    @GetInstance()
    public static readonly instance: SignProcessor;


    protected entryPattern: RegExp = /^(S)$/;


    private constructor() {
        super();
    }


    public formatDateTime(dateTime: DateTime, format: string, formatInfo: IDateTimeFormatInfo): string {
        throw new DateTimeFormatException(`Sign component is not available for date and time.`);
    }


    public formatTimeSpan(timeSpan: TimeSpan, format: string, formatInfo: IDateTimeFormatInfo): string {
        return this.formatSign(!timeSpan.isNegative, format, formatInfo);
    }


    public parseDateTime(value: string, formatEntry: string, formatInfo: IDateTimeFormatInfo, dateBuilder: DateTimeBuilder): void {
        // Stub
    }


    // formatInfo may contain information about sign representation for specific culture.

    protected formatSign(isPositive: boolean, format: string, formatInfo: IDateTimeFormatInfo): string {
        return isPositive ? '+' : '-';
    }
}
