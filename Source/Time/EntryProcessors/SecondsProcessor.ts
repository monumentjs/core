import {TimeEntryProcessor} from './TimeEntryProcessor';
import {DateTime} from '../DateTime';
import {TimeSpan} from '../TimeSpan';
import {TextTransform} from '../../Text/TextTransform';
import {Singleton} from '../../Language/Decorators/Singleton';
import {IDateTimeFormatInfo} from '../IDateTimeFormatInfo';
import {DateTimeBuilder} from '../DateTimeBuilder';


@Singleton()
export class SecondsProcessor extends TimeEntryProcessor {
    public static readonly instance: SecondsProcessor;


    protected entryPattern: RegExp = /^(s+)$/;


    private constructor() {
        super();
    }


    public formatDateTime(dateTime: DateTime, format: string, formatInfo: IDateTimeFormatInfo): string {
        return this.formatSeconds(dateTime.seconds, format, formatInfo);
    }


    public formatTimeSpan(timeSpan: TimeSpan, format: string, formatInfo: IDateTimeFormatInfo): string {
        return this.formatSeconds(timeSpan.seconds, format, formatInfo);
    }


    public parseDateTime(
        value: string,
        formatEntry: string,
        formatInfo: IDateTimeFormatInfo,
        dateBuilder: DateTimeBuilder
    ): void {
        dateBuilder.seconds = parseInt(value, 10);
    }


    // formatInfo may contain information about seconds representation for specific culture.

    protected formatSeconds(seconds: number, format: string, formatInfo: IDateTimeFormatInfo): string {
        let targetLength = format.length;

        return TextTransform.padStart(seconds.toString(), targetLength, '0');
    }
}
