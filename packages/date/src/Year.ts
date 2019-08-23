import { argument, Comparable, ComparisonResult, Equatable, NumberCompare, ToString } from '@monument/core';
import { Month } from './Month';
import { DayOfYear } from './DayOfYear';

export class Year implements Equatable<Year>, Comparable<Year>, ToString {
  static readonly DAYS_IN_REGULAR_YEAR = 365;
  static readonly DAYS_IN_LEAP_YEAR = 366;

  private readonly year: number;

  get isLeapYear(): boolean {
    return this.year % 4 === 0 && (this.year % 100 !== 0 || this.year % 400 === 0);
  }

  get days(): number {
    return this.isLeapYear ? Year.DAYS_IN_LEAP_YEAR : Year.DAYS_IN_REGULAR_YEAR;
  }

  constructor(year: number) {
    argument(Number.isSafeInteger(year));
    argument(year >= 0);

    this.year = year;
  }

  getMonthAt(month: number): Month {
    return new Month(this, month);
  }

  getDayAt(dayOfYear: number): DayOfYear {
    return new DayOfYear(this, dayOfYear);
  }

  plus(delta: number): Year {
    argument(Number.isSafeInteger(delta));
    argument(delta >= 0);

    return new Year(this.year + delta);
  }

  subtract(delta: number): Year {
    argument(Number.isSafeInteger(delta));
    argument(delta >= 0);

    return new Year(this.year - delta);
  }

  equals(other: Year): boolean {
    return this.year === other.year;
  }

  compareTo(other: Year): ComparisonResult {
    return NumberCompare(this.year, other.year);
  }

  valueOf(): number {
    return this.year;
  }
}
