import {InvalidOperationException} from '@monument/core/main/exceptions/InvalidOperationException';
import {GetInstance} from '@monument/core/main/decorators/GetInstance';
import {IgnoreCaseComparator} from '@monument/core/main/IgnoreCaseComparator';
import {DateTime} from '../DateTime';
import {DateTimeFormatInfo} from '../DateTimeFormatInfo';
import {TimeSpan} from '../TimeSpan';
import {TimeEntryProcessor} from './TimeEntryProcessor';
import {StringPool} from '@monument/core/main/StringPool';


export class AMPMProcessor extends TimeEntryProcessor {
    @GetInstance()
    public static readonly instance: AMPMProcessor;


    protected entryPattern: RegExp = /^(AA?|aa?)$/;


    private constructor() {
        super();
    }


    public formatDateTime(dateTime: DateTime, format: string, formatInfo: DateTimeFormatInfo): string {
        return this.formatAMPM(dateTime.hours, format, formatInfo);
    }


    public formatTimeSpan(timeSpan: TimeSpan, format: string, formatInfo: DateTimeFormatInfo): string {
        throw new InvalidOperationException(`Day of month component is not available for time span.`);
    }


    public parseDateTime(
        value: string,
        formatEntry: string,
        formatInfo: DateTimeFormatInfo,
        dateBuilder: DateTime.Builder
    ): void {
        if (dateBuilder.hours < 12 && IgnoreCaseComparator.instance.equals(value, formatInfo.pmDesignator)) {
            dateBuilder.hours += 12;
        }
    }


    // formatInfo may contain information about day-of-week representation for specific culture.

    protected formatAMPM(hours: number, format: string, formatInfo: DateTimeFormatInfo): string {
        switch (format) {
            // AM/PM in upper case (full format)
            case 'AA':
                return (hours < 12 ? formatInfo.amDesignator : formatInfo.pmDesignator).toUpperCase();

            // AM/PM in upper case (short format)
            case 'A':
                return (hours < 12 ? formatInfo.amDesignator : formatInfo.pmDesignator).toUpperCase().slice(0, 1);

            // AM/PM in lower case (full format)
            case 'aa':
                return (hours < 12 ? formatInfo.amDesignator : formatInfo.pmDesignator).toLowerCase();

            // AM/PM in lower case (short format)
            case 'a':
                return (hours < 12 ? formatInfo.amDesignator : formatInfo.pmDesignator).toLowerCase().slice(0, 1);

            default:
                return StringPool.BLANK;
        }
    }
}

