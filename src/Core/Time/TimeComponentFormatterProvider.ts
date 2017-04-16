import {TimeComponentFormatterBase} from './Format/TimeComponentFormatterBase';
import YearFormatter from './Format/YearFormatter';
import MonthFormatter from './Format/MonthFormatter';
import DayOfMonthFormatter from './Format/DayOfMonthFormatter';
import DayOfWeekFormatter from './Format/DayOfWeekFormatter';
import HoursFormatter from './Format/HoursFormatter';
import MinutesFormatter from './Format/MinutesFormatter';
import SecondsFormatter from './Format/SecondsFormatter';
import MillisecondsFormatter from './Format/MillisecondsFormatter';
import TimezoneFormatter from './Format/TimezoneFormatter';
import ReadOnlyCollection from '../Collections/ReadOnlyCollection';
import AMPMFormatter from './Format/AMPMFormatter';
import SignFormatter from './Format/SignFormatter';
import DateTimeFormatException from './DateTimeFormatException';
import {assertArgumentNotNull} from '../Assertion/Assert';


export default class TimeComponentFormatterProvider {
    public static readonly instance: TimeComponentFormatterProvider = new TimeComponentFormatterProvider();


    private _formatters: ReadOnlyCollection<TimeComponentFormatterBase> = new ReadOnlyCollection([
        YearFormatter.instance,
        MonthFormatter.instance,
        DayOfMonthFormatter.instance,
        DayOfWeekFormatter.instance,
        HoursFormatter.instance,
        MinutesFormatter.instance,
        SecondsFormatter.instance,
        MillisecondsFormatter.instance,
        AMPMFormatter.instance,
        TimezoneFormatter.instance,
        SignFormatter.instance
    ]);


    public getFormatter(formatEntry: string): TimeComponentFormatterBase | null {
        assertArgumentNotNull('formatEntry', formatEntry);

        for (let formatter of this._formatters) {
            if (formatter.supportsEntry(formatEntry)) {
                return formatter;
            }
        }

        throw new DateTimeFormatException(`Unknown format entry "${formatEntry}".`);
    }
}
