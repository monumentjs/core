import { argument } from '@monument/assert';
import {
  Comparable,
  ComparisonResult,
  Equatable,
  NumberCompare,
  StrictEquals
} from '@monument/core';
import {
  MILLISECONDS_IN_DAY,
  MILLISECONDS_IN_HOUR,
  MILLISECONDS_IN_MINUTE,
  MILLISECONDS_IN_SECOND
} from './Constants';

export class Duration implements Equatable<Duration>, Comparable<Duration> {
  static readonly ZERO: Duration = new Duration(0);

  static positive(days: number = 0, hours: number = 0, minutes: number = 0, seconds: number = 0, milliseconds: number = 0): Duration {
    return new Duration(
      milliseconds +
      seconds * MILLISECONDS_IN_SECOND +
      minutes * MILLISECONDS_IN_MINUTE +
      hours * MILLISECONDS_IN_HOUR +
      days * MILLISECONDS_IN_DAY
    );
  }

  static negative(days: number = 0, hours: number = 0, minutes: number = 0, seconds: number = 0, milliseconds: number = 0): Duration {
    return new Duration(
      (
        milliseconds +
        seconds * MILLISECONDS_IN_SECOND +
        minutes * MILLISECONDS_IN_MINUTE +
        hours * MILLISECONDS_IN_HOUR +
        days * MILLISECONDS_IN_DAY
      ) *
      -1
    );
  }

  /**
   * Gets duration in milliseconds.
   * @since 0.14.1
   * @author Alex Chugaev
   */
  readonly duration: number;

  /**
   * Initializes new instance.
   * @param duration Duration in milliseconds
   * @throws {InvalidArgumentException} if duration is not integer
   * @since 0.14.1
   * @author Alex Chugaev
   */
  constructor(duration: number) {
    argument(Number.isSafeInteger(duration), 'Duration must be integer');

    this.duration = duration;
  }

  compareTo(other: Duration): ComparisonResult {
    return NumberCompare(this.duration, other.duration);
  }

  equals(other: Duration): boolean {
    return StrictEquals(this.duration, other.duration);
  }

  /**
   * Gets duration in milliseconds.
   * @since 0.14.1
   * @author Alex Chugaev
   */
  valueOf(): number {
    return this.duration;
  }
}
