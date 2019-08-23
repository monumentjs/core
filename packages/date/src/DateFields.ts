import { DayOfWeek } from './DayOfWeek';

export interface DateFields {
  readonly year: number;
  readonly month: number;
  readonly dayOfMonth: number;
  readonly dayOfWeek: DayOfWeek;
}
