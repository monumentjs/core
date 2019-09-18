import { argument } from '@monument/assert';
import {
  Comparable,
  ComparableCompare,
  ComparisonResult,
  Equatable,
  EquatableEquals,
  MultiValueCompare,
  MultiValueEquals, ToString
} from '@monument/core';
import { InvalidArgumentException } from '@monument/exceptions';
import { Date } from './Date';
import { Time } from './Time';
import { TimeZone } from './TimeZone';
import { DayOfWeek } from './DayOfWeek';
import { Year } from './Year';
import { Month } from './Month';
import { DayOfMonth } from './DayOfMonth';
import { Hours } from './Hours';
import { Minutes } from './Minutes';
import { Seconds } from './Seconds';
import { Milliseconds } from './Milliseconds';
import { NativeDate } from './NativeDate';
import { DateTimeLayout } from './DateTimeLayout';
import { TimeZoneOffset } from './TimeZoneOffset';
import { Duration } from './Duration';
import { DateTimeFormat } from '@monument/contracts';
import { InvariantDateTimeFormat } from './InvariantDateTimeFormat';
import { MILLISECONDS_IN_MINUTE } from './Constants';

/**
 * Represents full date with time.
 * @since 0.14.1
 * @author Alex Chugaev
 */
export class DateTime implements Equatable<DateTime>, Comparable<DateTime>, ToString {

  /**
   * Gets year.
   * @since 0.14.1
   * @author Alex Chugaev
   */
  readonly year: Year;

  /**
   * Gets month.
   * @since 0.14.1
   * @author Alex Chugaev
   */
  readonly month: Month;

  /**
   * Gets day of month.
   * @since 0.14.1
   * @author Alex Chugaev
   */
  readonly dayOfMonth: DayOfMonth;

  /**
   * Gets hours.
   * @since 0.14.1
   * @author Alex Chugaev
   */
  readonly hours: Hours;

  /**
   * Gets minutes.
   * @since 0.14.1
   * @author Alex Chugaev
   */
  readonly minutes: Minutes;

  /**
   * Gets seconds.
   * @since 0.14.1
   * @author Alex Chugaev
   */
  readonly seconds: Seconds;

  /**
   * Gets milliseconds.
   * @since 0.14.1
   * @author Alex Chugaev
   */
  readonly milliseconds: Milliseconds;

  /**
   * Gets time zone.
   * @since 0.14.1
   * @author Alex Chugaev
   */
  readonly timeZone: TimeZone;

  /**
   * Gets date.
   * @since 0.14.1
   * @author Alex Chugaev
   */
  readonly date: Date;

  /**
   * Gets time.
   * @since 0.14.1
   * @author Alex Chugaev
   */
  readonly time: Time;

  /**
   * Gets day of week.
   * @since 0.14.1
   * @author Alex Chugaev
   */
  readonly dayOfWeek: DayOfWeek;

  readonly isAM: boolean;

  readonly isPM: boolean;

  constructor();

  constructor(serialized: string, layout: DateTimeLayout);

  constructor(date: Date, time: Time);

  constructor(date: Date, time: Time, timeZone: TimeZone);

  constructor(year: number, month: number);

  constructor(year: number, month: number, dayOfMonth: number);

  constructor(year: number, month: number, dayOfMonth: number, hours: number);

  constructor(year: number, month: number, dayOfMonth: number, hours: number, minutes: number);

  constructor(year: number, month: number, dayOfMonth: number, hours: number, minutes: number, seconds: number);

  constructor(year: number, month: number, dayOfMonth: number, hours: number, minutes: number, seconds: number, milliseconds: number);

  constructor(
    year: number,
    month: number,
    dayOfMonth: number,
    hours: number,
    minutes: number,
    seconds: number,
    milliseconds: number,
    timeZone: TimeZone
  );

