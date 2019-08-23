import {
  Comparable, ComparableCompare,
  ComparisonResult,
  Equatable,
  EquatableEquals,
  MultiValueCompare,
  MultiValueEquals, NumberCompare,
  StrictEquals,
  argument
} from '@monument/core';
import { Month } from './Month';
import { Year } from './Year';

export class DayOfMonth implements Equatable<DayOfMonth>, Comparable<DayOfMonth> {
  private readonly dayOfMonth: number;

  readonly year: Year;
  readonly month: Month;

  constructor(month: Month, dayOfMonth: number) {
    argument(Number.isSafeInteger(dayOfMonth));
    argument(dayOfMonth >= 0 && dayOfMonth < month.days);

    this.year = month.year;
    this.month = month;
    this.dayOfMonth = dayOfMonth;
  }

  equals(other: DayOfMonth): boolean {
    return MultiValueEquals([
      [this.month, other.month, EquatableEquals],
      [this.dayOfMonth, other.dayOfMonth, StrictEquals]
    ]);
  }

  compareTo(other: DayOfMonth): ComparisonResult {
    return MultiValueCompare([
      [this.month, other.month, ComparableCompare],
      [this.dayOfMonth, other.dayOfMonth, NumberCompare]
    ]);
  }

  valueOf(): number {
    return this.dayOfMonth;
  }
}
