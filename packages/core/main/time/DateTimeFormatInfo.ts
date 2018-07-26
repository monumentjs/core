import {ReadOnlyList} from '../collection/readonly/ReadOnlyList';
import {DayOfWeek} from './DayOfWeek';
import {CalendarWeekRule} from './CalendarWeekRule';


export interface DateTimeFormatInfo {
    readonly shortestDayNames: ReadOnlyList<string>;
    readonly abbreviatedDayNames: ReadOnlyList<string>;
    readonly dayNames: ReadOnlyList<string>;
    readonly monthNames: ReadOnlyList<string>;
    readonly abbreviatedMonthNames: ReadOnlyList<string>;
    readonly monthGenitiveNames: ReadOnlyList<string>;
    readonly abbreviatedMonthGenitiveNames: ReadOnlyList<string>;
    readonly amDesignator: string;
    readonly pmDesignator: string;
    // TODO: readonly calendar: Calendar;
    readonly calendarWeekRule: CalendarWeekRule;
    readonly firstDayOfWeek: DayOfWeek;
    readonly fullDateTimePattern: string;
    readonly longDatePattern: string;
    readonly longTimePattern: string;
    readonly monthDayPattern: string;
    readonly nativeCalendarName: string;
    readonly rfc1123Pattern: string;
    readonly shortDatePattern: string;
    readonly shortTimePattern: string;
    readonly sortableDateTimePattern: string;
    readonly universalSortableDateTimePattern: string;
    readonly yearMonthPattern: string;
}
