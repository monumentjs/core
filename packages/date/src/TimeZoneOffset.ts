import { Comparable, ComparisonResult, Equatable } from '@monument/core';
import { Duration } from './Duration';

export class TimeZoneOffset implements Equatable<TimeZoneOffset>, Comparable<TimeZoneOffset> {
  static readonly ZERO = new TimeZoneOffset(new Duration(0));

  static positive(hours: number, minutes: number = 0): TimeZoneOffset {
    return new TimeZoneOffset(Duration.positive(0, hours, minutes));
  }

  static negative(hours: number, minutes: number = 0): TimeZoneOffset {
    return new TimeZoneOffset(Duration.negative(0, hours, minutes));
  }

  readonly duration: Duration;

  constructor(duration: Duration) {
    this.duration = duration;
  }

  compareTo(other: TimeZoneOffset): ComparisonResult {
    return this.duration.compareTo(other.duration);
  }

  equals(other: TimeZoneOffset): boolean {
    return this.duration.equals(other.duration);
  }
}
