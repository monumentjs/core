import {
  Comparable,
  ComparisonResult,
  Equatable,
  MultiValueCompare,
  MultiValueEquals,
  NumberCompare,
  StrictEquals
} from '@monument/comparison';
import { NativeDate } from './NativeDate';
import { Year } from './Year';
import { Month } from './Month';
import { DayOfMonth } from './DayOfMonth';
import { DayOfWeek } from './DayOfWeek';

export class Date implements Equatable<Date>, Comparable<Date> {
  static now(): Date {
    const date = new NativeDate();

    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }

  readonly year: Year;
  readonly month: Month;
  readonly dayOfMonth: DayOfMonth;
  readonly dayOfWeek: DayOfWeek;

  constructor(year: number, month: number, dayOfMonth: number) {
    const _year = new Year(year);
    const _month = _year.getMonthAt(month);
    const _dayOfMonth = _month.getDayAt(dayOfMonth);

    this.year = _year;
    this.month = _month;
    this.dayOfMonth = _dayOfMonth;
    this.dayOfWeek = new NativeDate(year, month, dayOfMonth + 1).getDay();
  }

  equals(other: Date): boolean {
    return MultiValueEquals([
      [this.year, other.year, StrictEquals],
      [this.month, other.month, StrictEquals],
      [this.dayOfMonth, other.dayOfMonth, StrictEquals]
    ]);
  }

  compareTo(other: Date): ComparisonResult {
    return MultiValueCompare([
      [this.year, other.year, NumberCompare],
      [this.month, other.month, NumberCompare],
      [this.dayOfMonth, other.dayOfMonth, NumberCompare]
    ]);
  }

  withYear(year: number): Date {
    return new Date(year, this.month.valueOf(), this.dayOfMonth.valueOf());
  }

  withMonth(month: number): Date {
    return new Date(this.year.valueOf(), month, this.dayOfMonth.valueOf());
  }

  withDayOfMonth(dayOfMonth: number): Date {
    return new Date(this.year.valueOf(), this.month.valueOf(), dayOfMonth);
  }

  plusYears(delta: number): Date {
    return this.withYear(this.year.valueOf() + delta);
  }

  plusMonths(delta: number): Date {
    return this.withMonth(this.month.valueOf() + delta);
  }

  plusDaysOfMonth(delta: number): Date {
    return this.withDayOfMonth(this.dayOfMonth.valueOf() + delta);
  }

  toNativeDate(): NativeDate {
    return new NativeDate(
      this.year.valueOf(),
      this.month.valueOf(),
      this.dayOfMonth.valueOf()
    );
  }
}
