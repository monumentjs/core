import {CalendarWeekRule} from './CalendarWeekRule';
import {DayOfWeek} from './DayOfWeek';
import {EMPTY_STRING} from '../Text/constants';
import {ReadOnlyCollection} from '../Collections/ReadOnlyCollection';
import {IDateTimeFormatInfo} from './IDateTimeFormatInfo';
import {Singleton} from '../Language/Decorators/Singleton';


@Singleton('invariant')
export class DateTimeFormatInfo implements IDateTimeFormatInfo {
    public static readonly invariant: DateTimeFormatInfo;

    public readonly shortestDayNames: ReadOnlyCollection<string> = new ReadOnlyCollection([
        'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'
    ]);
    public readonly abbreviatedDayNames: ReadOnlyCollection<string> = new ReadOnlyCollection([
        'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'
    ]);
    public readonly dayNames: ReadOnlyCollection<string> = new ReadOnlyCollection([
        'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
    ]);
    public readonly monthNames: ReadOnlyCollection<string> = new ReadOnlyCollection([
        'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September',
        'October', 'November', 'December', EMPTY_STRING
    ]);
    public readonly abbreviatedMonthNames: ReadOnlyCollection<string> = new ReadOnlyCollection([
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', EMPTY_STRING
    ]);
    public readonly monthGenitiveNames: ReadOnlyCollection<string> = new ReadOnlyCollection([
        'of January', 'of February', 'of March', 'of April', 'of May', 'of June', 'of July', 'of August',
        'of September', 'of October', 'of November', 'of December', EMPTY_STRING
    ]);
    public readonly abbreviatedMonthGenitiveNames: ReadOnlyCollection<string> = new ReadOnlyCollection([
        'of Jan', 'of Feb', 'of Mar', 'of Apr', 'of May', 'of Jun', 'of Jul', 'of Aug', 'of Sep',
        'of Oct', 'of Nov', 'of Dec', EMPTY_STRING
    ]);
    public readonly amDesignator: string = 'AM';
    public readonly pmDesignator: string = 'PM';
    // TODO: public readonly calendar: Calendar;
    public readonly calendarWeekRule: CalendarWeekRule = CalendarWeekRule.FirstDay;
    public readonly firstDayOfWeek: DayOfWeek = DayOfWeek.Sunday;
    public readonly fullDateTimePattern: string = '{YYYY}/{MM}/{DD} {HH}:{mm}:{ss}.{fff}';
    public readonly longDatePattern: string = '{YYYY}/{MM}/{DD}';
    public readonly longTimePattern: string = '{HH}:{mm}:{ss}.{fff}';
    public readonly monthDayPattern: string = '{MMMM} {DD}';
    public readonly nativeCalendarName: string = EMPTY_STRING;
    public readonly rfc1123Pattern: string = `{ddd}, {DD} {MMM} {YYYY} {HH}:{mm}:{ss} GMT`;
    public readonly shortDatePattern: string = '{YYYY}/{M}/{D}';
    public readonly shortTimePattern: string = '{H}:{mm} {AA}';
    public readonly sortableDateTimePattern: string = `{YYYY}-{MM}-{DD}T{HH}:{mm}:{ss}`;
    public readonly universalSortableDateTimePattern: string = `{YYYY}-{MM}-{DD} {HH}:{mm}:{ss}Z`;
    public readonly yearMonthPattern: string = `{MMMM}, {YYYY}`;
}
