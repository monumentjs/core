import { LinkedMap } from '@monument/collections';
import { NotImplementedException } from '@monument/exceptions';
import { Template } from '@monument/text';
import { DateTimeFormat } from './DateTimeFormat';
import { DateTimeFields } from './DateTimeFields';

export class DateTimeLayout {
  private readonly _template: Template;
  private readonly _format: DateTimeFormat;

  constructor(pattern: string, format: DateTimeFormat) {
    this._template = new Template(pattern);
    this._format = format;
  }

  /**
   * Formats given datetime
   * @param dateTime
   */
  serialize(dateTime: DateTimeFields): string {
    const keys: LinkedMap<string, string> = new LinkedMap();

    keys.put('YY', dateTime.year.toString().slice(-2).padStart(2, '0'));
    keys.put('YYYY', dateTime.year.toString().padStart(4, '0'));
    keys.put('M', (dateTime.month + 1).toString());
    keys.put('MM', (dateTime.month + 1).toString().padStart(2, '0'));
    keys.put('MMM', this._format.shortMonthNames[dateTime.month]);
    keys.put('MMMM', this._format.fullMonthNames[dateTime.month]);
    keys.put('D', (dateTime.dayOfMonth + 1).toString());
    keys.put('DD', (dateTime.dayOfMonth + 1).toString().padStart(2, '0'));
    keys.put('d', this._format.shortestDayNames[dateTime.dayOfWeek].toString());
    keys.put('dd', this._format.shortDayNames[dateTime.dayOfWeek].toString());
    keys.put('ddd', this._format.fullDayNames[dateTime.dayOfWeek].toString());
    keys.put('h', dateTime.hours.toString());
    keys.put('hh', dateTime.hours.toString().padStart(2, '0'));
    keys.put('m', dateTime.minutes.toString());
    keys.put('mm', dateTime.minutes.toString().padStart(2, '0'));
    keys.put('s', dateTime.seconds.toString());
    keys.put('ss', dateTime.seconds.toString().padStart(2, '0'));
    keys.put('sss', dateTime.milliseconds.toString().padStart(3, '0'));
    keys.put('a', dateTime.isAM ? this._format.amDesignator : this._format.pmDesignator);

    return this._template.fillByKeys(keys);
  }

  parse(source: string): DateTimeFields {
    throw new NotImplementedException();
  }
}
