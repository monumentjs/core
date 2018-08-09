import {DateTimeFormatException} from '../DateTimeFormatException';
import {TimeEntryProcessor} from './TimeEntryProcessor';
import {YearProcessor} from './YearProcessor';
import {MonthProcessor} from './MonthProcessor';
import {DayOfMonthProcessor} from './DayOfMonthProcessor';
import {DayOfWeekProcessor} from './DayOfWeekProcessor';
import {HoursProcessor} from './HoursProcessor';
import {MinutesProcessor} from './MinutesProcessor';
import {SecondsProcessor} from './SecondsProcessor';
import {MillisecondsProcessor} from './MillisecondsProcessor';
import {TimeZoneProcessor} from './TimeZoneProcessor';
import {AMPMProcessor} from './AMPMProcessor';
import {SignProcessor} from './SignProcessor';
import {Sequence} from '../../collection/readonly/Sequence';


export class TimeEntryProcessorProvider {

    private readonly _formatters: Sequence<TimeEntryProcessor>;


    public constructor(
        year: YearProcessor,
        month: MonthProcessor,
        dayOfMonth: DayOfMonthProcessor,
        dayOfWeek: DayOfWeekProcessor,
        hours: HoursProcessor,
        minutes: MinutesProcessor,
        seconds: SecondsProcessor,
        milliseconds: MillisecondsProcessor,
        ampm: AMPMProcessor,
        timeZone: TimeZoneProcessor,
        sign: SignProcessor
    ) {
        this._formatters = [...arguments];
    }


    public getFormatter(formatEntry: string): TimeEntryProcessor {
        for (const formatter of this._formatters) {
            if (formatter.supportsEntry(formatEntry)) {
                return formatter;
            }
        }

        throw new DateTimeFormatException(`Unknown format entry "${formatEntry}".`);
    }
}
