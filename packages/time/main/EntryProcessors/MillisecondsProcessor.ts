import {TimeEntryProcessor} from './TimeEntryProcessor';
import {DateTime} from '../DateTime';
import {GetInstance} from '../../Language/Decorators/GetInstance';
import {DateTimeFormatInfo} from '../DateTimeFormatInfo';
import {TimeSpan} from '../TimeSpan';
import {StringUtils} from '../../../text/main/StringUtils';


export class MillisecondsProcessor extends TimeEntryProcessor {
    @GetInstance()
    public static readonly instance: MillisecondsProcessor;


    protected entryPattern: RegExp = /^(f+)$/;


    private constructor() {
        super();
    }


    public formatDateTime(dateTime: DateTime, format: string, formatInfo: DateTimeFormatInfo): string {
        return this.formatMilliseconds(dateTime.milliseconds, format, formatInfo);
    }


    public formatTimeSpan(timeSpan: TimeSpan, format: string, formatInfo: DateTimeFormatInfo): string {
        return this.formatMilliseconds(timeSpan.milliseconds, format, formatInfo);
    }


    public parseDateTime(
        value: string,
        formatEntry: string,
        formatInfo: DateTimeFormatInfo,
        dateBuilder: DateTime.Builder
    ): void {
        dateBuilder.milliseconds = parseInt(value, 10);
    }


    // formatInfo may contain information about milliseconds representation for specific culture.

    protected formatMilliseconds(milliseconds: number, format: string, formatInfo: DateTimeFormatInfo): string {
        let targetLength = format.length;
        let clippedMilliseconds: string;

        clippedMilliseconds = StringUtils.padStart(milliseconds.toString(), 3, '0');
        clippedMilliseconds = StringUtils.padEnd(clippedMilliseconds, targetLength, '0');

        return StringUtils.clipStart(clippedMilliseconds, targetLength);
    }
}
