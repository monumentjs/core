import {ReadOnlyList} from '../collection/ReadOnlyList';
import {ArrayList} from '../collection/ArrayList';
import {CalendarWeekRule} from './CalendarWeekRule';
import {DayOfWeek} from './DayOfWeek';
import {DateTimeFormatInfo} from './DateTimeFormatInfo';
import {StringPool} from '../StringPool';


export class InvariantDateTimeFormatInfo implements DateTimeFormatInfo {
    public static readonly INVARIANT = new InvariantDateTimeFormatInfo();

    public readonly shortestDayNames: ReadOnlyList<string> = new ArrayList([
        'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'
    ]);
    public readonly abbreviatedDayNames: ReadOnlyList<string> = new ArrayList([
        'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'
    ]);
    public readonly dayNames: ReadOnlyList<string> = new ArrayList([
        'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
    ]);
    public readonly monthNames: ReadOnlyList<string> = new ArrayList([
        'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September',
        'October', 'November', 'December', StringPool.BLANK
    ]);
    public readonly abbreviatedMonthNames: ReadOnlyList<string> = new ArrayList([
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', StringPool.BLANK
    ]);
    public readonly monthGenitiveNames: ReadOnlyList<string> = new ArrayList([
        'of January', 'of February', 'of March', 'of April', 'of May', 'of June', 'of July', 'of August',
        'of September', 'of October', 'of November', 'of December', StringPool.BLANK
    ]);
    public readonly abbreviatedMonthGenitiveNames: ReadOnlyList<string> = new ArrayList([
        'of Jan', 'of Feb', 'of Mar', 'of Apr', 'of May', 'of Jun', 'of Jul', 'of Aug', 'of Sep',
        'of Oct', 'of Nov', 'of Dec', StringPool.BLANK
    ]);
    public readonly amDesignator: string = 'AM';
    public readonly pmDesignator: string = 'PM';
    // TODO: public readonly calendar: Calendar;
    public readonly calendarWeekRule: CalendarWeekRule = CalendarWeekRule.FirstDay;
    public readonly firstDayOfWeek: DayOfWeek = DayOfWeek.SUNDAY;
    public readonly fullDateTimePattern: string = '{YYYY}/{MM}/{DD} {HH}:{mm}:{ss}.{fff}';
    public readonly longDatePattern: string = '{YYYY}/{MM}/{DD}';
    public readonly longTimePattern: string = '{HH}:{mm}:{ss}.{fff}';
    public readonly monthDayPattern: string = '{MMMM} {DD}';
    public readonly nativeCalendarName: string = StringPool.BLANK;
    public readonly rfc1123Pattern: string = `{ddd}, {DD} {MMM} {YYYY} {HH}:{mm}:{ss} GMT`;
    public readonly shortDatePattern: string = '{YYYY}/{M}/{D}';
    public readonly shortTimePattern: string = '{H}:{mm} {AA}';
    public readonly sortableDateTimePattern: string = `{YYYY}-{MM}-{DD}T{HH}:{mm}:{ss}`;
    public readonly universalSortableDateTimePattern: string = `{YYYY}-{MM}-{DD} {HH}:{mm}:{ss}Z`;
    public readonly yearMonthPattern: string = `{MMMM}, {YYYY}`;
}
