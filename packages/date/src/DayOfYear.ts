import {
  Comparable,
  ComparableCompare,
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
import { Month } from './Month';

export class DayOfYear implements Equatable<DayOfYear>, Comparable<DayOfYear> {
  private readonly dayOfYear: number;

  readonly year: Year;
  readonly month: Month;

  constructor(year: Year, dayOfYear: number) {
    argument(Number.isSafeInteger(dayOfYear));
    argument(dayOfYear >= 0 && dayOfYear < year.days);

    this.year = year;
    this.month = Month.fromDayOfYear(year, dayOfYear);
    this.dayOfYear = dayOfYear;
  }

  equals(other: DayOfYear): boolean {
    return MultiValueEquals([
      [this.year, other.year, EquatableEquals],
      [this.dayOfYear, other.dayOfYear, StrictEquals]
    ]);
  }

  compareTo(other: DayOfYear): ComparisonResult {
    return MultiValueCompare([
      [this.year, other.year, ComparableCompare],
      [this.dayOfYear, other.dayOfYear, NumberCompare]
    ]);
  }

  valueOf(): number {
    return this.dayOfYear;
  }
}