  /**
   * Initializes new instance.
   * @param year
   * @param month
   * @param dayOfMonth
   * @param hours
   * @param minutes
   * @param seconds
   * @param milliseconds
   * @param timeZone
   * @since 0.14.1
   * @author Alex Chugaev
   */
  constructor(
    year?: number | string | Date,
    month?: number | DateTimeLayout | Time,
    dayOfMonth: number | TimeZone = 0,
    hours: number = 0,
    minutes: number = 0,
    seconds: number = 0,
    milliseconds: number = 0,
    timeZone: TimeZone = TimeZone.GreenwichMeanTime
  ) {
    let _date: Date;
    let _time: Time;
    let _timeZone: TimeZone;

    if (arguments.length === 0) {
      const now = new NativeDate();
      _date = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      _time = new Time(now.getHours(), now.getMinutes(), now.getSeconds(), now.getMilliseconds());
      _timeZone = new TimeZone(new TimeZoneOffset(new Duration(now.getTimezoneOffset() * -1 * MILLISECONDS_IN_MINUTE)));
    } else if (typeof year === 'number' && typeof month === 'number' && typeof dayOfMonth === 'number') {
      _date = new Date(year, month, dayOfMonth);
      _time = new Time(hours, minutes, seconds, milliseconds);
      _timeZone = timeZone;
    } else if (typeof year === 'string' && month instanceof DateTimeLayout) {
      const fields = month.parse(year);
      _date = new Date(fields.year, fields.month, fields.dayOfMonth);
      _time = new Time(fields.hours, fields.minutes, fields.seconds, fields.milliseconds);
      _timeZone = new TimeZone(new TimeZoneOffset(new Duration(fields.timeZoneOffset)), undefined);
    } else if (year instanceof Date && month instanceof Time) {
      _date = year;
      _time = month;
      if (dayOfMonth instanceof TimeZone) {
        _timeZone = dayOfMonth;
      } else {
        _timeZone = TimeZone.GreenwichMeanTime;
      }
    } else {
      throw new InvalidArgumentException('Cannot create new DateTime with such arguments');
    }

    this.date = _date;
    this.time = _time;
    this.year = _date.year;
    this.month = _date.month;
    this.dayOfMonth = _date.dayOfMonth;
    this.dayOfWeek = _date.dayOfWeek;
    this.hours = _time.hours;
    this.minutes = _time.minutes;
    this.seconds = _time.seconds;
    this.milliseconds = _time.milliseconds;
    this.timeZone = _timeZone;
    this.isAM = _time.isAM;
    this.isPM = _time.isPM;
  }

  equals(other: DateTime): boolean {
    return MultiValueEquals([
      [this.date, other.date, EquatableEquals],
      [this.time, other.time, EquatableEquals],
      [this.timeZone, other.timeZone, EquatableEquals]
    ]);
  }

  compareTo(other: DateTime): ComparisonResult {
    return MultiValueCompare([[this.date, other.date, ComparableCompare], [this.time, other.time, ComparableCompare]]);
  }

  withYear(year: number): DateTime {
    return new DateTime(
      year,
      this.month.valueOf(),
      this.dayOfMonth.valueOf(),
      this.hours.valueOf(),
      this.minutes.valueOf(),
      this.seconds.valueOf(),
      this.milliseconds.valueOf(),
      this.timeZone
    );
  }

  withMonth(month: number): DateTime {
    return new DateTime(
      this.year.valueOf(),
      month,
      this.dayOfMonth.valueOf(),
      this.hours.valueOf(),
      this.minutes.valueOf(),
      this.seconds.valueOf(),
      this.milliseconds.valueOf(),
      this.timeZone
    );
  }

  withDayOfMonth(dayOfMonth: number): DateTime {
    return new DateTime(
      this.year.valueOf(),
      this.month.valueOf(),
      dayOfMonth,
      this.hours.valueOf(),
      this.minutes.valueOf(),
      this.seconds.valueOf(),
      this.milliseconds.valueOf(),
      this.timeZone
    );
  }

  withHours(hours: number): DateTime {
    return new DateTime(
      this.year.valueOf(),
      this.month.valueOf(),
      this.dayOfMonth.valueOf(),
      hours,
      this.minutes.valueOf(),
      this.seconds.valueOf(),
      this.milliseconds.valueOf(),
      this.timeZone
    );
  }

  withMinutes(minutes: number): DateTime {
    return new DateTime(
      this.year.valueOf(),
      this.month.valueOf(),
      this.dayOfMonth.valueOf(),
      this.hours.valueOf(),
      minutes,
      this.seconds.valueOf(),
      this.milliseconds.valueOf(),
      this.timeZone
    );
  }

