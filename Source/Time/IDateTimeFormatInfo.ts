import {DayOfWeek} from './DayOfWeek';
import {CalendarWeekRule} from './CalendarWeekRule';
import {ReadOnlyCollection} from '../Collections/ReadOnlyCollection';


export interface IDateTimeFormatInfo {
    readonly shortestDayNames: ReadOnlyCollection<string>;
    readonly abbreviatedDayNames: ReadOnlyCollection<string>;
    readonly dayNames: ReadOnlyCollection<string>;
    readonly monthNames: ReadOnlyCollection<string>;
    readonly abbreviatedMonthNames: ReadOnlyCollection<string>;
    readonly monthGenitiveNames: ReadOnlyCollection<string>;
    readonly abbreviatedMonthGenitiveNames: ReadOnlyCollection<string>;
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
