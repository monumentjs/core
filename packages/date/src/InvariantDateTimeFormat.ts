import { DateTimeFormat } from '@monument/contracts';

export class InvariantDateTimeFormat implements DateTimeFormat {
  readonly fullMonthNames: ReadonlyArray<string> = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];

  readonly shortMonthNames: ReadonlyArray<string> = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  readonly fullDayNames: ReadonlyArray<string> = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  readonly shortDayNames: ReadonlyArray<string> = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  readonly shortestDayNames: ReadonlyArray<string> = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  readonly amDesignator = 'AM';

  readonly pmDesignator = 'PM';

  readonly fullDateTimePattern = '{YYYY}-{MM}-{DD}T{hh}:{mm}:{ss}.{sss}Z';

  readonly fullDatePattern = '{YYYY}-{MM}-{DD}';

  readonly fullTimePattern = '{hh}:{mm}:{ss}.{sss}';
}