  withSeconds(seconds: number): DateTime {
    return new DateTime(
      this.year.valueOf(),
      this.month.valueOf(),
      this.dayOfMonth.valueOf(),
      this.hours.valueOf(),
      this.minutes.valueOf(),
      seconds,
      this.milliseconds.valueOf(),
      this.timeZone
    );
  }

  withMilliseconds(milliseconds: number): DateTime {
    return new DateTime(
      this.year.valueOf(),
      this.month.valueOf(),
      this.dayOfMonth.valueOf(),
      this.hours.valueOf(),
      this.minutes.valueOf(),
      this.seconds.valueOf(),
      milliseconds,
      this.timeZone
    );
  }

  withTimezone(timeZone: TimeZone): DateTime {
    return new DateTime(
      this.year.valueOf(),
      this.month.valueOf(),
      this.dayOfMonth.valueOf(),
      this.hours.valueOf(),
      this.minutes.valueOf(),
      this.seconds.valueOf(),
      this.milliseconds.valueOf(),
      timeZone
    );
  }

  plusYears(delta: number): DateTime {
    argument(Number.isSafeInteger(delta), 'Delta must be positive integer');
    argument(delta > 0, 'Delta must be positive integer');

    return this.withYear(this.year.valueOf() + delta);
  }

  plusMonths(delta: number): DateTime {
    argument(Number.isSafeInteger(delta), 'Delta must be positive integer');
    argument(delta > 0, 'Delta must be positive integer');

    return this.withMonth(this.month.valueOf() + delta);
  }

  plusDaysOfMonth(delta: number): DateTime {
    argument(Number.isSafeInteger(delta), 'Delta must be positive integer');
    argument(delta > 0, 'Delta must be positive integer');

    return this.withDayOfMonth(this.dayOfMonth.valueOf() + delta);
  }

  plusHours(delta: number): DateTime {
    argument(Number.isSafeInteger(delta), 'Delta must be positive integer');
    argument(delta > 0, 'Delta must be positive integer');

    return this.withHours(this.hours.valueOf() + delta);
  }

  plusMinutes(delta: number): DateTime {
    argument(Number.isSafeInteger(delta), 'Delta must be positive integer');
    argument(delta > 0, 'Delta must be positive integer');

    return this.withMinutes(this.minutes.valueOf() + delta);
  }

  plusSeconds(delta: number): DateTime {
    argument(Number.isSafeInteger(delta), 'Delta must be positive integer');
    argument(delta > 0, 'Delta must be positive integer');

    return this.withSeconds(this.seconds.valueOf() + delta);
  }

  plusMilliseconds(delta: number): DateTime {
    argument(Number.isSafeInteger(delta), 'Delta must be positive integer');
    argument(delta > 0, 'Delta must be positive integer');

    return this.withMilliseconds(this.milliseconds.valueOf() + delta);
  }

  toNativeDate(): NativeDate {
    return new NativeDate(
      this.year.valueOf(),
      this.month.valueOf(),
      this.dayOfMonth.valueOf(),
      this.hours.valueOf(),
      this.minutes.valueOf(),
      this.seconds.valueOf(),
      this.milliseconds.valueOf()
    );
  }

  toString(pattern?: string, format?: DateTimeFormat): string {
    const _format = format || new InvariantDateTimeFormat();
    const _pattern = pattern || _format.fullDateTimePattern;
    const _layout = new DateTimeLayout(_pattern, _format);
    const { year, month, dayOfMonth, dayOfWeek, hours, minutes, seconds, milliseconds, isAM, isPM, timeZone } = this;

    return _layout.serialize({
      year: year.valueOf(),
      month: month.valueOf(),
      dayOfMonth: dayOfMonth.valueOf(),
      dayOfWeek: dayOfWeek,
      hours: hours.valueOf(),
      minutes: minutes.valueOf(),
      seconds: seconds.valueOf(),
      milliseconds: milliseconds.valueOf(),
      isAM,
      isPM,
      timeZoneOffset: timeZone.offset.duration.valueOf()
    });
  }
}
