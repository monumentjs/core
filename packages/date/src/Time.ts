import {
  MultiValueCompare,
  MultiValueEquals,
  NumberCompare,
  StrictEquals
} from '@monument/core';
import {
  ComparisonResult,
  Comparable,
  Equatable
} from '@monument/contracts';
import { Hours } from './Hours';
import { Minutes } from './Minutes';
import { Seconds } from './Seconds';
import { Milliseconds } from './Milliseconds';
import { Duration } from './Duration';

export class Time implements Equatable<Time>, Comparable<Time> {
  readonly hours: Hours;
  readonly minutes: Minutes;
  readonly seconds: Seconds;
  readonly milliseconds: Milliseconds;
  readonly duration: Duration;
  readonly isAM: boolean;
  readonly isPM: boolean;

  constructor(hours: number, minutes: number, seconds: number, milliseconds: number) {
    this.hours = new Hours(hours);
    this.minutes = new Minutes(minutes);
    this.seconds = new Seconds(seconds);
    this.milliseconds = new Milliseconds(milliseconds);
    this.isAM = this.hours.isAM;
    this.isPM = this.hours.isPM;
    this.duration = Duration.positive(0, hours, minutes, seconds, milliseconds);
  }

  equals(other: Time): boolean {
    return MultiValueEquals([
      [this.hours, other.hours, StrictEquals],
      [this.minutes, other.minutes, StrictEquals],
      [this.seconds, other.seconds, StrictEquals],
      [this.milliseconds, other.milliseconds, StrictEquals]
    ]);
  }

  compareTo(other: Time): ComparisonResult {
    return MultiValueCompare([
      [this.hours, other.hours, NumberCompare],
      [this.minutes, other.minutes, NumberCompare],
      [this.seconds, other.seconds, NumberCompare],
      [this.milliseconds, other.milliseconds, NumberCompare]
    ]);
  }

  withHours(hours: number): Time {
    return new Time(hours, this.minutes.valueOf(), this.seconds.valueOf(), this.milliseconds.valueOf());
  }

  withMinutes(minutes: number): Time {
    return new Time(this.hours.valueOf(), minutes, this.seconds.valueOf(), this.milliseconds.valueOf());
  }

  withSeconds(seconds: number): Time {
    return new Time(this.hours.valueOf(), this.minutes.valueOf(), seconds, this.milliseconds.valueOf());
  }

  withMilliseconds(milliseconds: number): Time {
    return new Time(this.hours.valueOf(), this.minutes.valueOf(), this.seconds.valueOf(), milliseconds);
  }
}
