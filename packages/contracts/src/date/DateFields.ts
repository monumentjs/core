import { DayOfWeek } from './DayOfWeek';

/**
 * @todo need to change implementations to abstractions
 */
export interface DateFields {
  readonly year: number;
  readonly month: number;
  readonly dayOfMonth: number;
  readonly dayOfWeek: DayOfWeek;
}
