import {TimeComponentFormatterBase} from './Formatting/TimeComponentFormatterBase';
import YearComponentFormatter from './Formatting/YearComponentFormatter';
import MonthComponentFormatter from './Formatting/MonthComponentFormatter';
import DayOfMonthComponentFormatter from './Formatting/DayOfMonthComponentFormatter';
import DayOfWeekComponentFormatter from './Formatting/DayOfWeekComponentFormatter';
import HoursComponentFormatter from './Formatting/HoursComponentFormatter';
import MinutesComponentFormatter from './Formatting/MinutesComponentFormatter';
import SecondsComponentFormatter from './Formatting/SecondsComponentFormatter';
import MillisecondsComponentFormatter from './Formatting/MillisecondsComponentFormatter';
import TimezoneComponentFormatter from './Formatting/TimezoneComponentFormatter';
import ReadOnlyCollection from '../Collections/ReadOnlyCollection';
import AMPMComponentFormatter from './Formatting/AMPMComponentFormatter';


export default class TimeComponentFormatterProvider {
    public static readonly instance: TimeComponentFormatterProvider = new TimeComponentFormatterProvider();


    private _formatters: ReadOnlyCollection<TimeComponentFormatterBase> = new ReadOnlyCollection([
        YearComponentFormatter.instance,
        MonthComponentFormatter.instance,
        DayOfMonthComponentFormatter.instance,
        DayOfWeekComponentFormatter.instance,
        HoursComponentFormatter.instance,
        MinutesComponentFormatter.instance,
        SecondsComponentFormatter.instance,
        MillisecondsComponentFormatter.instance,
        AMPMComponentFormatter.instance,
        TimezoneComponentFormatter.instance
    ]);


    public getFormatter(entry: string): TimeComponentFormatterBase | null {
        for (let formatter of this._formatters) {
            if (formatter.supportsEntry(entry)) {
                return formatter;
            }
        }

        return null;
    }
}
