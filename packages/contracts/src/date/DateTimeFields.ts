import { DateFields } from './DateFields';
import { TimeFields } from './TimeFields';

export interface DateTimeFields extends DateFields, TimeFields {
  /**
   * Time zone offset in milliseconds.
   */
  readonly timeZoneOffset: number;
}
