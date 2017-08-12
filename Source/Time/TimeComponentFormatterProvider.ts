import {TimeComponentFormatterBase} from './Format/TimeComponentFormatterBase';
import {YearFormatter} from './Format/YearFormatter';
import {MonthFormatter} from './Format/MonthFormatter';
import {DayOfMonthFormatter} from './Format/DayOfMonthFormatter';
import {DayOfWeekFormatter} from './Format/DayOfWeekFormatter';
import {HoursFormatter} from './Format/HoursFormatter';
import {MinutesFormatter} from './Format/MinutesFormatter';
import {SecondsFormatter} from './Format/SecondsFormatter';
import {MillisecondsFormatter} from './Format/MillisecondsFormatter';
import {TimezoneFormatter} from './Format/TimezoneFormatter';
import {ReadOnlyCollection} from '../Collections/ReadOnlyCollection';
import {AMPMFormatter} from './Format/AMPMFormatter';
import {SignFormatter} from './Format/SignFormatter';
import {DateTimeFormatException} from './DateTimeFormatException';
import {Assert} from '../Assertion/Assert';
import {Singleton} from '../DI/Decorators/Singleton';
import {Container} from '../DI/Container/Container';


@Singleton()
export class TimeComponentFormatterProvider {
    private _formatters: ReadOnlyCollection<TimeComponentFormatterBase> = new ReadOnlyCollection([
        Container.get(YearFormatter),
        Container.get(MonthFormatter),
        Container.get(DayOfMonthFormatter),
        Container.get(DayOfWeekFormatter),
        Container.get(HoursFormatter),
        Container.get(MinutesFormatter),
        Container.get(SecondsFormatter),
        Container.get(MillisecondsFormatter),
        Container.get(AMPMFormatter),
        Container.get(TimezoneFormatter),
        Container.get(SignFormatter)
    ]);


    public getFormatter(formatEntry: string): TimeComponentFormatterBase | null {
        Assert.argument('formatEntry', formatEntry).notNull();

        for (let formatter of this._formatters) {
            if (formatter.supportsEntry(formatEntry)) {
                return formatter;
            }
        }

        throw new DateTimeFormatException(`Unknown format entry "${formatEntry}".`);
    }
}
