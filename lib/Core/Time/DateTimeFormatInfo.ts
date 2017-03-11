import {IFormatProvider, ICustomFormatter} from '../types';
import {CalendarWeekRule, DayOfWeek} from './types';
import DateTime from './DateTime';
import FormattableString from '../../System/Text/FormattableString';
import TimeComponentFormatterProvider from './TimeComponentFormatterProvider';
import ReadOnlyCollection from '../Collections/ReadOnlyCollection';
import {TimeComponentFormatterBase} from './Formatting/TimeComponentFormatterBase';
import DateTimeFormatException from './DateTimeFormatException';
import TimeSpan from './TimeSpan';


export default class DateTimeFormatInfo implements
    IFormatProvider,
    ICustomFormatter<DateTime> {

    public static readonly invariantInfo: DateTimeFormatInfo = new DateTimeFormatInfo();

    public readonly isReadOnly: boolean = true;
    public readonly shortestDayNames: string[] = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
    public readonly abbreviatedDayNames: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    public readonly dayNames: string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    public readonly monthNames: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December', ''];
    public readonly abbreviatedMonthNames: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', ''];
    public readonly monthGenitiveNames: string[] = ['of January', 'of February', 'of March', 'of April', 'of May', 'of June', 'of July', 'of August', 'of September', 'of October', 'of November', 'of December', ''];
    public readonly abbreviatedMonthGenitiveNames: string[] = ['of Jan', 'of Feb', 'of Mar', 'of Apr', 'of May', 'of Jun', 'of Jul', 'of Aug', 'of Sep', 'of Oct', 'of Nov', 'of Dec', ''];
    public readonly amDesignator: string = 'AM';
    public readonly pmDesignator: string = 'PM';
    // TODO: public readonly calendar: Calendar;
    public readonly calendarWeekRule: CalendarWeekRule = CalendarWeekRule.FirstDay;
    public readonly firstDayOfWeek: DayOfWeek = DayOfWeek.Sunday;
    public readonly fullDateTimePattern: string = '{YYYY}/{MM}/{DD} {HH}:{mm}:{ss}.{fff}';
    public readonly longDatePattern: string = '{YYYY}/{MM}/{DD}';
    public readonly longTimePattern: string = '{HH}:{mm}:{ss}.{fff}';
    public readonly monthDayPattern: string = '{MMMM} {DD}';
    public readonly nativeCalendarName: string = '';
    public readonly rfc1123Pattern: string = `{ddd}, {DD} {MMM} {YYYY} {HH}:{mm}:{ss} GMT`;
    public readonly shortDatePattern: string = '{YYYY}/{M}/{D}';
    public readonly shortTimePattern: string = '{H}:{mm} {AA}';
    public readonly sortableDateTimePattern: string = `{YYYY}-{MM}-{DD}T{HH}:{mm}:{ss}`;
    public readonly universalSortableDateTimePattern: string = `{YYYY}-{MM}-{DD} {HH}:{mm}:{ss}Z`;
    public readonly yearMonthPattern: string = `{MMMM}, {YYYY}`;


    public getFormat(): object {
        return this;
    }


    public format(
        format: string,
        time: DateTime | TimeSpan,
        formatInfo: DateTimeFormatInfo
    ): string {
        let template: FormattableString = new FormattableString(format);
        let dateComponents: object = this.getTimeComponents(time, template.uniqueEntries, formatInfo);

        return template.fillByKeys(dateComponents);
    }


    protected getTimeComponents(
        time: DateTime | TimeSpan,
        formatEntries: ReadOnlyCollection<string>,
        formatInfo: DateTimeFormatInfo
    ): object {
        let components: object = {};

        for (let formatEntry of formatEntries) {
            let formatter: TimeComponentFormatterBase;

            formatter = TimeComponentFormatterProvider.instance.getFormatter(formatEntry);

            if (!formatter) {
                throw new DateTimeFormatException(`Unknown DateTime format entry "${formatEntry}".`);
            }

            if (time instanceof DateTime) {
                components[formatEntry] = formatter.formatDateTime(time, formatEntry, formatInfo);
            }

            if (time instanceof TimeSpan) {
                components[formatEntry] = formatter.formatTimeSpan(time, formatEntry, formatInfo);
            }
        }

        return components;
    }
}
