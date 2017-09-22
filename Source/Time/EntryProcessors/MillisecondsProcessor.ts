import {TimeEntryProcessor} from './TimeEntryProcessor';
import {DateTime} from '../DateTime';
import {TimeSpan} from '../TimeSpan';
import {TextTransform} from '../../Text/TextTransform';
import {Singleton} from '../../Language/Decorators/Singleton';
import {IDateTimeFormatInfo} from '../IDateTimeFormatInfo';
import {DateTimeBuilder} from '../DateTimeBuilder';


@Singleton()
export class MillisecondsProcessor extends TimeEntryProcessor {
    public static readonly instance: MillisecondsProcessor;


    protected entryPattern: RegExp = /^(f+)$/;


    private constructor() {
        super();
    }


    public formatDateTime(dateTime: DateTime, format: string, formatInfo: IDateTimeFormatInfo): string {
        return this.formatMilliseconds(dateTime.milliseconds, format, formatInfo);
    }


    public formatTimeSpan(timeSpan: TimeSpan, format: string, formatInfo: IDateTimeFormatInfo): string {
        return this.formatMilliseconds(timeSpan.milliseconds, format, formatInfo);
    }


    public parseDateTime(
        value: string,
        formatEntry: string,
        formatInfo: IDateTimeFormatInfo,
        dateBuilder: DateTimeBuilder
    ): void {
        dateBuilder.milliseconds = parseInt(value, 10);
    }


    // formatInfo may contain information about milliseconds representation for specific culture.

    protected formatMilliseconds(milliseconds: number, format: string, formatInfo: IDateTimeFormatInfo): string {
        let targetLength = format.length;
        let clippedMilliseconds: string;

        clippedMilliseconds = TextTransform.padStart(milliseconds.toString(), 3, '0');
        clippedMilliseconds = TextTransform.padEnd(clippedMilliseconds, targetLength, '0');

        return TextTransform.clipStart(clippedMilliseconds, targetLength);
    }
}
