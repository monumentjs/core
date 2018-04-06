import {GetInstance} from '@monument/core/Language/Decorators/GetInstance';
import {EMPTY_STRING} from '@monument/text/main/constants';
import {ReadOnlyList} from '../../collections/main/ReadOnlyList';
import {ArrayList} from '@monument/collections/main/ArrayList';
import {CalendarWeekRule} from './CalendarWeekRule';
import {DayOfWeek} from './DayOfWeek';
import {DateTimeFormatInfo} from './DateTimeFormatInfo';


export class InvariantDateTimeFormatInfo implements DateTimeFormatInfo {
    @GetInstance()
    public static readonly invariant: InvariantDateTimeFormatInfo;

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
        'October', 'November', 'December', EMPTY_STRING
    ]);
    public readonly abbreviatedMonthNames: ReadOnlyList<string> = new ArrayList([
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', EMPTY_STRING
    ]);
    public readonly monthGenitiveNames: ReadOnlyList<string> = new ArrayList([
        'of January', 'of February', 'of March', 'of April', 'of May', 'of June', 'of July', 'of August',
        'of September', 'of October', 'of November', 'of December', EMPTY_STRING
    ]);
    public readonly abbreviatedMonthGenitiveNames: ReadOnlyList<string> = new ArrayList([
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
