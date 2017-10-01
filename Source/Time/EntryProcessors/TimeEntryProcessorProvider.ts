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
import {DateTimeFormatException} from '../DateTimeFormatException';
import {GetInstance} from '../../Language/Decorators/GetInstance';
import {IEnumerable} from '../../Collections/Abstraction/IEnumerable';


export class TimeEntryProcessorProvider {
    @GetInstance()
    public static readonly instance: TimeEntryProcessorProvider;


    private _formatters: IEnumerable<TimeEntryProcessor> = [
        YearProcessor.instance,
        MonthProcessor.instance,
        DayOfMonthProcessor.instance,
        DayOfWeekProcessor.instance,
        HoursProcessor.instance,
        MinutesProcessor.instance,
        SecondsProcessor.instance,
        MillisecondsProcessor.instance,
        AMPMProcessor.instance,
        TimeZoneProcessor.instance,
        SignProcessor.instance
    ];


    private constructor() {}


    public getFormatter(formatEntry: string): TimeEntryProcessor {
        for (let formatter of this._formatters) {
            if (formatter.supportsEntry(formatEntry)) {
                return formatter;
            }
        }

        throw new DateTimeFormatException(`Unknown format entry "${formatEntry}".`);
    }
}
