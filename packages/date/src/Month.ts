import {
  Comparable,
  ComparisonResult,
  Equatable,
  EquatableEquals,
  MultiValueCompare,
  MultiValueEquals,
  NumberCompare,
  StrictEquals
} from '@monument/comparison';
import { argument } from '@monument/assert';
import { Year } from './Year';
import { DayOfMonth } from './DayOfMonth';

export class Month implements Equatable<Month>, Comparable<Month> {
  //                                                                  Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec
  private static readonly DAYS_IN_MONTH_365: ReadonlyArray<number> = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  private static readonly DAYS_IN_MONTH_366: ReadonlyArray<number> = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  private static readonly DAYS_OFFSET_365: ReadonlyArray<number> = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
  private static readonly DAYS_OFFSET_366: ReadonlyArray<number> = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335];

  static fromDayOfYear(year: Year, dayOfYear: number): Month {
    argument(dayOfYear >= 0 && dayOfYear < year.days);

    const offsets = year.isLeapYear ? this.DAYS_OFFSET_366 : this.DAYS_OFFSET_365;
    let month = 0;
    let index = 0;

    for (const offset of offsets) {
      if (dayOfYear >= offset) {
        month = index;
      } else {
        break;
      }

      index++;
    }

    return year.getMonthAt(month);
  }

  private readonly month: number;

  readonly year: Year;

  get days(): number {
    const days = this.year.isLeapYear ? Month.DAYS_IN_MONTH_366 : Month.DAYS_IN_MONTH_365;

    return days[this.month];
  }

  /**
   * Gets offset in days since the year start.
   * @since 0.14.0
   * @author Alex Chugaev
   */
  get daysOffset(): number {
    const offset = this.year.isLeapYear ? Month.DAYS_OFFSET_366 : Month.DAYS_OFFSET_365;

    return offset[this.month];
  }

  constructor(year: Year, month: number) {
    argument(Number.isSafeInteger(month));
    argument(month >= 0 && month < 12);

    this.year = year;
    this.month = month;
  }

  getDayAt(dayOfMonth: number): DayOfMonth {
    return new DayOfMonth(this, dayOfMonth);
  }

  equals(other: Month): boolean {
    return MultiValueEquals([
      [this.year, other.year, EquatableEquals],
      [this.month, other.month, StrictEquals]
    ]);
  }

  compareTo(other: Month): ComparisonResult {
    return MultiValueCompare([
      [this.year, other.year, NumberCompare]
    ]);
  }

  valueOf(): number {
    return this.month;
  }
}
