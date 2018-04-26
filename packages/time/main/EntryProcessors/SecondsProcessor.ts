import {GetInstance} from '@monument/core/main/decorators/GetInstance';
import {StringUtils} from '@monument/text/main/StringUtils';
import {DateTime} from '../DateTime';
import {TimeSpan} from '../TimeSpan';
import {DateTimeFormatInfo} from '../DateTimeFormatInfo';
import {TimeEntryProcessor} from './TimeEntryProcessor';


export class SecondsProcessor extends TimeEntryProcessor {
    @GetInstance()
    public static readonly instance: SecondsProcessor;


    protected entryPattern: RegExp = /^(s+)$/;


    private constructor() {
        super();
    }


    public formatDateTime(dateTime: DateTime, format: string, formatInfo: DateTimeFormatInfo): string {
        return this.formatSeconds(dateTime.seconds, format, formatInfo);
    }


    public formatTimeSpan(timeSpan: TimeSpan, format: string, formatInfo: DateTimeFormatInfo): string {
        return this.formatSeconds(timeSpan.seconds, format, formatInfo);
    }


    public parseDateTime(
        value: string,
        formatEntry: string,
        formatInfo: DateTimeFormatInfo,
        dateBuilder: DateTime.Builder
    ): void {
        dateBuilder.seconds = parseInt(value, 10);
    }


    // formatInfo may contain information about seconds representation for specific culture.

    protected formatSeconds(seconds: number, format: string, formatInfo: DateTimeFormatInfo): string {
        let targetLength = format.length;

        return StringUtils.padStart(seconds.toString(), targetLength, '0');
    }
}
