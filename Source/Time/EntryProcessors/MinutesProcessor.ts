import {TimeEntryProcessor} from './TimeEntryProcessor';
import {DateTime} from '../DateTime';
import {TimeSpan} from '../TimeSpan';
import {TextTransform} from '../../Text/TextTransform';
import {Singleton} from '../../Language/Decorators/Singleton';
import {IDateTimeFormatInfo} from '../IDateTimeFormatInfo';
import {DateTimeBuilder} from '../DateTimeBuilder';


@Singleton()
export class MinutesProcessor extends TimeEntryProcessor {
    public static readonly instance: MinutesProcessor;


    protected entryPattern: RegExp = /^(m+)$/;


    private constructor() {
        super();
    }


    public formatDateTime(dateTime: DateTime, format: string, formatInfo: IDateTimeFormatInfo): string {
        return this.formatMinutes(dateTime.minutes, format, formatInfo);
    }


    public formatTimeSpan(timeSpan: TimeSpan, format: string, formatInfo: IDateTimeFormatInfo): string {
        return this.formatMinutes(timeSpan.minutes, format, formatInfo);
    }


    public parseDateTime(
        value: string,
        formatEntry: string,
        formatInfo: IDateTimeFormatInfo,
        dateBuilder: DateTimeBuilder
    ): void {
        dateBuilder.minutes = parseInt(value, 10);
    }


    // formatInfo may contain information about minutes representation for specific culture.

    protected formatMinutes(minutes: number, format: string, formatInfo: IDateTimeFormatInfo): string {
        let targetLength = format.length;

        return TextTransform.padStart(minutes.toString(), targetLength, '0');
    }
}
