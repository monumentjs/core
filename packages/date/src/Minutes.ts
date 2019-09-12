import { argument } from '@monument/assert';
import {
  Comparable,
  ComparisonResult,
  Equatable,
  NumberCompare,
  StrictEquals
} from '@monument/core';
import { Duration } from './Duration';

export class Minutes implements Comparable<Minutes>, Comparable<number>, Equatable<Minutes>, Equatable<number> {
  private readonly minutes: number;

  readonly duration: Duration;

  constructor(minutes: number) {
    argument(Number.isSafeInteger(minutes));
    argument(minutes >= 0 && minutes < 60);

    this.minutes = minutes;
    this.duration = Duration.positive(0, 0, minutes);
  }

  compareTo(other: Minutes | number): ComparisonResult {
    const _other: Minutes = typeof other === 'object' ? other : new Minutes(other);

    return NumberCompare(this.minutes, _other.minutes);
  }

  equals(other: Minutes | number): boolean {
    const _other: Minutes = typeof other === 'object' ? other : new Minutes(other);

    return StrictEquals(this.minutes, _other.minutes);
  }

  valueOf(): number {
    return this.minutes;
  }
}
